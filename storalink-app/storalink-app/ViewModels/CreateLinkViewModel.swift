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
    
    let fileManager = LocalFileManager.manager

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
    
    func ensureHttpsPrefix(link: String) -> String {
        // Check if the link already has "http://" or "https://" prefix
        if link.lowercased().hasPrefix("http://") || link.lowercased().hasPrefix("https://") {
            return link
        } else {
            // If not, prepend "https://" to the link
            return "https://" + link
        }
    }

    func fetchLinkMetadata() {
        linkName = ensureHttpsPrefix(link: linkName)
        print("feteching", linkName)
        guard let currentUrl = URL(string: linkName) else {return}
        let provider = LPMetadataProvider()
        provider.startFetchingMetadata(for: currentUrl) { metaData, error in
            guard let data = metaData, error == nil else {
                print("cannot find data", error ?? "no error")
                return
            }
            self.title = data.title ?? self.linkName
            self.linkDescription = data.title ?? "No description"
            self.author = currentUrl.host ?? "Unclear"
            
            if let iconProvider = data.imageProvider {
                iconProvider.loadObject(ofClass: UIImage.self) { (currentImage, error) in
                    DispatchQueue.main.async {
                        if let linkImage = currentImage as? UIImage {
                            self.image = linkImage
                           
                        }
                    }
                }
            }
            
            if let iconProvider = data.iconProvider {
                iconProvider.loadObject(ofClass: UIImage.self) { (currentImage, error) in
                    DispatchQueue.main.async {
                        if let linkIcon = currentImage as? UIImage {
                            self.icon = linkIcon
                        }
                    }
                }
            }
        }
            
        }

}
