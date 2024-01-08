//
//  ShareView.swift
//  StoralinkSaveLink
//
//  Created by Yunze Zhao on 12/25/23.
//

import SwiftUI
import SwiftData

@MainActor
struct ShareView: View {
    
    @Query var folders: [Folder]
    @State var sharedURL: String?
    @State var linkText: String = ""
    @State var titleText: String = ""
    @State var authorText: String = ""
    @State var descriptionText: String = ""
    @State var selectedText: Int = -1
    
    @State var folderName: String = ""
    @State var folderId: UUID = UUID()
    @State var showSearchResult: Bool = false
    @FocusState private var isTitleInputFocused: Bool
    @FocusState private var isAuthorInputFocused: Bool
    @FocusState private var isDescriptionInputFocused: Bool
    @FocusState private var isFolderInputFocused: Bool
    var onCancel: () -> Void
    
    struct NoBorderTextFieldStyle: TextFieldStyle {
        func _body(configuration: TextField<_Label>) -> some View {
            configuration
            // Add any additional modifiers you want for the text field here
                .padding(10) // Example padding
        }
    }
    
    enum FocusableField: Hashable {
        case field(Int)
    }
    
    init(sharedURL: String, onCancel: @escaping () -> Void) {
        _sharedURL = State(initialValue: sharedURL)
        _titleText = State(initialValue: "") // Provide an initial value for titleText
        _authorText = State(initialValue: "") // Provide an initial value for authorText
        _descriptionText = State(initialValue: "") // Provide an initial value for descriptionText
        _selectedText = State(initialValue: -1) // Provide an initial value for selectedText
        self.onCancel = onCancel
        _linkText = State(initialValue: self.sharedURL ?? "") // Provide an initial value for linkText
    }
    
    func addLinkToFolder() {
        
    }
    
    func filterFolder(folders: [Folder]) -> [Folder] {
        if(folderName.isEmpty) {
            return folders
        }
        let filteredFolders = folders.filter { folder in
               folder.title.localizedCaseInsensitiveContains(folderName)
        }
        return filteredFolders
    }
    
