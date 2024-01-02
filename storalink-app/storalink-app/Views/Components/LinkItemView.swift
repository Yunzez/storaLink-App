//
//  LinkItemView.swift
//  storalink-app
//
//  Created by Yunze Zhao on 11/27/23.
//

import SwiftUI

struct LinkItemView: View {
    var currentLink: Link
    @StateObject var linkItemViewModel = LinkItemViewModel()
    @State private var navigateToLink = false
    @Environment(NavigationStateManager.self) var navigationStateManager: NavigationStateManager

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
                    Image(systemName: "ellipsis").foregroundColor(.black)
                }).padding(.horizontal, Spacing.small)
                    .sheet(isPresented: $linkItemViewModel.moreOpen) {
                        VStack{
                            Text("test")
                        }.presentationDetents([.height(300)])
                    }
            }
            .padding()
            .frame(height: 80) // Adjust size as needed
            .frame(maxWidth: .infinity)
            .background(Color.gray.opacity(0.1)) // Placeholder for card background
            .cornerRadius(10)
            .foregroundColor(.black)
            .onAppear{
                
                print(currentLink.parentFolder?.desc ?? "fail to find folder")
                print(currentLink.id)
            }
        })
    }
}

#Preview {
    LinkItemView(currentLink: Link( title: "link", imgUrl: "", desc: "a testing link")).modelContainer(PreviewContainer).environment(AppViewModel()).environment(NavigationStateManager())
}

