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
    @State var viewModel = SignupViewModel()
    
    @FocusState var isEmailInputActive: Bool
    @FocusState var isPasswordInputActive: Bool
    @FocusState var isNameInputActive: Bool
    @FocusState var isRePasswordInputActice: Bool
    
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
            
            TextField("Name", text: $viewModel.name)
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
            
            TextField("Email", text: $viewModel.email)
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
            SecureField("Password", text: $viewModel.password)
                .padding(.horizontal)
                .padding(.vertical, 12) // Increase vertical padding
                .focused($isPasswordInputActive)
                .overlay(
                    RoundedRectangle(cornerRadius: 10)
                        .stroke(isPasswordInputActive ? Color("ThemeColor") : Color.gray, lineWidth: 1)
                )
                .padding(.horizontal)
                .animation(.easeInOut, value: isPasswordInputActive)
            
            // Password field
            HStack{
                Text("Confirm Your Password")
                Spacer()
            }.padding([.top, .horizontal])
            SecureField("Password", text: $viewModel.repassword)
                .padding(.horizontal)
                .padding(.vertical, 12) // Increase vertical padding
                .focused($isRePasswordInputActice)
                .overlay(
                    RoundedRectangle(cornerRadius: 10)
                        .stroke(isRePasswordInputActice ? Color("ThemeColor") : Color.gray, lineWidth: 1)
                )
                .padding(.horizontal)
                .animation(.easeInOut, value: isRePasswordInputActice)
            
            if viewModel.error {
                Text(viewModel.errorMessage)
                        .foregroundColor(Color("Warning")) // Optional: Set the text color to red for visibility
                }
            
            
            // Remember me checkbox
            HStack(spacing: 8) {
                
                Toggle(isOn: $viewModel.rememberMe){}.labelsHidden()
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
