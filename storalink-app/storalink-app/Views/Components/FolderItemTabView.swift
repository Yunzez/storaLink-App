//
//  FolderItemTabView.swift
//  storalink-app
//
//  Created by Yunze Zhao on 11/27/23.
//

import SwiftUI

struct FolderItemTabView: View {
    var folder: Folder
    var imageName: String = "LinkDefaultImg" // The image name for the folder thumbnail
    
    var body: some View {
        HStack(spacing: 8) {
            Image(folder.imgUrl.isEmpty ? imageName : folder.imgUrl) // Replace with actual image
                .resizable()
                .aspectRatio(contentMode: .fill)
                .frame(width: 30, height: 30)
                .clipped()
                .cornerRadius(8)
            
            Text(folder.title)
                .font(.system(size: 12, weight: .semibold)) // Adjust font size and weight as needed
                .lineLimit(2)
            
            Spacer()
            
            Image(systemName: "ellipsis")
                .foregroundColor(.gray)
        }
        .padding(.horizontal, 5)
        .padding(.vertical, 5)
        .frame(height: 40) // The height of the tab
        .background(Color.white) // Use the actual background color
        .cornerRadius(10)
        .shadow(radius: 2) // Optional: if you want to add shadow
        .frame(width: 150, height: 40)
    }
}

#Preview {
    FolderItemTabView(folder: Folder(title: "Error Occured", imgUrl: "", links: []))
}
