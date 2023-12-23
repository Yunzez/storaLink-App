//
//  FolderViewModel.swift
//  storalink-app
//
//  Created by Yunze Zhao on 11/26/23.
//

import Foundation
class FolderViewModel: ObservableObject {
    @Published var like: Bool
    @Published var likeIconPath: String
    @Published var menu: Bool
    @Published var linkNum: Int
    @Published var searchFieldLength: CGFloat
    @Published var searchOpen: Bool
    @Published var searchText: String
    
    @Published var sortOpen: Bool

    
    init() {
        like = false
        linkNum = 10
        likeIconPath = "heart"
        menu = false
        searchFieldLength = 130
        searchOpen = false
        searchText = ""
        sortOpen = false
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
