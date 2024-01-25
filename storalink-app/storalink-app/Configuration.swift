//
//  configuration.swift
//  storalink-app
//
//  Created by Yunze Zhao on 1/23/24.
//

import Foundation
struct Configuration {
    
    enum Environment {
        case testing
        case production

        var baseURL: String {
            switch self {
            case .testing:
                return "http://localhost:3333"
            case .production:
                return "https://your-production-api.com"
            }
        }
    }
    
    
    static let baseURL = Configuration.currentEnvironment.baseURL

    private static var currentEnvironment: Environment {
        #if DEBUG
        return .testing
        #else
        return .production
        #endif
    }

}