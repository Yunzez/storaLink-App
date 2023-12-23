//
//  MainNavStack.swift
//  storalink-app
//
//  Created by Yunze Zhao on 11/26/23.
//

import SwiftUI

struct MainNavStack: View {
    @EnvironmentObject var navigationStateManager: NavigationStateManager
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
            
            
            // MARK: - Custom Tab Bar
                VStack{
                    if !navigationStateManager.isInSubMenu {
                        HStack {
                            Button(action: { self.selectedTab = 0 }) {
                                Image(self.selectedTab == 0 ? "HomeSelected" : "Home")
                            }.frame(width: 50)
                            Spacer()
                            Button(action: { self.selectedTab = 1 }) {
                                Image(self.selectedTab == 1 ? "FileSelected" : "File")
                            }.frame(width: 50)
                            Spacer()
                            Button(action: { self.selectedTab = 2 }) {
                                Image(self.selectedTab == 2 ? "CreateSelected" : "Create")
                            }.frame(width: 70)
                            Spacer()
                            Button(action: { self.selectedTab = 3 }) {
                                Image(self.selectedTab == 3 ? "NoticeSelected" : "Notice").resizable().frame(width: 30, height: 30)
                            }.frame(width: 50)
                            Spacer()
                            Button(action: { self.selectedTab = 4 }) {
                                Image(self.selectedTab == 4 ? "SettingSelected" : "Setting")
                            }.frame(width: 50)
                            // Add other buttons for your tabs
                        }
                        .padding(.horizontal)
                        .padding(.vertical, 5)
                        .background(Color("ThemeWhite").opacity(1))
                        .shadow(radius: 2)
                        .transition(.move(edge: .bottom)) // Transition for sliding in and out from the
                    }
                    
                }
                    .frame(height: navigationStateManager.isInSubMenu ? 0 : Spacing.customNavigationBarHeight)
                    .animation(Animation.easeInOut(duration: 0.3), value: navigationStateManager.isInSubMenu)
                    .edgesIgnoringSafeArea(.bottom)

        }
    }
}

#Preview {
    MainNavStack().environmentObject(NavigationStateManager())
}
