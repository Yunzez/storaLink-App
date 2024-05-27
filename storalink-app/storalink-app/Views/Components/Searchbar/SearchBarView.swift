//
//  SearchBarView.swift
//  storalink-app
//
//  Created by Yunze Zhao on 11/27/23.
//

import SwiftUI
import SwiftData

struct SearchBarView: View {
    @Environment(NavigationStateManager.self) var navigationStateManager
    @State var viewModel: SearchBarViewModel
    @FocusState private var inputFocus: Bool
    @State private var showResults = false
    @State private var searchBarFrame: CGRect = .zero
    
   
    var searchFolders: [Folder]
    var searchLinks: [Link]
    
    init(viewModel: SearchBarViewModel, searchFolders: [Folder], searchLinks: [Link]){
        self.searchLinks = searchLinks
        self.searchFolders = searchFolders
        self.viewModel = viewModel
    }
    
    var body: some View {
            VStack {
                HStack {
                    Image(systemName: "magnifyingglass")
                        .foregroundColor(.gray)
                        .padding(.leading, 15.0)
                        .padding(.trailing, 5.0)
                        .padding(.vertical)
                    
                    TextField("Search files or saved items", text: $viewModel.searchText)
                        .foregroundColor(.primary)
                        .focused($inputFocus)
                        .onChange(of: viewModel.searchText) { newValue, _ in
                            print("Search term changed to: \(newValue)")
                            viewModel.search(folders: searchFolders, links: searchLinks)
                            withAnimation(.spring(response: 0.55, dampingFraction: 0.45)) {
                                viewModel.isSearching = viewModel.searchText.isEmpty ? false : true
                            }
                            
                        }
                } .background(Color.subtleTheme)
                    .cornerRadius(10)
                    .overlay(
                        RoundedRectangle(cornerRadius: Spacing.roundMd)
                            .stroke( inputFocus ? Color("ThemeColor") : Color.gray , lineWidth: 1.5)
                    )
                    .padding(.horizontal)
                    .frame(height: Spacing.customSearchBarHeight)
                // Search results list
                if viewModel.isSearching && inputFocus {
                    
                    VStack{
                        ScrollView {
                            VStack {
                                if (viewModel.results.isEmpty) {
                                    VStack{
                                        Image("NoResult")
                                            .resizable()
                                            .aspectRatio(contentMode: .fit)
                                            .frame(width: UIScreen.main.bounds.width * 0.9, height: Spacing.customSearchBarHeight * 2 )
                                            .cornerRadius(8)
                                            .padding(Spacing.small)
                                        
                                        Text("No Matching Results").foregroundColor(Color("ThemeBlack")).fontWeight(.semibold)
                                    }
                                }
                                ForEach(viewModel.results, id: \.id) { result in
                                        switch result {
                                        case .folder(let folder):
                                            // Create a view for the folder
                                            Button(action: {
                                                // Any state changes you want to animate go here
                                                viewModel.searchText = ""
                                                    navigationStateManager.navigationPath.append(NavigationItem.folderView)
                                                    navigationStateManager.focusFolder = folder
                                            }) {
                                                HStack {
                                                    Image("Folder")
                                                        .resizable()
                                                        .aspectRatio(contentMode: .fit)
                                                        .frame(width: 30, height: 30) // Example folder icon
                                                    Text(folder.title) // Display folder title
                                                }
                                            }
                                            .foregroundColor(.primary)
                                            .frame(width: UIScreen.main.bounds.width * 0.9, height: Spacing.customSearchBarHeight/2, alignment: .leading )
                                            .padding(Spacing.small)
                                            .cornerRadius(8)

                                        case .link(let link):
                                            // Create a view for the link
                                            Button(action: {
                                                viewModel.searchText = ""
                                                navigationStateManager.navigationPath.append(NavigationItem.linkView)
                                                navigationStateManager.focusLink = link
                                            }) {
                                                HStack {
                                                    Image("Link")
                                                        .resizable()
                                                        .aspectRatio(contentMode: .fit)
                                                        .frame(width: 30, height: 30)
                                                    Text(link.title) // Display folder title
                                                }
                                            }
                                            .foregroundColor(.primary)
                                            .frame(width: UIScreen.main.bounds.width * 0.9, height: Spacing.customSearchBarHeight/2, alignment: .leading )
                                            .padding(Spacing.small)
                                            .cornerRadius(8)
                                        }
                                    }
                                
//
                            }
                        }
                        .scrollIndicators(.visible)
                        .contentMargins(.vertical, Spacing.medium)
                        .background(Color("ThemeWhite"))
                        .cornerRadius(Spacing.small)
                        .overlay(
                            RoundedRectangle(cornerRadius: Spacing.small)
                                .stroke(Color("ThemeColor"), lineWidth: 2)
                        )
                    }.frame(width: UIScreen.main.bounds.width * 0.9, height: Spacing.customSearchBarHeight * 4)
                    .zIndex(2.0)
                    .foregroundStyle(.white)
                    .transition(.offset(x: 0, y: -Spacing.customSearchBarHeight * 4).combined(with: .opacity))
                }
            }
    }
}

//#Preview {
//    SearchBarView(viewModel: SearchBarViewModel()).modelContainer(PreviewContainer)
//}
