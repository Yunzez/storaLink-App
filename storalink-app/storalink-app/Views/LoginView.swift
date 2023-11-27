//
//  LoginView.swift
//  storalink-app
//
//  Created by Yunze Zhao on 11/26/23.
//

import SwiftUI

struct LoginView: View {
    
    @ObservedObject var userViewModel: UserViewModel
    @State private var email: String = ""
    @State private var password: String = ""
    @State private var rememberMe: Bool = false
    @FocusState private var isEmailInputActive: Bool
    @FocusState private var isPasswordInputActive: Bool
    var body: some View {
        NavigationView {
            VStack {
                Spacer()
                
                // Logo can be replaced with your app's logo
                Image("Logo")
                    .resizable()
                    .aspectRatio(contentMode: .fit)
                    .frame(width: 60, height: 60)
                
                Text("Sign In")
                    .font(.title2)
                    .fontWeight(.semibold)
                
                // Email field
                TextField("Email", text: $email)
                    .autocapitalization(.none)
                    .keyboardType(.emailAddress)
                    .padding(.horizontal)
                    .padding(.vertical, 12) // Increase vertical padding
                    .focused($isEmailInputActive)
                    .overlay(
                        RoundedRectangle(cornerRadius: 10)
                            .stroke(isEmailInputActive ? Color("ThemeColor") : Color.gray, lineWidth: 1)
                    )
                    .padding(.horizontal)
                    .padding(.vertical)
                    .animation(.easeInOut, value: isEmailInputActive)
                
                // Password field
                SecureField("Password", text: $password)
                    .padding(.horizontal)
                    .padding(.vertical, 12) // Increase vertical padding
                    .focused($isPasswordInputActive)
                    .overlay(
                        RoundedRectangle(cornerRadius: 10)
                            .stroke(isPasswordInputActive ? Color("ThemeColor") : Color.gray, lineWidth: 1)
                    )
                    .padding(.horizontal)
                    .animation(.easeInOut, value: isPasswordInputActive)
                
                
                // Remember me checkbox
                HStack(spacing: 8) {
                    
                    Toggle(isOn: $rememberMe){}.labelsHidden()
                    .toggleStyle(SwitchToggleStyle(tint: Color("ThemeColor")))
                    .padding(.trailing, 3)// Customize the toggle color
                    Text("Remember Me")
                    Spacer()
                }
                .padding() // Add padding if necessary
                
                // Sign in button
                Button(action: handleLogin) {
                    Text("Sign In")
                        .fontWeight(/*@START_MENU_TOKEN@*/.bold/*@END_MENU_TOKEN@*/)
                        .foregroundColor(.white)
                        .frame(maxWidth: .infinity)
                        .padding()
                        .background(Color("ThemeColor"))
                        .cornerRadius(10)
                }
                .padding(.horizontal)
                
                // Google sign in button
                Button(action: handleLogin) {
                    HStack {
                        Image(systemName: "globe")
                        Text("Sign in with Google")
                    }
                    .foregroundColor(.black)
                    .frame(maxWidth: .infinity)
                    .padding()
                    .overlay(
                        RoundedRectangle(cornerRadius: 10)
                            .stroke(Color.gray, lineWidth: 1)
                    )
                }
                .padding()
                
                // Sign up navigation
                HStack {
                    Text("Don't have an account?")
                    NavigationLink(destination: SingupView()) {
                        Text("Sign Up")
                            .fontWeight(.semibold)
                    }
                }
                .padding()
                
                Spacer()
            }
            .padding()
        }
    }
    
    
    func handleLogin() -> Void {
        print("login ")
        userViewModel.isAuthenticated = true
    }
}

#Preview {
    LoginView(userViewModel: UserViewModel())
}
