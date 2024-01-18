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

    @State var displayName: String = ""
    @State var email: String = ""
    
    @State var showSaveChange: Bool = false
    @State var loading: Bool = false
    func saveChange() {
        loading = true
        DispatchQueue.main.asyncAfter(deadline: .now() + 1.0) {
            appViewModel.userName = displayName
            appViewModel.userEmail = email
            loading = false
            showSaveChange = false
        }
    }
    
    var body: some View {
            VStack{
                Spacer()
                UserSettingOptionBar(text: "Display name:", value: $displayName){
                    print("test")
                }.onChange(of: displayName) { _, _ in
                    withAnimation{
                        showSaveChange = false
                        if (displayName != appViewModel.userName) {
                            showSaveChange = true
                        }
                    }
                }
                
                UserSettingOptionBar(text: "Email:", value: $email ){
                    print("test")
                }
                .onChange(of: email) { _, _ in
                    withAnimation{
                        showSaveChange = false
                        if (email != appViewModel.userEmail) {
                            showSaveChange = true
                        }
                    }
                }
                
                if showSaveChange {
                    Button(action: {
                        print("saving")
                        saveChange()
                    }, label: {
                        Text("Save Change")
                    }).padding().background(Color("LightWarning")).overlay(RoundedRectangle(cornerRadius: Spacing.small)
                        .stroke(Color("ThemeColor"), lineWidth: 2)).padding(.horizontal)
                }
                
                if loading {
                    ProgressView()
                        .progressViewStyle(CircularProgressViewStyle(tint: Color.accentColor))
                          .scaleEffect(2.0)
                          .padding(.vertical)
                }
                
                Spacer()
                NavigationLink {
                    DeleteAccountView()
                } label: {
                    Text("Delete Account").foregroundColor(Color("Warning"))
                }.padding().background(Color("LightWarning")).overlay(RoundedRectangle(cornerRadius: Spacing.small)
                    .stroke(Color("Warning"), lineWidth: 2)).padding()
                
            }.onAppear{
                displayName = appViewModel.userName ?? "Error"
                email = appViewModel.userEmail ?? "Error"
            }
        }
}

struct UserSettingOptionBar: View {
    var text: String;
    @Binding var value: String
    var onClick: () -> Void
    init(text: String, value: Binding<String>, onClick: @escaping () -> Void) {
        self.text = text
        self.onClick =  onClick
        self._value = value
    }
    
    
    var body: some View{
     
            HStack{
                Text(text).foregroundColor(Color("ThemeBlack"))
                TextField("your input", text: $value).foregroundColor(Color("ThemeColor"))
                Spacer()
                Image("Pencil")
            }.padding()
                .cornerRadius(Spacing.small)
                .overlay(RoundedRectangle(cornerRadius: Spacing.small)
                .stroke(Color("ThemeGray"), lineWidth: 1))
                .padding(.horizontal)
       
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
