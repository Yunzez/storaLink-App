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
    @StateObject var folderViewModel: FolderViewModel
    
    let buttonHeight: CGFloat = 25
    
    init() {
        _folderViewModel = StateObject(wrappedValue: FolderViewModel())
    }
    
    var body: some View {
        NavigationView {
            
            VStack() {
                // Custom Navigation Bar with Background Image
                ZStack {
                    Image("FolderPlaceHolder") // Replace with your actual background image
                        .resizable()
                        .blur(radius: 2)
                    
                    VStack {
                        Spacer()
                        HStack {
                            Button(action: {
                                print("Click return")
//                                self.presentationMode.wrappedValue.dismiss()
                                print("Before reset:", navigationStateManager.navigationPath)
                                   navigationStateManager.navigateToRoot()
                                   print("After reset:", navigationStateManager.navigationPath)
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
                            Text("Placeholder")
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
                Text("This is a folder for tips and resources that I found helpful during my trip to London. Resources are from many places.")
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding([.horizontal, .top])
                
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
                        }, label: "Add", imageSystemName: "plus.circle", style: .fill)
                        
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
                    Text("Links: 10")
                    Spacer()
                }.padding([.horizontal, .top])
                HStack{
                    Spacer()
                    GeometryReader { geometry in
                        ScrollView(.vertical, showsIndicators: true) {
                            VStack(spacing: 10) {
                                ForEach(0..<10) { index in
                                    LinkItemView(currentLink: Link(id: -1, title: "link", imgUrl: "", desc: "test link \(index * 2) ", linksNumber: 2)).frame(width: geometry.size.width )
                                }
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
