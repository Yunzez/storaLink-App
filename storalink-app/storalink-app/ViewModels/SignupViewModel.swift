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
        if !password.isEmpty {
            if password != repassword {
                error = true
                errorMessage = " Your two passwords do not match "
            }
        }
    }
}
