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
    @Bindable var currentFolder: Folder
    @Environment(\.modelContext) var modelContext
    @State var folderItemViewModel = FolderItemViewModel()
    @State private var showingDeletionAlert = false
    
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
                    currentFolder.pinned.toggle()
                }) {
                    Image(systemName: currentFolder.pinned ? "heart.fill" : "heart")
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
                    .foregroundColor(Color("ThemeBlack"))
                Spacer()
                Button {
                    print("test")
                    folderItemViewModel.showDetailSheet = true
                } label: {
                    Image(systemName: "ellipsis")
                }.foregroundColor(.gray)
                    .sheet(isPresented: $folderItemViewModel.showDetailSheet, content: {
                        VStack{
                            Spacer()
                            BottomSheetOption(onClick: {
                                currentFolder.pinned = true
                            }, text: "Pin", assetImageString: "Folder")
                            Spacer()
                            BottomSheetOption(onClick: {
                                currentFolder.pinned = false
                            }, text: "Unpin", assetImageString: "Folder")
                            Spacer()
                            BottomSheetOption(onClick: {
                                print("Edit")
                                folderItemViewModel.showDetailSheet = false
                                // add a delay to wait for the sheet to be closed
                                DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) {
                                    folderItemViewModel.showEditSheet = true
                                }
                            }, text: "Edit",  assetImageString: "Pencil")
                            Spacer()
                            BottomSheetOption(onClick: {
                                DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) {
                                    showingDeletionAlert = true
                                }
                                
                                print("show delete alert")
                            }, text: "Delete", assetImageString: "Trash")
                            .alert(isPresented: $showingDeletionAlert) {
                                Alert(
                                    title: Text("Are you sure?"),
                                    message: Text("This will permanently delete the folder and its contents."),
                                    primaryButton: .destructive(Text("Delete")) {
                                        // Perform the deletion
                                        modelContext.delete(currentFolder)
                                        folderItemViewModel.showDetailSheet = false
                                        do {
                                            try modelContext.save()
                                            
                                            // MARK: - Temp deletetion until Cascade in Swiftdata works
                                            try modelContext.delete(model: Link.self, where: #Predicate<Link> { link in
                                                link.parentFolder == nil
                                            })
                                            // MARK: - Temp deletetion ends
                                            
                                            print("delet successfully, Links: ")
                                            let allLinks = try modelContext.fetch(FetchDescriptor<Link>())
                                            for link in allLinks {
                                                print(link.toString())
                                            }
                                        } catch {
                                            print("Saving deletion error: \(error)")
                                        }
                                    },
                                    secondaryButton: .cancel()
                                )
                            }
                            
                            Spacer()
                        }.presentationDetents([.height(300)])
                    }).sheet(isPresented: $folderItemViewModel.showEditSheet, content: {
                        Text("Test")
                    })
            }
            .padding([.leading, .trailing], 10)
            .frame(height: 25)
            
            
            HStack(spacing: 0) {
                Image(systemName: "link").foregroundColor(.gray)
                Text("\(currentFolder.getLinkNum())")
                    .font(.subheadline)
                    .foregroundColor(.gray)
                    .padding([.leading], 2)
            }
            .padding([.leading, .trailing], Spacing.small)
            .frame(height: 25)
            
            Spacer()
        }
        .frame(width: 160, height: 200) // Adjust size as needed
        .background(Color("SubtleTheme")) // Use actual card background color
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
    FolderItemView(currentFolder: Folder(title: "A test", imgUrl: "", links: [])).environment(NavigationStateManager())
}
