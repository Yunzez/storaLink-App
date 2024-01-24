//
//  SignupViewModel.swift
//  storalink-app
//
//  Created by Yunze Zhao on 1/4/24.
//

import Foundation
import SwiftData
@Observable class SignupViewModel {
    let authManager = AuthenticationManager.manager
    let keychainStorage = KeychainStorage()
    let modelManager = ModelUtilManager.manager
    var repassword: String = ""
    var password: String = ""
    var name: String = ""
    var rememberMe: Bool = false
    var email: String = ""
    
    var error: Bool = false
    var errorMessage: String = ""
    
    func checkPassswordMatch() {
        if !password.isEmpty && !repassword.isEmpty{
            if password != repassword {
                error = true
                errorMessage = " Your two passwords do not match "
            } else {
                error = false
                errorMessage = " "
            }
        } else {
            error = false
            errorMessage = " "
        }
    }
    
    func handleSignUp() async  -> User? {
        if name.isEmpty {
            errorMessage = "please fill out the name field"
            error = true
        }
        else if email.count < 8 || password.count < 8 {
            print("email or password need to be longer than 8 characters", email.count, password.count)
            errorMessage = "email or password need to be longer than 8 characters"
            error = true
//            isLoading = false
        } else {
            error = false
            errorMessage = ""
            return await authenticate()
        }
        return nil
    }
    
    func authenticate() async -> User? {
        print("signing user up")
        
        var newUser: User? = nil
        do {
            await authManager.signup(username: name, email: email, password: password) { success, error, user in
                if !success {
                    print("failed signup", error!)
                    self.error = true
                    if let error = error {
                        self.errorMessage = error
                    } else {
                        self.errorMessage = "Something went wrong"
                    }
                } else {
                    
                    guard let user = user else {
                        self.errorMessage = "Auth correct yet unable to get user, pls retry "
                        return
                    }
                    newUser = user
                }
            }
            
            if let ret = newUser {
                return ret
            }
            
            return nil
        }
//        // save to keychain
//        if let hash = hashPassword(password) {
//            do {
//                try await keychainStorage.saveData(data: Data(hash.utf8), with: email)
//                print("save user in keychain")
//            } catch {
//                print("Error saving password hash: \(error)")
//            }
//        }
//
    }
}
