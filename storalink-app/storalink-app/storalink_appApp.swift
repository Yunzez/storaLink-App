//
//  storalink_appApp.swift
//  storalink-app
//
//  Created by Yunze Zhao on 11/26/23.
//

import SwiftUI
import SwiftData

@main
struct storalink_appApp: App {
    @State var navigationStateManager = NavigationStateManager()
    @State private var appViewModel = AppViewModel()
    var folderModelContainer: ModelContainer = {
        let schema = Schema([
            User.self,
            Folder.self,
        ])
        let modelConfiguration = ModelConfiguration(schema: schema, isStoredInMemoryOnly: false)

        do {
            return try ModelContainer(for: schema, configurations: [modelConfiguration])
        } catch {
            fatalError("Could not create ModelContainer: \(error)")
        }
    }()
    
    
    

    var body: some Scene {
        WindowGroup {
            ContentView()
        }
        .modelContainer(folderModelContainer)
        .environment(navigationStateManager)
        .environment(appViewModel)
    }
}
