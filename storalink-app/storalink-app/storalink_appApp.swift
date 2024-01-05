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
    
    func checkFirstLaunch() {
        let defaults = UserDefaults.standard

        if defaults.bool(forKey: "HasLaunchedOnce") {
            // App has already launched before, so you might not want to show the tutorial.
            print("Not the first launch.")
            appViewModel.isFirstLaunch = false
        } else {
            // This is the first launch, show the tutorial and set the flag.
            print("First launch, setting UserDefaults.")
            defaults.set(true, forKey: "HasLaunchedOnce")
            defaults.synchronize()
            appViewModel.isFirstLaunch = true
            // Show tutorial or introductory content here.
        }
    }
    

    var body: some Scene {
        WindowGroup {
            ContentView()
        }
        .modelContainer(folderModelContainer)
        .environment(navigationStateManager)
        .environment(appViewModel)
    }
}
