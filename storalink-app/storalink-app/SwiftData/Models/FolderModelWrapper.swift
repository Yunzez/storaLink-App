//
//  FolderModelWrapper.swift
//  storalink-app
//
//  Created by Yunze Zhao on 3/18/24.
//

import Foundation
import SwiftData
@Observable
class FolderModelWrapper {
    public var folder: Folder

    init(folder: Folder) {
        self.folder = folder
    }
    
    public func getFolder() -> Folder {
        return self.folder
    }
    
    
}
