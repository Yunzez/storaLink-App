//
//  LinkItemView.swift
//  storalink-app
//
//  Created by Yunze Zhao on 11/27/23.
//

import SwiftUI

struct LinkItemView: View {
    var currentLink: Link
    @StateObject var linkItemViewModel = LinkViewModel()
    @State private var navigateToLink = false

    var body: some View {
        NavigationLink {
            LinkView()
        } label: {
                HStack(spacing: Spacing.small) {
                    Image("LinkPlaceholder") // Replace with actual image
                        .resizable()
                        .aspectRatio(contentMode: .fit)
                        .cornerRadius(Spacing.roundMd)
                        .frame(width: 80, height: 80)
                    VStack(alignment: .leading) {
                        Text(currentLink.desc ?? "No description" )
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
                
            }.foregroundColor(.black)
        

        
    }
}

#Preview {
    LinkItemView(currentLink: Link( title: "link", imgUrl: "", desc: "a testing link", linksNumber: 2))
}

