//
//  UIApplicationExtensions.swift
//  storalink-app
//
//  Created by Yunze Zhao on 1/17/24.
//

import Foundation
import SwiftUI
// Extend UIApplication to dismiss the keyboard
extension UIApplication {
    func endEditing() {
        sendAction(#selector(UIResponder.resignFirstResponder), to: nil, from: nil, for: nil)
    }
}

extension UIApplication {
    func openURL(_ url: URL) {
        if self.canOpenURL(url) {
            self.open(url, options: [:], completionHandler: nil)
        }
    }
}

