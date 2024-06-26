//
//  FolderItemTabView.swift
//  storalink-app
//
//  Created by Yunze Zhao on 11/27/23.
//

import SwiftUI

struct FolderItemTabView: View {
    @Environment(NavigationStateManager.self) var navigationStateManager: NavigationStateManager
    @Bindable var folder: Folder
    var imageName: String = "LinkDefaultImg" // The image name for the folder thumbnail
    @State var showSheet: Bool = false
    let localFileManager = LocalFileManager.manager
    
    private func folderImage() -> Image {
        if let uiImage = localFileManager.getImage(path: folder.imgUrl) {
            return Image(uiImage: uiImage)
        } else {
            return Image(folder.imgUrl.isEmpty ? imageName : folder.imgUrl)
        }
    }
    
    var body: some View {
        HStack(spacing: 2) {
            
            folderImage()
                .resizable()
                .aspectRatio(contentMode: .fill)
                .frame(width: 30, height: 30)
                .clipped()
                .cornerRadius(8)
            HStack{
                Text(folder.title)
                    .font(.system(size: 12, weight: .semibold)) // Adjust font size and weight as needed
                    .lineLimit(1)
                    .foregroundColor(Color("ThemeBlack"))
                    .padding(.leading, 4)
                Spacer()
            }.frame(width: 90)
//                .border(Color.green)
            Button {
                showSheet = true
            } label: {
                Image(systemName: "ellipsis")
                    .foregroundColor(Color("ThemeBlack"))
            }.frame(width: 28, height: 30)
            //                .border(Color.red)
            
            
            
        }
        .padding(.leading, 5)
        .padding(.trailing, 8)
        .padding(.vertical, 5)
        .frame(height: 40) // The height of the tab
        .background(Color("SubtleTheme")) // Use the actual background color
        .cornerRadius(10)
        //        .shadow(radius: 2) // Optional: if you want to add shadow
        .frame(width: 160)
//        .border(.red)
        .sheet(isPresented:  $showSheet, content: {
            VStack(content: {
                Spacer()
                BottomSheetOption(onClick: {
                    folder.pinned = false
                }, text: "Unpin", assetImageString: "Folder")
                Spacer()
                BottomSheetOption(onClick: {
                    folder.pinned = true
                }, text: "Pin", assetImageString: "Folder")
                Spacer()
            }).presentationDetents([.height(200)])
        })
        .onTapGesture(perform: {
            print("Folder tapped")
            navigationStateManager.navigationPath.append(NavigationItem.folderView)
            navigationStateManager.focusFolder = folder
        })
    }
}

#Preview {
    FolderItemTabView(folder: Folder(title: "Error Occured", imgUrl: "", links: []))
}
