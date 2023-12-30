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
    @Environment(AppViewModel.self) private var appViewModel
    
    @Query private var items: [Item]
    
    @StateObject var userViewModel = UserViewModel()
    
    var body: some View {
        // switch back after testing
        if !appViewModel.isAuthenticated {
            MainNavStack()
        } else {
            LoginView()
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


#Preview {
//    let folders = prepareSampleFolder()
    
    Group{
        ContentView()
            .modelContainer(PreviewContainer)
            .environment(NavigationStateManager())
            .environment(AppViewModel())
    }
  
}

