//
//  AppViewModel.swift
//  storalink-app
//
//  Created by Yunze Zhao on 12/28/23.
//

import Foundation
import SwiftData

@Observable
class AppViewModel {
    var isFirstLaunch: Bool?
    var isAuthenticated: Bool
    var userName: String?
    var userEmail: String?
    var user: User?
    
   init() {
       self.userName = ""
       self.userEmail = ""
       self.user = nil
       self.isAuthenticated = false
   }
    
    init(userName: String, userEmail: String) {
        self.userName = userName
        self.userEmail = userEmail
        self.user = nil
        self.isAuthenticated = false
    }
    
    func setUser(user: User) {
        self.user = user
    }
    
    func logoutUser() {
        isAuthenticated = false
        userEmail = ""
        userName = ""
        user = nil
    }
}
