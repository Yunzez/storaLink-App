//
//  SignupViewModel.swift
//  storalink-app
//
//  Created by Yunze Zhao on 1/4/24.
//

import Foundation
import SwiftData
@Observable class SignupViewModel {
    let keychainStorage = KeychainStorage()
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
    
    func authenticate() async -> User   {
        print("signing user up")
        
        // save to keychain
        if let hash = hashPassword(password) {
            do {
                try await keychainStorage.saveData(data: Data(hash.utf8), with: email)
                print("save user in keychain")
            } catch {
                print("Error saving password hash: \(error)")
            }
        }
        
        let newUser = User(name: name, email: email)
        return newUser
    }
}
