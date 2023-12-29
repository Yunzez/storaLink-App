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

    var userName: String?
    var userEmail: String?
    var user: User?
   init(userName: String? = nil) {
       self.userName = userName ?? ""
       self.user = nil
   }
    
    func setUser(user: User) {
        self.user = user
    }
}
