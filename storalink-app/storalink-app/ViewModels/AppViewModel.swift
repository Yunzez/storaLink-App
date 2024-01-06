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
       checkFirstLaunch()
   }
    
    init(userName: String, userEmail: String) {
        self.userName = userName
        self.userEmail = userEmail
        self.user = nil
        self.isAuthenticated = false
        checkFirstLaunch()
    }
    
    public func checkFirstLaunch() {
        let defaults = UserDefaults.standard

        if defaults.bool(forKey: "HasLaunchedOnce") {
            // App has already launched before, so you might not want to show the tutorial.
            print("Not the first launch.")
            self.isFirstLaunch = false
        } else {
            // This is the first launch, show the tutorial and set the flag.
            print("First launch, setting UserDefaults.")
            defaults.set(true, forKey: "HasLaunchedOnce")
            defaults.synchronize()
            self.isFirstLaunch = true
            // Show tutorial or introductory content here.
        }
    }
    
    public func resetFirstLaunch() {
        let defaults = UserDefaults.standard
        
        if defaults.bool(forKey: "HasLaunchedOnce") {
            // App has already launched before, so you might not want to show the tutorial.
            print("Not the first launch.")
            self.isFirstLaunch = true
        }
    }
    
    func setUser(user: User) {
        self.user = user
        self.userName = user.name
        self.userEmail = user.email
    }
    
    func logoutUser() {
        isAuthenticated = false
        userEmail = ""
        userName = ""
        user = nil
    }
}
