//
//  CreateLinkView.swift
//  storalink-app
//
//  Created by Yunze Zhao on 12/25/23.
//

import SwiftUI
import SwiftData
struct CreateLinkView: View {
    @Query var folders: [Folder]
    @Environment(\.presentationMode) var presentationMode: Binding<PresentationMode>
    @Environment(\.modelContext) var modelContext
    @State private var viewModel = CreateLinkViewModel()
    @State var test = ""
    var body: some View {
        
            HStack {
                Button(action: {
                    print("Click return")
                    self.presentationMode.wrappedValue.dismiss()
                }, label: {
                    Image(systemName: "arrow.uturn.backward")
                        .foregroundColor(.black)
                        .imageScale(.large)
                        .padding(Spacing.medium)
                })
                .background(Color("SubtleTheme").opacity(0.8))
                .cornerRadius(Spacing.medium)
                .shadow(radius:7)
                Spacer()
                
                Image("Link").resizable().frame(width: 25, height: 25 )
                Text("New Link")
            }.padding(.horizontal)
            .onAppear{viewModel.setup(modelConext: modelContext)}

        NavigationStack {
            ScrollView(.vertical, showsIndicators: false){
                VStack{
                    if viewModel.error {
                        Text(viewModel.errorMessage).foregroundColor(Color("Warning"))
                            .padding()
                            .background(Color("LightWarning"))
                            .overlay(RoundedRectangle(cornerRadius: Spacing.small) // Match this radius with the cornerRadius value above
                                .stroke(Color("Warning"), lineWidth: 2)).padding(.horizontal)
                        
                    }
                    
                    Text("Link URL")
                    StandardTextField(placeholder: "https://", text: $viewModel.linkName).padding([.horizontal, .bottom])
                    Text("Save to folder")
                    
                    ZStack{
                     
                        VStack {
                            StandardTextField(placeholder: "Search Folder...", text: $viewModel.searchFolder)
                                .padding([.horizontal, .bottom]).onTapGesture {
                                    // Show the results when the TextField is tapped
                                    withAnimation {
                                        viewModel.showingSearchResults = true
                                    }
                                }
                            if viewModel.showingSearchResults {
                                ScrollView(.vertical) {
                                    VStack(alignment: .leading) {
                                        ForEach(viewModel.filterFolder(folders: folders)) { folder in
                                           
                                            
                                            Button {
                                               
                                                    viewModel.searchFolder = folder.title
                                                    viewModel.selectedFolder = folder
                                                withAnimation {
                                                    viewModel.showingSearchResults = false
                                                }
                                            } label: {
                                                HStack {
                                                    Image("Folder").resizable().aspectRatio(contentMode: .fit).frame(width: 25, height: 25)
                                                    Text(folder.title)
                                                        .foregroundColor(.black) // Set the text color
                                                }
                                                .padding(.vertical, 8) // Add some vertical padding for tap comfort
                                            }
                                            .padding(.horizontal) // Add horizontal padding for better alignment
                                            Divider() // Add a divider between items
                                        }
                                    }
                                }
                                .background(Color.white)
                                .cornerRadius(Spacing.small)
                                    .shadow(radius: 1)
                                    .padding(.horizontal)
                                    .transition(.asymmetric(
                                                        insertion: .identity.combined(with: .opacity),
                                                        removal: AnyTransition.opacity.combined(with: .scale(scale: 0.5, anchor: .top))
                                                    ))
                                                    .animation(.easeInOut, value: viewModel.showingSearchResults)
                                    .frame(maxWidth: .infinity, maxHeight: 200)
                            }
                        }
                    }
                    
                    CustomButton(action: {
                        print("click")
                        Task {
                            print("fetching data")
                            await viewModel.fetchLinkMetadata()
                        }
                    }, label: "Auto-fill using URL", imageSystemName: "", style: .fill)
                    
                    Text("Title")
                    StandardTextField(placeholder: "https://", text: $viewModel.title).padding([.horizontal, .bottom])
                    Text("Author")
                    StandardTextField(placeholder: "author", text: $viewModel.author).padding([.horizontal, .bottom])
//                    Text("Source")
                    Text("ThumbNail")
                    Image(uiImage: viewModel.linkMetadata?.icon ?? UIImage(named: "LinkDefaultImage") ?? UIImage())
                        .resizable() // Allows the image to be resized
                        .aspectRatio(contentMode: .fit) // Maintain the aspect ratio of the image
                        .frame(width: 100, height: 100) // Specify the frame size as needed
                    
                    Text("Description")
                    TextEditor(text: $viewModel.linkDescription)
                        .padding(4) // This padding is for inside the TextEditor, between the text and the border
                        .frame(minHeight: 100)
                        .background(Color.white) // Set the background color to white or any other color as needed
                        .cornerRadius(10) // Set the corner radius as needed
                        .overlay(
                            RoundedRectangle(cornerRadius: 10) // Match this radius with the cornerRadius value above
                                .stroke(Color(UIColor.separator), lineWidth: 1)
                        )
                        .padding([.bottom, .horizontal])
                    
                    Button(action: {
                        // Action for folder creation
                        viewModel.createLink()
                    }) {
                        Text("Create Link")
                            .frame(minWidth: 0, maxWidth: .infinity)
                            .frame(height: 50)
                            .foregroundColor(.white)
                            .background(Color.orange)
                            .cornerRadius(25)
                            .padding([.leading, .bottom, .trailing])
                    }
                }
            }.onTapGesture {
                // Show the results when the TextField is tapped
                withAnimation {
                    viewModel.showingSearchResults = false
                }
            }
        }
    }
}

#Preview {
    CreateLinkView().modelContainer(PreviewContainer)
        .environment(NavigationStateManager())
        .environment(AppViewModel())
}
