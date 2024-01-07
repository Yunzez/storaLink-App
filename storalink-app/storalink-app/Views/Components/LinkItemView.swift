//
//  LinkItemView.swift
//  storalink-app
//
//  Created by Yunze Zhao on 11/27/23.
//

import SwiftUI

struct LinkItemView: View {
    @Bindable var currentLink: Link
    @StateObject var linkItemViewModel = LinkItemViewModel()
    @State private var navigateToLink = false
    @Environment(NavigationStateManager.self) var navigationStateManager: NavigationStateManager
    @Environment(\.modelContext) var modelContext
    
    var body: some View {
        Button(action: {
            navigationStateManager.navigationPath.append(NavigationItem.linkView)
            navigationStateManager.focusLink = currentLink
        }, label: {
            HStack(spacing: Spacing.small) {
                Image("LinkPlaceholder") // Replace with actual image
                    .resizable()
                    .aspectRatio(contentMode: .fit)
                    .cornerRadius(Spacing.roundMd)
                    .frame(width: 80, height: 80)
                VStack(alignment: .leading) {
                    Text(currentLink.title )
                        .font(.headline)
                    Text("@author")
                        .font(.subheadline)
                }
                Spacer()
                Button(action: {
                    print("clicked item")
                    linkItemViewModel.toggleMore()
                }, label: {
                    Image(systemName: "ellipsis").foregroundColor(Color("ThemeBlack"))
                }).padding(.horizontal, Spacing.small)
                    .sheet(isPresented: $linkItemViewModel.moreOpen) {
                        VStack{
                            Spacer()
                            BottomSheetOption(onClick: {
                                modelContext.delete(currentLink)
                            }, text: "Delete", assetImageString: "Trash")
                            Spacer()
                            BottomSheetOption(onClick: {
                                print("test")
                            }, text: "Move", assetImageString: "FolderMove")
                            Spacer()
                            BottomSheetOption(onClick: {
                                print("test")
                            }, text: "Edit", assetImageString: "Pencil")
                            Spacer()
                            
                        }.presentationDetents([.height(300)])
                    }
            }
            .padding()
            .frame(height: 80) // Adjust size as needed
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
    LinkItemView(currentLink: Link( title: "link", imgUrl: "", desc: "a testing link")).modelContainer(PreviewContainer).environment(AppViewModel()).environment(NavigationStateManager())
}

