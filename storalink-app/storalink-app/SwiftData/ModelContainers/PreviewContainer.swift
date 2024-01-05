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
        let container = try ModelContainer(for: Folder.self, User.self, configurations: ModelConfiguration(isStoredInMemoryOnly: true))
        Task{
            let context = container.mainContext
            let folders = getExampleFolders() // Ensure this returns [Folder]
            let user = User(name: "Eddie Eidde", email: "test")
            for folder in folders {
                context.insert(folder)
            }
            
            context.insert(user)
            context.insert(User(name: "Fred Zhao", email: "yz8751@nyu.edu"))
            try context.save()
            
//            let newFolders = try context.fetch(FetchDescriptor<Folder>())
            
            for folder in folders {
                let links = getExampleLinks()
                for link in links {
                    folder.links.append(
                        Link(title: link.title, imgUrl: link.imgUrl, desc: link.desc, linkUrl: link.linkUrl)
                    )
                }
            }
        }
        return container
    } catch {
        fatalError("Could not create ModelContainer: \(error)")
    }
    
    
}

func getExampleFolders() -> [Folder] {
//    let sampleLinks = getExampleLinks()
    
    let sampleFolders = [
        ( title: "Travel", imgUrl: "folderAsset8", desc: "Places to visit", linksNumber: 15, pinned: true, links: []),
        ( title: "Recipes", imgUrl: "folderAsset7", desc: "Favorite recipes", linksNumber: 20, pinned: false, links: [])
//        ( title: "Work", imgUrl: "folderAsset6", desc: "Work-related links", linksNumber: 10, pinned: true, links: []),
//        ( title: "Fram", imgUrl: "folderAsset2", desc: "Framing tips", linksNumber: 10, pinned: true, links: []),
//        ( title: "Gym", imgUrl: "folderAsset1", desc: "Nice gyms around", linksNumber: 40, pinned: true, links: [])
    ]
    
    var folders: [Folder] = []
    
    for folderData in sampleFolders {
        let folder = Folder(
            title: folderData.title,
            imgUrl: folderData.imgUrl,
            desc: folderData.desc,
            pinned: folderData.pinned,
            links: []
        )
        
        folders.append(folder)
    }
    return folders
}

func getExampleLinks() -> [Link] {
    let sampleLinks =
    [
        Link( title: "Test OpenAI", imgUrl: "openai_logo", desc: "Advanced AI research",  linkUrl: "https://www.openai.com"),
        Link( title: "NASA", imgUrl: "nasa_logo", desc: "Space exploration", linkUrl: "https://www.nasa.gov"),
//        Link( title: "Wikipedia", imgUrl: "wikipedia_logo", desc: "Online encyclopedia", linkUrl: "https://www.wikipedia.org"),
//        Link( title: "UW", imgUrl: "wikipedia_logo", desc: "University of Wash", linkUrl: "https://www.uw.edu")
    ]
    
    return sampleLinks
}
