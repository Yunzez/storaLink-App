//
//  FolderModel.swift
//  storalink-app
//
//  Created by Yunze Zhao on 12/27/23.
//

import Foundation
import SwiftData
import SwiftUI
@Model
final class Folder {
    @Attribute(.unique)
    let id = UUID()
    var mongoId : String?;
    var title: String;
    var imgUrl: String
    var remoteImgUrl: String?
    var desc: String?
    var linksNumber: Int
    var pinned: Bool
    var creationDate: Date
    var user: User? = nil
    @Relationship(deleteRule: .cascade, inverse: \Link.parentFolder) var links: [Link] = [Link]()
    
    init( title: String, imgUrl: String, desc: String? = nil, pinned: Bool? = nil, links: [Link] ) {
        //        self.id = id
        self.title = title
        self.imgUrl = imgUrl
        self.desc = desc
        self.linksNumber = links.count
        self.pinned = pinned ?? false
        self.creationDate = Date()
        self.links = []
        
//        for link in links {
//            self.links.append(link)
//        }
//        print("folder init, link num: ", links.count )
    }
    
    init( mongoId: String, title: String, imgUrl: String, user: User, desc: String? = nil, pinned: Bool? = nil, links: [Link] ) {
        self.mongoId = mongoId
        self.title = title
        self.imgUrl = imgUrl
        self.desc = desc
        self.linksNumber = links.count
        self.pinned = pinned ?? false
        self.creationDate = Date()
        self.links = []
        self.user = user
    }
    
    func addLink(link: Link) -> Void {
        self.links.append(link)
    }
    
    func getLinkNum() -> Int {
        return links.count
    }
    
    func toString() -> String {
        return "Folder: \(self.title), links: \(getLinkNum())"
    }
}



