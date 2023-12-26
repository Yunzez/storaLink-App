//
//  CreateLinkViewModel.swift
//  storalink-app
//
//  Created by Yunze Zhao on 12/25/23.
//

import Foundation
import Combine
import SwiftUI
class CreateLinkViewModel: ObservableObject {
    // Published properties that the view can subscribe to
    private let metadataFetcher = LinkMetadataFetcher()
    @Published var linkMetadata: LinkMetadata?
    @Published var linkName: String = ""
    @Published var linkDescription: String = "This is a folder description"
    @Published var searchUser: String = ""
    @Published var selectedFolderIndex: Int = -1
    @Published var image: UIImage?
    @Published var title: String = ""
    @Published var author: String = ""
    @Published var error: Bool = false
    @Published var errorMessage: String = ""

    // Other properties for business logic
    private var cancellables = Set<AnyCancellable>()

    // Business logic functions
    func createFolder() {
        // Implement folder creation logic here
        print("Creating folder with name: \(linkName) and description: \(linkDescription)")
        if !validateLinkName() {
            error = true
            errorMessage = "Please input a folder name"
        } else {
            error = false
            errorMessage = ""
        }
        // For example, save the folder information to a database or send it to a server
    }
    
    // More business logic functions as needed
    func validateLinkName() -> Bool {
        // Validation logic for folder name
        return !linkName.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty
    }
    
    // Call this method when an image is selected
    func selectCover(at index: Int) {
        selectedFolderIndex = index
        // Handle the cover selection, e.g., update the UI or store the selected cover
    }
    
    // Initiate any necessary setup
    init() {
        setupSubscriptions()
    }
    
    private func setupSubscriptions() {
        // Set up Combine subscriptions if needed
    }
    
    
      
    func fetchLinkMetadata() async {
            let fetchedMetadata = await metadataFetcher.fetchMetadata(for: linkName)
            linkMetadata = fetchedMetadata
            linkDescription = fetchedMetadata.description ?? "No description"
            author = fetchedMetadata.author ?? "Unclear"
            image = fetchedMetadata.image ?? UIImage(named: "LinkDefaultImg") ?? UIImage()
        }

}
