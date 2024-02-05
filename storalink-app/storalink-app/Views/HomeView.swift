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
    
#warning("Temp, inject userId using Entry struct")
    var body: some View {
        HomeView(filterUserID: appViewModel.userId)
    }
}

struct HomeView: View {
    var filterUserID: UUID?
    @Environment(AppViewModel.self) private var appViewModel : AppViewModel
    @Environment(\.modelContext) private var modelContext: ModelContext
    
    @Query var users: [User] = [User]()
    @State var user: User?
    
    // change to state for now, we are fetching on view onappear
    @Query var folders: [Folder] = []
    @Query var links: [Link] = []
    //    @Query() private var links: [Link]
    
    
    @State var searchbarViewModel = SearchBarViewModel()
    @State  var searchBarFrame: CGRect = .zero
    
    
    @State private var filteredLinks: [Link] = []
    //
    init(filterUserID: UUID? = UUID() ) {
        self.filterUserID = filterUserID
        _users = Query(filter: #Predicate { user in
            if let filterId = filterUserID {
                return user.id == filterId
            } else {
                return false
            }
        })
        
        user = users.first
        
        _folders = Query(filter: #Predicate { folder in
            if let filterId = filterUserID {
                return folder.user?.id == filterId
            } else {
                return false
            }
        }, sort: [SortDescriptor(\Folder.creationDate, order: .reverse)])
        
        // User -> [Folders] -> [Links]
        //        _links = Query(filter: #Predicate { link in
        //            if let filterId = filterUserID {
        //                if let currentFolder = link.parentFolder {
        //                    if let currentUser = currentFolder.user {
        //                       return currentUser.id == filterId
        //                    } else {
        //                        return false
        //                    }
        //                } else {
        //                    return false
        //                }
        //            } else {
        //                return false
        //            }
        //       })
    }
    
    
    func setup(){
        print("folder number:", folders.count)
        filteredLinks = filterLink()
        //        var folderCount = 5
        // add custom fetch to filter data by creation date
        //        var folderFetchDescriptor = FetchDescriptor<Folder>(
        //            predicate:  #Predicate { folder in
        //                if let filterId = filterUserID {
        //                    return folder.user?.id == filterId
        //                } else {
        //                    return false
        //                }
        //            },
        //            sortBy: [SortDescriptor(\Folder.creationDate, order: .reverse)]
        //        )
        //        folderFetchDescriptor.fetchLimit = 5
        //
        //        do { try  folders =  modelContext.fetch(folderFetchDescriptor) } catch {
        //             print("Error in fetching folders")
        //         }
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
    
    
    // Update filtered links whenever the view appears or the relevant data changes
    private func updateFilteredLinks() {
        guard (user?.name) != nil else {
            print("no user name")
            filteredLinks = []
            return
        }
        
        filteredLinks = links.filter { link in
            link.parentFolder?.user?.name == user?.name
        }
    }
    
    
    
    
    let searchBarHeight: CGFloat = 50
    var body: some View {
        NavigationView {
            ZStack(alignment: .top){
                
                VStack {
                    GeometryReader { geometry in
                        VStack{
                            SearchBarView(viewModel: searchbarViewModel, searchFolders: folders, searchLinks: links)
                        }
                    }
                }.zIndex(2.0)
                
                VStack {
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
                        Text("Recent Links")
                            .font(.headline)
                            .padding(.leading)
                        
                        ScrollView(.vertical, showsIndicators: true) {
                            VStack(spacing: 6) {
                                ForEach(filteredLinks) { link in // Replace with your data source
                                    LinkItemView(currentLink: link)
                                }
                            }
                            .padding()
                        }
                    }.padding(.bottom, Spacing.customNavigationBarHeight )
                    
                    Spacer()
                }.onAppear{
                    setup()
                }.padding(.top, Spacing.customSearchBarHeight )
            }
            
        }.onTapGesture {
            UIApplication.shared.endEditing()
        }.onChange(of: links) { _, _ in
            setup()
        }
    }
    
}

#Preview {
    HomeViewEntry()
        .environment(NavigationStateManager())
        .environment(AppViewModel())
        .modelContainer(PreviewContainer)
}

