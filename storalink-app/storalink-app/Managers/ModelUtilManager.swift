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
    
    func deleteFolder() {
        
    }
    
    
}
