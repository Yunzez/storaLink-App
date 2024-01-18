//
//  LinkItemViewModel.swift
//  storalink-app
//
//  Created by Yunze Zhao on 12/22/23.
//

import Foundation
@Observable
class LinkItemViewModel {
    // Properties and methods for managing links
    var moreOpen: Bool = false
    var openMove: Bool = false
    
    func toggleMore() {
        moreOpen.toggle()
    }
    
    func toggleMove() {
        openMove.toggle()
    }
}
