//
//  MainNavStack.swift
//  storalink-app
//
//  Created by Yunze Zhao on 11/26/23.
//

import SwiftUI

enum NavigationItem: Hashable {
    case createFolderView
    case createLinkView
    case folderView
    case linkView
    // Add other cases for different navigation destinations
}


struct MainNavStack: View {
    @State private var navigationPath = NavigationPath()
    @Environment(NavigationStateManager.self) var navigationStateManager: NavigationStateManager
    @Environment(AppViewModel.self) var appViewModel: AppViewModel
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
        NavigationStack(path: Bindable(navigationStateManager).navigationPath) {
            ZStack(alignment: .bottom) {
                Group {
                    switch selectedTab {
                    case 0:
                        HomeViewEntry()
                    case 1:
                        FilesViewEntry()
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
                // Custom Tab Bar
                if !navigationStateManager.isInSubMenu {
                    CustomTabView(selectedTab: $selectedTab)
                    
                }
                
                
            }.navigationDestination(for: NavigationItem.self) { item in
                switch item {
                    
                case .createFolderView:
                    CreateFolderView() // The destination for CreateFolderView
                case .createLinkView:
                    CreateLinkView()
                case .folderView:
                    FolderView()
                case .linkView:
                    LinkView()
                }
                
            }
        }
    }
}

struct CustomTabView: View {
    @Binding var selectedTab: Int
    @Environment(NavigationStateManager.self) var navigationStateManager: NavigationStateManager
    var body: some View {
        VStack {
            Spacer()
            
            // Custom Tab Bar
            HStack(alignment: .bottom) {
                
                HStack(alignment: .bottom){
                    // Home Tab
                    TabBarButton(iconName: "Home", selectedIcon: "HomeSelected", isSelected: selectedTab == 0) {
                            selectedTab = 0
                    }.padding(.leading, Spacing.small)
                    
                    Spacer() // Adds space between buttons
                    
                    // Files Tab
                    TabBarButton(iconName: "File", selectedIcon: "FileSelected", isSelected: selectedTab == 1) {
                            selectedTab = 1
                    }
                    
                    Spacer() // Adds space between buttons
                    
                    // Create Tab (Larger)
                    TabBarButton(iconName: "Create", selectedIcon: "CreateSelected", isSelected: selectedTab == 2, isLarge: true) {
                            selectedTab = 2
                    }.padding(.top, Spacing.small)
                    
                    Spacer() // Adds space between buttons
                    
                    // Info Tab
                    TabBarButton(iconName: "Notice", selectedIcon: "NoticeSelected", isSelected: selectedTab == 3) {
                            selectedTab = 3
                    }
                    
                    Spacer() // Adds space between buttons
                    
                    // Settings Tab
                    TabBarButton(iconName: "Setting", selectedIcon: "SettingSelected", isSelected: selectedTab == 4) {
                            selectedTab = 4
                    }.padding(.trailing, Spacing.small)
                }
                //                .padding([.top], Spacing.small)
                
                .padding([.bottom], Spacing.large)
                
            }
            .padding(.horizontal)
            .background(Color("SubtleTheme").opacity(1))
        }  .edgesIgnoringSafeArea(.bottom)
            .transition(.move(edge: .bottom))
            .frame(maxHeight: navigationStateManager.isInSubMenu ? 0 : Spacing.customNavigationBarHeight)
        
    }
}

struct TabBarButton: View {
    let iconName: String
    let selectedIcon: String
    let isSelected: Bool
    let isLarge: Bool
    let action: () -> Void
    
    init(iconName: String, selectedIcon: String, isSelected: Bool, isLarge: Bool = false, action: @escaping () -> Void) {
        self.iconName = iconName
        self.isSelected = isSelected
        self.isLarge = isLarge
        self.action = action
        self.selectedIcon = selectedIcon
    }
    
    var body: some View {
        Button(action: action) {
            VStack {
                Image(isSelected ? selectedIcon: iconName)
                    .resizable()
                    .aspectRatio(contentMode: .fit)
                    .frame(width: isLarge ? 60 : 30, height: isLarge ? 60 : 30)
                if !isLarge {
                    Text(iconName).font(.caption2)
                }
            }
            .foregroundColor(.themeBlack)
        }
    }
}


#Preview {
    MainNavStack()
        .modelContainer(PreviewContainer)
        .environment(NavigationStateManager())
        .environment(AppViewModel())
}
