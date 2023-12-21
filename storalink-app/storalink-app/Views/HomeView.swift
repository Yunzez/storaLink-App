//
//  HomeView.swift
//  storalink-app
//
//  Created by Yunze Zhao on 11/26/23.
//

import SwiftUI
struct HomeView: View {
    @StateObject var viewModel = SearchBarViewModel()
    @State  var searchBarFrame: CGRect = .zero
    
    let searchBarHeight: CGFloat = 50
    var body: some View {
        NavigationView {
            ZStack{
                
                VStack {
                    GeometryReader { geometry in
                        SearchBarView(viewModel: viewModel)
                            .onAppear {
                                searchBarFrame = geometry.frame(in: .global)
                            }
                    }
                    .frame(height: searchBarHeight) // Set the height for your search bar
                    
                    // Favorite Folders Section
                    ScrollView(.horizontal, showsIndicators: false) {
                        HStack(spacing: 10) {
                            ForEach(0..<5) { _ in // Replace with your data source
                                NavigationLink(destination: FolderView())
                                {
                                    FolderItemTabView().foregroundColor(.primary)
                                }
                            }
                        }
                        .padding()
                    }
                    
                    // Recent Folders Section
                    
                    VStack(alignment: .leading) {
                        Text("Recent Folders")
                            .font(.headline)
                            .padding(.leading)
                        
                        ScrollView(.horizontal, showsIndicators: false) {
                            HStack(spacing: 10) {
                                ForEach(0..<5) { _ in // Replace with your data source
                                    NavigationLink(destination: FolderView())
                                    {
                                        FolderItemView().foregroundColor(.primary) // Reuse the same custom view
                                    }
                                }
                            }
                            .padding()
                        }
                    }
                    
                    
                    // Recent Links Section
                    VStack(alignment: .leading) {
                        Text("Recent Links")
                            .font(.headline)
                            .padding(.leading)
                        
                        ScrollView(.vertical, showsIndicators: true) {
                            VStack(spacing: 10) {
                                ForEach(0..<10) { _ in // Replace with your data source
                                    LinkItemView() // Define this custom view to represent a link
                                }
                            }
                            .padding()
                        }
                    }.padding(.bottom, Spacing.customNavigationBarHeight )
                    
                    Spacer()
                    
                    // The custom tab bar would go here.
                }
                VStack{
                    SearchBarDropDownView(viewModel: viewModel).offset(y: searchBarHeight + 5)
                    Spacer()
                }
                
            }
            
        }
    }
    
}

#Preview {
    HomeView()
}

