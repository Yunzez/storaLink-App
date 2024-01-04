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
@Observable class CreateLinkViewModel {
    // Published properties that the view can subscribe to
    private let metadataFetcher = LinkMetadataFetcher()
    
    var showingSearchResults: Bool = false
     var modelContext: ModelContext?
     var linkMetadata: LinkMetadata?
var linkName: String = ""
    var linkDescription: String = "This is a folder description"
    var searchUser: String = ""
    var selectedFolder: Folder?
    var image: UIImage?
    var title: String = ""
    var author: String = ""
    var error: Bool = false
    var errorMessage: String = ""
    var searchFolder: String = ""

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
        
        if (selectedFolder?.getLinkNum() == 0) {
            selectedFolder?.links = [newLink]
        } else {
            selectedFolder?.links.append(newLink)
        }
        
        do {
            try modelContext?.save()
        } catch {
            print("saving failed")
        }
        // For example, save the folder information to a database or send it to a server
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
    
    func fetchLinkMetadata() async {
            let fetchedMetadata = await metadataFetcher.fetchMetadata(for: linkName)
            linkMetadata = fetchedMetadata
            linkDescription = fetchedMetadata.description ?? "No description"
            author = fetchedMetadata.author ?? "Unclear"
            image = fetchedMetadata.image ?? UIImage(named: "LinkDefaultImg") ?? UIImage()
        }

}
