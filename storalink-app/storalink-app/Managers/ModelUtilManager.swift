//
//  DataManager.swift
//  storalink-app
//
//  Created by Yunze Zhao on 11/26/23.
//

import Foundation
import SwiftData
final class ModelUtilManager {
    static let manager = ModelUtilManager()

    private init() {} // Private initializer for Singleton
    
    func addLinkToFolder(link: Link, folder: Folder, modelContext: ModelContext) {
        if (folder.getLinkNum() == 0) {
            folder.links = [link]
        } else {
            folder.links.append(link)
        }
        
        do {
            try modelContext.save()
        } catch {
            print("saving failed")
        }
    }
    
    func createFolder() {
        
    }
    
    func deleteFolder(modelContext: ModelContext, folder: Folder) {
        modelContext.delete(folder)
        do {
            try modelContext.save()
            
            // MARK: - Temp deletetion until Cascade in Swiftdata works
            try modelContext.delete(model: Link.self, where: #Predicate<Link> { link in
                link.parentFolder == nil
            })
            // MARK: - Temp deletetion ends
            
            print("delet successfully, Links: ")
            let allLinks = try modelContext.fetch(FetchDescriptor<Link>())
            for link in allLinks {
                print(link.toString())
            }
        } catch {
            print("Saving deletion error: \(error)")
        }
    }
    
    
}
