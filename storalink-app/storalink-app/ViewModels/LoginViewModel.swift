//
//  LoginViewModel.swift
//  storalink-app
//
//  Created by Yunze Zhao on 12/20/23.
//

import Foundation
class LoginViewModel: ObservableObject {
    @Published var email: String = ""
    @Published var password: String = ""
    @Published var rememberMe: Bool = false
    @Published var error: Bool = false
    @Published var errorMessage: String = ""
    @Published var isLoading: Bool = false // For showing loading indicator
    @Published var loadingProgress: Int = 0

    var userViewModel: UserViewModel // Assuming this is needed for authentication

    init(userViewModel: UserViewModel) {
        self.userViewModel = userViewModel
    }

    func handleLogin() {
        print("login ")
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
        

         // Hide loading indicator
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
