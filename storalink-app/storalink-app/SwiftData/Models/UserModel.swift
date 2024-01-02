//
//  UserModel.swift
//  storalink-app
//
//  Created by Yunze Zhao on 11/26/23.
//

import Foundation
import SwiftData

@Model
final class User {
    @Attribute(.unique)
        let id = UUID()
    var name: String
    var email: String
    var folders: [Folder]?
    // Other user properties
    
    init( name: String, email: String) {
        self.name = name
        self.email = email
        self.folders = []
    }
}