    var body: some View {
        ScrollView{
            VStack{
                HStack{
                    Button {
                        onCancel()
                    } label: {
                        Text("Cancel").foregroundColor(Color("ThemeColor"))
                    }
                    Spacer()
                    Image("Logo")
                    Spacer()
                    Button {
                        addLinkToFolder()
                    } label: {
                        Text("Add").foregroundColor(Color("ThemeGray")).fontWeight(/*@START_MENU_TOKEN@*/.bold/*@END_MENU_TOKEN@*/)
                    }
                    
                }.padding()
                
                HStack{
                    TextEditor(text: $linkText)
                        .padding(2) // This padding is for inside the TextEditor, between the text and the border
                        .frame(minHeight: 100)
                        .background(Color.white) // Set the background color to white or any other color as needed
                        .cornerRadius(2) // Set the corner radius as needed
                        .padding(.vertical)
                    
                    Image("LinkDefaultImg").resizable().aspectRatio(contentMode: .fit).frame(width: 120)
                }.frame(height: /*@START_MENU_TOKEN@*/100/*@END_MENU_TOKEN@*/).padding(.horizontal)
                
                
                VStack {
                    Text("Title")
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .padding()
                    
                    HStack {
                        TextField("Enter title here", text: $titleText, onCommit: {
                            // Reset selectedText when the user commits (e.g., presses return)
                            print("commit title")
                            selectedText = -1
                        })
                        .textFieldStyle(NoBorderTextFieldStyle()) // Apply the custom text field style
                        .padding(.leading, 10)
                        .focused($isTitleInputFocused) // Track the focus state
                        .onChange(of: isTitleInputFocused, initial: true) { wasFocused, isFocused in
                            // Update selectedText based on focus change
                            print("focus title")
                            if isFocused {
                                selectedText = 0  // Assuming this is the index for this text field
                            }
                            
                        }
                    }
                }
                .overlay(
                    RoundedRectangle(cornerRadius: 10) // Overlay a rounded rectangle
                        .stroke(selectedText == 0 ? Color("ThemeColor") : Color("ThemeGray"), lineWidth: 2) // Set the border color based on selectedText
                )
                .padding(.horizontal) // Add padding around the overlay
                
                
                
                VStack {
                    Text("Author")
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .padding()
                    
                    HStack {
                        TextField("Enter author here", text: $authorText, onCommit: {
                            // Reset selectedText when the user commits (e.g., presses return)
                            print("commit author")
                            selectedText = -1
                        }).textFieldStyle(NoBorderTextFieldStyle()) // Apply the custom text field style
                            .padding(.leading, 10)
                            .focused($isAuthorInputFocused) // Track the focus state
                            .onChange(of: isAuthorInputFocused, initial: true) { wasFocused, isFocused in
                                // Update selectedText based on focus change
                                print("focus author")
                                if isFocused {
                                    selectedText = 1  // Assuming this is the index for this text field
                                }
                                
                            }
                    }
                }
                .overlay(
                    RoundedRectangle(cornerRadius: 10) // Overlay a rounded rectangle
                        .stroke(selectedText == 1 ? Color("ThemeColor") : Color("ThemeGray"), lineWidth: 2) // Set the border color based on selectedText
                )
                .padding(.horizontal) // Add padding around the overlay
                
                
                VStack {
                    Text("Description")
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .padding()
                    
                    
                    TextEditor( text: $descriptionText).textFieldStyle(NoBorderTextFieldStyle()) // Apply the custom text field style
                        .focused($isDescriptionInputFocused) // Track the focus state
                        .onChange(of: isDescriptionInputFocused, initial: true) { wasFocused, isFocused in
                            // Update selectedText based on focus change
                            print("focus author")
                            if isFocused {
                                selectedText = 2  // Assuming this is the index for this text field
                            }
                            
                        }.padding(.horizontal)
                    
                }
                .overlay(
                    RoundedRectangle(cornerRadius: 10) // Overlay a rounded rectangle
                        .stroke(selectedText == 2 ? Color("ThemeColor") : Color("ThemeGray"), lineWidth: 2) // Set the border color based on selectedText
                ).frame(height: 190)
                    .padding(.horizontal) // Add padding around the overlay
                
                
                ZStack{
                    VStack{
                        VStack {
                            Text("Save to folder")
                                .frame(maxWidth: .infinity, alignment: .leading)
                                .padding()
                            
                            TextField("search folders...", text: $folderName, onCommit: {
                                // Reset selectedText when the user commits (e.g., presses return)
                                selectedText = -1
                            }).textFieldStyle(NoBorderTextFieldStyle()) // Apply the custom text field style
                                .padding(.leading, 10)
                                .focused($isFolderInputFocused)
                                .onChange(of: isFolderInputFocused, initial: true) { wasFocused, isFocused in
                                    // Update selectedText based on focus change
                                    print("focus author")
                                    if isFocused {
                                        selectedText = 3  // Assuming this is the index for this text field
                                        showSearchResult = true
                                    }
                                    
                                }.padding(.horizontal)
                        }.overlay(
                            RoundedRectangle(cornerRadius: 10) // Overlay a rounded rectangle
                                .stroke(selectedText == 3 ? Color("ThemeColor") : Color("ThemeGray"), lineWidth: 2) // Set the border color based on selectedText
                        ).padding(.horizontal) // Add padding around the overlay
                        
                        
                        if showSearchResult {
                            ScrollView(.vertical) {
                                VStack(alignment: .leading) {
                                    ForEach(filterFolder(folders: folders)) { folder in
                                        Button {
                                            folderName = folder.title
                                            folderId = folder.id
                                            withAnimation {
                                                showSearchResult = false
                                            }
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
                                }
                            }
                            .background(Color.white)
                            .cornerRadius(4)
                            .shadow(radius: 1)
                            .padding(.horizontal)
                            .transition(.asymmetric(
                                insertion: .identity.combined(with: .opacity),
                                removal: AnyTransition.opacity.combined(with: .scale(scale: 0.5, anchor: .top))
                            ))
                            .animation(.easeInOut, value: showSearchResult)
                            .frame(maxWidth: .infinity, maxHeight: 200)
                        }
                    }
                }
                    

                Spacer()
            }
        }.onTapGesture {
            selectedText = -1
        }
    }
    
}

