//
//  CreateView.swift
//  storalink-app
//
//  Created by Yunze Zhao on 11/26/23.
//

import SwiftUI

struct CreateView: View {
    @Environment(NavigationStateManager.self) var navigationStateManager: NavigationStateManager
    var body: some View {
//        NavigationView(content: {
            VStack{
                HStack{
                    Image(systemName: "plus.circle")
                    Text("Create New")
                }
                Spacer()
                Button(action: {
                    navigationStateManager.navigationPath.append(NavigationItem.createLinkView)
                }) {
                    HStack{
                        Image("Link")
                        Text("Link")
                    }.frame(width: 300, height: 200).background(.subtleTheme).cornerRadius(Spacing.medium)
                }.padding(.bottom, 32)
                
                Button(action: {
                    navigationStateManager.navigationPath.append(NavigationItem.createFolderView)
                }) {
                    HStack{
                    Image("Folder")
                    Text("Folder")
                    }.frame(width: 300, height: 200).background(.subtleTheme).cornerRadius(Spacing.medium)
                }
                Spacer()
            }.frame(maxWidth: .infinity, maxHeight: .infinity)
            .background(Color.themeWhite)/*.padding(.bottom, Spacing.customNavigationBarHeight)*/
        
    }
}

#Preview {
    
    CreateView().modelContainer(PreviewContainer)
        .environment(NavigationStateManager())
        .environment(AppViewModel())
}
