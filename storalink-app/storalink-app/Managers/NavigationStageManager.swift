//
//  NavigationStageManager.swift
//  storalink-app
//
//  Created by Yunze Zhao on 12/22/23.
//

import Foundation
class NavigationStateManager: ObservableObject {
    @Published var isInSubMenu: Bool = false
    
    func enterSubMenu() {
        isInSubMenu = true
    }
    
    func exitSubMenu() {
        isInSubMenu = false
    }
}
