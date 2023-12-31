//
//  FolderItemView.swift
//  storalink-app
//
//  Created by Yunze Zhao on 11/27/23.
//

import SwiftUI
import SwiftData

struct FolderItemView: View {
    @Environment(NavigationStateManager.self) var navigationStateManager: NavigationStateManager
    var currentFolder: Folder
    // Placeholder data - replace with your actual data models
    var imageName: String = "FolderPlaceholder" // The image name for the folder
    var title: String = "Travel Tips"
    var likesCount: Int = 35
    
    
    var body: some View {
        //        NavigationLink(destination: FolderView()) {
        VStack(alignment: .leading, spacing: Spacing.small) {
            ZStack(alignment: .topTrailing) {
                
                
                Image(currentFolder.imgUrl.isEmpty ? "FolderPlaceholder" : currentFolder.imgUrl)
                    .resizable()
                    .aspectRatio(contentMode: .fill)
                    .clipped()
                    .padding(.bottom, Spacing.small)
                    .cornerRadius(Spacing.small)
                    .padding(.bottom, -Spacing.small)
                    .frame(width:160 , height: 130)
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
            }.frame(width:160 , height: 130)
            
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
            .frame(height: 25)
            
            HStack(spacing: 0) {
                Image(systemName: "link").foregroundColor(.gray)
                Text("\(currentFolder.linksNumber)")
                    .font(.subheadline)
                    .foregroundColor(.gray)
                    .padding([.leading], 2)
            }
            .padding([.leading, .trailing], Spacing.small)
            .frame(height: 25)
            
            Spacer()
        }
        .frame(width: 160, height: 200) // Adjust size as needed
        
        /*  }*/.background(Color.white) // Use actual card background color
            .clipShape(RoundedRectangle(cornerSize: CGSize(width: 4, height: 4)))
            .shadow(radius: 5)
            .onTapGesture(perform: {
                print("Folder tapped")
                navigationStateManager.navigationPath.append(NavigationItem.folderView)
                navigationStateManager.focusFolder = currentFolder
            })
    }
}

#Preview {
    FolderItemView(currentFolder: Folder(title: "A test", imgUrl: "")).environment(NavigationStateManager())
}
