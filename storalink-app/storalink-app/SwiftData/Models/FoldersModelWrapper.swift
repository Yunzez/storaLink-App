//
//  FoldersModelWrapper.swift
//  storalink-app
//
//  Created by Yunze Zhao on 3/18/24.
//

import Foundation
import SwiftData
@Observable
class FoldersModelWrapper {
    var folders: [Folder]

    init(folders: [Folder]) {
        self.folders = folders
    }
    
    
}
