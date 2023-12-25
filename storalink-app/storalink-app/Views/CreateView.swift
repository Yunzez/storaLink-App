//
//  CreateView.swift
//  storalink-app
//
//  Created by Yunze Zhao on 11/26/23.
//

import SwiftUI

struct CreateView: View {
    var body: some View {
        NavigationView(content: {
            VStack{
                HStack{
                    Image(systemName: "plus.circle")
                    Text("Create New")
                }
                Spacer()
                NavigationLink(destination: CreateLinkView()) {
                    HStack{
                        Image("Link")
                        Text("Link")
                    }.frame(width: 300, height: 200).background(.subtleTheme).cornerRadius(Spacing.medium).shadow(radius: 5)
                }
                Spacer()
                NavigationLink(destination: CreateFolderView()) {
                    HStack{
                    Image("Folder")
                    Text("Folder")
                    }.frame(width: 300, height: 200).background(.subtleTheme).cornerRadius(Spacing.medium).shadow(radius: 5)
                }
                Spacer()
            }
        }).padding(.bottom, Spacing.customNavigationBarHeight )
        
    }
}

#Preview {
    CreateView()
}
