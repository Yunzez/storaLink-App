//
//  ShareEntry.swift
//  StoralinkSaveLink
//
//  Created by Yunze Zhao on 3/17/24.
//

import SwiftUI

struct ShareEntry: View {
    var onCancel: () -> Void
    var linkText: String
    init(sharedURL: String, onCancel: @escaping () -> Void) {
     
        self.onCancel = onCancel
        self.linkText = sharedURL
    }
    var body: some View {
        NavigationView{
            ShareView(sharedURL: linkText) {
                onCancel()
            }
        }
    }
}

#Preview {
    ShareEntry(sharedURL: "") {
        print("leave")
    }
}
