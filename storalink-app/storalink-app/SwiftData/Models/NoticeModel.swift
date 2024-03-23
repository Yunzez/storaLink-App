//
//  NoticeModel.swift
//  storalink-app
//
//  Created by Yunze Zhao on 3/22/24.
//

import Foundation
import SwiftData

enum NoticeActionType: String, Codable {
    case folderCreate = "FolderCreate"
    case linkCreate = "LinkCreate"
    case folderDelete = "FolderDelete"
    case linkDelete = "LinkDelete"
}

@Model
final class Notice {
    
    @Attribute(.unique)
    let id = UUID()
    let time: Date = Date()
    private var typeRaw: String
    var name: String
    
    // Computed property to get/set the enum using the raw value
    var type: NoticeActionType {
        get { NoticeActionType(rawValue: typeRaw)! }
        set { typeRaw = newValue.rawValue }
    }
    
    init(type: NoticeActionType, name: String) {
        self.typeRaw = type.rawValue
        self.name = name
    }
}
