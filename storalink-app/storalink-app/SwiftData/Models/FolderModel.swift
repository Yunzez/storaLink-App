//
//  FolderModel.swift
//  storalink-app
//
//  Created by Yunze Zhao on 12/27/23.
//

import Foundation
import SwiftData
@Model
class Folder {
//    @Attribute(.unique) var id: Int;
    var title: String;
    var  imgUrl: String
    var desc: String?
    var linksNumber: Int
//    var onClick: () => Void
    var pinned: Bool?
    var creationDate: Date
    @Relationship(deleteRule: .cascade) var links: [Link]?
    
    init( title: String, imgUrl: String, desc: String? = nil, pinned: Bool? = nil, links: [Link]? = [] ) {
//        self.id = id
        self.title = title
        self.imgUrl = imgUrl
        self.desc = desc
        self.linksNumber = links?.count ?? 0
        self.pinned = pinned
        self.links = links
        self.creationDate = Date()
    }
    
}



