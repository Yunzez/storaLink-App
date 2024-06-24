//
//  HomeView.swift
//  storalink-app
//
//  Created by Yunze Zhao on 11/26/23.
//

import SwiftUI
import SwiftData


struct HomeViewEntry: View{
    @Environment(AppViewModel.self) private var appViewModel : AppViewModel
    @Environment(\.modelContext) private var modelContext: ModelContext
    //    @Query var folders: [Folder] = []
    //    @Query var links: [Link] = []
    
    var body: some View {
        //        HomeView(folders: folders/*, links: links*/)
        HomeView()
    }
}


// a list of folders, test to see if it updates


struct HomeView: View {
    @Environment(AppViewModel.self) private var appViewModel : AppViewModel
    @Environment(\.modelContext) private var modelContext: ModelContext
    @Environment(NavigationStateManager.self) var navigationStateManager: NavigationStateManager
    // change to state for now, we are fetching on view onappear
    
    @Query var links: [Link] = []
    @Query var folders: [Folder] = []
    //    @Query var folders: [Folder] = []
    //    @Query() private var links: [Link]
    //    init(folders: [Folder]/*, links: [Link]*/) {
    //        self.folders = /*FoldersModelWrapper(folders: folders).folders*/folders
    //    }
    //
    @State var searchbarViewModel = SearchBarViewModel()
    @State  var searchBarFrame: CGRect = .zero
    
    
    @State private var filteredLinks: [Link] = []
    
    func setup(){
        filteredLinks = links.sorted(by: { $0.creationDate > $1.creationDate }).prefix(10).map { $0 }
        //        let folderFetchDescriptor = FetchDescriptor<Folder>(
        //            predicate:  #Predicate { folder in
        //                return true
        //            },
        //            sortBy: [SortDescriptor(\Folder.creationDate, order: .reverse)]
        //        )
        //
        //        do {
        //            folders = try modelContext.fetch(folderFetchDescriptor)
        //        }catch {
        //            print("Error in fetching folders")
        //        }
        //
        //        if sharedDefaults?.bool(forKey: "DataUpdatedFlag") == true {
        //            print("Data was updated in the share extension.")
        //
        //            // Reset the flag
        //            sharedDefaults?.set(false, forKey: "DataUpdatedFlag")
        //
        //            links.forEach { link in
        //                if let folder = link.parentFolder {
        //                    print(folder.title)
        //                } else {
        //                    print("link has no parent")
        //                }
        //            }
        //
        //            folders.forEach { folder in
        //                print("setup, folder link num: \(folder.links.count)")
        //            }
        //        } else {
        //
        //        }
        
        filteredLinks = filterLink()
        
        
        //        folderFetchDescriptor.fetchLimit = 5
    }
    
    // ! we calculate the links here whenever we render links
#warning("Temp method, once link can be queried, should delete")
    func filterLink() -> [Link] {
        let folderIds = Set(folders.compactMap { $0.id })
        return links.filter { link in
            guard let folderId = link.parentFolder?.id else { return false }
            return folderIds.contains(folderId)
        }
        .sorted(by: { $0.creationDate > $1.creationDate })
        .prefix(10) // Take the first 10 elements
        .map { $0 } // Convert the prefix result back to an array
    }
    
    
    
    let searchBarHeight: CGFloat = 50
    var body: some View {
        ZStack(alignment: .top){
            
            VStack {
                GeometryReader { geometry in
                    VStack{
                        SearchBarView(viewModel: searchbarViewModel, searchFolders: folders, searchLinks: links)
                    }
                }
            }.zIndex(2.0)
            
            if folders.count == 0 && links.count == 0 {
                VStack{
                    Spacer().frame(height: Spacing.customSearchBarHeight)
                    Image("Empty")
                    Text("Looking Pretty Empty Here!").font(.title2).bold()
                    Text("Hey there! Get started using Storalink by tapping on the button below to create your first folder!").font(.subheadline)
                        .multilineTextAlignment(.center).padding(3)
                    CustomButton(action: {
                        navigationStateManager.navigationPath.append(NavigationItem.createFolderView)
                    }, label: "Create Folder", style: .fill, larger: false)
                }.padding()
            }
            else {
                
                VStack {
                    Spacer().frame(height: Spacing.customSearchBarHeight - 20)
                    // Favorite Folders Section
                    ScrollView(.horizontal, showsIndicators: false) {
                        HStack(spacing: 10) {
                            ForEach(Array(folders.prefix(5))) { folder in // Replace with your data source
                                if folder.pinned {
                                    FolderItemTabView(folder: folder).foregroundColor(.primary)
                                        .transition(.asymmetric(insertion: .opacity.combined(with: .scale), removal: .opacity.combined(with: .scale)))
                                }
                            }
                        }
                        .padding()
                        .padding(.top)
                    }.animation(.easeInOut, value: folders.count)
                    
                    // Recent Folders Section
                    VStack(alignment: .leading) {
                        Text("Recent Folders")
                            .font(.headline)
                            .padding(.leading)
                        
                        ScrollView(.horizontal, showsIndicators: false) {
                            HStack(spacing: 10) {
                                
                                ForEach(folders) { folder in // Replace with your data source
                                    let preparedFolder = FolderModelWrapper(folder: folder).folder
                                    FolderItemView(folder: preparedFolder).foregroundColor(.primary) // Reuse the same custom view
                                }
                                
                                if (folders.count < 3) {
                                    ForEach(0..<(3 - folders.count), id: \.self) { _ in
                                        FolderItemAddView()
                                    }
                                }
                            }
                            .padding([.leading])
                        }
                    }
                    
                    // Recent Links Section
                    HStack() {
                        Text("Recent Links")
                            .font(.headline)
                            .padding([.leading, .top])
                        Spacer()
                    }
                    
                    if links.count > 0 {
                        VStack(alignment: .leading) {
                            
                            
                            ScrollView(.vertical, showsIndicators: true) {
                                VStack(spacing: 5) {
                                    ForEach(filteredLinks) { link in // Replace with your data source
                                        LinkItemView(currentLink: link)
                                    }
                                }
                                .padding([.leading, .trailing])
                            }
                        }.ignoresSafeArea(.keyboard)
                    } else {
                        VStack{
                            ScrollView(.vertical, showsIndicators: true) {
                                Image("Empty").resizable().frame(width: 150, height: 150, alignment: .center)
                                Text("Looking Pretty Empty Here!").font(.subheadline).bold()
                                CustomButton(action: {
                                    navigationStateManager.navigationPath.append(NavigationItem.createLinkView)
                                }, label: "Add a link", style: .fill, larger:false)
                                Spacer().frame(maxWidth: .infinity)
                            }
                        }.ignoresSafeArea(.keyboard)
                    }
                    
                }.onChange(of: links.count) { _, _ in
                    setup()
                }
                
            }
        }
        
        .onTapGesture {
            UIApplication.shared.endEditing()
        }.onAppear{
            setup()
        }
        .onChange(of: links.count) { _, _ in
            setup()
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
    }
    
}

#Preview {
    HomeViewEntry()
        .environment(NavigationStateManager())
        .environment(AppViewModel())
        .modelContainer(PreviewContainer)
}

