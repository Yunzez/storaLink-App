//
//  LoginView.swift
//  storalink-app
//
//  Created by Yunze Zhao on 11/26/23.
//

import SwiftUI
import SwiftData
struct LoginView: View {
    @Query var user: [User]
    @Environment(\.modelContext) var modelContext
    @Environment(AppViewModel.self) private var appViewModel : AppViewModel
//    @ObservedObject var userViewModel: UserViewModel
    @Bindable var loginViewModel: LoginViewModel
    
    // swift always initalize stateObject first, so we cannot direcly assign the ObservedObject into the LoginViewModel
    init() {
        
        loginViewModel = LoginViewModel()
    }
    
    @FocusState private var isEmailInputActive: Bool
    @FocusState private var isPasswordInputActive: Bool
    var body: some View {
        NavigationView {
            if loginViewModel.isLoading {
                VStack {
                    Spacer()
                    ProgressView(value: Double(loginViewModel.loadingProgress), total: 100)
                        .progressViewStyle(LinearProgressViewStyle())
                        .scaleEffect(x: 1, y: 4, anchor: .center)
                        .padding()
                        .background(Color.gray.opacity(0.1)) // You can choose a suitable background color
                        .cornerRadius(Spacing.medium) // Apply corner radius here
                        .padding()
                    Text("\(loginViewModel.loadingProgress)%")
                    Spacer()
                }
            } else {
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
                    TextField("Email", text:  $loginViewModel.email)
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
                    SecureField("Password", text: $loginViewModel.password)
                        .padding(.horizontal)
                        .padding(.vertical, 12) // Increase vertical padding
                        .focused($isPasswordInputActive)
                        .overlay(
                            RoundedRectangle(cornerRadius: 10)
                                .stroke(isPasswordInputActive ? Color("ThemeColor") : Color.gray, lineWidth: 1)
                        )
                        .padding(.horizontal)
                        .animation(.easeInOut, value: isPasswordInputActive)
                    
                    if loginViewModel.error {
                        Text(loginViewModel.errorMessage)
                                .foregroundColor(Color("Warning")) // Optional: Set the text color to red for visibility
                        }
                    // Remember me checkbox
                    HStack(spacing: 8) {
                        
                        Toggle(isOn: $loginViewModel.rememberMe){}.labelsHidden()
                        .toggleStyle(SwitchToggleStyle(tint: Color("ThemeColor")))
                        .padding(.trailing, 3)// Customize the toggle color
                        Text("Remember Me")
                        Spacer()
                    }
                    .padding() // Add padding if necessary
                    
                    // Sign in button
                    Button(action: {
                        
                        loginViewModel.handleLogin()
                    }) {
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
                    Button(action: {
                        loginViewModel.handleLogin()
                    }) {
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
                        NavigationLink(destination: SignupView()) {
                            Text("Sign Up")
                                .fontWeight(.semibold)
                        }
                    }
                    
                    Button(action: {
                        withAnimation{
                            appViewModel.resetFirstLaunch()
                        }
                    }, label: {
                        Text("Show tutorial")
                    })
                    .padding()
                    
                    Spacer()
                }
                .padding()
            }
        }.onAppear {
            loginViewModel.setup(modelContext: modelContext, appViewModel: appViewModel)
          }
    }
    
    
  
}



#Preview {
    LoginView().modelContainer(PreviewContainer).environment(AppViewModel())
}
