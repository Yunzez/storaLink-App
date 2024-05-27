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
        FilesView()
    }
}

struct FilesView: View {
    @Environment(NavigationStateManager.self) private var navigationStateManager : NavigationStateManager
    var filterUserID: UUID?
    @Query private var folders: [Folder]
    @State var viewModel = SearchBarViewModel()
    let items = Array(1...9)
    // Define the grid layout: 2 columns
    private var columns: [GridItem] = Array(repeating: .init(.flexible()), count: 2)
    
    
    var body: some View {
        ZStack(alignment: .top){
            VStack {
                GeometryReader { geometry in
                    VStack{
                        SearchBarView(viewModel: viewModel, searchFolders: folders, searchLinks: []) // we don't pass in links here
                    }
                }
            }.zIndex(2.0)
            
            if folders.count == 0 {
                VStack{
                    Spacer()
                    Image("Empty")
                    Text("You have no files yet!").font(.title2).bold()
                    Text("Hey there! Get started using Storalink by tapping on the button below to create your first folder!").font(.subheadline)
                        .multilineTextAlignment(.center).padding(3)
                    CustomButton(action: {
                        navigationStateManager.navigationPath.append(NavigationItem.createFolderView)
                    }, label: "Create Folder", style: .fill, larger: false)
                    Spacer()
                }.padding()
            } else {
                VStack{
                    ScrollView(.vertical, showsIndicators: false) {
                        LazyVGrid(columns: columns, spacing: 20) {
                            ForEach(folders, id: \.self) { folder in
                                FolderItemView(folder: folder)
                                    .frame(minWidth: 0, maxWidth: .infinity)
                            }
                        }.padding(.horizontal) // Add horizontal padding
                    }
                }.padding(.top, Spacing.customSearchBarHeight )
                    .padding(.top, Spacing.small)
            }
            
            
        }/*.padding(.bottom, Spacing.customNavigationBarHeight )*/
            .background(Color.themeWhite)
            .onTapGesture {
                UIApplication.shared.endEditing()
            }
    }
}

#Preview {
    FilesViewEntry().environment(NavigationStateManager()).modelContainer(PreviewContainer).environment(AppViewModel())
}
