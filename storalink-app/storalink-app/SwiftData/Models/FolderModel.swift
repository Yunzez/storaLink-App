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
    @Attribute(.unique) var id: Int;
    var title: String;
    var  imgUrl: String
    var desc: String?
    var linksNumber: Int
//    var onClick: () => Void
    var pinned: Bool?
//    @Relationship(deleteRule: .cascade) var links: [Link]?
    
    init(id: Int, title: String, imgUrl: String, desc: String? = nil, linksNumber: Int, pinned: Bool? = nil/*, links: [Link]? = []*/ ) {
        self.id = id
        self.title = title
        self.imgUrl = imgUrl
        self.desc = desc
        self.linksNumber = linksNumber
        self.pinned = pinned
//        self.links = links
    }
    
}



