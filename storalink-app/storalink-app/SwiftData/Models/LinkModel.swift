//
//  LinkModel.swift
//  storalink-app
//
//  Created by Yunze Zhao on 12/27/23.
//

import Foundation
import SwiftData
@Model
final class Link {
    @Attribute(.unique)
        let id = UUID()
    var mongoId: String?;
    var title: String;
    var imgUrl: String?
    var iconUrl: String?
    var desc: String?
    var creationDate: Date
//      socialMediaType: SocialMediaSrc;
    
    var linkUrl: String?
    
    // inverse to Folder
    /*@Relationship(deleteRule: .cascade)*/ var parentFolder: Folder?

    
    init(title: String, imgUrl: String? = "", desc: String? = nil, linkUrl: String? = nil) {
        self.title = title
        self.imgUrl = imgUrl
        self.desc = desc
        self.linkUrl = linkUrl
        self.creationDate = Date()
    }
    
    
    init(title: String, imgUrl: String? = "", desc: String? = nil, linkUrl: String? = nil, parentFolder: Folder? = nil, iconUrl: String? = nil) {
        self.title = title
        self.imgUrl = imgUrl
        self.desc = desc
        self.linkUrl = linkUrl
        self.creationDate = Date()
        self.parentFolder = parentFolder
        self.iconUrl = iconUrl
    }
    
    
    init(title: String, imgUrl: String, iconUrl: String, desc: String, mongoId: String, linkUrl: String) {
        self.title = title
        self.imgUrl = imgUrl
        self.desc = desc
        self.linkUrl = linkUrl
        self.iconUrl = iconUrl
        self.creationDate = Date()
        self.mongoId = mongoId
    }
    
    
    
    func toString() -> String {
        return "Link: \(title), \(desc ?? "No description"), parent: \(parentFolder?.title ?? "No parent") "
    }
    
}

extension Link {
    convenience init?(from dictionary: [String: Any]) {
        guard let title = dictionary["title"] as? String,
              let creationDate = dictionary["creationDate"] as? Date else {
            return nil
        }

        self.init(title: title)

        self.mongoId = dictionary["mongoId"] as? String
        self.imgUrl = dictionary["imgUrl"] as? String
        self.iconUrl = dictionary["iconUrl"] as? String
        self.desc = dictionary["desc"] as? String
        self.linkUrl = dictionary["linkUrl"] as? String
    }
}

