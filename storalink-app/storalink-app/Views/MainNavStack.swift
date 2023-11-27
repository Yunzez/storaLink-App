//
//  MainNavStack.swift
//  storalink-app
//
//  Created by Yunze Zhao on 11/26/23.
//

import SwiftUI

struct MainNavStack: View {
    
    @State private var selectedTab: Int = 0
    init() {
        let appearance = UITabBarAppearance()
        appearance.configureWithTransparentBackground()
        
        let blurEffect = UIBlurEffect(style: .systemChromeMaterial)
        appearance.backgroundEffect = blurEffect
        
        UITabBar.appearance().standardAppearance = appearance
        if #available(iOS 15.0, *) {
            UITabBar.appearance().scrollEdgeAppearance = appearance
        }
    }
    
    var body: some View {
        ZStack(alignment: .bottom) {
            Group {
                    switch selectedTab {
                    case 0:
                        HomeView()
                    case 1:
                        FilesView()
                    case 2:
                        CreateView()
                    case 3:
                        InfoView()
                    case 4:
                        SettingsView()
                    default:
                        HomeView()
                    }
                }
                .frame(maxWidth: .infinity, maxHeight: .infinity) // Take up all available space

            
            // Custom Tab Bar
            VStack{
                HStack {
                    Button(action: { self.selectedTab = 0 }) {
                        Image(systemName: "house")
                    }
                    Spacer()
                    Button(action: { self.selectedTab = 1 }) {
                        Image(systemName: "folder")
                    }
                    Spacer()
                    Button(action: { self.selectedTab = 2 }) {
                        Image(systemName: "doc.badge.plus")
                    }
                    Spacer()
                    Button(action: { self.selectedTab = 3 }) {
                        Image(systemName: "info")
                    }
                    Spacer()
                    Button(action: { self.selectedTab = 4 }) {
                        Image(systemName: "gear")
                    }
                    // Add other buttons for your tabs
                }
                .padding()
                .background(Color("SubtleTheme").opacity(0.9))
                .cornerRadius(25)
                .shadow(radius: 4)
                .padding(.horizontal, 10)
            }.frame(maxHeight: .infinity, alignment: .bottom)
        }
    }
}

#Preview {
    MainNavStack()
}
