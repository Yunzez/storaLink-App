//
//  ShareView.swift
//  StoralinkSaveLink
//
//  Created by Yunze Zhao on 12/25/23.
//

import SwiftUI

struct ShareView: View {
    @State var sharedURL: String?
    @State var linkText: String = ""
    @State var titleText: String = ""
    @State var authorText: String = ""
    @State var descriptionText: String = ""
    @State var selectedText: Int = -1
    @FocusState private var isTitleInputFocused: Bool
    @FocusState private var isAuthorInputFocused: Bool
    @FocusState private var isDescriptionInputFocused: Bool
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
                        print("add")
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
            
//                HStack{
//                    Text("Description")
//                    Spacer()
//                }.padding(.horizontal)
//
//                TextEditor(text: $linkText)
//                    .padding(2) // This padding is for inside the TextEditor, between the text and the border
//                    .frame(minHeight: 100)
//                    .background(Color.white) // Set the background color to white or any other color as needed
//                    .cornerRadius(2) // Set the corner radius as needed
//                    .overlay(
//                        RoundedRectangle(cornerRadius: 10) // Match this radius with the cornerRadius value above
//                            .stroke(Color(UIColor.separator), lineWidth: 1)
//                    ).padding(.horizontal)
                
                Spacer()
            }
        }.onTapGesture {
            selectedText = -1
        }
    }
    
}

