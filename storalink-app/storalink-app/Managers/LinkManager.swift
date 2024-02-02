//
//  LinkManager.swift
//  storalink-app
//
//  Created by Yunze Zhao on 2/1/24.
//

import Foundation
import SwiftData

class LinkManager {
    static let manager = LinkManager()
    
    func createLink(modelContext: ModelContext, link: Link) {
        
    }
    
    func updateLink(modelContext: ModelContext, link: Link) {
        if let mongoId = link.mongoId {
            print("found mongo id, sync action with cloud")
        }
    }
    
    func deleteLink(modelContext: ModelContext, link: Link) {
        if let mongoId = link.mongoId {
            print("found mongo id, sync action with cloud")
        }
    }
    
    func readLink(modelContext: ModelContext, link: Link) {
        if let mongoId = link.mongoId {
            print("found mongo id, sync action with cloud")
        }
    }
}

struct LinkRequest {
    let linkName: String
}
