//
//  DeleteAccountView.swift
//  storalink-app
//
//  Created by Yunze Zhao on 1/4/24.
//

import Foundation

import SwiftUI

struct DeleteAccountView: View {
    
    @Environment(\.presentationMode) var presentationMode: Binding<PresentationMode>
    
    @State private var showingPopup = false
    @State private var passwordInput = ""
    
    
    var body: some View {
        ZStack{
            VStack{
                Image("DeleteAccount")
                Text("Noo! We will Miss you!").font(/*@START_MENU_TOKEN@*/.title/*@END_MENU_TOKEN@*/).fontWeight(/*@START_MENU_TOKEN@*/.bold/*@END_MENU_TOKEN@*/)
                Text("Deleting your account will erase your data forever").font(.system(size: 15))
                Button(action: {
                    self.presentationMode.wrappedValue.dismiss()
                }, label: {
                    Text("Keep Account").bold()
                        .foregroundColor(Color.themeWhite)
                        .padding(Spacing.medium)
                })
                .frame(maxWidth: .infinity)
                .background(
                    Rectangle().stroke(Color.accentColor, lineWidth: 2).background(Color.accentColor)
                        .cornerRadius(Spacing.medium)
                )
                .padding(.top)
                
                Button(action: {
                    withAnimation {
                        self.showingPopup = true
                    }
                }, label: {
                    Text("Delete Account").bold()
                        .foregroundColor(Color.warning)
                        .padding(Spacing.medium - 2)
                })
                .frame(maxWidth: /*@START_MENU_TOKEN@*/.infinity/*@END_MENU_TOKEN@*/)
                .overlay(RoundedRectangle(cornerRadius: Spacing.medium).stroke(Color.warning, lineWidth: 2.0))
                .background(Rectangle().foregroundColor(Color.themeWhite).cornerRadius(Spacing.medium))
                .padding(.top)
                
                
            }.padding(Spacing.medium)
            
            
            if showingPopup {
                ZStack {
                    // Dimmed background covering the entire screen
                    Color.black.opacity(0.4).edgesIgnoringSafeArea(.all)
                    
                    // Popup content centered
                    VStack(spacing: 20) {
                        Text("Confirm Password")
                            .font(.title).bold()
                        Text("Input your in-app password to delete your Storalink account.")
                            .font(.callout)
                            .lineLimit(3) // Adjust based on expected content length
                            .fixedSize(horizontal: false, vertical: true) // Allows text to wrap within the available vertical space
                        SecureField("Password", text: $passwordInput)
                            .textFieldStyle(RoundedBorderTextFieldStyle())
                            .padding()
                        
                        Button("Confirm") {
                            // Handle password confirmation
                            withAnimation(.snappy()){
                                self.showingPopup = false
                            }
                        }
                        .padding()
                        .background(Color.accentColor)
                        .foregroundColor(.white)
                        .cornerRadius(10)
                    }
                    .padding()
                    .background(Color.white)
                    .cornerRadius(20)
                    .shadow(radius: 10)
                    .frame(width: .infinity, height: 200)
                    .padding(.horizontal)
                }
                .frame(maxWidth: .infinity, maxHeight: .infinity)
                .edgesIgnoringSafeArea(.all) // Ensure the overlay covers the entire screen, including the safe area
            }
        }
    }
}

#Preview {
    DeleteAccountView().modelContainer(PreviewContainer)
        .environment(NavigationStateManager())
        .environment(AppViewModel())
    
}
