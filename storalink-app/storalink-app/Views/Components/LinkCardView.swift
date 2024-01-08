//
//  LinkViewCard.swift
//  storalink-app
//
//  Created by Yunze Zhao on 12/23/23.
//

import SwiftUI

struct LinkViewCard: View {
    var link: Link
    let fileManager = LocalFileManager.manager
    
    var body: some View {
            VStack{
                HStack(){
                    Image(uiImage: fileManager.getImage(path: link.iconUrl ?? "") ?? UIImage(resource: .ins))
                        .resizable()
                        .scaledToFit()
                        .frame(width: 25, height: 25)
                    Text(link.title)
                    Spacer()
                }
                Image(uiImage: fileManager.getImage(path: link.imgUrl ?? "") ?? UIImage(resource: .linkPlaceholder)) 
                    .resizable()
                    .scaledToFit()
                    .frame(width: 300, height: 200)
                    .aspectRatio(contentMode: .fit)
                    .cornerRadius(Spacing.small)
                
                   
                
            }.padding(Spacing.small).background(Color("SubtleTheme"))
                .overlay(
                    RoundedRectangle(cornerRadius: Spacing.medium)
                        .stroke(Color("SubtleTheme"), lineWidth: 2).cornerRadius(Spacing.medium)
                ).cornerRadius(Spacing.medium).shadow(radius: 3)
                .frame(width: 300, height: 300)
        }
    
}

#Preview {
    LinkViewCard(link : Link(title: "test", imgUrl: ""))
}
