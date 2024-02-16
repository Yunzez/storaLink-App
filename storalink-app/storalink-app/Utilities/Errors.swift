//
//  Errors.swift
//  storalink-app
//
//  Created by Yunze Zhao on 2/13/24.
//

import Foundation
enum AppError: Error {
    case passwordHashingFailed
}

enum AppErrorCodes: Int {
   case passwordHashingFailed = 1001
   // Add other error codes as needed
}
