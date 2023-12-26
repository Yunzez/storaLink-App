//
//  ShareViewController.swift
//  StoralinkSaveLink
//
//  Created by Yunze Zhao on 12/25/23.
//

import UIKit
import SwiftUI

class ShareViewController: UIViewController {
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        let swiftUIView = ShareView()  // Replace with your actual SwiftUI view
        let hostingController = UIHostingController(rootView: swiftUIView)

        addChild(hostingController)
        hostingController.view.frame = self.view.bounds
        view.addSubview(hostingController.view)
        hostingController.didMove(toParent: self)

        // Set up any additional configurations...
    }

    // You'll need a method or way to handle when the user is done sharing
    func completeSharing() {
        // Perform any necessary operations before completing
        
        // Then complete the extension context
        extensionContext?.completeRequest(returningItems: [], completionHandler: nil)
    }
    
    // Handle incoming content and pass it to your SwiftUI view
    func handleIncomingContent() {
        // Access and handle the content from extensionContext
    }
}
