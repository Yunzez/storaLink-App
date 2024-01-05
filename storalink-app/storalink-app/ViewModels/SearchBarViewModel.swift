//
//  SearchBarViewModel.swift
//  storalink-app
//
//  Created by Yunze Zhao on 11/27/23.
//

import Foundation
import SwiftData
// ViewModel for the SearchBar

enum SearchResult {
    case folder(Folder)
    case link(Link)
    
    // Provide an `id` for Identifiable conformance
        var id: String {
            switch self {
            case .folder(let folder):
                return "folder_\(folder.id)"
            case .link(let link):
                return "link_\(link.id)"
            }
        }

        // Hashable conformance as before
        func hash(into hasher: inout Hasher) {
            hasher.combine(id)
        }
}

@Observable class SearchBarViewModel {
     var searchText = ""
    var results: [SearchResult] = [] // This would be your data model
     var isSearching = false
    
    // Method to fetch search results - this is where you would add your logic
    func search(folders: [Folder], links: [Link]) {
        results.removeAll()  // Clear previous results

            for folder in folders {
                if folder.title.localizedCaseInsensitiveContains(searchText) {
                    results.append(.folder(folder))
                }
            }
            
            for link in links {
                if link.title.localizedCaseInsensitiveContains(searchText){
                    results.append(.link(link))
                }
            }
        
    }
}
