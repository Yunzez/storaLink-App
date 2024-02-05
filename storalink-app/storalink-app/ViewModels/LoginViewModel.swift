//
//  LoginViewModel.swift
//  storalink-app
//
//  Created by Yunze Zhao on 12/20/23.
//

import Foundation
import SwiftData
import SwiftUI


@Observable class LoginViewModel {
    
    let keychainStorage = KeychainStorage()
    let authManager = AuthenticationManager.manager
    let modelManager = ModelUtilManager.manager
    let folderManager = FolderManager.manager
    let syncManager = SynchronizationManager.manager
    var context: ModelContext?
    var appData: AppViewModel?
    
    var email: String = ""
    var password: String = ""
    var rememberMe: Bool = false
    var error: Bool = false
    var errorMessage: String = ""
    var isLoading: Bool = false // For showing loading indicator
    var loadingProgress: Int = 0
    
    //    var userViewModel: UserViewModel // Assuming this is needed for authentication
    
    init() {
        context = nil
        appData = nil
    }
    
    func setup(modelContext: ModelContext, appViewModel: AppViewModel) {
        context = modelContext
        appData = appViewModel
    }
    
    func handleLogin() {
        if email.count < 8 || password.count < 8 {
            print("email or password need to be longer than 8 characters", email.count, password.count)
            errorMessage = "email or password need to be longer than 8 characters"
            error = true
            isLoading = false
        } else {
            error = false
            errorMessage = ""
            isLoading = false
            print("access")
            Task {
                await authenticate()
                
                if !self.error {
                    self.handleLoading(loadingProgress: self.loadingProgress)
                }
            }
        }
    }
    
    func authenticate() async {
        guard let context = context else {
            print("Model context is nil")
            return
        }
        
        //        // this insert testing data
        //
        //        if let hash = hashPassword("12345678") {
        //            do {
        //                try await keychainStorage.saveData(data: Data(hash.utf8), with: "yz8751@nyu.edu")
        //                try await keychainStorage.saveData(data: Data(hash.utf8), with: "harry@uw.edu")
        //            } catch {
        //                print("Error saving password hash: \(error)")
        //            }
        //        }
        
        do {
            await authManager.login(email: email, password: password) { success, error, user in
                if success {
                    print("auth correct")
                    // Handle successful login
                    // Check if the user exists in the local database
                    if let localUser =  self.fetchLocalUserByEmail(email: self.email) {
                        print("local user")
                        // User exists in local database
                        self.appData?.userName = localUser.name
                        self.appData?.setUser(user: localUser)
                    } else {
                        if let remoteUser = user {
                            print("remote user")
                            // User not found in local database, add them
                            self.modelManager.addUserToLocalDB(modelContext: context, user: remoteUser)
                            self.appData?.userName = remoteUser.name
                            self.appData?.setUser(user: remoteUser)
                        }
                    }
                    
                    // get all folders
                    if let user = self.appData?.user {
                        self.folderManager.getAllFolders(user: user){
                            result in
                            //                            DispatchQueue.main.async {
                            switch result {
                            case .success(let folders):
                                // Update your UI with the fetched folders
                                print("Fetched folders: \(folders)")
                                print("Synchronizing")
                                self.syncManager.syncFolders(modelContext: context, folders: folders, userId: self.appData?.userId ?? UUID())
                                
                            case .failure(let error):
                                // Handle any errors (e.g., show an error message)
                                print("Error fetching folders: \(error)")
                            }
                            //                            }
                        }
                    }
                    
                    
                    // Record login activity
                    self.appData?.recordLogin(userEmail: self.email)
                    
                } else {
                    // Handle login error
                    print("login failed", error!)
                    self.error = true
                    if let error = error {
                        self.errorMessage = error
                    } else {
                        self.errorMessage = "Something went wrong"
                    }
                }
            }
            if (self.appData?.userName ?? "").isEmpty {
                self.error = true
                self.errorMessage = "We can't find you in the database, check your email again"
            }
        } 
    }
    
    func fetchLocalUserByEmail(email: String) -> User?{
        guard let context = context else {
            print("Model context is nil")
            return nil
        }
        do {
            let descriptor = FetchDescriptor<User>(sortBy: [SortDescriptor(\.name)])
            let users = try context.fetch(descriptor)
            
            for user in users {
                if user.email == email {
                    return user
                }
            }
        } catch {
            print("error")
        }
        
        return nil
    }
    
    func handleLoading(loadingProgress: Int){
        DispatchQueue.main.async {
            print("handling loading, a test", self.appData?.userName ?? "No user" )
            self.isLoading = true
            let duration = 3 // Total duration of loading in seconds
            let interval = 0.1 // Time interval for each increment
            var timeElapsed = 0.0
            
            Timer.scheduledTimer(withTimeInterval: interval, repeats: true) {
                timer in DispatchQueue.main.async {
                    self.loadingProgress = Int((timeElapsed / Double(duration)) * 100)
                    if timeElapsed >= Double(duration) {
                        timer.invalidate()
                        self.isLoading = false
                        print("loading finished")
                        if let appData = self.appData {
                            appData.isAuthenticated = true
                        } else {
                            print("appData is nil")
                        }
                        self.loadingProgress = 100
                        
                    }
                }
                timeElapsed += interval
            }
        }
    }
}
