//
//  SynchronizationManager.swift
//  storalink-app
//
//  Created by Yunze Zhao on 2/1/24.
//

import Foundation
import UIKit
import SwiftData
class SynchronizationManager {
    static let manager = SynchronizationManager()
    
    
    func syncFolders(modelContext: ModelContext, folders: [Folder], userId: UUID) {
        guard !folders.isEmpty else { return }

        do {
            let currentFolders = try modelContext.fetch(FetchDescriptor<Folder>(
                predicate: #Predicate { folder in
                    return folder.user?.id == userId
                }
            ))

            // Create a set of mongoIds for quick lookup
            let currentFolderIds = Set(currentFolders.map { $0.mongoId })
            let newFolderIds = Set(folders.map { $0.mongoId })

            // Determine folders to add (present in newFolders but not in currentFolders)
            let foldersToAdd = folders.filter { !currentFolderIds.contains($0.mongoId) }

            // Determine folders to delete (present in currentFolders but not in newFolders)
            let foldersToDelete = currentFolders.filter { !newFolderIds.contains($0.mongoId) }

            // Optionally, find folders to update if other attributes are considered

            // Perform add, delete, and update operations
            for folderToAdd in foldersToAdd {
                modelContext.insert(folderToAdd)
            }

            for folderToDelete in foldersToDelete {
                // Delete folder from modelContext
                modelContext.delete(folderToDelete)
            }

            // Save changes to modelContext if necessary

        } catch {
            print("Synchronization Error: \(error)")
        }
    }

    
    func syncLinks(modelContext: ModelContext) {
        
    }
    
}

