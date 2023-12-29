//
//  PreviewContainer.swift
//  storalink-app
//
//  Created by Yunze Zhao on 12/27/23.
//

import Foundation
import SwiftData

@MainActor
var PreviewContainer: ModelContainer {
    
    do {
        let container = try ModelContainer(for: Folder.self, Link.self, User.self, configurations: ModelConfiguration(isStoredInMemoryOnly: true))
        Task{
            let context = container.mainContext
            let folders = getExampleFolders() // Ensure this returns [Folder]
            let links = getExampleLinks()
            let user = User(id: 1, name: "Eddie Eidde", email: "test")
            for folder in folders {
                context.insert(folder)
            }
            
            for link in links {
                context.insert(link)
            }
            
            context.insert(user)
            
        }
        return container
    } catch {
        fatalError("Could not create ModelContainer: \(error)")
    }
    
    
}

func getExampleFolders() -> [Folder] {
//    let sampleLinks = getExampleLinks()
    
    let sampleFolders = [
        (id: 1, title: "Travel", imgUrl: "folderAsset8", desc: "Places to visit", linksNumber: 15, pinned: true),
        (id: 2, title: "Recipes", imgUrl: "folderAsset7", desc: "Favorite recipes", linksNumber: 20, pinned: false/*, links: sampleLinks*/),
        (id: 3, title: "Work", imgUrl: "folderAsset6", desc: "Work-related links", linksNumber: 10, pinned: true/*, links: sampleLinks*/)
    ]
    
    var folders: [Folder] = []
    
    for folderData in sampleFolders {
        let folder = Folder(
            title: folderData.title,
            imgUrl: folderData.imgUrl,
            desc: folderData.desc,
            linksNumber: folderData.linksNumber,
            pinned: folderData.pinned
//            links: folderData.links
        )
        folders.append(folder)
    }
    return folders
}

func getExampleLinks() -> [Link] {
    let sampleLinks =
    [
        Link(id: 1, title: "OpenAI", imgUrl: "openai_logo", desc: "Advanced AI research", linksNumber: 5, linkUrl: "https://www.openai.com"),
        Link(id: 2, title: "NASA", imgUrl: "nasa_logo", desc: "Space exploration", linksNumber: 3, linkUrl: "https://www.nasa.gov"),
        Link(id: 3, title: "Wikipedia", imgUrl: "wikipedia_logo", desc: "Online encyclopedia", linksNumber: 8, linkUrl: "https://www.wikipedia.org")
    ]
    
    return sampleLinks
}
