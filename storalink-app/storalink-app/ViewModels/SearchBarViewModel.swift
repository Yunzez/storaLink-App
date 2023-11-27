//
//  SearchBarViewModel.swift
//  storalink-app
//
//  Created by Yunze Zhao on 11/27/23.
//

import Foundation
// ViewModel for the SearchBar
class SearchBarViewModel: ObservableObject {
    @Published var searchText = ""
    @Published var results: [String] = [] // This would be your data model
    @Published var isSearching = false

    // Method to fetch search results - this is where you would add your logic
    func search() {
        // Replace this with actual search logic
        if searchText.isEmpty {
            isSearching = false
            results = []
        } else {
            isSearching = true
            // Mock results
            results = ["Result 1", "Result 2", "Result 3"]
        }
    }
}
