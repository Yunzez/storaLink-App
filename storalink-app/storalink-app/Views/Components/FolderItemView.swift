//
//  FolderItemView.swift
//  storalink-app
//
//  Created by Yunze Zhao on 11/27/23.
//

import SwiftUI
import SwiftData

struct FolderItemView: View {
    
    var currentFolder: Folder
    // Placeholder data - replace with your actual data models
    var imageName: String = "FolderPlaceholder" // The image name for the folder
    var title: String = "Travel Tips"
    var likesCount: Int = 35
    
    
    var body: some View {
        NavigationLink(destination: FolderView()) {
            VStack(alignment: .leading, spacing: Spacing.small) {
                ZStack(alignment: .topTrailing) {
                    
                    
                    Image(currentFolder.imgUrl.isEmpty ? "FolderPlaceholder" : currentFolder.imgUrl)
                        .resizable()
                        .aspectRatio(contentMode: .fill)
                        .frame(height: 100)
                        .clipped()
                        .padding(.bottom, Spacing.small)
                        .cornerRadius(Spacing.small)
                        .padding(.bottom, -Spacing.small)
                    // this give the only top corner radius
                    
                    
                    Button(action: {
                        // Handle favorite action
                    }) {
                        Image(systemName: "heart.fill") // Use your own favorite icon
                            .foregroundColor(Color("ThemeColor"))
                            .padding(10)
                            .background(Color.white)
                            .clipShape(Circle())
                    }
                    .padding([.top], Spacing.small)
                }
                
//                Spacer()
                HStack {
                    Text(currentFolder.title)
                        .font(.headline)
                        .lineLimit(1)
                    Spacer()
                    Image(systemName: "ellipsis") // Use your own more icon
                        .foregroundColor(.gray)
                }
                .padding([.leading, .trailing], 10)
                
                HStack(spacing: 0) {
                    Image(systemName: "link").foregroundColor(.gray)
                    Text("\(currentFolder.linksNumber)")
                        .font(.subheadline)
                        .foregroundColor(.gray)
                        .padding([.leading], 2)
                }
                .padding([.leading, .trailing], Spacing.small)
                Spacer()
            }
            .frame(width: 160, height: 180) // Adjust size as needed
            .background(Color.white) // Use actual card background color
            .cornerRadius(Spacing.small)
            .shadow(radius: 5)
        }
    }
}

#Preview {
    FolderItemView(currentFolder: Folder(title: "A test", imgUrl: "", linksNumber: 2))
}
