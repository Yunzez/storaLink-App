//
//  SynchronizationManager.swift
//  storalink-app
//
//  Created by Yunze Zhao on 2/1/24.
//

import Foundation
import UIKit
import SwiftData
@available(iOS 17, *)
public actor SynchronizationManager: ModelActor {
    public static let shared = SynchronizationManager(container: getProdModelContainer())

    public let modelContainer: ModelContainer
    public let modelExecutor: any ModelExecutor
    private var context: ModelContext { modelExecutor.modelContext }
    
    public init(container: ModelContainer) {
            self.modelContainer = container
            let context = ModelContext(modelContainer)
            modelExecutor = DefaultSerialModelExecutor(modelContext: context)
        }
//    static let manager = SynchronizationManager()
    
    
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

            print("add number:", foldersToAdd.count)
            print("delete number:", foldersToDelete.count)
            // Optionally, find folders to update if other attributes are considered

            // Perform add, delete, and update operations
            if !foldersToAdd.isEmpty {
                for folderToAdd in foldersToAdd {
                    modelContext.insert(folderToAdd)
                }
            }

            if !foldersToDelete.isEmpty {
                for folderToDelete in foldersToDelete {
                    // Delete folder from modelContext
                    modelContext.delete(folderToDelete)
                }
            }
            
            if !foldersToAdd.isEmpty || !foldersToDelete.isEmpty {
                try modelContext.save()
            }
            
           

            // Save changes to modelContext if necessary

        } catch {
            print("Synchronization Error: \(error)")
        }
    }

    
    func syncLinks(modelContext: ModelContext) {
        
    }
    
}

