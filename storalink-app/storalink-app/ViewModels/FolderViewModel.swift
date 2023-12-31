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
    var likeIconPath: String
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
        likeIconPath = "heart"
        menu = false
        searchFieldLength = 130
        searchOpen = false
        searchText = ""
        sortOpen = false
        showCreateSheet = false
    }
    
    func toggleLike() {
        print("handle like ")
        like = !like
        if like {
            likeIconPath = "heart.fill"
        } else {
            likeIconPath = "heart"
        }
        
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
