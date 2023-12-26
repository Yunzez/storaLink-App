//
//  LinkMetaDataFetcher.swift
//  storalink-app
//
//  Created by Yunze Zhao on 12/25/23.
//

import Foundation
import LinkPresentation
import UIKit
import UniformTypeIdentifiers
struct LinkMetadata {
    var title: String?
    var image: UIImage?
    var description: String?
    var author: String?
    var source: String? // Platform or domain
    var icon: UIImage?
}

class LinkMetadataFetcher {
    private var metadataProvider = LPMetadataProvider()
    
    // Custom function to load data representation asynchronously
    func loadDataAsync(from provider: NSItemProvider) async -> Data? {
        return await withCheckedContinuation { continuation in
            provider.loadDataRepresentation(forTypeIdentifier: UTType.image.identifier) { data, error in
                if let error = error {
                    print("Error loading data representation: \(error)")
                    continuation.resume(returning: nil)
                    return
                }
                continuation.resume(returning: data)
            }
        }
    }
    
    func fetchMetadata(for rawLink: String) async -> LinkMetadata {
        let processedLink = preprocessLink(rawLink.lowercased())
        
        guard let url = URL(string: processedLink) else {
            return LinkMetadata()
        }
        
        let metadataProvider = LPMetadataProvider()
        do {
                let metadata = try await metadataProvider.startFetchingMetadata(for: url)
                var linkMetadata = LinkMetadata()
                linkMetadata.title = metadata.title ?? url.host?.capitalized
                linkMetadata.author = url.host?.replacingOccurrences(of: "www.", with: "").capitalized
                
                // Handle the icon
                if let iconProvider = metadata.iconProvider {
                    if let data = await loadDataAsync(from: iconProvider), let image = UIImage(data: data) {
                        linkMetadata.icon = image
                    }
                }
                
                // Handle the image
                if let imageProvider = metadata.imageProvider {
                    if let data = await loadDataAsync(from: imageProvider), let image = UIImage(data: data) {
                        linkMetadata.image = image
                    }
                }
                
                return linkMetadata
                
            } catch {
                print("Failed to fetch metadata: \(error)")
                return LinkMetadata()
            }
    }
    
    private func preprocessLink(_ link: String) -> String {
        // Ensure the link starts with "http://" or "https://"
        if link.starts(with: "http://") || link.starts(with: "https://") {
            return link
        } else {
            return "http://" + link
        }
    }
}
