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
                    Image(uiImage: fileManager.getImage(path: link.iconUrl ?? "") ?? UIImage(resource: .defaultLinkIcon))
                        .resizable()
                        .scaledToFit()
                        .frame(width: 25, height: 25)
                        .cornerRadius(Spacing.small)
                    Text(link.source ?? link.title)
                    Spacer()
                }
                
                VStack{
                    Image(uiImage: fileManager.getImage(path: link.imgUrl ?? "") ?? UIImage(resource: .linkPlaceholder))
                        .resizable()
                        .scaledToFill() // Ensure the image fills the frame
                        .frame(width: 300, height: 200)
                        .clipped() // Clip to ensure the image does not overflow the frame
                        .cornerRadius(Spacing.small) // Apply the corner radius
                }
                    
                
                   
                
            }.padding(Spacing.small).background(Color("SubtleTheme"))
                .overlay(
                    RoundedRectangle(cornerRadius: Spacing.medium)
                        .stroke(Color("SubtleTheme"), lineWidth: 2).cornerRadius(Spacing.medium)
                ).cornerRadius(Spacing.medium).shadow(radius: 1)
                .frame(width: 300, height: 300)
        }
    
}

#Preview {
    LinkViewCard(link : Link(title: "test", imgUrl: ""))
}
