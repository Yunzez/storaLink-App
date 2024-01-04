//
//  CreateFolderViewModel.swift
//  storalink-app
//
//  Created by Yunze Zhao on 12/25/23.
//

import Foundation
import Combine
import SwiftData

enum LoadingStage {
    case none, loading, done
}

@Observable class CreateFolderViewModel: ObservableObject {
    var context: ModelContext?
    // Published properties that the view can subscribe to
     var folderName: String = ""
     var folderDescription: String = "This is a folder description"
     var searchUser: String = ""
     var selectedCoverIndex: Int = -1
     var error: Bool = false
     var errorMessage: String = ""
    var loadingStage: LoadingStage = .none
    var navigateToFolder: Folder?
    var readyToNavigate: Bool = false
    var navigationStateManager: NavigationStateManager?

    // Other properties for business logic
    private var cancellables = Set<AnyCancellable>()

    // Business logic functions
    func createFolder() {
        
        loadingStage = .loading
        // Implement folder creation logic here
        print("Creating folder with name: \(folderName) and description: \(folderDescription)")
        if !validateFolderName() {
            error = true
            errorMessage = "Please input a folder name"
        } else if selectedCoverIndex == -1{
            error = true
            errorMessage = "Please choose a folder cover"
        } else {
            error = false
            errorMessage = ""
        }
        // For example, save the folder information to a database or send it to a server
        let imgUrl = "folderAsset\(selectedCoverIndex)"
        
        if let context = context {
            print("imgurl: ", imgUrl)
            let newFolder = Folder(title: folderName, imgUrl: imgUrl, links: [])
            context.insert(newFolder)
            
            do {
                try context.save()
                print("change saved")
                navigationStateManager?.focusFolder = newFolder
                let folders = try context.fetch(FetchDescriptor<Folder>())
                print("now have folder:")
                for folder in folders {
                    print(folder.title)
                }
                
                loadingStage = .done
                
                DispatchQueue.main.asyncAfter(deadline: .now() + 1) {
                    
                    self.readyToNavigate = true
                }
            } catch {
                
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
