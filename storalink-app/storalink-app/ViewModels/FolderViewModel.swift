//
//  FolderViewModel.swift
//  storalink-app
//
//  Created by Yunze Zhao on 11/26/23.
//

import Foundation
import SwiftData
@Observable class FolderViewModel {
    var like: Bool
    var menu: Bool
    var linkNum: Int
    var searchFieldLength: CGFloat
    var searchOpen: Bool
    var searchText: String
    var showCreateSheet: Bool
    var sortOpen: Bool

    
    init() {
        like = false
        linkNum = 10
        menu = false
        searchFieldLength = 130
        searchOpen = false
        searchText = ""
        sortOpen = false
        showCreateSheet = false
    }
    
    func toggleMenu(){
        print("toggle menu")
        menu = !menu
        
    }    // Properties and methods for managing folders
    
    func searchButtonClick(){
        searchOpen = !searchOpen
    }
    
    func sortButtonClick(){
        sortOpen = !sortOpen
    }
}
