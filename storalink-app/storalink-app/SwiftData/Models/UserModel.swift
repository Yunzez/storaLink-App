//
//  UserModel.swift
//  storalink-app
//
//  Created by Yunze Zhao on 11/26/23.
//

import Foundation
import SwiftData

@Model
class User {
    @Attribute(.unique) var id: Int
    var name: String
    var email: String
    // Other user properties
    
    init(id: Int, name: String, email: String) {
        self.id = id
        self.name = name
        self.email = email
    }
}
