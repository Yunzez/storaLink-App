//
//  UITest.swift
//  storalink-app
//
//  Created by Yunze Zhao on 12/26/23.
//

import SwiftUI
import SwiftData
import LinkPresentation
struct UITest: View {
    @Environment(\.modelContext) var modelContext
    @Query private var folders: [Folder]
    @Query private var links: [Link]
    @Query private var users: [User]
    
    @State var fetchedImage: UIImage?
    @State var fetchedIcon: UIImage?
    @State var fetechedTitle: String = ""
    let url = "https://www.washington.edu/"
    private func fetchLink() {
        guard let url = URL(string: url) else {return}
        let linkPreview = LPLinkView()
        let provider = LPMetadataProvider()
        provider.startFetchingMetadata(for: url) { metaData, error in
            guard let data = metaData, error == nil else {return }
            DispatchQueue.main.async {
                linkPreview.metadata = data
                fetechedTitle = data.title ?? "No title"
                print("title:", data.title ?? "No title")
                if let iconProvider = data.imageProvider {
                    iconProvider.loadObject(ofClass: UIImage.self) { (image, error) in
                        DispatchQueue.main.async {
                            if let image = image as? UIImage {
                                fetchedImage = image
                            }
                        }
                    }
                }
                
                if let iconProvider = data.iconProvider {
                    iconProvider.loadObject(ofClass: UIImage.self) { (image, error) in
                        DispatchQueue.main.async {
                            if let image = image as? UIImage {
                                fetchedIcon = image
                            }
                        }
                    }
                }
            }
        }
    }
    
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
        ScrollView{
            Text("Link preview test")
           
            HStack{
                if let icon = fetchedIcon {
                    Image(uiImage: icon)
                }
                Text(fetechedTitle )
               
            }
            if let image = fetchedImage {
                Image(uiImage: image)
            }
            Button(action: {
                print("fetch")
                fetchLink()
            }, label: {
                Text("Fetch a link")
            })
            Text("Folder Section").bold()
            ForEach(folders, id: \.self) { folder in
                Text(folder.title) // Display the folder title
                // Add more details as needed
            }.padding()
            
            Text("Links Section").bold()
            ForEach(links, id: \.self) { link in
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
            }.padding()
            
            
            Text("User Section").bold()
            ForEach(users) { user in
                HStack{
                    Text(user.name)
                    Text("\(user.folders.count)")
                }
                ForEach(user.folders) { folder in
                    Text(folder.title)
                }
                
            }.padding()
            
        }
    }
}

#Preview {
    UITest().modelContainer(PreviewContainer)
}
