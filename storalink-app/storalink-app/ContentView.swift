//
//  ContentView.swift
//  storalink-app
//
//  Created by Yunze Zhao on 11/26/23.
//

import SwiftUI
import SwiftData
import Combine
struct BlurView: UIViewRepresentable {
    var style: UIBlurEffect.Style
    
    func makeUIView(context: Context) -> UIVisualEffectView {
        return UIVisualEffectView(effect: UIBlurEffect(style: style))
    }
    
    func updateUIView(_ uiView: UIVisualEffectView, context: Context) {
        uiView.effect = UIBlurEffect(style: style)
    }
}

struct ContentView: View {
    @Environment(\.modelContext) private var modelContext
    @Environment(AppViewModel.self) private var appViewModel
    @Query var folders: [Folder] = []
    @Query var links: [Link] = []
    var modelUtil  = ModelUtilManager.manager
//    let actor = SynchronizationManager(container: folderModelContainer)
    var body: some View {
        // switch back after testing
        Group {
            if appViewModel.isFirstLaunch ?? true {
                TutorialView()
            } else {
                MainNavStack()
            }
        }.onReceive(NotificationCenter.default.publisher(for: UIApplication.willEnterForegroundNotification)) { _ in
            checkForSharedDataUpdates()
        }.onAppear{
            checkForSharedDataUpdates()
        }
    }
    
#warning("this is problematic, in the futher we need to either save incoming links in user default as a list")
    func checkForSharedDataUpdates() {
        print("Scanning update flag")
        guard let sharedDefaults = UserDefaults(suiteName: "group.com.storalink.appgroup"),
              sharedDefaults.bool(forKey: "DataUpdatedFlag") == true else {
            print("No update flag found")
            return
        }
        
        sharedDefaults.set(false, forKey: "DataUpdatedFlag")
        print("Data was updated in the share extension.")
        
        if let newLinkId = sharedDefaults.string(forKey: "IncomingNewLinkId"){
            print("Detected incoming link ID: \(newLinkId)")
            
            // Assuming `folders` is an array of `Folder` objects and `links` is an array of `Link` objects accessible here
            if let link = links.first(where: { $0.id.uuidString == newLinkId }), let parentFolder = link.parentFolder {
                if let folderIndex = folders.firstIndex(where: { $0.id.uuidString == parentFolder.id.uuidString }) {
                    print("Found parent folder. Appending link to it.")
                    folders[folderIndex].links.append(link)
                }
            } else {
                print("Parent folder or link not found.")
            }
        } else {
            print("Link or folder ID not found in UserDefaults.")
        }
        
        sharedDefaults.removeObject(forKey: "IncomingNewLinkId")
    }

    
}


#Preview {
//    let folders = prepareSampleFolder()
    
    Group{
        ContentView()
            .modelContainer(ProdModelContainer)
            .environment(NavigationStateManager())
            .environment(AppViewModel())
            .background(Color("SubtleTheme"))
    }
  
}

