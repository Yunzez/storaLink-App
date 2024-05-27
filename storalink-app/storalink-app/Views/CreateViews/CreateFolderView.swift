//
//  CreateFolderView.swift
//  storalink-app
//
//  Created by Yunze Zhao on 12/25/23.
//

import SwiftUI
import SwiftData
import PhotosUI
struct CreateFolderView: View {
    @Environment(AppViewModel.self) var appViewModel: AppViewModel
    @Environment(\.presentationMode) var presentationMode: Binding<PresentationMode>
    @Environment(\.modelContext) var modelContext
    @Environment(NavigationStateManager.self) var navigationStateManager: NavigationStateManager
    @State private var viewModel = CreateFolderViewModel()
    @State var photoPickerItem: PhotosPickerItem?
    @State var uiImage: UIImage?
    
    
    init(editFolder: Folder? = nil ) {
        if let folder = editFolder {
            print("editing folder, init")
            viewModel.updateInfoForEditFolder(folder: folder)
        }
    }
    var body: some View {
        ZStack {
            VStack {
                HStack {
                    Button(action: {
                        self.presentationMode.wrappedValue.dismiss()
                    }, label: {
                        Image(systemName: "arrow.uturn.backward")
                            .foregroundColor(Color("ThemeBlack"))
                            .imageScale(.large)
                            .padding(Spacing.medium)
                    })
                    .background(Color("SubtleTheme").opacity(0.8))
                    .cornerRadius(Spacing.medium)
                    Spacer()
                    
                    Image("Folder").resizable().frame(width: 25, height: 25 )
                    if viewModel.isEditFolder {
                        Text("Edit Folder")
                    } else {
                        Text("New Folder")
                    }
                }
                .padding(.horizontal)
                ScrollView {
                    VStack(alignment: .leading) {
                        if viewModel.error {
                            Text(viewModel.errorMessage).foregroundColor(Color("Warning"))
                                .padding()
                                .background(Color("LightWarning"))
                                .overlay(RoundedRectangle(cornerRadius: Spacing.small) // Match this radius with the cornerRadius value above
                                    .stroke(Color("Warning"), lineWidth: 2)).padding(.horizontal)
                        }
                        Text("Select A Cover")
                            .font(.headline)
                            .padding(.top)
                            .padding(.horizontal)
                        
                        ScrollView(.horizontal, showsIndicators: true) {
                            HStack {
                                VStack {
                                    if let image = viewModel.image {
                                        PhotosPicker(selection: $photoPickerItem, matching: .images) {
                                            Image(uiImage: image)
                                                .resizable()
                                                .scaledToFill()
                                                .foregroundColor(Color.themeBlack)
                                                .frame(width: 80, height: 80)
                                                .clipShape(Circle())
                                                .overlay(Circle().stroke(Color("ThemeColor"), lineWidth: viewModel.selectedCoverIndex == -1 ? 3 : 0))
                                        }
                                        
                                    } else {
                                        PhotosPicker(selection: $photoPickerItem, matching: .images) {
                                            Image(systemName: "plus.circle")
                                                .resizable()
                                                .padding()
                                                .scaledToFit()
                                                .frame(width: 80, height: 80)
                                                .foregroundColor(Color.themeBlack) // Apply the color here
                                                .clipShape(Circle())
                                                .overlay(Circle().stroke(Color("ThemeColor"), lineWidth: viewModel.selectedCoverIndex == -1 ? 3 : 0))
                                        }.foregroundColor(Color.themeBlack)
                                    }
                                }.onChange(of: photoPickerItem) { _, _ in
                                    viewModel.selectedCoverIndex = -1
                                    print("Test", viewModel.selectedCoverIndex)
                                    Task {
                                        if let photoPickerItem,
                                           let data = try await photoPickerItem.loadTransferable(type: Data.self) {
                                            if let image = UIImage(data: data) {
                                                viewModel.image = image
                                                viewModel.selectedCoverIndex = -1
                                            }
                                        }
                                        
                                        
                                    }
                                }.onTapGesture {
                                    print("tap")
                                }
                                .padding(.leading, 4)
                                .foregroundColor(Color.themeBlack)
                                
                                ForEach(0..<9, id: \.self) { index in
                                    Image("folderAsset\(index)") // Corrected line
                                        .resizable()
                                        .scaledToFill()
                                        .frame(width: 80, height: 80)
                                        .clipShape(Circle())
                                        .overlay(Circle().stroke(Color("ThemeColor"), lineWidth: viewModel.selectedCoverIndex == index ? 3 : 0))
                                        .onTapGesture {
                                            viewModel.selectedCoverIndex = index
                                        }
                                        .padding(4)
                                }
                            }.padding(.vertical)
                        }
                        .frame(height: 100)
                        
                        // Cover selection will go here
                        Text("Folder Name").padding(.horizontal)
                        StandardTextField( placeholder:"Your most creative name", text: $viewModel.folderName).padding([.bottom, .horizontal])
                        
                        HStack {
                            Text("Description")
                            Text("(Optional)").fontWeight(.light).foregroundColor(Color.gray)
                        }
                        .padding(.horizontal)
                        
                        
                        ZStack(alignment: .topLeading) {
                            if viewModel.folderDescription == "" {
                                Text("What’s this folder about?")
                                    .foregroundColor(.gray)
                                    .padding([.horizontal], 16)
                                    .padding(10).zIndex(2.0)
                            }
                            
                            TextEditor(text: $viewModel.folderDescription)
                                .padding(4) // This padding is for inside the TextEditor, between the text and the border
                                .frame(minHeight: 100)
                                .background(Color.white) // Set the background color to white or any other color as needed
                                .cornerRadius(10) // Set the corner radius as needed
                                .overlay(
                                    RoundedRectangle(cornerRadius: 10) // Match this radius with the cornerRadius value above
                                        .stroke(Color(UIColor.separator), lineWidth: 1)
                                )
                                .padding([.bottom, .horizontal])
                        }
                        
                        //                        HStack{
                        //                            Text("Share")
                        //                            Text("(Optional)").fontWeight(.light).foregroundColor(Color("ThemeGray"))
                        //                        }.padding(.horizontal)
                        //                        StandardTextField( placeholder:"search other user", text: $viewModel.searchUser).padding([.bottom, .horizontal])
                        
                    }
                    
                    Button(action: {
                        // Action for folder creation
                        navigationStateManager.lastNavigationSource = .toMainStack
                        
                        if  viewModel.isEditFolder {
                            print("update folder")
                            if let editFolder = viewModel.initialFolder {
                                print("calling viewModel")
                                viewModel.updateFolder(folder: editFolder)
                                DispatchQueue.main.asyncAfter(deadline: .now() + 0.5){
                                    self.presentationMode.wrappedValue.dismiss()
                                }
                                
                            }
                        } else {
                            viewModel.createFolder()
                        }
                        
                    }) {
                        Text(viewModel.isEditFolder ? "Update folder" : "Create Folder")
                            .frame(minWidth: 0, maxWidth: .infinity)
                            .frame(height: 50)
                            .foregroundColor(.white)
                            .background(Color.orange)
                            .cornerRadius(25)
                            .padding([.leading, .bottom, .trailing])
                    }
                    
                    
                }
            }.onAppear{
                viewModel.setup(modelContext: modelContext, navigationStateManager: navigationStateManager)
            }.disabled(viewModel.loadingStage != .none  )
            
            
            
            if viewModel.loadingStage != .none {
                
                VStack {
                    if viewModel.loadingStage == .loading {
                        ProgressView()
                            .progressViewStyle(CircularProgressViewStyle(tint: Color("ThemeColor")))
                            .scaleEffect(1.5)
                            .padding(.bottom)
                        Text("Loading..")
                            .foregroundColor(Color("ThemeColor"))
                    } else if viewModel.loadingStage == .done {
                        Image(systemName: "checkmark.circle.fill")
                            .resizable()
                            .scaledToFit()
                            .frame(width: 30, height: 30) // Adjust size as needed
                            .foregroundColor(Color("ThemeColor")) // Or any other color you prefer
                            .padding(.bottom)
                        Text("Done!")
                            .foregroundColor(Color("ThemeColor"))
                        Text("Taking you to the folder")
                            .foregroundColor(Color("ThemeColor"))
                    }
                    
                }
                .frame(width: 250, height: 250)
                .padding(20)
                .background(Color("SubtleTheme").opacity(1))
                .cornerRadius(15)
                .shadow(radius: 50)
                .navigationDestination(
                    isPresented: $viewModel.readyToNavigate
                ) {
                    FolderView()
                }
            }
        }.navigationBarBackButtonHidden(true)
            .background(Color.themeWhite.edgesIgnoringSafeArea(.all))
    }
}

struct CreateFolderView_Previews: PreviewProvider {
    static var previews: some View {
        CreateFolderView().modelContainer(PreviewContainer).environment(AppViewModel()).environment(NavigationStateManager())
    }
}
