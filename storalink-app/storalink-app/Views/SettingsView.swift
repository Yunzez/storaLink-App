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
    @State var showDeleteAlert: Bool = false
    @State var deletedDoneAlert:Bool = false
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
    
    //    @Bindable var appView = appleViewModel
    var body: some View {
        NavigationView {
            ScrollView{
                VStack {
                    
                    VStack{
                        
                    }.onAppear {
                        updateImage()
                    }
                    
                    
                    VStack{
                        
//                        Section(
//                            header:
//                                HStack{
//                                    Text("Application")
//                                        .fontWeight(.semibold)
//                                        .padding(.top, 20)
//                                    Spacer()
//                                }
//                        ) {
//                            NavigationLink(destination: UserInfoSettingView()) {
//                                UserSettingTab(iconName: "person", title: "Account")
//                            }
//                            NavigationLink(destination: {
//                                SyncDataView()
//                            }) {
//                                UserSettingTab(iconName: "cloud", title: "Sync Data")
//                            }
//                            
//                        }
                        
                        Section(
                            header:
                                HStack{
                                    Text("Data & Privacy")
                                        .fontWeight(.semibold)
                                        .padding(.top, 20)
                                    Spacer()
                                }
                        ) {
                            NavigationLink {
                                PrivacyView()
                            } label: {UserSettingTab(iconName: "lock", title: "Privacy")}.foregroundColor(Color.themeBlack)
                        }
                        Button(action: {
                            
                            // this will need to be its own page
                            showDeleteAlert = true
                            print("show delete alert")
                        }, label: {
                            UserSettingTab(iconName: "trash.fill", title: "Clear my data")
                        })
                        
                        .alert(isPresented: $showDeleteAlert) {
                            Alert(
                                title: Text("Are you sure?"),
                                message: Text("This will permanently delete all the folder and its contents."),
                                primaryButton: .destructive(Text("Delete")) {
                                    print("delete all data")
                                    Task {
                                        links.forEach { link in
                                            modelContext.delete(link)
                                        }
                                        folders.forEach{ folder in
                                            modelContext.delete(folder)
                                        }
                                        try? modelContext.save()
                                        showDeleteAlert = false
                                        deletedDoneAlert = true
                                    }
                                },
                                secondaryButton: .cancel()
                            )
                            
                        }
                       .sheet(isPresented: $deletedDoneAlert) {
                           DeletionConfirmationView(deletedDoneAlert: $deletedDoneAlert)
                    }

                    }.padding(.horizontal)
                }
                
                // Tab bar here...
            }.background(Color.themeWhite)
        }
    }
}


struct DeletionConfirmationView: View {
    @Binding var deletedDoneAlert: Bool  // Changed from @State to @Binding

    var body: some View {
        VStack(spacing: 20) {
            Text("Data Deleted")
                .font(.title)
                .fontWeight(.bold)
            Text("Your data has been permanently deleted.")
                .font(.body)
            Button("OK") {
                deletedDoneAlert = false  // This will dismiss the sheet
            }
            .padding()
            .background(Color.theme)  // Replace `.theme` with `.blue` or your custom color
            .foregroundColor(.white)
            .cornerRadius(10)
        }
        .padding()
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(Color.white)
        .edgesIgnoringSafeArea(.all)
    }
}

#Preview {
    SettingsView().environment(AppViewModel())
}
