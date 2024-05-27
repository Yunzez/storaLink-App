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
import SwiftSoup

class LinkMetaData {
    var linkName = ""
    var linkTitle = ""
    var linkDesc = ""
    var linkAuthor = ""
    var linkImage: UIImage? = nil
    var linkIcon: UIImage? = nil
    var linkSource: String? = "Unknown Source"
    
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
            
            // Fetch the HTML content and parse the source
            group.enter()
            self.fetchHTMLContent(url: currentUrl, metaData: ret) { error in
                if let error = error {
                    print("Error fetching HTML content", error)
                }
                group.leave()
            }
            
            
            group.notify(queue: .main) {
                completion(ret, nil)
            }
        }
    }
    
    
    func fetchHTMLContent(url: URL, metaData: LinkMetaData, completion: @escaping (Error?) -> Void) {
        URLSession.shared.dataTask(with: url) { data, response, error in
            guard let data = data, error == nil else {
                completion(error)
                return
            }
            
            do {
                let html = String(data: data, encoding: .utf8) ?? ""
                let document = try SwiftSoup.parse(html)
                
                // Extract the source from the meta tag or title tag
                if let sourceTag = try? document.select("meta[name=source]").first() {
                    var source = try sourceTag.attr("content")
                    if source.hasPrefix("www.") {
                        source = String(source.dropFirst(4))
                    }
                    if let range = source.range(of: ".", options: .backwards) {
                        source = String(source[..<range.lowerBound])
                    }
                    metaData.linkSource = source
                } else {
                    var source = url.host ?? "unclear"
                    if source.hasPrefix("www.") {
                        source = String(source.dropFirst(4))
                    }
                    if let range = source.range(of: ".", options: .backwards) {
                        source = String(source[..<range.lowerBound])
                    }
                    metaData.linkSource = source
                }
                
                // Extract the description from the meta tag
                if let descriptionTag = try? document.select("meta[name=description]").first() {
                    metaData.linkDesc = try descriptionTag.attr("content")
                } else if let twitterDescriptionTag = try? document.select("meta[name=twitter:description]").first() {
                    metaData.linkDesc = try twitterDescriptionTag.attr("content")
                } else {
                    metaData.linkDesc = "No description available"
                }
                
                // Extract the title from the title tag
                if let titleTag = try? document.title() {
                    metaData.linkTitle = titleTag
                } else {
                    metaData.linkTitle = "No title available"
                }
                
                // Extract and clean up the author from the meta tag
                if let authorTag = try? document.select("meta[name=author]").first() {
                    var author = try authorTag.attr("content")
                    if author.hasPrefix("www.") {
                        author = String(author.dropFirst(4))
                    }
                    if let range = author.range(of: ".", options: .backwards) {
                        author = String(author[..<range.lowerBound])
                    }
                    metaData.linkAuthor = author
                } else {
                    metaData.linkAuthor = url.host ?? "Unclear"
                }
                
                completion(nil)
            } catch {
                completion(error)
            }
        }.resume()
    }
    
}
