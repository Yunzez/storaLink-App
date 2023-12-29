//
//  SingupView.swift
//  storalink-app
//
//  Created by Yunze Zhao on 11/27/23.
//

import SwiftUI

struct SignupView: View {
    @Environment(\.modelContext) var modelContext
    @Environment(AppViewModel.self) private var appViewModel : AppViewModel
    @State var email: String = ""
    @FocusState var isEmailInputActive: Bool
    @State var password: String = ""
    @FocusState var isPasswordInputActive: Bool
    @State var error: Bool = false
    @State var errorMessage: String = ""
    @FocusState var isNameInputActive: Bool
    @State var name: String = ""
    @State var rememberMe: Bool = false
    
    
    var body: some View {
        VStack{
            // Email field
            Spacer()
            
            // Logo can be replaced with your app's logo
            Image("Logo")
                .resizable()
                .aspectRatio(contentMode: .fit)
                .frame(width: 60, height: 60)
            
            Text("Sign Up")
                .font(.title2)
                .fontWeight(.semibold)
            
            HStack{
                Text("Name")
                Spacer()
            }.padding([.top, .horizontal])
            
            TextField("Name", text: $name)
                .autocapitalization(.none)
                .keyboardType(.emailAddress)
                .padding(.horizontal)
                .padding(.vertical, 12) // Increase vertical padding
                .focused($isNameInputActive)
                .overlay(
                    RoundedRectangle(cornerRadius: 10)
                        .stroke(isNameInputActive ? Color("ThemeColor") : Color.gray, lineWidth: 1)
                )
                .padding([.horizontal])
                .animation(.easeInOut, value: isNameInputActive)
            
            HStack{
                Text("Email")
                Spacer()
            }.padding([.top, .horizontal])
            
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
                .animation(.easeInOut, value: isEmailInputActive)
            
            // Password field
            HStack{
                Text("Password")
                Spacer()
            }.padding([.top, .horizontal])
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
            
            if error {
                Text(errorMessage)
                        .foregroundColor(Color("Warning")) // Optional: Set the text color to red for visibility
                }
            
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
            Button(action: {
                print("Signup ")
            }) {
                Text("Sign Up")
                    .fontWeight(/*@START_MENU_TOKEN@*/.bold/*@END_MENU_TOKEN@*/)
                    .foregroundColor(.white)
                    .frame(maxWidth: .infinity)
                    .padding()
                    .background(Color("ThemeColor"))
                    .cornerRadius(10)
            }
            .padding(.horizontal)
            Spacer()
        }.padding(.bottom)
    }
}

#Preview {
    SignupView().modelContainer(PreviewContainer).environment(AppViewModel())
}
