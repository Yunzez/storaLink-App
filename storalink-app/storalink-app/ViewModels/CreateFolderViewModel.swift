//
//  CreateFolderViewModel.swift
//  storalink-app
//
//  Created by Yunze Zhao on 12/25/23.
//

import Foundation
import Combine
import SwiftData
import UIKit
enum LoadingStage {
    case none, loading, done
}

@Observable class CreateFolderViewModel: ObservableObject {
    let localFileManager = LocalFileManager.manager
    let folderManager = FolderManager.manager
    let modelUtil = ModelUtilManager.manager
    var context: ModelContext?
    // Published properties that the view can subscribe to
    var folderName: String = ""
    var folderDescription: String = ""
    var searchUser: String = ""
    var selectedCoverIndex: Int = 0
    var error: Bool = false
    var errorMessage: String = ""
    var loadingStage: LoadingStage = .none
    var navigateToFolder: Folder?
    var readyToNavigate: Bool = false
    var navigationStateManager: NavigationStateManager?
    
    var image: UIImage?
    
    var isEditFolder: Bool = false
    var initialFolder: Folder?
    // Other properties for business logic
    private var cancellables = Set<AnyCancellable>()
    
    func updateInfoForEditFolder(folder: Folder) {
        isEditFolder = true
        initialFolder = folder
        folderName = folder.title
        folderDescription = folder.desc ?? ""
        //        if let UIimage = localFileManager.getImage(path: folder.imgUrl) {
        //            image = UIimage
        //        }
    }
    
    func updateFolder(folder: Folder) {
        
        loadingStage = .loading
        folder.title = folderName
        folder.desc = folderDescription
        //        var imgUrl = ""
        //
        //        if selectedCoverIndex == -1, let selectedUIImage = self.image {
        //            imgUrl = localFileManager.saveImage(image: selectedUIImage)
        //        } else {
        //            imgUrl  = "folderAsset\(selectedCoverIndex)"
        //        }
        //        folder.imgUrl = imgUrl
        if let modelContext = context {
            print("calling folder manager")
                
            Task{
                await folderManager.updateFolder(folder: folder){ result in
                    DispatchQueue.main.async { // Ensure UI updates are performed on the main thread
                        switch result {
                        case .success(let updatedFolder):
                            folder.title = updatedFolder.title
                            folder.desc = updatedFolder.desc
                            print("get results: done")
                            // If you need to dismiss a view or update the UI, make sure it's here within the DispatchQueue.main.async block.
                            
                        case .failure(let error):
                            print("Failed to update folder: \(error)")
                        }
                    }
                }
            }
        }
        self.loadingStage = .done
        
        
    }
    
    
    func createFolder() {
        
        loadingStage = .loading
        // Implement folder creation logic here
        print("Creating folder with name: \(folderName) and description: \(folderDescription)")
        if !validateFolderName() {
            error = true
            errorMessage = "Please input a folder name"
            loadingStage = .none
            return
        } else {
            error = false
            errorMessage = ""
        }
        // For example, save the folder information to a database or send it to a server
        var imgUrl = ""
        if selectedCoverIndex == -1, let selectedUIImage = self.image {
            imgUrl = localFileManager.saveImage(image: selectedUIImage)
        } else {
            imgUrl  = "folderAsset\(selectedCoverIndex)"
        }
        
        if let context = context {
            print("imgurl: ", imgUrl)
            
            do {
                let newFolder = Folder(title: folderName, imgUrl: imgUrl, desc: folderDescription,  links: [])
                modelUtil.createFolder(modelContext: context, folder: newFolder)
                
//                
                
                if let navigateManager = navigationStateManager {
                    navigateManager.focusFolder = newFolder
                    
                    loadingStage = .done
                    
                    DispatchQueue.main.asyncAfter(deadline: .now() + 0.3) {
                        print("navigate")
                            navigateManager.navigateBackAndForth(to: .folderView)
                    }
                }
                
            }
             
        }
    }
    
    
    
    // More business logic functions as needed
    func validateFolderName() -> Bool {
        // Validation logic for folder name
        return !folderName.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
    }
    
    // Call this method when an image is selected
    func selectCover(at index: Int) {
        selectedCoverIndex = index
        // Handle the cover selection, e.g., update the UI or store the selected cover
    }
    
    // Initiate any necessary setup
    init() {
        setupSubscriptions()
    }
    
    func setup(modelContext: ModelContext, navigationStateManager: NavigationStateManager){
        self.context = modelContext
        self.navigationStateManager = navigationStateManager
    }
    
    private func setupSubscriptions() {
        // Set up Combine subscriptions if needed
    }
}
