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
import LinkPresentation

class LinkMetaData {
    var linkName = ""
    var linkTitle = ""
    var linkDesc = ""
    var linkAuthor = ""
    var linkImage: UIImage? = nil
    var linkIcon: UIImage? = nil
    
    func toString() -> String{
        return "Data: \(linkName), \(linkTitle)"
    }
}

final class LinkMetaDataFetcher  {
    static let fetcher = LinkMetaDataFetcher()
    
    func ensureHttpsPrefix(link: String) -> String {
        // Check if the link already has "http://" or "https://" prefix
        if link.lowercased().hasPrefix("http://") || link.lowercased().hasPrefix("https://") {
            return link
        } else {
            return "https://" + link.lowercased()
        }
    }
    
    func fetch(link: String, completion: @escaping (LinkMetaData?, Error?) -> Void) {
        let ret = LinkMetaData()
        ret.linkName = ensureHttpsPrefix(link: link)
        guard let currentUrl = URL(string: ret.linkName) else { return }
        
        let provider = LPMetadataProvider()
        let group = DispatchGroup()
        
        provider.startFetchingMetadata(for: currentUrl) { metaData, error in
            guard let data = metaData, error == nil else {
                print("cannot find data", error ?? "no error")
                completion(nil, NSError(domain: "Invalid URL", code: 0, userInfo: nil))
                return
            }
            
            ret.linkTitle = data.title ?? ret.linkTitle
            ret.linkDesc = data.title ?? "No description"
            ret.linkAuthor = currentUrl.host ?? "Unclear"
            
            if let iconProvider = data.imageProvider {
                group.enter()
                iconProvider.loadObject(ofClass: UIImage.self) { (currentImage, error) in
                    DispatchQueue.main.async {
                        if let image = currentImage as? UIImage {
                            ret.linkImage = image
                        }
                        group.leave()
                    }
                }
            }
            
            if let iconProvider = data.iconProvider {
                group.enter()
                iconProvider.loadObject(ofClass: UIImage.self) { (currentImage, error) in
                    DispatchQueue.main.async {
                        if let icon = currentImage as? UIImage {
                            ret.linkIcon = icon
                        }
                        group.leave()
                    }
                }
            }
            
            group.notify(queue: .main) {
                completion(ret, nil)
            }
        }
    }

}
