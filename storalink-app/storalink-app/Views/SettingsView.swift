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
    @Environment(\.modelContext) private var modelContext: ModelContext
    @State var photoPickerItem: PhotosPickerItem?
    @State var uiImage: UIImage?
    @State var sheet: Bool = false
    
    @Query var folders: [Folder] = []
    @Query var links: [Link] = []
    private let userActor = UserActor.actor
    
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
        
        uploadImageToS3(image: image) { result in
            switch(result){
            case .success(let remotePath):
                appViewModel.user?.avatorPathRemote = remotePath
                print("uploaded to s3")
                if let remotePath = appViewModel.user?.avatorPathRemote {
                    downloadImage(from: remotePath) { downloadedImage in
                        if let image = downloadedImage {
                            let filePath = fileManager.saveImage(image: image)
                            appViewModel.user?.avatorPath = filePath
                        }
                    }
                }
            case .failure:
                let filePath = fileManager.saveImage(image: image)
                appViewModel.user?.avatorPath = filePath
                print("failed to upload to s3, save to local")
            }
        }
        Task{
            if let user = appViewModel.user {
                await userActor.updateUser(user: user) { result in
                    switch(result) {
                    case .success(_):
                        print("update user")
                    case .failure:
                        print("fail to update user")
                    }
                }
            }
        }
    }
    
    //    @Bindable var appView = appleViewModel
    var body: some View {
        NavigationView {
            ScrollView{
                VStack {
                    
                    VStack{
//                        HStack{
//                            Spacer()
//                            PhotosPicker(selection: $photoPickerItem, matching: .images) {
//                                Image(uiImage: uiImage ?? UIImage(resource: .defaultAvator))
//                                    .resizable()
//                                    .aspectRatio(contentMode: .fill)
//                                    .frame(width: 120, height: 120)
//                                    .cornerRadius(60.0)
//                                    .clipped()
//                                    .padding()
//                                
//                            }
//                            
//                            Spacer()
//                        }
//                        Text(appViewModel.userName ?? "Nil").font(/*@START_MENU_TOKEN@*/.title/*@END_MENU_TOKEN@*/)
                        
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
                            NavigationLink(destination: {
                                SyncDataView()
                            }) {
                                UserSettingTab(iconName: "cloud", title: "Sync Data")
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
                        Button(action: {
                            // this will need to be its own page
                            print("delete all data")
                            links.forEach { link in
                                modelContext.delete(link)
                            }
                            folders.forEach{ folder in
                                modelContext.delete(folder)
                            }
                            
                            print("all done")
                        }, label: {
                            UserSettingTab(iconName: "trash", title: "Clear my data")
                        })

                                                   
                        //                            UserSettingTab(iconName: "storefront", title: "Rate us")
                        //                        }
                        if appViewModel.userId != nil {
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
