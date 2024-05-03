//
//  FolderViewModel.swift
//  storalink-app
//
//  Created by Yunze Zhao on 11/26/23.
//

import Foundation
import SwiftData
class FolderViewModel: ObservableObject {
    @Published var like: Bool
    @Published var menu: Bool
    @Published var linkNum: Int
    @Published var searchFieldLength: CGFloat
    @Published var searchOpen: Bool
    @Published var searchText: String
    @Published var showCreateSheet: Bool
    @Published var sortOpen: Bool

    
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
