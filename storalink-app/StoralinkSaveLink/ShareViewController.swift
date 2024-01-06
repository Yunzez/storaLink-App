//
//  ShareViewController.swift
//  StoralinkSaveLink
//
//  Created by Yunze Zhao on 12/25/23.
//

import UIKit
import SwiftUI
import Social
import MobileCoreServices
import UniformTypeIdentifiers
import SwiftData
var extensionModelContainer: ModelContainer = {
    let schema = Schema([
        User.self,
        Folder.self,
    ])
    let modelConfiguration = ModelConfiguration(schema: schema, isStoredInMemoryOnly: false)
    
    do {
        return try ModelContainer(for: schema, configurations: [modelConfiguration])
    } catch {
        fatalError("Could not create ModelContainer: \(error)")
    }
}()

class ShareViewController: UIViewController {
    override func viewDidLoad() {
        let textDataType = UTType.plainText.identifier
        let urlType = UTType.url.identifier
        
        print("start to get extension and item ", urlType)
        // Create the SwiftUI view, passing a closure that calls completeSharing when executed
        guard
            let extensionItem = extensionContext?.inputItems.first as? NSExtensionItem,
            let itemProvider = extensionItem.attachments?.first else {
            
            close()
            return
        }
        print("get extension and item successfully")
        print(itemProvider.copy())
        
        print("has url", itemProvider.hasItemConformingToTypeIdentifier(urlType))
        
        if itemProvider.hasItemConformingToTypeIdentifier(textDataType){
            
            itemProvider.loadItem(forTypeIdentifier: textDataType , options: nil) { (providedText, error) in
                if let error {
                    self.close()
                    //                    return
                }
                
                if let text = providedText as? String {
                    DispatchQueue.main.async {
                        let swiftUIView = ShareView( sharedURL: text, onCancel: self.close).modelContainer(extensionModelContainer)
                       
                        // Set up the hosting controller as before
                        let hostingController = UIHostingController(rootView: swiftUIView)
                        self.addChild(hostingController)
                        self.view.addSubview(hostingController.view)
                        hostingController.view.frame = self.view.bounds
                        self.view.addSubview(hostingController.view)
                        hostingController.didMove(toParent: self)
                    }
                }else {
                    self.close()
                    return
                }
                
            }
        }
        
        
        
        if itemProvider.hasItemConformingToTypeIdentifier(urlType) {
            print("detect public url")
            // if we get here, we're good and can show the View :D
            itemProvider.loadItem(forTypeIdentifier: urlType , options: nil) { (providedText, error) in
                if let error {
                    self.close()
                    //                    return
                }
                if let url = providedText as? URL {
                    
                    DispatchQueue.main.async {
                        
                        let swiftUIView = ShareView( sharedURL: url.absoluteString, onCancel: self.close).modelContainer(extensionModelContainer)
                        // Set up the hosting controller as before
                        let hostingController = UIHostingController(rootView: swiftUIView)
                        self.addChild(hostingController)
                        self.view.addSubview(hostingController.view)
                        hostingController.view.frame = self.view.bounds
                        self.view.addSubview(hostingController.view)
                        hostingController.didMove(toParent: self)
                    }
                } else {
                    self.close()
                    return
                }
            }
        }
        
        print("info", itemProvider.copy())
    }
    
    
    func close() {
        self.extensionContext?.completeRequest(returningItems: [], completionHandler: nil)
    }
    
    
    
    
}
