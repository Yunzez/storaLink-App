//
//  FolderModel.swift
//  storalink-app
//
//  Created by Yunze Zhao on 12/27/23.
//

import Foundation
import SwiftData
@Model
final class Folder {
    @Attribute(.unique)
    let id = UUID()
    var title: String;
    var  imgUrl: String
    var desc: String?
    var linksNumber: Int
    var pinned: Bool
    var creationDate: Date
    @Relationship(deleteRule: .cascade, inverse: \Link.parentFolder) var links: [Link]?
    
    init( title: String, imgUrl: String, desc: String? = nil, pinned: Bool? = nil, links: [Link]? = [] ) {
        //        self.id = id
        self.title = title
        self.imgUrl = imgUrl
        self.desc = desc
        self.linksNumber = links?.count ?? 0
        self.pinned = pinned ?? false
        self.creationDate = Date()
        self.links = links // Initialize the links array

    }
    
    func getLinkNum() -> Int {
        return links?.count ?? 0
    }
}



