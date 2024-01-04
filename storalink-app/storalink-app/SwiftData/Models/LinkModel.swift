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
    var title: String;
    var imgUrl: String
    var desc: String?
    var creationDate: Date
//      socialMediaType: SocialMediaSrc;
    
    var linkUrl: String?
    
    // inverse to Folder
    /*@Relationship(deleteRule: .cascade)*/ var parentFolder: Folder?


    
    init(title: String, imgUrl: String, desc: String? = nil, linkUrl: String? = nil) {
        self.title = title
        self.imgUrl = imgUrl
        self.desc = desc
        self.linkUrl = linkUrl
        self.creationDate = Date()
        
    }
    
    func toString() -> String {
        return "Link: \(title), \(desc ?? "No description"), parent: \(parentFolder?.title ?? "No parent") "
    }
   
}
