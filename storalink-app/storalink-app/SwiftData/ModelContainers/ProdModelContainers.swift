//
//  ProdModelContainers.swift
//  storalink-app
//
//  Created by Yunze Zhao on 2/5/24.
//

import Foundation
import SwiftData

let schema = Schema([
    Folder.self,
    Link.self
])
let modelConfiguration = ModelConfiguration(schema: schema, isStoredInMemoryOnly: false)

func getProdModelContainer() -> ModelContainer {
    do {
        return try ModelContainer(for: schema, configurations: [modelConfiguration])
    } catch {
        fatalError("Could not create ModelContainer: \(error)")
    }
}

public let ProdModelContainer: ModelContainer = getProdModelContainer()

