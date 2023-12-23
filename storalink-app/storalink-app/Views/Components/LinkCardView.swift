//
//  LinkViewCard.swift
//  storalink-app
//
//  Created by Yunze Zhao on 12/23/23.
//

import SwiftUI

struct LinkViewCard: View {
    var body: some View {
            VStack{
                HStack(){
                    Image("Ins")
                    Text("@Auther_1")
                    Spacer()
                }
                
                Image("LinkCardPlaceHolder")
                    .resizable()
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
    LinkViewCard()
}
