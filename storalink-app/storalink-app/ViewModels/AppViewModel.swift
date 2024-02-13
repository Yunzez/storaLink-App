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
    let fileManager = LocalFileManager.manager
    var isFirstLaunch: Bool?
    var isAuthenticated: Bool
    
    var userId: UUID? = nil
    var userName: String?
    var userEmail: String?
    var user: User?
    
   init() {
       self.userName = "Fred Zhao"
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
    
    public func recordLogin(userEmail: String) {
        // store in local defaults
        let defaults = UserDefaults.standard
        defaults.set(userEmail, forKey: "lastLoggedinUser")
        defaults.synchronize()
        
        // store in shared defaults
        guard let sharedDefaults = UserDefaults(suiteName: "group.com.storalink.appgroup") else {
                print("Unable to access shared UserDefaults")
                return
            }
            
        sharedDefaults.set(userEmail, forKey: "lastLoggedinUser")
    }
    
    public func checkLastLogin() -> String{
        let defaults = UserDefaults.standard
        if let userEmail = defaults.string(forKey: "lastLoggedinUser") {
            print("user logged in before")
            return userEmail
        } else {
            print("user has not logged in before")
        }
        return ""
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
        self.userId = user.id
        
        if let remotePath = user.avatorPathRemote {
            if let localPath = user.avatorPath  {
                if !fileManager.fileExists(atPath: localPath){
                    print("fetch image using remote path")
                    downloadImage(from: remotePath) { downloadedImage in
                        if let image = downloadedImage {
                            let filePath = self.fileManager.saveImage(image: image)
                            user.avatorPath = filePath
                        }
                    }
                }
            }
        }
    
    }
    
    func logoutUser() {
        isAuthenticated = false
        userEmail = ""
        userName = ""
        userId = nil
        user = nil
    }
    
    func fetchAllUserData() {
        
    }
}
