//
//  CreateLinkView.swift
//  storalink-app
//
//  Created by Yunze Zhao on 12/25/23.
//

import SwiftUI
import SwiftData
import LinkPresentation
import PhotosUI
struct CreateLinkView: View {
    @Query var folders: [Folder]
    @Environment(NavigationStateManager.self) var navigationStateManager
    @Environment(\.presentationMode) var presentationMode: Binding<PresentationMode>
    @Environment(\.modelContext) var modelContext
    @State private var viewModel = CreateLinkViewModel()
    @State var photoPickerItem: PhotosPickerItem?
    @State var uiImage: UIImage?
    // this allow user to pass in a link to edit
    @State var localLockSelectedFolderTitle: Bool = false
    init(editLink: Link? = nil, preSelectedfolder: Folder? = nil, preSelectedSignal: Bool? = nil) {
        if let link = editLink {
            viewModel.initialLink = link
            viewModel.updateInfoForEditLink(link: link)
        }
        
        if let folder = preSelectedfolder, let preSignal = preSelectedSignal {
            viewModel.selectedFolder = preSelectedfolder
            viewModel.searchFolder = folder.title
            viewModel.lockFolderSelection = true // the view model lock is used to control the pop up behavior
            viewModel.userAssignedFinishSignal = preSignal
            localLockSelectedFolderTitle = true // the local lock is passed to the text field
            
        }
    }
    
    
    var body: some View {
        ZStack{
            VStack{
                HStack {
                    if !viewModel.isEditLink {
                        Button(action: {
                            print("Click return")
                            self.presentationMode.wrappedValue.dismiss()
                        }, label: {
                            Image(systemName: "arrow.uturn.backward")
                                .foregroundColor(Color("ThemeBlack"))
                                .imageScale(.large)
                                .padding(Spacing.medium)
                        })
                        .background(Color("SubtleTheme").opacity(0.8))
                        .cornerRadius(Spacing.medium)
                    }
                    Spacer()
                    
                    Image("Link").resizable().frame(width: 25, height: 25 )
                    if viewModel.isEditLink {
                        Text("Edit Link")
                    } else {
                        Text("New Link")
                    }
                    
                }.padding(.horizontal)
                    .onAppear{viewModel.setup(modelConext: modelContext)}
                
                
                ScrollView(.vertical, showsIndicators: false){
                    VStack{
                        HStack{
                            Text("Link URL")
                            Spacer()
                        }.padding(.horizontal, Spacing.medium)
                            .padding(.top, Spacing.medium)
                        StandardTextField(placeholder: "https://", text: $viewModel.linkName).padding([.horizontal, .bottom])
                        HStack{
                            Text("Save to folder")
                            Spacer()
                        }.padding(.horizontal, Spacing.medium)
                        
                        ZStack{
                            VStack {
                                StandardTextField(placeholder: "Search Folder...", text: $viewModel.searchFolder, isEnabled:$localLockSelectedFolderTitle )
                                    .padding([.horizontal]).onTapGesture {
                                       if !viewModel.lockFolderSelection {
                                           withAnimation {
                                               viewModel.showingSearchResults = true
                                           }
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
                                                        Image("Folder")
                                                            .resizable()
                                                            .aspectRatio(contentMode: .fit)
                                                            .frame(width: 25, height: 25)
                                                        Text(folder.title)
                                                            .foregroundColor(Color("ThemeBlack"))
                                                        Spacer() // Pushes the content to the left
                                                    }
                                                    .padding(.vertical, 8)
                                                    .frame(maxWidth: .infinity, alignment: .leading) // Make HStack fill the width
                                                }
                                                .padding(.horizontal) // Padding for the Button
                                                .frame(maxWidth: .infinity, alignment: .leading) // Make Button fill the width
                                                Divider() // Divider between items
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
                        HStack{
                            CustomButton(action: {
                                print("fetching data")
                                viewModel.fetchLinkMetadata()
                            }, label: "Auto-fill using URL", style: .fill, larger: false).padding(.top, 3)
                            Spacer()
                            if viewModel.fetchStatus != 0 {
                                if viewModel.fetchStatus == 1 {
                                    ProgressView()
                                } else {
                                    if viewModel.fetchError.isEmpty {
                                        Image(systemName: "checkmark").foregroundColor(.green)
                                        Text("Auto-fill successful").foregroundColor(.green)
                                    } else {
                                        Image(systemName: "wrongwaysign").foregroundColor(.red)
                                        Text("Unable to fetch url").foregroundColor(.red)
                                    }
                                }
                            }
                        }.padding(.horizontal)
                        HStack{
                            Text("Title")
                            Spacer()
                        }.padding([.horizontal, .top], Spacing.medium)

                        StandardTextField(placeholder: "Your most creative name here!", text: $viewModel.title).padding([.horizontal, .bottom])
                        HStack{
                            Text("Author")
                            Spacer()
                        }.padding(.horizontal, Spacing.medium)
                        StandardTextField(placeholder: "author", text: $viewModel.author).padding([.horizontal, .bottom])
                        HStack{
                            Text("Thumbnail")
                            Spacer()
                        }.padding(.horizontal, Spacing.medium)
                        Divider()
                        VStack {
                            if let image = viewModel.image {
                                PhotosPicker(selection: $photoPickerItem, matching: .images) {
                                    Image(uiImage: image).resizable() // Allows the image to be resized
                                        .aspectRatio(contentMode: .fill) // Maintain the aspect ratio of the image
                                        .frame(width: 140, height: 140)
                                }
                                
                            } else {
                                PhotosPicker(selection: $photoPickerItem, matching: .images) {
                                    Image(uiImage: viewModel.image ?? UIImage(resource: .upload))
                                        .resizable()
                                        .aspectRatio(contentMode: .fit)
                                        .foregroundColor(Color.themeBlack)
                                        .frame(height: 140)
                                        .clipped()
                                        .padding()
                                    
                                }
                            }
                        }.onChange(of: photoPickerItem) { _, _ in
                            Task {
                                if let photoPickerItem,
                                   let data = try await photoPickerItem.loadTransferable(type: Data.self) {
                                    if let image = UIImage(data: data) {
                                        viewModel.image = image
                                        //                                    saveSelectedImage(image: image)
                                    }
                                }
                            }
                        }
                        
                        Divider()
                        
                        HStack{
                            Text("Description")
                            Spacer()
                        }.padding(.horizontal, Spacing.medium)
                        ZStack(alignment: .topLeading) {
                            if viewModel.linkDescription == "" {
                                Text("What’s this link about?")
                                    .foregroundColor(.gray)
                                    .padding([.horizontal], 16)
                                    .padding(10).zIndex(2.0)
                            }
                            
                            TextEditor(text: $viewModel.linkDescription)
                                .padding(4) // This padding is for inside the TextEditor, between the text and the border
                                .frame(minHeight: 100)
                                .background(Color.themeWhite) // Set the background color to white or any other color as needed
                                .cornerRadius(10) // Set the corner radius as needed
                                .overlay(
                                    RoundedRectangle(cornerRadius: 10) // Match this radius with the cornerRadius value above
                                        .stroke(Color(UIColor.separator), lineWidth: 1)
                                )
                                .padding([.bottom, .horizontal])
                        }
                        if viewModel.error {
                            Text(viewModel.errorMessage)
                                .frame(maxWidth: .infinity) // Ensures the Text takes up all available width
                                       .foregroundColor(Color("Warning"))
                                       .padding()
                                       .background(Color("LightWarning"))
                                       .overlay(RoundedRectangle(cornerRadius: Spacing.small)
                                           .stroke(Color("Warning"), lineWidth: 2))
                                       .padding(.horizontal)
                        }
                        if viewModel.isEditLink {
                            Button(action: {
                                // Action for folder creation
                                viewModel.updateLink()
                                self.presentationMode.wrappedValue.dismiss()
                            }) {
                                HStack{
                                    Image(systemName: "pencil")
                                    Text("Update Link")
                                }.frame(minWidth: 0, maxWidth: .infinity)
                                    .frame(height: 50)
                                    .foregroundColor(.white)
                                    .background(Color.orange)
                                    .cornerRadius(25)
                                    .padding([.leading, .bottom, .trailing])
                            }
                        } else {
                            Button(action: {
                                // Action for folder creation
                                viewModel.createLink()
                                if (viewModel.userAssignedFinishSignal) {
                                    self.presentationMode.wrappedValue.dismiss()
                                }
                            }) {
                                HStack{
                                    Image(systemName: "plus.circle")
                                    Text("Create Link")
                                } .frame(minWidth: 0, maxWidth: .infinity)
                                    .frame(height: 50)
                                    .foregroundColor(.white)
                                    .background(Color.orange)
                                    .cornerRadius(25)
                                    .padding([.leading, .bottom, .trailing])
                            }
                        }
                        
                    }
                    
                }.onTapGesture {
                    // Show the results when the TextField is tapped
                    withAnimation {
                        viewModel.showingSearchResults = false
                    }
                }.onAppear{
                    print("create link show up")
                    viewModel.navigationStateManager = navigationStateManager
                }.onDisappear{
                    print("leave create link")
                }.navigationBarBackButtonHidden(true)
                    .background(Color.themeWhite.edgesIgnoringSafeArea(.all))
            }.disabled(viewModel.loadingStage != .none  )
            
            if viewModel.loadingStage != .none {
                
                VStack {
                        
                    if viewModel.loadingStage == .loading {
                        ProgressView()
                            .progressViewStyle(CircularProgressViewStyle(tint: Color("ThemeColor")))
                            .scaleEffect(1.5)
                            .padding(.bottom)
                    } else {
                        Image(systemName: "checkmark.circle.fill")
                            .resizable()
                            .scaledToFit()
                            .frame(width: 30, height: 30) // Adjust size as needed
                            .foregroundColor(Color("ThemeColor")) // Or any other color you prefer
                            .padding(.bottom)
                    }
                        Text(viewModel.loadingStage == .loading ? "Loading.." : "Done!")
                            .foregroundColor(Color("ThemeColor"))
                    
                }
                .frame(width: 250, height: 250)
                .padding(20)
                .background(Color("SubtleTheme").opacity(1))
                .cornerRadius(15)
                .shadow(radius: 50)
            }
            
        }.background(Color.themeWhite.edgesIgnoringSafeArea(.top))
    }
}

#Preview {
    CreateLinkView().modelContainer(PreviewContainer)
        .environment(NavigationStateManager())
        .environment(AppViewModel())
}
