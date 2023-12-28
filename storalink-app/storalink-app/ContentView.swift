//
//  ContentView.swift
//  storalink-app
//
//  Created by Yunze Zhao on 11/26/23.
//

import SwiftUI
import SwiftData

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
    @Query private var items: [Item]
    
    @StateObject var userViewModel = UserViewModel()
    
    var body: some View {
        
        if userViewModel.isAuthenticated {
            MainNavStack()
        } else {
            LoginView(userViewModel: userViewModel)
        }
    }
    
    private func addItem() {
        withAnimation {
            let newItem = Item(timestamp: Date())
            modelContext.insert(newItem)
        }
    }
    
    private func deleteItems(offsets: IndexSet) {
        withAnimation {
            for index in offsets {
                modelContext.delete(items[index])
            }
        }
    }
}

func prepareSampleFolder()  -> [Folder]{
    let sampleFolders = [
        (id: 1, title: "Travel", imgUrl: "travel_image_url", desc: "Places to visit", linksNumber: 15, pinned: true),
        (id: 2, title: "Recipes", imgUrl: "recipes_image_url", desc: "Favorite recipes", linksNumber: 20, pinned: false),
        (id: 3, title: "Work", imgUrl: "work_image_url", desc: "Work-related links", linksNumber: 10, pinned: true)
    ]
    var folders: [Folder] = []

    for folderData in sampleFolders {
        let folder = Folder(
            id: folderData.id,
            title: folderData.title,
            imgUrl: folderData.imgUrl,
            desc: folderData.desc,
            linksNumber: folderData.linksNumber,
            pinned: folderData.pinned
        )
        folders.append(folder)
    }
    
    return folders
}

#Preview {
//    let folders = prepareSampleFolder()
    
    Group{
        ContentView()
            .modelContainer(PreviewContainer)
            .environmentObject(NavigationStateManager())
    }
  
}

