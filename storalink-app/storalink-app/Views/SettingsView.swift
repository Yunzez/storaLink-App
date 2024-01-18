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
    
    let fileManager = LocalFileManager.manager
    func updateImage() {
        if let user = appViewModel.user,
           let path = user.avatorPath,
           let image = fileManager.getImage(path: path) {
            uiImage = image
        } else {
            uiImage = UIImage(resource: .defaultAvator) // Replace with your actual placeholder
        }
    }
    
    func saveSelectedImage(image: UIImage) {
        let filePath = fileManager.saveImage(image: image)
        appViewModel.user?.avatorPath = filePath
    }
    
    //    @Bindable var appView = appleViewModel
    var body: some View {
        NavigationView {
            ScrollView{
                VStack {
                    
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
                                    uiImage = image
                                    saveSelectedImage(image: image)
                                }
                            }
                        }
                    }
                    
                    
                    VStack{
                        
                        Section(
                            header:
                                HStack{
                                    Text("Application")
                                        .fontWeight(.semibold)
                                        .padding(.top, 20)
                                    Spacer()
                                }
                        ) {
                            NavigationLink(destination: UserInfoSettingView()) {
                                UserSettingTab(iconName: "person", title: "Account")
                            }
                            //                            UserSettingTab(iconName: "paintbrush", title: "Appearance")
                            //                            UserSettingTab(iconName: "bell", title: "Notification")
//                            NavigationLink {
//                                ChangePlanView()
//                            } label: {
//                                UserSettingTab(iconName: "cart", title: "Change Plan")
//                            }
                            
                            
                        }
                        
                        Section(
                            header:
                                HStack{
                                    Text("Important")
                                        .fontWeight(.semibold)
                                        .padding(.top, 20)
                                    Spacer()
                                }
                        ) {
                            NavigationLink {
                                PrivacyView()
                            } label: {UserSettingTab(iconName: "lock", title: "Privacy")}
                            //                            UserSettingTab(iconName: "questionmark.circle", title: "Help & Support")
//                            UserSettingTab(iconName: "ellipsis.message", title: "Give Feedback")
                            
                        }
                        
                        //                        Section(header:
                        //                                    HStack{
                        //                                        Text("Other")
                        //                                            .fontWeight(.semibold)
                        //                                            .padding(.top, 20)
                        //                                        Spacer()
                        //                                    }
                        //                        ) {
                        //                            UserSettingTab(iconName: "paintbrush", title: "Other")
                        //                            UserSettingTab(iconName: "storefront", title: "Rate us")
                        //                        }
                        
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
                    }.padding(.horizontal)
                }
                
                // Tab bar here...
            }.background(Color("ThemeWhite"))
        }.padding(.bottom, Spacing.customNavigationBarHeight)
    }
}

#Preview {
    SettingsView().environment(AppViewModel())
}
