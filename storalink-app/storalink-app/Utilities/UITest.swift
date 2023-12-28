//
//  UITest.swift
//  storalink-app
//
//  Created by Yunze Zhao on 12/26/23.
//

import SwiftUI
import SwiftData
struct UITest: View {
    @Query private var folders: [Folder]
//    @Query private var links: [Link]
    @Query private var users: [User]
    var body: some View {
        List(folders) { folder in
            Text(folder.title) // Display the folder title
            // Add more details as needed
        }
//        List(links) { link in
//            Text(link.title) // Display the folder title
//            // Add more details as needed
//        }
        List(users) { user in
            Text(user.name)
        }
    }
}

#Preview {
    UITest().modelContainer(PreviewContainer)
}
