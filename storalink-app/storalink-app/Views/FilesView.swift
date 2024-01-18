//
//  FilesView.swift
//  storalink-app
//
//  Created by Yunze Zhao on 11/26/23.
//

import SwiftUI
import SwiftData

struct FilesViewEntry: View {
    @Environment(AppViewModel.self) private var appViewModel : AppViewModel
    var body: some View {
        FilesView(filterUserID: appViewModel.userId ?? UUID())
    }
}

struct FilesView: View {
    var filterUserID: UUID?
    @Query private var folders: [Folder]
    @State var viewModel = SearchBarViewModel()
    let items = Array(1...9)
    // Define the grid layout: 2 columns
    private var columns: [GridItem] = Array(repeating: .init(.flexible()), count: 2)
    
    init(filterUserID: UUID){
        _folders = Query(filter: #Predicate<Folder> {$0.user?.id == filterUserID})
    }
    
    var body: some View {
        ZStack(alignment: .top){
            VStack {
                GeometryReader { geometry in
                    VStack{
                        SearchBarView(viewModel: viewModel, searchFolders: folders, searchLinks: []) // we don't pass in links here
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
    FilesViewEntry().environment(NavigationStateManager()).modelContainer(PreviewContainer).environment(AppViewModel())
}
