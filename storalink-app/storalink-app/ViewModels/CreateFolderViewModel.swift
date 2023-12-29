//
//  CreateFolderViewModel.swift
//  storalink-app
//
//  Created by Yunze Zhao on 12/25/23.
//

import Foundation
import Combine
import SwiftData
class CreateFolderViewModel: ObservableObject {
    var context: ModelContext?
    // Published properties that the view can subscribe to
    @Published var folderName: String = ""
    @Published var folderDescription: String = "This is a folder description"
    @Published var searchUser: String = ""
    @Published var selectedCoverIndex: Int = -1
    @Published var error: Bool = false
    @Published var errorMessage: String = ""

    // Other properties for business logic
    private var cancellables = Set<AnyCancellable>()

    // Business logic functions
    func createFolder() {
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
            context.insert(Folder(title: folderName, imgUrl: imgUrl, linksNumber: 0))
            
            do {
                try context.save()
                print("change saved")
                let folders = try context.fetch(FetchDescriptor<Folder>())
                print("now have folder:")
                for folder in folders {
                    print(folder.title)
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
    
    func setup(modelContext: ModelContext){
        self.context = modelContext
    }
    
    private func setupSubscriptions() {
        // Set up Combine subscriptions if needed
    }
}
