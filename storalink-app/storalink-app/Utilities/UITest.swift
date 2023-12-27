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
  
    
    var body: some View {
            List(folders) { folder in
                Text(folder.title) // Display the folder title
                // Add more details as needed
            }
        }
}

#Preview {
    UITest().modelContainer(folderPreviewSampleContainer)
}
