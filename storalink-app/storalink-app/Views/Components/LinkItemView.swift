//
//  LinkItemView.swift
//  storalink-app
//
//  Created by Yunze Zhao on 11/27/23.
//

import SwiftUI

struct LinkItemView: View {
    @Bindable var currentLink: Link
    @State var linkItemViewModel = LinkItemViewModel()
    @State private var navigateToLink = false
    @Environment(NavigationStateManager.self) var navigationStateManager: NavigationStateManager
    @Environment(\.modelContext) var modelContext
    
    let linkActor = LinkActor()
    let fileManager = LocalFileManager.manager
    var body: some View {
        Button(action: {
            navigationStateManager.navigationPath.append(NavigationItem.linkView)
            navigationStateManager.focusLink = currentLink
        }, label: {
            HStack(spacing: Spacing.small) {
                
                Image(uiImage: fileManager.getImage(path: currentLink.imgUrl ?? "") ?? UIImage(resource: .linkPlaceholder)) // Replace with actual image
                    .resizable()
                    .scaledToFit()
                    .frame(width: 88, height: 65)
                    .aspectRatio(contentMode: .fit)
                    .cornerRadius(Spacing.roundMd)
                
                VStack(alignment: .leading) {
                    Text(currentLink.title )
                        .font(.headline)
                    HStack{
                        Image(uiImage: fileManager.getImage(path: currentLink.iconUrl ?? "") ?? UIImage(resource: .defaultLinkIcon))
                            .resizable()
                            .scaledToFit()
                            .aspectRatio(contentMode: .fill)
                            .frame(width: 22, height: 22)
                        Text(" ")
                            .font(.subheadline)
                        
                    }
                }
                Spacer()
                Button(action: {
                    print("clicked item")
                    linkItemViewModel.toggleMore()
                }, label: {
                    Image(systemName: "ellipsis").foregroundColor(Color("ThemeBlack"))
                })
                .padding(.horizontal, Spacing.small)
                .sheet(isPresented: $linkItemViewModel.moreOpen) {
                    VStack{
                        Spacer()
                        BottomSheetOption(onClick: {
                            Task{
                                await linkActor.deleteLink(link: currentLink) { result in
                                    switch result {
                                    case .success:
                                        modelContext.delete(currentLink)
                                        do { try modelContext.save() } catch { print("error saving") }
                                    case .failure(let err):
                                        print("fail to delete", err.localizedDescription)
                                    }
                                    
                                }
                            }
                        }, text: "Delete", assetImageString: "Trash")
                        Spacer()
                        BottomSheetOption(onClick: {
                            linkItemViewModel.toggleMore()
                            DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) {
                                linkItemViewModel.toggleMove()
                            }
                        }, text: "Edit", assetImageString: "Pencil")
                        Spacer()
                        
                    }.presentationDetents([.height(300)])
                }
                .sheet(isPresented: $linkItemViewModel.openMove, content: {
                    CreateLinkView(editLink: currentLink)
                })
            }
            .padding()
            .frame(height: 75) // Adjust size as needed
            .frame(maxWidth: .infinity)
            .background(Color.gray.opacity(0.1)) // Placeholder for card background
            .cornerRadius(10)
            .foregroundColor(Color("ThemeBlack"))
            .onAppear{
                //                print(currentLink.parentFolder?.title ?? "fail to find folder")
                //                print(currentLink.id)
            }
        })
    }
}

#Preview {
    Group{
        LinkItemView(currentLink: Link( title: "link", imgUrl: "", desc: "a testing link")).modelContainer(PreviewContainer).environment(AppViewModel()).environment(NavigationStateManager())
        LinkItemView(currentLink: Link( title: "Matt", imgUrl: "", desc: "a testing link")).modelContainer(PreviewContainer).environment(AppViewModel()).environment(NavigationStateManager())
    }
    
}

