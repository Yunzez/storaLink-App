//
//  FilesView.swift
//  storalink-app
//
//  Created by Yunze Zhao on 11/26/23.
//

import SwiftUI
import SwiftData
struct FilesView: View {
    @Query var folders: [Folder]
    @State var viewModel = SearchBarViewModel()
    let items = Array(1...9)
    // Define the grid layout: 2 columns
    private var columns: [GridItem] = Array(repeating: .init(.flexible()), count: 2)
    
    var body: some View {
        ZStack(alignment: .top){
            VStack {
                GeometryReader { geometry in
                    VStack{
                        SearchBarView(viewModel: viewModel)
                    }
                }
            }.zIndex(2.0)
          
            VStack{
               
                ScrollView(.vertical, showsIndicators: false) {
                    LazyVGrid(columns: columns, spacing: 20) {
                        ForEach(folders, id: \.self) { folder in
                            FolderItemView(currentFolder: folder)
                                .frame(minWidth: 0, maxWidth: .infinity)
                        }
                    }.padding(.horizontal) // Add horizontal padding
                }
            }.padding(.top, Spacing.customSearchBarHeight )
            .padding(.top, Spacing.small)
            
        }.padding(.bottom, Spacing.customNavigationBarHeight )
        
    }
}

#Preview {
    FilesView().environment(NavigationStateManager()).modelContainer(PreviewContainer).environment(AppViewModel())
}
