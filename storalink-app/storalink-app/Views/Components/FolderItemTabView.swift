//
//  FolderItemTabView.swift
//  storalink-app
//
//  Created by Yunze Zhao on 11/27/23.
//

import SwiftUI

struct FolderItemTabView: View {
    var imageName: String = "FolderPlaceholder" // The image name for the folder thumbnail
    var title: String = "Travel"
    
    var body: some View {
        HStack(spacing: 8) {
            Image(imageName) // Replace with actual image
                .resizable()
                .aspectRatio(contentMode: .fill)
                .frame(width: 30, height: 30)
                .clipped()
                .cornerRadius(8)
            
            Text(title)
                .font(.system(size: 14, weight: .semibold)) // Adjust font size and weight as needed
                .lineLimit(1)
            
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
        .frame(width: 140, height: 40)
    }
}

#Preview {
    FolderItemTabView()
}
