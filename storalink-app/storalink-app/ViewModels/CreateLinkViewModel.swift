//
//  CreateLinkViewModel.swift
//  storalink-app
//
//  Created by Yunze Zhao on 12/25/23.
//

import Foundation
import Combine
import SwiftUI
import SwiftData
import LinkPresentation
@Observable class CreateLinkViewModel {
    // Published properties that the view can subscribe to
   
    var showingSearchResults: Bool = false
    var modelContext: ModelContext?
    var linkName: String = ""
    var linkDescription: String = "This is a folder description"
    var searchUser: String = ""
    var selectedFolder: Folder?
    var image: UIImage?
    var icon: UIImage?
    var title: String = ""
    var author: String = ""
    var error: Bool = false
    var errorMessage: String = ""
    var searchFolder: String = ""
    
    // path of the saved images to save to link
    var imagePath:String = ""
    var iconPath:String = ""
    
    // getting managers
    let modelManager = ModelUtilManager.manager
    let fileManager = LocalFileManager.manager
    let linkFetcher = LinkMetaDataFetcher.fetcher

    // Other properties for business logic
    private var cancellables = Set<AnyCancellable>()

    // Business logic functions
    func createLink() {
        // Implement folder creation logic here
        
        print("Creating folder with name: \(linkName) and description: \(linkDescription)")
        if !validateLinkName() {
            error = true
            errorMessage = "Please input a link name"
        } else {
            error = false
            errorMessage = ""
        }
        title = title.isEmpty ? linkName : title
        
        let newLink = Link(title: title, imgUrl: "", desc: linkDescription, linkUrl: linkName)
        if let saveImage = image {
            imagePath = self.fileManager.saveImage(image: saveImage)
        }
        
        if let saveIcon = icon {
            iconPath = self.fileManager.saveImage(image: saveIcon)
        }
        
        newLink.imgUrl = imagePath
        newLink.iconUrl = iconPath
        
        if let folder = selectedFolder, let context = modelContext {
            modelManager.addLinkToFolder(link: newLink, folder: folder, modelContext: context)
        }
       
        
    }
    
    // More business logic functions as needed
    func validateLinkName() -> Bool {
        // Validation logic for folder name
        return !linkName.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
    }
    
   
    
    // Initiate any necessary setup
    init() {
        setupSubscriptions()
    }
    
    func filterFolder(folders: [Folder]) -> [Folder]{
        if(searchFolder.isEmpty) {
            return folders
        }
        
        let filteredFolders = folders.filter { folder in
               folder.title.localizedCaseInsensitiveContains(searchFolder)
        }
        return filteredFolders
    }
    
    private func setupSubscriptions() {
        // Set up Combine subscriptions if needed
    }
    
    func setup(modelConext: ModelContext) {
        self.modelContext = modelConext
    }

    func fetchLinkMetadata() {
        linkFetcher.fetch(link: linkName, completion: { linkMetaData in
            self.title = linkMetaData.linkTitle
            self.linkDescription = linkMetaData.linkDesc
            self.author = linkMetaData.linkAuthor
            self.image = linkMetaData.linkImage
            self.icon = linkMetaData.linkIcon
            
        })
            
    }

}
