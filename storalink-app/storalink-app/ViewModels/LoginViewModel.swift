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
    var context: ModelContext?
    var appData: AppViewModel?
    
     var email: String = ""
     var password: String = ""
     var rememberMe: Bool = false
     var error: Bool = false
     var errorMessage: String = ""
     var isLoading: Bool = false // For showing loading indicator
     var loadingProgress: Int = 0
    
    var userViewModel: UserViewModel // Assuming this is needed for authentication
    
    init(userViewModel: UserViewModel) {
        self.userViewModel = userViewModel
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
            handleLoading(loadingProgress: loadingProgress)
        }
        
        if let context = context {
            do {
                print("login")
                let descriptor = FetchDescriptor<User>(sortBy: [SortDescriptor(\.name)])
                let users = try context.fetch(descriptor)
                
                for user in users {
                    print(user.name)
                    if(user.name == "Eddie Eidde" ) {
                        print("login user", user.name)
                        appData?.userName = user.name
                        appData?.setUser(user: user)
                    }
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
                    self.userViewModel.isAuthenticated = true
                    self.loadingProgress = 100
                    print("User Authenticated: \(self.userViewModel.isAuthenticated)")
                }
            }
            timeElapsed += interval
        }
    }
}
