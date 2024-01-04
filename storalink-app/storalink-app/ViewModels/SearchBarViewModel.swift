//
//  SearchBarViewModel.swift
//  storalink-app
//
//  Created by Yunze Zhao on 11/27/23.
//

import Foundation
import SwiftData
// ViewModel for the SearchBar
@Observable class SearchBarViewModel {
     var searchText = ""
     var results: [String] = [] // This would be your data model
     var isSearching = false
    
    // Method to fetch search results - this is where you would add your logic
    func search() {
        
        // Replace this with actual search logic
        if searchText.isEmpty {
            results = ["Result 1", "Result 2", "Result 3"]
        } else {
            // Mock results
            results = ["Result 1", "Result 2", "Result 3"]
            print("search", searchText, isSearching, results)

        }
    }
}
