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
    
    
    @StateObject var userViewModel = UserViewModel()
    
    var body: some View {
        // switch back after testing
        if !appViewModel.isAuthenticated {
            MainNavStack()
        } else {
            LoginView()
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

