//
//  UITest.swift
//  storalink-app
//
//  Created by Yunze Zhao on 12/26/23.
//

import SwiftUI
import SwiftData
struct UITest: View {
    @Environment(\.modelContext) var modelContext
    @Query private var folders: [Folder]
    @Query private var links: [Link]
    @Query private var users: [User]
    
    private func deleteFolders(at offsets: IndexSet) {
        for index in offsets {
            let folderToDelete = folders[index]
            modelContext.delete(folderToDelete)
        }
        do {
            try modelContext.save()
            try modelContext.delete(model: Link.self, where: #Predicate<Link> { link in
                link.parentFolder == nil
            })
        } catch {
            print(error.localizedDescription)
            // Handle the error appropriately
        }
    }
    
    
    var body: some View {
        List {
            ForEach(folders, id: \.self) { folder in
                Text(folder.title) // Display the folder title
                // Add more details as needed
            }
            .onDelete(perform: deleteFolders)
        }
        
        List(links, id: \.self) { link in
            HStack {
                Text(link.title) // Display the link title
                Spacer()
                // Display the parent folder title if it exists
                if let parentFolder = link.parentFolder {
                    Text(parentFolder.title).foregroundColor(.gray)
                } else {
                    Text("No folder").foregroundColor(.red) // Indicate no parent folder
                }
            }
        }
        List(users) { user in
            Text(user.name)
        }
    }
}

#Preview {
    UITest().modelContainer(PreviewContainer)
}
