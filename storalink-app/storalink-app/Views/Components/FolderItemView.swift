//
//  FolderItemView.swift
//  storalink-app
//
//  Created by Yunze Zhao on 11/27/23.
//

import SwiftUI
import SwiftData




struct FolderItemView: View {
    let localFileManager = LocalFileManager.manager
    let modelUtils = ModelUtilManager.manager
    let folderManager = FolderManager.manager
    @Environment(NavigationStateManager.self) var navigationStateManager: NavigationStateManager
    var currentFolderWrapper: FolderModelWrapper
    @State var currentFolder: Folder
    @Environment(\.modelContext) var modelContext
    @State var folderItemViewModel = FolderItemViewModel()
    @State private var showingDeletionAlert = false
    init(folder: Folder) {
        self.currentFolderWrapper = FolderModelWrapper(folder: folder)
        self.currentFolder = folder
    }
    
//    private func setUp() {
//        self.currentFolder = currentFolderWrapper.getFolder()
//    }
    var body: some View {
        VStack(alignment: .leading) {
            ZStack(alignment: .topTrailing) {
                // Image view
                if let uiImage = localFileManager.getImage(path: currentFolder.imgUrl) {
                    Image(uiImage: uiImage)
                        .resizable()
                        .scaledToFill()
                        .frame(width: 160, height: 135)
                        .cornerRadius(Spacing.small)
//                        .padding(.bottom, -Spacing.small)
                } else {
                    Image(currentFolder.imgUrl.isEmpty ? "Xiaochuan" : currentFolder.imgUrl)
                        .resizable()
                        .scaledToFill()
                        .frame(width: 160, height: 135)
                }
                
                // Heart icon button
                Button(action: {
                    withAnimation {
                        currentFolder.pinned.toggle()
                    }
                }) {
                    Image(systemName: currentFolder.pinned ? "heart.fill" : "heart")
                        .foregroundColor(Color("ThemeColor"))
                        .padding(10)
                        .background(Color.white)
                        .clipShape(Circle())
                }
//                .padding([.top], Spacing.small)
            }
            .frame(width: 160, height: 135)
            .clipped() // Apply clipping here, outside the ZStack
            
            HStack {
                Text(currentFolder.title)
                    .lineLimit(2)
                    .font(.headline)
                    .foregroundColor(Color("ThemeBlack"))
                    .fixedSize(horizontal: false, vertical: true)
                Spacer()
                Button {
                    print("test")
                    folderItemViewModel.showDetailSheet = true
                } label: {
                    Image(systemName: "ellipsis")
                }.foregroundColor(.gray)
                    .sheet(isPresented: $folderItemViewModel.showDetailSheet, content: {
                        VStack{
                            Spacer()
                            if currentFolder.pinned {
                                BottomSheetOption(onClick: {
                                    currentFolder.pinned = false
                                }, text: "Unpin", assetImageString: "Folder")
                            } else {
                                BottomSheetOption(onClick: {
                                    currentFolder.pinned = true
                                }, text: "Pin", assetImageString: "Folder")
                            }
                            
                            Spacer()
                            BottomSheetOption(onClick: {
                                print("Edit")
                                folderItemViewModel.showDetailSheet = false
                                // add a delay to wait for the sheet to be closed
                                DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) {
                                    folderItemViewModel.showEditSheet = true
                                }
                            }, text: "Edit",  assetImageString: "Pencil")
                            Spacer()
                            BottomSheetOption(onClick: {
                                DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) {
                                    showingDeletionAlert = true
                                }
                                
                                print("show delete alert")
                            }, text: "Delete", assetImageString: "Trash")
                            .alert(isPresented: $showingDeletionAlert) {
                                Alert(
                                    title: Text("Are you sure?"),
                                    message: Text("This will permanently delete the folder and its contents."),
                                    primaryButton: .destructive(Text("Delete")) {
                                        // Perform the deletion
                                        Task{
//                                            await folderManager.deleteFolder(folder: currentFolder) { result in
//                                                switch result {
//                                                case .success:
//                                                    print("success")
//                                                    modelUtils.deleteFolder(modelContext: modelContext, folder: currentFolder)
//                                                case .failure(let error):
//                                                    print("some error occured", error)
//                                                }
//                                            }
                                            
                                            modelUtils.deleteFolder(modelContext: modelContext, folder: currentFolder)
                                        }
                                       
                                        folderItemViewModel.showDetailSheet = false
                                    },
                                    secondaryButton: .cancel()
                                )
                            }
                            
                            Spacer()
                        }.presentationDetents([.height(300)])
                    }).sheet(isPresented: $folderItemViewModel.showEditSheet, content: {
                        CreateFolderView(editFolder: currentFolder)
                    })
            }
            .padding([.leading, .trailing], Spacing.small)
            .frame(height: 25)
            
            HStack(spacing: 0) {
                Image(systemName: "link").foregroundColor(.gray)
                Text("\(currentFolder.getLinkNum())")
                    .font(.subheadline)
                    .foregroundColor(.gray)
                    .padding([.leading], 2)
            }
            .padding([.leading, .trailing], Spacing.small)
            .frame(height: 20)
            
        }
        .frame(width: 160, height: 200) // Adjust size as needed
        .background(Color("SubtleTheme")) // Use actual card background color
        .clipShape(RoundedRectangle(cornerSize: CGSize(width: 4, height: 4)))
        .shadow(radius: 5)
        .onTapGesture(perform: {
            print("Folder tapped")
            navigationStateManager.navigationPath.append(NavigationItem.folderView)
            navigationStateManager.focusFolder = currentFolder
        })
        .onAppear{
            print("current folder links num: \(currentFolder.links.count)")
        }
    }
}



// this is the add folder place holder
struct FolderItemAddView: View {
    @Environment(NavigationStateManager.self) var navigationStateManager: NavigationStateManager
    
    var body: some View {
        Button {
            print("go to button")
            navigationStateManager.navigationPath.append(NavigationItem.createFolderView)
        } label: {
            VStack{
                Spacer()
                Image(systemName: "plus.circle")
                    .resizable()
                    .frame(width: 30, height: 30)
                    .foregroundColor(.themeBlack)
                    .padding()
                
                Text("Add Folder").foregroundColor(.themeBlack)
                Spacer()
            }.frame(width: 160, height: 200)
                .background(Color("SubtleTheme")) // Use actual card background color
                .clipShape(RoundedRectangle(cornerSize: CGSize(width: 4, height: 4)))
                .shadow(radius: 5)
        }
    }
}

#Preview {
//    FolderItemView(folder: Folder(title: "Sun xiaochuan 28", imgUrl: "", links: [])).environment(NavigationStateManager())
    FolderItemAddView().environment(NavigationStateManager())
}
