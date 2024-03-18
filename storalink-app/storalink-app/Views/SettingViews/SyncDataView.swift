//
//  SyncDataView.swift
//  storalink-app
//
//  Created by Yunze Zhao on 1/25/24.
//

import SwiftUI
import SwiftData
struct SyncDataView: View {
    @State private var vibrateOnRing = false
    @Query var folders: [Folder] = []
    var body: some View {
        VStack{
            HStack{
                Text("Sync Your Data (Coming soon)").foregroundColor(.themeGray)
                Spacer()
            }.padding()
            
            FolderSyncScroll()
            Spacer()
        }
    }
}


struct FolderSyncScroll: View {
    @Query var folders: [Folder] = []
    @State private var selectedFolderIDs = Set<UUID>()
    var body: some View {
        VStack {
            HStack{
                
                Text("Select your folder to Synchronize").padding(.horizontal)
                Spacer()
            }
            
            
            if folders.count > 0 {
                HStack{
                    Spacer()
                    Text("Total Folders: \(folders.count)" ).padding(.horizontal)
                }
                ForEach(folders) { folder in
                    HStack {
                        // Image representation (using system name as placeholder)
                        Image(systemName: "folder")
                            .resizable()
                            .frame(width: 50, height: 40)
                            .padding(.trailing, 10)
                        
                        VStack(alignment: .leading) {
                            Text(folder.title)
                                .font(.headline)
                            if let desc = folder.desc {
                                Text(desc)
                                    .font(.subheadline)
                                    .foregroundColor(.gray)
                            }
                            Text("Links: \(folder.links.count)")
                                .font(.caption)
                        }
                        Spacer()
                        if selectedFolderIDs.contains(folder.id) {
                            Image(systemName: "checkmark.circle.fill")
                                .foregroundColor(.green)
                        }
                    }
                    .padding()
                    .background(self.selectedFolderIDs.contains(folder.id) ? Color.gray.opacity(0.2) : Color.clear)
                    .cornerRadius(5)
                    .onTapGesture {
                        self.toggleFolderSelection(folderID: folder.id)
                    }
                }
            } else {
                Text("No folders yet").padding()
            }
        }
    }
    
    private func toggleFolderSelection(folderID: UUID) {
        if selectedFolderIDs.contains(folderID) {
            selectedFolderIDs.remove(folderID)
        } else {
            selectedFolderIDs.insert(folderID)
        }
    }
}

#Preview {
    SyncDataView()
}

