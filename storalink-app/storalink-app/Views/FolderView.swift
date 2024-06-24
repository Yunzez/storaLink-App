//
//  FolderView.swift
//  storalink-app
//
//  Created by Yunze Zhao on 12/19/23.
//

import SwiftUI

struct FolderView: View {
    let modelUtils = ModelUtilManager.manager
    @Environment(\.modelContext) var modelContext
    @Environment(\.presentationMode) var presentationMode: Binding<PresentationMode>
    @Environment(NavigationStateManager.self) var navigationStateManager: NavigationStateManager
    @ObservedObject var folderViewModel: FolderViewModel  = FolderViewModel()
    @State var openFolderEditSheet: Bool = false
    @State var showEditSheet :Bool = false
    @State var showingDeletionAlert: Bool = false
    @State var currentFolder: Folder = Folder(title: "Initial", imgUrl: "", desc: "Initial Folder", links: [])
    let localFileManager = LocalFileManager.manager
    
    @State var displayLinks: [Link] = []

    enum SortOption {
        case recentlyAdded
        case oldest
        case titleAZ
        case none
    }
    
    @State var sortingOption:SortOption = .none
    
    init() {
        
    }
    
    func setup() {
        displayLinks = sortLinks(folder: currentFolder)
    }
    
    func sortLinks(folder: Folder) -> [Link] {
        switch sortingOption {
        case .recentlyAdded:
            return folder.links.sorted { $0.creationDate > $1.creationDate }
        case .oldest:
            return folder.links.sorted { $0.creationDate < $1.creationDate }
        case .titleAZ:
            return folder.links.sorted { $0.title < $1.title }
        default:
            return folder.links.sorted { $0.creationDate > $1.creationDate }
        }
    }


    
    let buttonHeight: CGFloat = 25
    
