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
    @State private var showUpdatePopup = false
    var modelUtil  = ModelUtilManager.manager
    //    let actor = SynchronizationManager(container: folderModelContainer)
    var body: some View {
        // switch back after testing
        Group {
            if appViewModel.isFirstLaunch ?? true {
                TutorialView()
            } else {
                if showUpdatePopup {
                    UpdatePopupView(onDismiss: {
                        withAnimation(.easeInOut) {
                            showUpdatePopup = false
                        }
                    })
                    .transition(.opacity)
                    .zIndex(1)
                }
                MainNavStack().background(Color.themeWhite.edgesIgnoringSafeArea(.top)).disabled(showUpdatePopup)
                    .blur(radius: showUpdatePopup ? 3 : 0)
            }
        }.onReceive(NotificationCenter.default.publisher(for: UIApplication.willEnterForegroundNotification)) { _ in
            checkForSharedDataUpdates()
        }.onAppear{
            checkForSharedDataUpdates()
            if shouldShowUpdatePopup() {
                withAnimation {
                    showUpdatePopup = true
                }
            }
        }
        //        .edgesIgnoringSafeArea(.all)
    }
    
    func shouldShowUpdatePopup() -> Bool {
        let versionKey = "appVersion"
        let currentVersion = Bundle.main.infoDictionary?["CFBundleShortVersionString"] as? String
        
        let lastVersion = UserDefaults.standard.string(forKey: versionKey)
        
        if lastVersion != currentVersion {
            UserDefaults.standard.set(currentVersion, forKey: versionKey)
            return true
        }
        
        return false
    }
    
    struct UpdatePopupView: View {
        var onDismiss: () -> Void
        
        var body: some View {
            ScrollView{
                VStack {
                    Text("What's New:")
                        .font(.headline)
                        .padding()
                    VStack(alignment: .leading, spacing: 10) {
                        Text("• 'Slightly' improved user interface")
                        Text("• Fixed some bugs on deletion")
                        Text("• Fixed the share extension, now you can share multiple links :)")
                        // Add more bullet points as needed
                    }
                    .padding()
                    Spacer()
                    Button("Got it!") {
                        onDismiss()
                    }
                    .padding()
                }
            }
            .frame(width: 300, height: 450)
            .background(Color.white)
            .cornerRadius(10)
            .shadow(radius: 10)
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
        
        if let newLinkIds = sharedDefaults.array(forKey: "IncomingNewLinks") as? [String] {
            for newLinkId in newLinkIds {
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
            }
            // Clear the processed links
            sharedDefaults.removeObject(forKey: "IncomingNewLinks")
        } else {
            print("No new links found in UserDefaults.")
        }
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

