//
//  HomeView.swift
//  storalink-app
//
//  Created by Yunze Zhao on 11/26/23.
//

import SwiftUI
struct HomeView: View {
    
    var body: some View {
        
        VStack {
            // The navigation bar would go here, but we'll omit it since you already have it written.
            SearchBarView(viewModel: SearchBarViewModel())
            // Favorite Folders Section
            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: 10) {
                    ForEach(0..<5) { _ in // Replace with your data source
                        FolderItemTabView() // Define this custom view to represent a folder
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
                            FolderItemView() // Reuse the same custom view
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
            }
            
            Spacer()
            
            // The custom tab bar would go here.
        }
    }
    
}

#Preview {
    HomeView()
}

