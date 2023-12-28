//
//  LinkModel.swift
//  storalink-app
//
//  Created by Yunze Zhao on 12/27/23.
//

import Foundation
import SwiftData
@Model
class Link {
    @Attribute(.unique) var id: Int;
    var title: String;
    var imgUrl: String
    var desc: String?
    var linksNumber: Int
    
//      socialMediaType: SocialMediaSrc;
    
    var linkUrl: String?
    
    init(id: Int, title: String, imgUrl: String, desc: String? = nil, linksNumber: Int, linkUrl: String? = nil) {
        self.id = id
        self.title = title
        self.imgUrl = imgUrl
        self.desc = desc
        self.linksNumber = linksNumber
        self.linkUrl = linkUrl
    }
//      onClick?: () => void;
   
}
