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
    
    var currentFolder: Folder {
        navigationStateManager.focusFolder ?? Folder(title: "Oops, Error X:C",imgUrl: "folderAsset8", desc: "Try to restart the app" )
        }
    let buttonHeight: CGFloat = 25
    
    init() {
        folderViewModel = FolderViewModel()
    }
    
    var body: some View {
        NavigationView {
            
            VStack(spacing: 0) {
                // Custom Navigation Bar with Background Image
                ZStack {
                    Image(currentFolder.imgUrl)
                        .resizable()
                        .aspectRatio(contentMode: .fill)
                        .blur(radius: 2)
                        .frame(height: 200)  // Fixed height for the image
                        .clipped()  // Ensure the image doesn't overlap other content
                        .edgesIgnoringSafeArea(.top)
                        
                    
                    VStack {
                        Spacer()
                        HStack {
                            Button(action: {
                                print("Click return")

                                if(navigationStateManager.lastNavigationSource != .normal) {
                                    navigationStateManager.navigateBack()
                                } else {
                                    self.presentationMode.wrappedValue.dismiss()
                                }
                                   
                            }, label: {
                                Image(systemName: "arrow.uturn.backward")
                                    .foregroundColor(.black)
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
                                .foregroundColor(.black)
                            
                            Spacer()
                            
                            Button(action: { folderViewModel.toggleLike() }) {
                                Image(systemName: folderViewModel.likeIconPath)
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
                }.edgesIgnoringSafeArea(.top)
                    .frame(maxWidth: .infinity, maxHeight: 150)
                
                
                // Description Text
                Text(currentFolder.desc ?? "No description for this folder")
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding([.horizontal, .bottom])
                
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
                                Text("Cancel").foregroundColor(.black)
                            }
                            Spacer()
                        }.padding(.horizontal)
                    }.frame(height: 35)
                    
                }
                
                // Scrollable content
                HStack{
                    Text("Links: \(currentFolder.linksNumber)")
                    Spacer()
                }.padding([.horizontal, .top])
                
               
                    HStack{
                        Spacer()
                        GeometryReader { geometry in
                            if currentFolder.linksNumber != 0 {
                                ScrollView(.vertical, showsIndicators: true) {
                                    VStack(spacing: 10) {
                                        ForEach(currentFolder.links! ) { link in
                                            LinkItemView(currentLink: link).frame(width: geometry.size.width )
                                        }
                                    }
                                }
                            } else {
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
                        }.padding(.horizontal)
                        Spacer()
                    }
                
               
                
            }
        }.onAppear {
            // This is called when the view appears
            navigationStateManager.enterSubMenu()
        }
        .onDisappear {
            // This is called when the view is about to disappear
            navigationStateManager.exitSubMenu()
        }.navigationBarBackButtonHidden(true)
    }
}

#Preview {
    FolderView().environment(NavigationStateManager()).modelContainer(PreviewContainer).environment(AppViewModel())
}
