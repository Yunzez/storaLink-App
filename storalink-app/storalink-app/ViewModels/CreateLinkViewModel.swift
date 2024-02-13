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
    let localFileManager = LocalFileManager.manager
    let linkManager = LinkActor()
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
    
    var fetchStatus: Int = 0
    var fetchError: String = ""
    // path of the saved images to save to link
    var imagePath:String = ""
    var iconPath:String = ""
    
    var isEditLink:Bool = false
    
    var navigationStateManager: NavigationStateManager?
    var loadingStage: LoadingStage = .none
    var readyToNavigate: Bool = false
    // getting managers
    let modelManager = ModelUtilManager.manager
    let fileManager = LocalFileManager.manager
    let linkFetcher = LinkMetaDataFetcher.fetcher
    
    var initialLink: Link? = nil

    // Other properties for business logic
    private var cancellables = Set<AnyCancellable>()

    func updateInfoForEditLink(link: Link) {
        linkName = link.linkUrl ?? ""
        title = link.title
        if let iconPath = link.iconUrl {
            icon = localFileManager.getImage(path: iconPath)
        }
        
        if let imgPath = link.imgUrl {
            image = localFileManager.getImage(path: imgPath)
        }
        
        linkDescription = link.desc ?? ""
        selectedFolder = link.parentFolder
        isEditLink = true
        
        if let parent = link.parentFolder {
            searchFolder = parent.title
        }
        
    }
    
    func updateLink() {
        
        if let link = initialLink {
            
            if !validateLinkName() {
                error = true
                loadingStage = .none
                return
            } else {
                error = false
            }
            
            link.linkUrl = linkName
            link.title = title
//            link.author = author
            link.desc = linkDescription
            if let saveIcon = icon {
                link.iconUrl = localFileManager.saveImage(image: saveIcon)
            }
            
            if let saveImage = image {
                link.imgUrl = localFileManager.saveImage(image: saveImage)
            }
            
            link.parentFolder = selectedFolder
            
            print("start online updating")
            Task{
                await linkManager.updateLink(link: link) { result in
                    switch result {
                    case .success(let link):
                        print("updated link online: \(link)") // Assuming 'link' is the object you want to print or use
                    case .failure(let encounteredError):
                        self.error = true
                        self.loadingStage = .none
                        self.errorMessage = "some server error occured :C, try again later"
                        print("some error has occurred: \(encounteredError.localizedDescription)")
                    }
                }
            }
        }
    }
    

    func createLink() {
        loadingStage = .loading
        
        if !validateLinkName() {
            error = true
            loadingStage = .none
            return
        } else {
            error = false
        }
        
        if let folder = selectedFolder, let context = modelContext {
           
            // Implement folder creation logic here
            print("Creating link with name: \(linkName) and description: \(linkDescription)")
            
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
            modelManager.addLinkToFolder(link: newLink, folder: folder, modelContext: context)
            
            Task{
                await linkManager.createLink(link: newLink) { result in
                    switch result {
                    case .success(let link):
                        print("created link online: \(link.mongoId ?? "no mongoid")") // Assuming 'link' is the object you want to print or use
                    case .failure(let encounteredError):
                        self.error = true
                        self.loadingStage = .none
                        self.errorMessage = "some server error occured :C, try again later"
                        print("some error has occurred: \(encounteredError.localizedDescription)")
                    }
                }
            }
            
            if let navigateManager = navigationStateManager {
                navigateManager.focusLink = newLink
                DispatchQueue.main.asyncAfter(deadline: .now() + 1) {
                    print("navigate")
                    navigateManager.lastNavigationSource = .toMainStack
                    navigateManager.navigationPath.append(NavigationItem.linkView)
                }
            }
           
        }
        loadingStage = .done
       
        
    }
    
    // More business logic functions as needed
    func validateLinkName() -> Bool {
        // Validation logic for folder name
        print("validating")
        print(selectedFolder ?? "no folder")
        if (selectedFolder == nil) {
            print("folder type does not match")
            errorMessage = "Please select a folder"
           return false
        }
        if (linkName.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty) {
            errorMessage = "Please input a link name"
            return false
        }
        return true
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
        fetchStatus = 1
        linkFetcher.fetch(link: linkName, completion: { linkMetaData, error in
            if error != nil {
                print("got error")
                self.fetchStatus = 2
                self.fetchError = "Error"
            }
            
            if linkMetaData != nil, let metaData = linkMetaData {
                self.linkName = metaData.linkName
                self.fetchError = ""
                self.title = metaData.linkTitle
                self.linkDescription = metaData.linkDesc
                self.author = metaData.linkAuthor
                self.image = metaData.linkImage
                self.icon = metaData.linkIcon
                print(self.image ?? "no image")
                self.fetchStatus = 2
            }
        })
        
        
    }

}
