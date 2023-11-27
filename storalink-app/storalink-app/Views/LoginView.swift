//
//  LoginView.swift
//  storalink-app
//
//  Created by Yunze Zhao on 11/26/23.
//

import SwiftUI

struct LoginView: View {
    @ObservedObject var userViewModel: UserViewModel
    
    var body: some View {
        Text(/*@START_MENU_TOKEN@*/"Hello, World!"/*@END_MENU_TOKEN@*/)
        Button(action: {
            
            handleLogin()
        },
               label: {
            Text("Log in")
                .foregroundColor(.white)
                .fontWeight(/*@START_MENU_TOKEN@*/.bold/*@END_MENU_TOKEN@*/)
                .padding()
                .background(Color("ThemeColor"))
                .cornerRadius(Spacing.roundMd)
            
        })
    }
    
    func handleLogin() -> Void {
        print("login ")
        userViewModel.isAuthenticated = true
    }
}

#Preview {
    LoginView(userViewModel: UserViewModel())
}
