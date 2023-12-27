//
//  PreviewSampleFolders.swift
//  storalink-app
//
//  Created by Yunze Zhao on 12/27/23.
//

import Foundation
import SwiftData

@MainActor
var folderPreviewSampleContainer: ModelContainer {
    
    do {
        let container = try ModelContainer(for: Folder.self, configurations: ModelConfiguration(isStoredInMemoryOnly: true))
        Task{
            let context = container.mainContext
            let folders = Folder.getExampleFolders() // Ensure this returns [Folder]
            for folder in folders {
                context.insert(folder)
            }
            
        }
        return container
    } catch {
        fatalError("Could not create ModelContainer: \(error)")
    }
    
    
}
