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
        (id: 1, title: "Travel", imgUrl: "folderAsset8", desc: "Places to visit", linksNumber: 15, pinned: true, links: getExampleLinks()),
        (id: 2, title: "Recipes", imgUrl: "folderAsset7", desc: "Favorite recipes", linksNumber: 20, pinned: false, links: getExampleLinks()),
        (id: 3, title: "Work", imgUrl: "folderAsset6", desc: "Work-related links", linksNumber: 10, pinned: true, links: getExampleLinks()),
        (id: 4, title: "Fram", imgUrl: "folderAsset2", desc: "Framing tips", linksNumber: 10, pinned: true, links: getExampleLinks()),
        (id: 5, title: "Gym", imgUrl: "folderAsset1", desc: "Nice gyms around", linksNumber: 40, pinned: true, links: getExampleLinks())
    ]
    
    var folders: [Folder] = []
    
    for folderData in sampleFolders {
        let folder = Folder(
            title: folderData.title,
            imgUrl: folderData.imgUrl,
            desc: folderData.desc,
            pinned: folderData.pinned,
            links: folderData.links
        )
        
        folders.append(folder)
    }
    return folders
}

func getExampleLinks() -> [Link] {
    let sampleLinks =
    [
        Link( title: "OpenAI", imgUrl: "openai_logo", desc: "Advanced AI research",  linkUrl: "https://www.openai.com"),
        Link( title: "NASA", imgUrl: "nasa_logo", desc: "Space exploration", linkUrl: "https://www.nasa.gov"),
        Link( title: "Wikipedia", imgUrl: "wikipedia_logo", desc: "Online encyclopedia", linkUrl: "https://www.wikipedia.org"),
        Link( title: "UW", imgUrl: "wikipedia_logo", desc: "University of Wash", linkUrl: "https://www.uw.edu")
    ]
    
    return sampleLinks
}
