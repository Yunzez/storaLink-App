//
//  UserInfoSettingView.swift
//  storalink-app
//
//  Created by Yunze Zhao on 12/19/23.
//

import SwiftUI

struct UserInfoSettingView: View {
    var body: some View {
        VStack{
            UserSettingOptionBar(text: "Profile Image")
            UserSettingOptionBar(text: "Display name")
            UserSettingOptionBar(text: "Email")
            UserSettingOptionBar(text: "Test")
            
            Button(action: {
                print("Don't press me")
            }, label: {
                Text("Delete Account").foregroundColor(Color("Warning"))
            }).padding().background(Color("LightWarning")).overlay(RoundedRectangle(cornerRadius: Spacing.small)
                .stroke(Color("Warning"), lineWidth: 2)).padding(.horizontal)
          
        }
    }
}

struct UserSettingOptionBar: View {
    var text: String;
    init(text: String) {
        self.text = text
    }
    
    var body: some View{
        Button(action: {
            print("enter a view")
        }, label: {
            
            HStack{
                Text(text).foregroundColor(/*@START_MENU_TOKEN@*/.blue/*@END_MENU_TOKEN@*/)
                Spacer()
                Image("Pencil")
            }.padding()
                .cornerRadius(Spacing.small)
                .overlay(RoundedRectangle(cornerRadius: Spacing.small)
                .stroke(Color("Gray"), lineWidth: 1))
                .padding(.horizontal)
        })
       
        
       
    }
}

#Preview {
    UserInfoSettingView()
}
