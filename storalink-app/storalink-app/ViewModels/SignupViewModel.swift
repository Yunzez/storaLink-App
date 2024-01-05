//
//  SignupViewModel.swift
//  storalink-app
//
//  Created by Yunze Zhao on 1/4/24.
//

import Foundation
import SwiftData
@Observable class SignupViewModel {
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
    
    func handleSignUp() -> User? {
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
            return authenticate()
        }
        return nil
    }
    
    func authenticate() -> User {
        print("signing user up")
        let newUser = User(name: name, email: email)
        return newUser
    }
}
