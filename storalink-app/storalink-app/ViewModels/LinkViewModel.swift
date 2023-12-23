//
//  LinkViewModel.swift
//  storalink-app
//
//  Created by Yunze Zhao on 11/26/23.
//

import Foundation
class LinkViewModel: ObservableObject {
    // Properties and methods for managing links
    @Published var moreOpen: Bool
    
    init() {
        self.moreOpen = false
    }
    
    func toggleMore() {
        moreOpen = !moreOpen
    }
}
