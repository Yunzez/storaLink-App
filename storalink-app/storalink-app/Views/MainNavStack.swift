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
                        Image(self.selectedTab == 0 ? "HomeSelected" : "Home")
                    }
                    Spacer()
                    Button(action: { self.selectedTab = 1 }) {
                        Image(self.selectedTab == 1 ? "FileSelected" : "File")
                    }
                    Spacer()
                    Button(action: { self.selectedTab = 2 }) {
                        Image(self.selectedTab == 2 ? "CreateSelected" : "Create")
                    }
                    Spacer()
                    Button(action: { self.selectedTab = 3 }) {
                        Image(self.selectedTab == 3 ? "NoticeSelected" : "Notice")
                    }
                    Spacer()
                    Button(action: { self.selectedTab = 4 }) {
                        Image(self.selectedTab == 4 ? "SettingSelected" : "Setting")
                    }
                    // Add other buttons for your tabs
                }
                .padding(.horizontal)
                .padding(.vertical, 6)
                .background(Color("ThemeWhite").opacity(1))
                .cornerRadius(20)
                .shadow(radius: 8)
                .padding(.horizontal, 10)
                .padding(.vertical, -19)
            }.edgesIgnoringSafeArea(.bottom)
                .frame(maxHeight: .infinity, alignment: .bottom)
            
//                .border(/*@START_MENU_TOKEN@*/Color.black/*@END_MENU_TOKEN@*/) // for testing only
        }
    }
}

#Preview {
    MainNavStack()
}
