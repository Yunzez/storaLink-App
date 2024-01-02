//
//  LinkItemViewModel.swift
//  storalink-app
//
//  Created by Yunze Zhao on 12/22/23.
//

import Foundation
class LinkItemViewModel: ObservableObject {
    // Properties and methods for managing links
    @Published var moreOpen: Bool
    
    init() {
        self.moreOpen = false
    }
    
    func toggleMore() {
        moreOpen = !moreOpen
    }
}
