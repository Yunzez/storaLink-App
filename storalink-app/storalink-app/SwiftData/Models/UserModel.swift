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
    var avatorPath: String? = nil
    var avatorPathRemote: String? = nil
    var mongoId: String
    @Relationship(deleteRule: .cascade, inverse: \Folder.user) var folders: [Folder] = [Folder]()
    // Other user properties
    
    init( name: String, email: String, mongoId: String) {
        self.name = name
        self.email = email
        self.folders = []
        self.mongoId = mongoId
    }
}
