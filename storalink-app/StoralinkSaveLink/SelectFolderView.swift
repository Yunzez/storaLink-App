//
//  SelectFolderView.swift
//  StoralinkSaveLink
//
//  Created by Yunze Zhao on 3/17/24.
//

import SwiftUI
import SwiftData
struct SelectFolderView: View {
    
    @Query var folders : [Folder] = []
    @Environment(\.presentationMode) var presentationMode
    @State var showSearchResult = false
    @State var onClick: (Folder) -> Void
    @State var folderName: String = ""
    @State var filteredFolder: [Folder] = []
    @FocusState private var isFolderInputFocused: Bool
    struct NoBorderTextFieldStyle: TextFieldStyle {
        func _body(configuration: TextField<_Label>) -> some View {
            configuration
            // Add any additional modifiers you want for the text field here
                .padding(2) // Example padding
        }
    }
    
    private func setUp() {
        filteredFolder = folders
    }
    
    private func searchForFolder() {
        if (folderName.count > 0) {
            filteredFolder.removeAll() // Correct way to clear the array
            
            
            folders.forEach { folder in // Correct syntax for forEach
                if folder.title.lowercased().contains(folderName.lowercased()) {
                    filteredFolder.append(folder)
                }
            }
        } else {
            filteredFolder = folders
        }
        
    }
    
    var body: some View {
        NavigationView {
            VStack{
                VStack {
                    HStack{
                        Image(systemName: "magnifyingglass").foregroundColor(.themeBlack).padding(.vertical)
                        TextField("search folders...", text: $folderName, onCommit: {
                            // Reset selectedText when the user commits (e.g., presses return)
                        }).textFieldStyle(NoBorderTextFieldStyle())
                            .focused($isFolderInputFocused)
                            .onChange(of: isFolderInputFocused, initial: true) { wasFocused, isFocused in
                                if isFocused {
                                    showSearchResult = true
                                }
                                
                            }.onChange(of: folderName) { _, _ in
                                searchForFolder()
                            }
                    }.padding(.horizontal)
                        .overlay(
                            RoundedRectangle(cornerRadius: 10)
                                .stroke(Color("ThemeColor"), lineWidth: 2)
                        )
                }.padding(.horizontal) // Add padding around the overlay
                
                VStack {
                    Text("folders: \(filteredFolder.count)")
                    ScrollView(.vertical) {
                        if (filteredFolder.count > 0) {
                            ForEach(filteredFolder){ folder in
                                Button {
                                    withAnimation {
                                        showSearchResult = false
                                    }
                                    folderName = folder.title
                                    onClick(folder)
                                    self.presentationMode.wrappedValue.dismiss()
                                } label: {
                                    HStack {
                                        Image("Folder").resizable().aspectRatio(contentMode: .fit).frame(width: 25, height: 25)
                                        Text(folder.title)
                                            .foregroundColor(Color("ThemeBlack")) // Set the text color
                                    }
                                    .padding(.vertical, 8) // Add some vertical padding for tap comfort
                                }
                                .padding(.horizontal) // Add horizontal padding for better alignment
                                Divider() // Add a divider between items
                                
                            }
                        } else {
                            Text("there is no folder")
                        }
                    }.background(Color.white)
                        .padding(.horizontal)
                        .transition(.asymmetric(
                            insertion: .identity.combined(with: .opacity),
                            removal: AnyTransition.opacity.combined(with: .scale(scale: 0.5, anchor: .top))
                        ))
                }
                Spacer()
            }
            
            // Optionally hide the default back button
        }.navigationBarBackButtonHidden(true)
            .navigationBarItems(leading: Button(action: {
                // Action to dismiss the current view, mimicking the back button
                self.presentationMode.wrappedValue.dismiss()
            }) {
                // Custom back button content
                Image(systemName: "arrow.left")
                    .foregroundColor(.theme) // Customize color
            })
            .onAppear{
            setUp()
        }
    }
}
