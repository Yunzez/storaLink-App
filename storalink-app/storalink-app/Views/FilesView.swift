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
    var body: some View {
        ZStack{
            VStack{
                SearchBarView(viewModel: viewModel)
                    .padding(.bottom)
                ScrollView(.vertical, showsIndicators: false) {
                    VStack {
                        ForEach(folders, id: \.self) { folder in
                            FolderItemView(currentFolder:folder)
                        }
                    }.padding(.vertical)
                }
            }
            
            VStack{
                SearchBarDropDownView(viewModel: viewModel)
                Spacer()
            }
            
        }.padding(.bottom, Spacing.customNavigationBarHeight )
        
    }
    
    func numberOfRows(_ count: Int) -> Int {
        return (count + 1) / 2
    }
    
    func itemForRowAndColumn(row: Int, column: Int) -> Int? {
        let index = row * 2 + column
        return index < items.count ? items[index] : nil
    }
}

#Preview {
    FilesView(viewModel: SearchBarViewModel()).environment(NavigationStateManager()).modelContainer(PreviewContainer).environment(AppViewModel())
}
