//
//  SettingsView.swift
//  storalink-app
//
//  Created by Yunze Zhao on 11/26/23.
//

import SwiftUI
import PhotosUI
import SwiftData
struct SettingsView: View {
    @Environment(AppViewModel.self) private var appViewModel
    @State var photoPickerItem: PhotosPickerItem?
    @State var uiImage: UIImage?
    func updateImage() {
            if let user = appViewModel.user,
               let data = user.avatorData,
               let image = UIImage(data: data) {
                uiImage = image
            } else {
                uiImage = UIImage(resource: .defaultAvator) // Replace with your actual placeholder
            }
        }
    
//    @Bindable var appView = appleViewModel
    var body: some View {
        NavigationView {
            VStack {
                // Profile section here...
                
                
                List {
                   
                    VStack{
                        HStack{
                            Spacer()
                            PhotosPicker(selection: $photoPickerItem, matching: .images) {
                                Image(uiImage: uiImage ?? UIImage(resource: .defaultAvator))
                                    .resizable()
                                    .aspectRatio(contentMode: .fill)
                                    .frame(width: 120, height: 120)
                                    .cornerRadius(60.0)
                                    .clipped()
                                    .padding()
                                    
                            }
                            
                            Spacer()
                        }
                        Text(appViewModel.userName ?? "Nil").font(/*@START_MENU_TOKEN@*/.title/*@END_MENU_TOKEN@*/)
                        
                    }.onAppear {
                        updateImage()
                    }.onChange(of: photoPickerItem) { _, _ in
                        print("select picture")
                        Task {
                            if let photoPickerItem,
                               let data = try await photoPickerItem.loadTransferable(type: Data.self) {
                                if let image = UIImage(data: data) {
                                    appViewModel.user?.avatorData = data
                                    print(image)
                                    
                                    uiImage = image
                                }
                            }
                        }
                    }
                   
                    
                    Section(header: Text("Application").fontWeight(/*@START_MENU_TOKEN@*/.bold/*@END_MENU_TOKEN@*/).padding(.top, -20)) {
                        NavigationLink(destination: UserInfoSettingView()) {
                            UserSettingTab(iconName: "person", title: "Account") {
                                // Navigate to Account page
                            }
                        }
                        UserSettingTab(iconName: "paintbrush", title: "Appearance") {
                            // Navigate to Appearance page
                        }
                        UserSettingTab(iconName: "bell", title: "Notification") {
                            // Navigate to Appearance page
                        }
                        UserSettingTab(iconName: "cart", title: "ChangePlan") {
                            // Navigate to Appearance page
                        }
                    }
                    
                    Section(header: Text("Important").fontWeight(/*@START_MENU_TOKEN@*/.bold/*@END_MENU_TOKEN@*/).padding(.top, -20)) {
                        UserSettingTab(iconName: "lock", title: "Privacy") {
                            // Navigate to Appearance page
                        }
                        UserSettingTab(iconName: "questionmark.circle", title: "Help & Support") {
                            // Navigate to Appearance page
                        }
                        UserSettingTab(iconName: "ellipsis.message", title: "Give Feedback") {
                            // Navigate to Appearance page
                        }
                        // ... important settings ...
                    }
                    
                    Section(header: Text("Other").fontWeight(/*@START_MENU_TOKEN@*/.bold/*@END_MENU_TOKEN@*/).padding(.top, -20)) {
                        UserSettingTab(iconName: "paintbrush", title: "Other") {
                            // Navigate to Appearance page
                        }
                        UserSettingTab(iconName: "storefront", title: "Rate us") {
                            // Navigate to Appearance page
                        }
                        // ... other settings ...
                    }
                    
                    HStack{
                        Spacer()
                        Button("Log Out") {
                            // Handle log out
                            appViewModel.logoutUser()
                            
                        }
                        .padding()
                        .padding(.horizontal)
                        .background(Color.gray) // Adjust color as needed
                        .cornerRadius(10)
                        .foregroundColor(.white) // Adjust text color as needed
                        .shadow(radius: 2)
                        
                        Spacer()
                    }
                    
                }.scrollContentBackground(.hidden)
                    .listStyle(GroupedListStyle())
                    .padding(.top, -30)
                    .background(Color("ThemeWhite"))
                
                // Tab bar here...
            }.background(Color("ThemeWhite"))
        }.padding(.bottom, Spacing.customNavigationBarHeight )
    }
}

#Preview {
    SettingsView().environment(AppViewModel())
}
