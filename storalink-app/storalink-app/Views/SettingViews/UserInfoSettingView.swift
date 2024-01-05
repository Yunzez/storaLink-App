//
//  UserInfoSettingView.swift
//  storalink-app
//
//  Created by Yunze Zhao on 12/19/23.
//

import SwiftUI

struct UserInfoSettingView: View {
    
    @Environment(AppViewModel.self) private var appViewModel
    @State var showImageSheet: Bool = false
    var body: some View {
            VStack{
                UserSettingOptionBar(text: "Profile Image") {
                    print("test")
                    showImageSheet = true
                }.sheet(isPresented: $showImageSheet, content: {
                    VStack(content: {
                        /*@START_MENU_TOKEN@*/Text("Placeholder")/*@END_MENU_TOKEN@*/
                        
                    }).presentationDetents([.height(500)])
                })
                UserSettingOptionBar(text: "Display name: \(appViewModel.userName ?? "Error")"){
                    print("test")
                }
                UserSettingOptionBar(text: "Email"){
                    print("test")
                }
                UserSettingOptionBar(text: "Test"){
                    print("test")
                }
                
                NavigationLink {
                    DeleteAccountView()
                } label: {
                    Text("Delete Account").foregroundColor(Color("Warning"))
                }.padding().background(Color("LightWarning")).overlay(RoundedRectangle(cornerRadius: Spacing.small)
                    .stroke(Color("Warning"), lineWidth: 2)).padding(.horizontal)
                
            }
        }
}

struct UserSettingOptionBar: View {
    var text: String;
    var onClick: () -> Void
    init(text: String, onClick: @escaping () -> Void) {
        self.text = text
        self.onClick =  onClick
    }
    
    var body: some View{
        Button(action: {
            onClick()
        }, label: {
            
            HStack{
                Text(text).foregroundColor(Color("ThemeColor"))
                Spacer()
                Image("Pencil")
            }.padding()
                .cornerRadius(Spacing.small)
                .overlay(RoundedRectangle(cornerRadius: Spacing.small)
                .stroke(Color("ThemeGray"), lineWidth: 1))
                .padding(.horizontal)
            
        })
       
        
       
    }
}

#Preview {
    do {
        var testModel = AppViewModel(userName: "Harry", userEmail: "hyao@uw.edu" )
        return UserInfoSettingView().environment(testModel)
    } catch {
        print("fail at rendering preview")
    }
    
}
