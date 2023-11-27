//
//  DataManager.swift
//  storalink-app
//
//  Created by Yunze Zhao on 11/26/23.
//

import Foundation
class DataManager {
    static let shared = DataManager()

    private init() {} // Private initializer for Singleton

    // UserDefaults keys
    private let usernameKey = "username"
    private let hasSavedDataKey = "hasSavedData"

    // Load data from UserDefaults
    var username: String? {
        get { UserDefaults.standard.string(forKey: usernameKey) }
        set { UserDefaults.standard.set(newValue, forKey: usernameKey) }
    }

    var hasSavedData: Bool {
        get { UserDefaults.standard.bool(forKey: hasSavedDataKey) }
        set { UserDefaults.standard.set(newValue, forKey: hasSavedDataKey) }
    }

    // Additional data management functions...
}
