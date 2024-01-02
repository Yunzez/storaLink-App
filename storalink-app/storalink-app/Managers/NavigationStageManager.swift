//
//  NavigationStageManager.swift
//  storalink-app
//
//  Created by Yunze Zhao on 12/22/23.
//

import SwiftUI
import Foundation
import Observation
@Observable class NavigationStateManager {
    var isInSubMenu: Bool = false
    var navigationPath = NavigationPath()
    var lastNavigationSource: NavigationSource = .normal
    var focusFolder: Folder?
    var focusLink: Link? 
    enum NavigationSource {
            case normal
            case createdFolder
            // Add more cases as needed for different navigation contexts
        }
    
    
    func enterSubMenu() {
        isInSubMenu = true
    }
    
    func exitSubMenu() {
        isInSubMenu = false
    }
    
//    func navigateTo(_ view: Any, source: NavigationSource = .normal) {
//           navigationPath.append(view)
//           lastNavigationSource = source  // Set the navigation source
//       }
//    
    func navigateBack() {
        if(lastNavigationSource == .createdFolder) {
            navigationPath = NavigationPath()
        }
        else if !navigationPath.isEmpty {
            navigationPath.removeLast()
        }
        // Reset the navigation source or handle as needed
        lastNavigationSource = .normal
    }
    
    func navigateToRoot() {
        navigationPath = NavigationPath()
    }
    
}
