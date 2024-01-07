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
        
        // this insert testing data
        
        if let hash = hashPassword("12345678") {
            do {
                try await keychainStorage.saveData(data: Data(hash.utf8), with: "yz8751@nyu.edu")
                try await keychainStorage.saveData(data: Data(hash.utf8), with: "harry@uw.edu")
            } catch {
                print("Error saving password hash: \(error)")
            }
        }

        do {
            print("login test")
            let descriptor = FetchDescriptor<User>(sortBy: [SortDescriptor(\.name)])
            let users = try context.fetch(descriptor)
            
            for user in users {
                print(user.name, user.email, email)
                if user.email == email {
                        let savedPasswordData = try await keychainStorage.getData(for: user.email)
                        
                        if let savedPasswordData = savedPasswordData,
                           let savedPassword = String(data: savedPasswordData, encoding: .utf8),
                           let hashedPassword = hashPassword(password) {
                            
                            print("Retrieved saved password: \(savedPassword)")
                            if savedPassword == hashedPassword {
                                print("Passwords match")
                                self.appData?.userName = user.name
                                self.appData?.setUser(user: user)
                                
                                // record login activity
                                self.appData?.recordLogin(userEmail: email)
                                return
                            } else {
                                print("Passwords do not match")
                                    self.error = true
                                    self.errorMessage = "Your password is incorrect"
                            }
                        } else {
                            print("Failed to retrieve or convert saved password data to String")
                        }
                }
            }
            if (self.appData?.userName ?? "").isEmpty {
                self.error = true
                self.errorMessage = "We can't find you in the database, check your email again"
            }
           
        } catch {
            print("Fetch failed: \(error)")
        }
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
