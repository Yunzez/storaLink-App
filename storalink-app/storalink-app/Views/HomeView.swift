//
//  HomeView.swift
//  storalink-app
//
//  Created by Yunze Zhao on 11/26/23.
//

import SwiftUI
import SwiftData
struct HomeView: View {
    @Query(sort: \Folder.creationDate, order: .reverse) private var folders: [Folder]
    @Query(sort: \Link.creationDate, order: .reverse) private var links: [Link]
    @State var viewModel = SearchBarViewModel()
    @State  var searchBarFrame: CGRect = .zero
    
    let searchBarHeight: CGFloat = 50
    var body: some View {
            NavigationView {
                ZStack(alignment: .top){
                    
                    VStack {
                        GeometryReader { geometry in
                            VStack{
                                SearchBarView(viewModel: viewModel)
                            }
                        }
                    }.zIndex(2.0)
                    
                    VStack {
                        // Favorite Folders Section
                        ScrollView(.horizontal, showsIndicators: false) {
                            HStack(spacing: 10) {
                                ForEach(folders) { folder in // Replace with your data source
                                    if folder.pinned {
                                        FolderItemTabView(folder: folder).foregroundColor(.primary)
                                            .transition(.asymmetric(insertion: .opacity.combined(with: .scale), removal: .opacity.combined(with: .scale)))
                                    }
                                }
                            }
                            .padding()
                        }.animation(.easeInOut, value: folders.count)
                        
                        // Recent Folders Section
                        VStack(alignment: .leading) {
                            Text("Recent Folders")
                                .font(.headline)
                                .padding(.leading)
                            
                            ScrollView(.horizontal, showsIndicators: false) {
                                HStack(spacing: 10) {
                                    ForEach(folders) { folder in // Replace with your data source
                                        FolderItemView(currentFolder: folder).foregroundColor(.primary) // Reuse the same custom view
                                    }
                                }
                                .padding()
                            }
                        }
                        
                        // Recent Links Section
                        VStack(alignment: .leading) {
                            Text("Recent Links: \(links.count)")
                                .font(.headline)
                                .padding(.leading)
                            
                            ScrollView(.vertical, showsIndicators: true) {
                                VStack(spacing: 6) {
                                    ForEach(links) { link in // Replace with your data source
                                        LinkItemView(currentLink: link)
                                    }
                                }
                                .padding()
                            }
                        }.padding(.bottom, Spacing.customNavigationBarHeight )
                        
                        Spacer()
                    }.onAppear{
                        
                    }.padding(.top, Spacing.customSearchBarHeight )
                }
                
        }
    }
    
}

#Preview {
    HomeView()
        .modelContainer(PreviewContainer)
        .environment(NavigationStateManager())
        .environment(AppViewModel())
}

