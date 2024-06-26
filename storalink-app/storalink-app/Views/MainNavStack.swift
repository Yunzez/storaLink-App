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
    @State private var refresh: Int = 0
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
    @State private var someState: Int = 0
    
    var body: some View {
        NavigationStack(path: Bindable(navigationStateManager).navigationPath) {
            GeometryReader { geometry in
                VStack() {
                    
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
                    }.frame(maxWidth: .infinity, maxHeight: .infinity)
                    //                        .border(.red)
                    // MARK: - Custom Tab Bar
                    if !navigationStateManager.isInSubMenu {
                        CustomTabView(selectedTab: $selectedTab)
//                            .overlay(
//                                // Top border
//                                Rectangle()
//                                    .frame(height: 1)
//                                    .foregroundColor(Color.themeWhite),
//                                alignment: .top
//                            )
                        //                            .border(.green)
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
                    
                }.frame(width: geometry.size.width, height: geometry.size.height)
                    .clipped()
            }.background(Color.themeWhite.edgesIgnoringSafeArea(.top))
                .edgesIgnoringSafeArea(.bottom)
        }
    }
}

struct CustomTabView: View {
    @Environment(\.colorScheme) var colorScheme
    @Binding var selectedTab: Int
    @Environment(NavigationStateManager.self) var navigationStateManager: NavigationStateManager
    
    var body: some View {
        VStack {
            
            if colorScheme == .light {
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
                        }.padding(.top, 6)
                        
                        Spacer() // Adds space between buttons
                        
                        // Info Tab
                        TabBarButton(iconName: "Notice", selectedIcon: "NoticeSelected", isSelected: selectedTab == 3) {
                            selectedTab = 3
                        }
                        
                        Spacer() // Adds space between buttons
                        
                        // Settings Tab
                        TabBarButton(iconName: "Setting", selectedIcon: "SettingSelected", isSelected: selectedTab == 4, text: "Profile") {
                            selectedTab = 4
                        }.padding(.trailing, Spacing.small)
                    }
                    //                .padding([.top], Spacing.small)
                    
                    //                    .padding([.bottom], Spacing.large)
                }
                .padding(.horizontal)
            }
            else { // dark theme
                HStack(alignment: .bottom) {
                    HStack(alignment: .bottom){
                        // Home Tab
                        TabBarButton(iconName: "HomeLight", selectedIcon: "HomeSelected", isSelected: selectedTab == 0, text: "Home", action:  {
                            selectedTab = 0
                        }).padding(.leading, Spacing.small)
                        
                        Spacer() // Adds space between buttons
                        
                        // Files Tab
                        TabBarButton(iconName: "FileLight",  selectedIcon: "FileSelected", isSelected: selectedTab == 1, text: "File") {
                            selectedTab = 1
                        }
                        
                        Spacer() // Adds space between buttons
                        
                        // Create Tab (Larger)
                        TabBarButton(iconName: "CreateLight", selectedIcon: "CreateSelected", isSelected: selectedTab == 2, isLarge: true , text:"") {
                            selectedTab = 2
                        }.padding(.top, 6)
                        
                        Spacer() // Adds space between buttons
                        
                        // Info Tab
                        TabBarButton(iconName: "NoticeLight", selectedIcon: "NoticeSelected", isSelected: selectedTab == 3 , text:"Notice") {
                            selectedTab = 3
                        }
                        
                        Spacer() // Adds space between buttons
                        
                        // Settings Tab
                        TabBarButton(iconName: "SettingLight", selectedIcon: "SettingSelected", isSelected: selectedTab == 4, text:"Setting") {
                            selectedTab = 4
                        }.padding(.trailing, Spacing.small)
                    }
                    //                .padding([.top], Spacing.small)
                    
                    //                    .padding([.bottom], Spacing.large)
                }
                .padding(.horizontal)
            }
            Spacer()
            
        }.frame(maxHeight: navigationStateManager.isInSubMenu ? 0 : Spacing.customNavigationBarHeight)
            .safeAreaInset(edge: .bottom){
                Text(" ")
            }
            .transition(.move(edge: .bottom))
        
            .background(Color.subtleTheme)
        
        
    }
}

struct TabBarButton: View {
    let iconName: String
    let selectedIcon: String
    let isSelected: Bool
    let isLarge: Bool
    let action: () -> Void
    var text: String?
    
    init(iconName: String, selectedIcon: String, isSelected: Bool, isLarge: Bool = false, text:String? = nil, action: @escaping () -> Void) {
        self.iconName = iconName
        self.isSelected = isSelected
        self.isLarge = isLarge
        self.action = action
        self.selectedIcon = selectedIcon
        self.text = text
    }
    
    var body: some View {
        Button(action: action) {
            VStack {
                Image(isSelected ? selectedIcon: iconName)
                    .resizable()
                    .aspectRatio(contentMode: .fit)
                    .frame(width: isLarge ? 60 : 30, height: isLarge ? 60 : 30)
                    .foregroundColor(.themeBlack)
                if !isLarge {
                    if let customText = text {
                        Text(customText)
                            .font(.caption2)
                            .foregroundColor(isSelected ? Color.theme : .themeBlack) // Conditional color
                    } else {
                        Text(iconName)
                            .font(.caption2)
                            .foregroundColor(isSelected ? Color.theme : .themeBlack) // Conditional color
                    }
                }
            }
            .foregroundColor(.themeBlack)
        }.ignoresSafeArea(.keyboard)
    }
}


#Preview {
    MainNavStack()
        .modelContainer(PreviewContainer)
        .environment(NavigationStateManager())
        .environment(AppViewModel())
}
