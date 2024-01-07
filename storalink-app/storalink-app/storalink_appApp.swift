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
            ContentView().onAppear{
                print("On Appear, in contentView")
                let lastLoggedInUserEmail = appViewModel.checkLastLogin()
                print("Last loggin email", lastLoggedInUserEmail)
                do {
                    let context = folderModelContainer.mainContext
                    let descriptor = FetchDescriptor<User>(sortBy: [SortDescriptor(\.name)])
                    let users = try context.fetch(descriptor)
                    
                    for user in users {
                        if user.email == lastLoggedInUserEmail {
                            appViewModel.userName = user.name
                            appViewModel.setUser(user: user)
                            
                            // record login activity
                            appViewModel.recordLogin(userEmail: user.email)
                            appViewModel.isAuthenticated = true
                            return
                        }
                    }
                } catch {
                    print("Unable to fetch previous user")
                }
                
            }
        }
        .modelContainer(folderModelContainer)
        .environment(navigationStateManager)
        .environment(appViewModel)
    }
}
