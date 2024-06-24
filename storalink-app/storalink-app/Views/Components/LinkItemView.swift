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
    
    var onDelete: (() -> Void)? // this gives other components choices to update after delete if not happening automatically
    
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
                    .scaledToFill()
                    .frame(width: 75, height: 55)
                    .clipShape(RoundedRectangle(cornerRadius: Spacing.roundMd)) // Clip to a rounded rectangle with medium corner radius
                    .cornerRadius(Spacing.roundMd) // Apply the same corner radius
                
                VStack(alignment: .leading) {
                    Text(currentLink.title )
                        .font(.subheadline)
                    HStack{
                        Image(uiImage: fileManager.getImage(path: currentLink.iconUrl ?? "") ?? UIImage(resource: .defaultLinkIcon))
                            .resizable()
                            .scaledToFit()
                            .aspectRatio(contentMode: .fill)
                            .frame(width: 20, height: 20)
                            .clipShape(RoundedRectangle(cornerRadius: Spacing.small)) // Clip to a rounded rectangle
                        Text(currentLink.source ?? " ")
                            .font(.system(size: 13))
                            .foregroundColor(Color.themeGray)
                        
                    }
                }
                Spacer()
                Button(action: {
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
                                modelContext.delete(currentLink)
                                do {
                                    try modelContext.save()
                                    onDelete?()
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
                    CreateLinkView(editLink: currentLink).padding(.top)
                })
                
            }
            .padding(Spacing.small)
            .frame(height: 70) // Adjust size as needed
            .frame(maxWidth: .infinity)
            // Placeholder for card background
            .foregroundColor(Color("ThemeBlack"))
            .onAppear{
                //                print(currentLink.parentFolder?.title ?? "fail to find folder")
                //                print(currentLink.id)
            }
            .background(Color.subtleTheme)
            .cornerRadius(Spacing.roundMd)
        })
    }
}

#Preview {
    Group{
        LinkItemView(currentLink: Link( title: "link", imgUrl: "", desc: "a testing link")).modelContainer(PreviewContainer).environment(AppViewModel()).environment(NavigationStateManager())
        LinkItemView(currentLink: Link( title: "Matt", imgUrl: "", desc: "a testing link")).modelContainer(PreviewContainer).environment(AppViewModel()).environment(NavigationStateManager())
    }
    
}

