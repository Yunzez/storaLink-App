//
//  FolderView.swift
//  storalink-app
//
//  Created by Yunze Zhao on 12/19/23.
//

import SwiftUI

struct FolderView: View {
    @EnvironmentObject var navigationStateManager: NavigationStateManager
    @StateObject var folderViewModel: FolderViewModel
    
    let buttonHeight: CGFloat = 25
    
    init() {
        _folderViewModel = StateObject(wrappedValue: FolderViewModel())
    }
    
    var body: some View {
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
            
            HStack {
                CustomButton(action: {
                    print("Button tapped")
                }, label: "", imageSystemName: "magnifyingglass", style: .outline)
                
                CustomButton(action: {
                    print("Button tapped")
                }, label: "Sort By", imageSystemName: "line.3.horizontal.decrease.circle", style: .outline)
                
                CustomButton(action: {
                    print("Button tapped")
                }, label: "Add Item", imageSystemName: "plus.circle", style: .fill)
                
                Spacer()
            }
            .padding([.horizontal])
            
            
            // Scrollable content
            HStack{
                Text("Links: 10")
                Spacer()
            }.padding([.horizontal, .top])
            
            ScrollView(.vertical, showsIndicators: true) {
                VStack(spacing: 10) {
                    ForEach(0..<10) { _ in
                        LinkItemView() // Your custom view representing a link
                    }
                }
            }
        }.onAppear {
            // This is called when the view appears
            navigationStateManager.enterSubMenu()
        }
        .onDisappear {
            // This is called when the view is about to disappear
            navigationStateManager.exitSubMenu()
        }
    }
}

#Preview {
    FolderView().environmentObject(NavigationStateManager())
}
