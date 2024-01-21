//
//  FolderView.swift
//  storalink-app
//
//  Created by Yunze Zhao on 12/19/23.
//

import SwiftUI

struct FolderView: View {
    
    @Environment(\.presentationMode) var presentationMode: Binding<PresentationMode>
    @Environment(NavigationStateManager.self) var navigationStateManager: NavigationStateManager
    @Bindable var folderViewModel: FolderViewModel
    @State var currentFolder: Folder = Folder(title: "Initial", imgUrl: "", desc: "Initial Folder", links: [])
    let localFileManager = LocalFileManager.manager
    
    
    let buttonHeight: CGFloat = 25
    
    init() {
        folderViewModel = FolderViewModel()
    }
    
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
                                    gradient: Gradient(colors: [Color("ThemeWhite").opacity(0.0), Color("ThemeWhite").opacity(0.7)]),
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
                                    gradient: Gradient(colors: [Color("ThemeWhite").opacity(0.0), Color("ThemeWhite").opacity(0.7)]),
                                    startPoint: .top,
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
                            .background(Color("SubtleTheme").opacity(0.8))
                            .cornerRadius(Spacing.medium)
                            Spacer()
                        }
                        .padding(.horizontal)
                        
                        Spacer()
                        // Placeholder Title Text
                        HStack{
                            Text(currentFolder.title)
                                .font(.title)
                                .frame(maxWidth: .infinity, alignment: .leading)
                                .foregroundColor(Color("ThemeBlack"))
                            
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
                            .background(Color("SubtleTheme").opacity(0.8))
                            .cornerRadius(Spacing.small)
                            .frame(height: buttonHeight) // Set the frame of the button
                            
                            Menu {
                                Button("Menu Item 1", action: { print("Menu Item 1 tapped") })
                                Button("Menu Item 2", action: { print("Menu Item 2 tapped") })
                                Button("Menu Item 3", action: { print("Menu Item 3 tapped") })
                            } label: {
                                Image(systemName: "ellipsis")
                                    .foregroundColor(.gray)
                                    .imageScale(.large)
                                    .frame(width: buttonHeight, height: buttonHeight)
                                    .padding(Spacing.small)
                                    .background(Color("SubtleTheme").opacity(0.8))
                                    .cornerRadius(Spacing.small)
                            }
                            .frame(height: buttonHeight)
                            
                            
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
                            }, label: "Sort", imageSystemName: "line.3.horizontal.decrease.circle", style: .outline)
                            .sheet(isPresented: $folderViewModel.sortOpen) {
                                // Your bottom sheet view
                                VStack {
                                    Text("Option 1").padding()
                                    Text("Option 2").padding()
                                    // Add more options as needed
                                }.presentationDetents([.height(200)])
                            }
                            
                            CustomButton(action: {
                                print("Button tapped")
                                folderViewModel.showCreateSheet = true
                            }, label: "Add", imageSystemName: "plus.circle", style: .fill)
                            .sheet(isPresented: $folderViewModel.showCreateSheet) {
                                CreateLinkView().padding([.top])
                            }
                            
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
                    Text("Links: \(currentFolder.getLinkNum())")
                    Spacer()
                }.padding([.horizontal, .top])
                
                
                HStack{
                    Spacer()
                    GeometryReader { geometry in
                        if currentFolder.getLinkNum() != 0 {
                            ScrollView(.vertical, showsIndicators: true) {
                                VStack(spacing: 10) {
                                    ForEach(currentFolder.links.filter
                                            { link in
                                        folderViewModel.searchText.isEmpty || link.title.localizedCaseInsensitiveContains(folderViewModel.searchText)
                                    } , id: \.self) { link in
                                        LinkItemView(currentLink: link).frame(width: geometry.size.width).transition(.opacity)
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
                                        }, label: "Add your first item", imageSystemName: "plus.circle", style: .fill)
                                        
                                    }
                                    Spacer()
                                }
                            }
                        }
                    }.padding(.horizontal)
                    Spacer()
                }
                
                
                
            }
        }.onAppear {
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
        //            .navigationBarItems(leading: backButton)
        
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
