//
//  FolderItemView.swift
//  storalink-app
//
//  Created by Yunze Zhao on 11/27/23.
//

import SwiftUI

struct FolderItemView: View {
    // Placeholder data - replace with your actual data models
    var imageName: String = "FolderPlaceholder" // The image name for the folder
    var title: String = "Travel Tips"
    var likesCount: Int = 35
    var userImages: [String] = ["User1", "User2", "User3"] // Replace with actual user images

    var body: some View {
        VStack(alignment: .leading, spacing: 6) {
            ZStack(alignment: Alignment(horizontal: .trailing, vertical: .top)) {
                Image(imageName) // Replace with actual image
                    .resizable()
                    .aspectRatio(contentMode: .fill)
                    .frame(width: 150, height: 100)
                    .clipped()
                
                Button(action: {
                    // Handle favorite action
                }) {
                    Image(systemName: "heart.fill") // Use your own favorite icon
                        .foregroundColor(Color("ThemeColor"))
                        .padding(10)
                        .background(Color.white)
                        .clipShape(Circle())
                }
                .padding([.top, .trailing], 10)
            }
            
            HStack {
                Text(title)
                    .font(.headline)
                    .lineLimit(1)
                Spacer()
                Image(systemName: "ellipsis") // Use your own more icon
                    .foregroundColor(.gray)
            }
            .padding([.leading, .trailing], 10)
            
            HStack(spacing: 0) {
                Image(systemName: "eye") // Use your own views icon
                    .foregroundColor(.gray)
                Text("\(likesCount)")
                    .font(.subheadline)
                    .foregroundColor(.gray)
                
                HStack(spacing: -8) {
                    ForEach(userImages, id: \.self) { userImage in
                        Image(userImage) // Replace with actual user images
                            .resizable()
                            .scaledToFill()
                            .frame(width: 20, height: 20)
                            .clipShape(Circle())
                    }
                }
            }
            .padding([.leading, .trailing], 10)
        }
        .frame(width: 140, height: 180) // Adjust size as needed
        .background(Color.white) // Use actual card background color
        .cornerRadius(15)
        .shadow(radius: 5)
    }
}

#Preview {
    FolderItemView()
}
