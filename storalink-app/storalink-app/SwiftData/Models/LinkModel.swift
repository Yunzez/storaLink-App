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
    var title: String;
    var imgUrl: String
    var desc: String?
    
//      socialMediaType: SocialMediaSrc;
    
    var linkUrl: String?
    
    init(title: String, imgUrl: String, desc: String? = nil, linkUrl: String? = nil) {
        self.title = title
        self.imgUrl = imgUrl
        self.desc = desc
        self.linkUrl = linkUrl
        
    }
//      onClick?: () => void;
   
}
