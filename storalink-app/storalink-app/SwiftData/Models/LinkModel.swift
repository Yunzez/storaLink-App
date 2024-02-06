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
