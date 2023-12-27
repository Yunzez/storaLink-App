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
    
    init(id: Int, title: String, imgUrl: String, desc: String? = nil, linksNumber: Int, pinned: Bool? = nil) {
        self.id = id
        self.title = title
        self.imgUrl = imgUrl
        self.desc = desc
        self.linksNumber = linksNumber
        self.pinned = pinned
    }
    
    
    static func getExampleFolders() -> [Folder] {
        let sampleFolders = [
            (id: 1, title: "Travel", imgUrl: "travel_image_url", desc: "Places to visit", linksNumber: 15, pinned: true),
            (id: 2, title: "Recipes", imgUrl: "recipes_image_url", desc: "Favorite recipes", linksNumber: 20, pinned: false),
            (id: 3, title: "Work", imgUrl: "work_image_url", desc: "Work-related links", linksNumber: 10, pinned: true)
        ]
        var folders: [Folder] = []

        for folderData in sampleFolders {
            let folder = Folder(
                id: folderData.id,
                title: folderData.title,
                imgUrl: folderData.imgUrl,
                desc: folderData.desc,
                linksNumber: folderData.linksNumber,
                pinned: folderData.pinned
            )
            folders.append(folder)
        }
        return folders
    }
}



