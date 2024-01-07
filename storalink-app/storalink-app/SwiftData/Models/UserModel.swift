//
//  UserModel.swift
//  storalink-app
//
//  Created by Yunze Zhao on 11/26/23.
//

import Foundation
import SwiftData
import UIKit

@Model
final class User {
    @Attribute(.unique)
        let id = UUID()
    var name: String
    var email: String
    var avatorData: Data? = nil
    @Relationship(deleteRule: .cascade, inverse: \Folder.user) var folders: [Folder] = [Folder]()
    // Other user properties
    
    init( name: String, email: String) {
        self.name = name
        self.email = email
        self.folders = []
    }
}