    var body: some View {
        NavigationView {
            
            VStack(spacing: 0) {
                // Custom Navigation Bar with Background Image
                ZStack {
                    if let uiImage = localFileManager.getImage(path: currentFolder.imgUrl) {
                        Image(uiImage: uiImage)
                            .resizable()
                            .scaledToFill()
                            .frame(height: 200)  // Fixed height for the image
                            .clipped()  // Ensure the image doesn't overlap other content
                            .edgesIgnoringSafeArea(.top)
                            .overlay(
                                LinearGradient(
                                    gradient: Gradient(colors: [Color("ThemeWhite").opacity(0.0), Color("ThemeWhite").opacity(0.9)]),
                                    startPoint: .top,
                                    endPoint: .bottomLeading
                                )
                            )
                    }
                    else {
                        Image(currentFolder.imgUrl)
                            .resizable()
                            .scaledToFill()
                            .frame(height: 200)  // Fixed height for the image
                            .clipped()  // Ensure the image doesn't overlap other content
                            .edgesIgnoringSafeArea(.top)
                            .overlay(
                                LinearGradient(
                                    gradient: Gradient(colors: [
                                                              Color("ThemeWhite").opacity(0.0),
                                                              Color("ThemeWhite").opacity(0.2),
                                                              Color("ThemeWhite").opacity(0.7),
                                                              Color("ThemeWhite").opacity(0.9)
                                                          ]),
                                    startPoint: .topTrailing,
                                    endPoint: .bottomLeading
                                )
                            )
                    }
                    
                    VStack {
                        Spacer()
                        HStack {
                            Button(action: {
                                navigationStateManager.navigateBack()
                            }, label: {
                                Image(systemName: "arrow.uturn.backward")
                                    .foregroundColor(Color("ThemeBlack"))
                                    .imageScale(.large)
                                    .padding(Spacing.medium)
                            })
                            .background(Color("SubtleTheme").opacity(1))
                            .cornerRadius(Spacing.medium)
                            Spacer()
                        }
                        .padding(.horizontal, Spacing.small)
                        
                        Spacer()
                        // Placeholder Title Text
                        HStack{
                            Text(currentFolder.title)
                                .font(.title)
                                .frame(maxWidth: .infinity, alignment: .leading)
                                .foregroundColor(Color("ThemeBlack"))
                                .padding(.leading, Spacing.small)
                            
                            Spacer()
                            
                            Button(action: {
                                folderViewModel.like.toggle()
                                currentFolder.pinned = folderViewModel.like ? true : false
                            }) {
                                Image(systemName: currentFolder.pinned ? "heart.fill" : "heart")
                                    .foregroundColor(.red)
                                    .imageScale(.large)
                                    .frame(width: buttonHeight, height: buttonHeight) // Set the frame of the content
                                    .padding(Spacing.small)
                            }
                            .background(Color("SubtleTheme").opacity(1))
                            .cornerRadius(Spacing.small)
                            .frame(height: buttonHeight) // Set the frame of the button
                            
                            Button {
                                openFolderEditSheet = true
                            } label: {
                                Image(systemName: "ellipsis")
                                    .foregroundColor(.gray)
                                    .imageScale(.large)
                                    .frame(width: buttonHeight, height: buttonHeight)
                                    .padding(Spacing.small)
                                    .background(Color("SubtleTheme").opacity(1))
                                    .cornerRadius(Spacing.small)
                            }.frame(height: buttonHeight)

                            
                            
                            
                        }.padding(Spacing.small)
                        
                        
                    }
                    Spacer()
                }.edgesIgnoringSafeArea(.top)
                    .frame(maxWidth: .infinity, maxHeight: 150)
                
                
                // Description Text
                Text(currentFolder.desc ?? "No description for this folder")
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding([.horizontal, .bottom])
               
                HStack{
                    if !folderViewModel.searchOpen {
                        HStack {
                            Button(action: {
                                folderViewModel.searchButtonClick()  // This should toggle the clicked status in your ViewModel
                            }, label: {
                                HStack {
                                    // The magnifying glass icon
                                    Image(systemName: "magnifyingglass")
                                        .imageScale(.medium)
                                        .padding(Spacing.small)
                                        .foregroundColor(.accentColor)
                                    
                                }
                                .cornerRadius(Spacing.small)
                                .overlay(
                                    RoundedRectangle(cornerRadius: Spacing.small)
                                        .stroke(Color("ThemeColor"), lineWidth: 2)
                                )
                            })
                            .animation(.easeInOut, value: folderViewModel.searchOpen)  // Animate the changes
                            
                            CustomButton(action: {
                                folderViewModel.sortButtonClick()
                            }, label: "Sort", imageSystemName: "line.3.horizontal.decrease.circle", style: .outline, larger: false )
                            
                            CustomButton(action: {
                                print("Button tapped")
                                folderViewModel.showCreateSheet = true
                            }, label: "Add", imageSystemName: "plus.circle", style: .fill, larger: false)
                            
                            Spacer()
                        }
                        .padding([.horizontal])
                        .transition(.slide.combined(with: .move(edge: .leading)))
                    }
                    
                    
                    if folderViewModel.searchOpen {
                        
                        GeometryReader { geometry in
                            HStack{
                                TextField("Search...", text: $folderViewModel.searchText)
                                    .padding(Spacing.small)
                                    .frame(width:  geometry.size.width * 0.7).cornerRadius(Spacing.small)
                                    .overlay(
                                        RoundedRectangle(cornerRadius: Spacing.small)
                                            .stroke(Color("ThemeColor"), lineWidth: 2)
                                    )
                                Button {
                                    folderViewModel.searchButtonClick()
                                } label: {
                                    Text("Cancel").foregroundColor(Color("ThemeBlack"))
                                }
                                Spacer()
                            }.padding(.horizontal)
                        }
                        
                    }
                }.frame(height: 35)
                    .animation(.easeInOut(duration: 0.3), value: folderViewModel.searchOpen)
                
                // Scrollable content
                HStack{
                    Text("Links · \(currentFolder.getLinkNum())")
                    Spacer()
                }.padding([.horizontal, .top])
                
                
                HStack{
                    Spacer()
                    GeometryReader { geometry in
                        if currentFolder.getLinkNum() != 0 {
                            ScrollView(.vertical, showsIndicators: true) {
                                VStack(spacing: 10) {
                                    ForEach(displayLinks.filter
                                            { link in
                                        folderViewModel.searchText.isEmpty || link.title.localizedCaseInsensitiveContains(folderViewModel.searchText)
                                    } , id: \.self) { link in
                                        LinkItemView(currentLink: link, onDelete: {
                                            //resort the links
                                            displayLinks = sortLinks(folder: currentFolder)
                                        }).frame(width: geometry.size.width).transition(.opacity)
                                    }
                                }
                            }.animation(.easeInOut(duration: 0.3), value: folderViewModel.searchText.isEmpty)
                        } else {
                            VStack {
                                HStack{
                                    Spacer()
                                    VStack{
                                        Image("Empty")
                                        Text("This folder is empty!")
                                        CustomButton(action: {
                                            print("create link")
                                            folderViewModel.showCreateSheet = true
                                        }, label: "Add your first item", imageSystemName: "plus.circle", style: .fill, larger: false)
                                        
                                    }
                                    Spacer()
                                }
                            }
                        }
                    }.padding(.horizontal, 3)
                    Spacer()
                }
                
                
                
            }.background(Color.themeWhite.edgesIgnoringSafeArea(.all))
        }
            .onAppear {
            // This is called when the view appears
            currentFolder = navigationStateManager.focusFolder ?? Folder(title: "Oops, Error X:C",imgUrl: "folderAsset8", desc: "Try to restart the app", pinned: true, links: [] )
            print("Folder ", currentFolder.toString())
            for link in currentFolder.links {
                print(link.toString()) // Assuming you have a toString() method in your Link class
            }
            navigationStateManager.enterSubMenu()
            folderViewModel.like = currentFolder.pinned
        }
        .onDisappear {
            navigationStateManager.exitSubMenu()
        }.navigationBarBackButtonHidden(true)
            .sheet(isPresented: $folderViewModel.showCreateSheet, content: {
                CreateLinkView(preSelectedfolder: currentFolder, preSelectedSignal: folderViewModel.showCreateSheet ).padding([.top])
            })
            .sheet(isPresented: $openFolderEditSheet, content: {
                VStack{
                    Spacer()
                    if currentFolder.pinned {
                        BottomSheetOption(onClick: {
                            currentFolder.pinned = false
                        }, text: "Unpin", assetImageString: "Folder")
                    } else {
                        BottomSheetOption(onClick: {
                            currentFolder.pinned = true
                        }, text: "Pin", assetImageString: "Folder")
                    }
                    
                    Spacer()
                    BottomSheetOption(onClick: {
                        print("Edit")
                        openFolderEditSheet = false
                        // add a delay to wait for the sheet to be closed
                        DispatchQueue.main.asyncAfter(deadline: .now() + 0.5) {
                            showEditSheet = true
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
                                Task{
                                    modelUtils.deleteFolder(modelContext: modelContext, folder: currentFolder)
                                }
                                navigationStateManager.navigateToRoot()
                               
                                openFolderEditSheet = false
                            },
                            secondaryButton: .cancel()
                        )
                    }
                    
                    Spacer()
                }.presentationDetents([.height(300)])
            })
            .sheet(isPresented: $showEditSheet, content: {
               
                CreateFolderView(editFolder: currentFolder)
            })
            .sheet(isPresented: $folderViewModel.sortOpen) {
                // Your bottom sheet view
                VStack(alignment: .leading) {
                    Spacer()
                    BottomSheetOption(onClick: {
                        print("sort")
                        sortingOption = .recentlyAdded
                        folderViewModel.sortOpen = false
                    }, text: "Recently Added", systemImageString: "clock")
                    Spacer()
                    BottomSheetOption(onClick: {
                        print("sort")
                        sortingOption = .oldest
                        folderViewModel.sortOpen = false
                    }, text: "Oldest", systemImageString: "doc.badge.clock")
                    Spacer()
                    BottomSheetOption(onClick: {
                        print("sort")
                        sortingOption = .titleAZ
                        folderViewModel.sortOpen = false
                    }, text: "Title A-Z", systemImageString: "digitalcrown.arrow.counterclockwise")
                    Spacer()

                }.presentationDetents([.height(300)])
            }
            .onAppear{
                setup()
            }
        
    }
    
    private var backButton: some View {
        HStack {
        }
        .padding(.horizontal)
    }
    
    
}

#Preview {
    FolderView().environment(NavigationStateManager()).modelContainer(PreviewContainer).environment(AppViewModel())
    //    MainNavStack()
    //        .modelContainer(PreviewContainer)
    //        .environment(NavigationStateManager())
    //        .environment(AppViewModel())
}
