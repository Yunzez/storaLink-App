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
                return "http://localhost:3001"
            case .production:
                return "https://api.storalink.com"
            }
        }
        

    }
    static let imageBaseUrl : String = "https://storalink-image.s3.us-east-2.amazonaws.com/images/"
    
    static let baseURL = Configuration.currentEnvironment.baseURL

    private static var currentEnvironment: Environment {
        #if DEBUG
        return .testing
        #else
        return .production
        #endif
    }

}
