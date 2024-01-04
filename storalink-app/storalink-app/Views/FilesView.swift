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
        ZStack{
            VStack{
                SearchBarView(viewModel: viewModel)
                    .padding(.bottom)
                ScrollView(.vertical, showsIndicators: false) {
                    LazyVGrid(columns: columns, spacing: 20) {
                        ForEach(folders, id: \.self) { folder in
                            FolderItemView(currentFolder: folder)
                                .frame(minWidth: 0, maxWidth: .infinity)
                        }
                    }.padding(.horizontal) // Add horizontal padding
                }
            }
            
            VStack{
                SearchBarDropDownView(viewModel: viewModel)
                Spacer()
            }
            
        }.padding(.bottom, Spacing.customNavigationBarHeight )
        
    }
}

#Preview {
    FilesView().environment(NavigationStateManager()).modelContainer(PreviewContainer).environment(AppViewModel())
}
