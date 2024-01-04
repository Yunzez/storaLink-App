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
            authenticate()
        }
    }
    
    func authenticate() {
        //Mark: -
        
        Task {
            if let hash = hashPassword("12345678") {
                do {
                    try await keychainStorage.saveData(data: Data(hash.utf8), with: "yz8751@nyu.edu")
                } catch {
                    print("Error saving password hash: \(error)")
                }
            }
        }
        
        if let context = context {
            do {
                print("login")
                let descriptor = FetchDescriptor<User>(sortBy: [SortDescriptor(\.name)])
                let users = try context.fetch(descriptor)
                
                for user in users {
                    print(user.name)
                    if(user.email == email ) {
                        Task{
                            do {
                                let savedPasswordData = try await self.keychainStorage.getData(for: user.email)
                                
                                if savedPasswordData != nil {
                                    if let savedPassword = String(data: savedPasswordData!, encoding: .utf8) {
                                        // Now you have the saved password as a String and can compare it with the user's input.
                                        print("Retrieved saved password: \(savedPassword)")
                                        // Compare with user's input password here
                                        if savedPassword == hashPassword(password) {  // Assuming you have the user's entered password as `userEnteredPassword`
                                            print("Passwords match")
                                            appData?.userName = user.name
                                            appData?.setUser(user: user)
                                            // this step we let user pass
                                        } else {
                                            print("Passwords do not match")
                                            error = true
                                            errorMessage = "Your password is incorrect"
                                        }
                                    } else {
                                        print("Failed to convert saved password data to String")
                                    }
                                }
                                
                                
                            }
                        }
                    }
                }
                
                if !error {
                    handleLoading(loadingProgress: loadingProgress)
                }
            } catch {
                print("Fetch failed: \(error)")
            }
        } else {
            print("Model context is nil")
        }
    }
    
    func handleLoading(loadingProgress: Int){
        print("handling loading")
        isLoading = true
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
