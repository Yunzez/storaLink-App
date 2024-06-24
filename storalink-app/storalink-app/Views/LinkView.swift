//
//  LinkView.swift
//  storalink-app
//
//  Created by Yunze Zhao on 12/22/23.
//

import SwiftUI
import SwiftData
struct LinkView: View {
    @Environment(\.presentationMode) var presentationMode: Binding<PresentationMode>
    @Environment(NavigationStateManager.self) var navigationStateManager: NavigationStateManager
    @Query var folders: [Folder]
    @State private var currentLinkIndex = 0
    @State var dragOffSet: CGFloat = 0
    @State var screenWidth: CGFloat = 0
    @State private var currentLink: Link? = nil
    
    private let numberOfCardsEachSide = 3
    
    private var visibleCardRange: Range<Int> {
        let startIndex = max(currentLinkIndex - numberOfCardsEachSide, 0)
        let endIndex = min(currentLinkIndex + numberOfCardsEachSide, currentFolder.links.count)
        return startIndex..<endIndex
    }
    
    var currentFolder: Folder {
        if let folder = currentLink?.parentFolder {
            return folder
        } else {
            return Folder(title: "Error", imgUrl: "", links: [])
        }
    }
    
    func adjustCurrentLinkIndex() -> Void {
        let links = currentFolder.links
        print("get link index")
        for (index, link) in links.enumerated() {
            if link == currentLink {
                currentLinkIndex = index
                break
            }
        }
        
    }
    
    func cardOffSet(for index: Int) -> CGFloat{
        let adjustedIndex = index - currentLinkIndex
        let cardSpacing: CGFloat = 80 / cardScale(for: index)
        let initialOffset = cardSpacing * CGFloat(adjustedIndex)
        let maxCardMovement = cardSpacing
        let progress = min(abs(dragOffSet)/(screenWidth/2), 1)
        
        if adjustedIndex < 0 { // card off screen
            if dragOffSet > 0 && index == currentLinkIndex - 1 {
                let distanceToMove = (initialOffset + screenWidth) * progress
                return -screenWidth + distanceToMove
            } else {
                return -screenWidth
            }
        } else if index > currentLinkIndex {
            let distanceToMove = cardSpacing * progress
            return initialOffset - (dragOffSet < 0 ? distanceToMove : -distanceToMove)
        } else {
            if dragOffSet < 0 {
                return dragOffSet
            } else {
                let distanceToMove = maxCardMovement   * progress
                return initialOffset - (dragOffSet < 0 ? distanceToMove : -distanceToMove)
            }
        }
    }
    
    func cardScale(for index: Int, proportion: CGFloat = 0.1) -> CGFloat {
        let adjustedIndex = index - currentLinkIndex
        let progress = min(abs(dragOffSet)/(screenWidth/2), 1)
        if index >= currentLinkIndex {
            return 1 - proportion * CGFloat(adjustedIndex) + (dragOffSet < 0 ? proportion * progress : -proportion * progress)
        }
        return 1
    }
    var body: some View {
        GeometryReader { reader in
            VStack{
                ZStack {
                    HStack {
                        Button(action: {
                            navigationStateManager.navigateBack()
                        }, label: {
                            Image(systemName: "arrow.uturn.backward")
                                .foregroundColor(Color.themeBlack)
                                .imageScale(.large)
                                .padding(Spacing.medium)
                        })
                        .background(Color("SubtleTheme").opacity(0.8))
                        .cornerRadius(Spacing.medium)
                        Spacer()
                        
                        Text("In Folder: \(currentFolder.title)")
                    }
                    .padding(.horizontal)
                    
                }.edgesIgnoringSafeArea(.top)
                    .frame(maxWidth: .infinity, maxHeight: 60)
                    .padding(.bottom)
                
                ZStack {
                    ForEach(visibleCardRange, id: \.self) { index in
                        let link = currentFolder.links[index]
                        LinkViewCard(link: link)
                            .shadow(radius: 3)
                            .offset(x: cardOffSet(for: index))
                            .scaleEffect(x: cardScale(for: index), y: cardScale(for: index))
                            .zIndex(-Double (index))
                            .frame(width: screenWidth)
                            .gesture(
                                DragGesture().onChanged { value in
                                    self.dragOffSet = value.translation.width
                                }
                                    .onEnded { endVal in
                                        let threshold = screenWidth * 0.3
                                        withAnimation {
                                            if endVal.translation.width < -threshold {
                                                currentLinkIndex = min(currentLinkIndex + 1, currentFolder.links.count - 1)
                                            } else if endVal.translation.width > threshold {
                                                currentLinkIndex = max(currentLinkIndex - 1, 0)
                                            }
                                            currentLink = currentFolder.links[currentLinkIndex]
                                        }
                                        withAnimation {
                                            dragOffSet = 0
                                        }
                                    }
                            )
                    }
                }
                
                HStack{
                    Text("\(currentLinkIndex + 1)/\(currentFolder.getLinkNum())").foregroundColor(Color.themeGray)
                    Spacer()
                }.padding(.horizontal)
                    .padding(.vertical)
                
                VStack{
                    HStack{
                        Text(currentLink?.title ?? "  ").font(.title2).fontWeight(/*@START_MENU_TOKEN@*/.bold/*@END_MENU_TOKEN@*/).padding(.horizontal)
                        Spacer()
                        
                    }.padding(.bottom, 8)
                    HStack{
                        Text(currentLink?.desc ?? "   ").padding(.horizontal)
                        Spacer()
                    }
                }
                Spacer()
                
                HStack{
                    Button {
                        print("do something")
                    } label: {
                        Image(systemName: "ellipsis").rotationEffect(.degrees(90)) // Rotate the icon 90 degrees
                            .padding(Spacing.large) // Add padding to increase tappable area
                            .background(Color.themeWhite) // Set background color
                            .foregroundColor(Color.themeBlack) // Set icon color
                            .cornerRadius(Spacing.roundMd)
                    }.padding(.trailing, 4)

                    
                    CustomButton(action: {
                        if let url = URL(string: currentLink?.linkUrl ?? "") {
                            print("open link", url)
                            UIApplication.shared.open(url)
                        } else {
                            print("Invalid URL")
                        }
                    }, label: "View Live Media", imageSystemName: "link", style: .fill, larger: true)
                }.padding(.top, Spacing.medium).frame(maxWidth: .infinity).background(Color.subtleTheme.edgesIgnoringSafeArea(.bottom))
            }.onAppear {
                print("appear")
                
                if let focusedLink = navigationStateManager.focusLink {
                    currentLink = focusedLink
                    // Find the index of focusedLink in the currentFolder.links array
                    if let index = currentFolder.links.firstIndex(where: { $0.id == focusedLink.id }) {
                        currentLinkIndex = index
                    }
                } else {
                    // fallback
                    currentLink = Link(title: "Test Link 1", imgUrl: "", desc: "testing link one")
                }
                adjustCurrentLinkIndex()
                print("adjusted")
                
                screenWidth = reader.size.width
                navigationStateManager.enterSubMenu()
            }
            .onDisappear {
                navigationStateManager.exitSubMenu()
            }.navigationBarBackButtonHidden(true)
        }.background(Color.themeWhite.edgesIgnoringSafeArea(.top))
    }
}


//
//#Preview {
//    MainNavStack()
//        .modelContainer(PreviewContainer)
//        .environment(NavigationStateManager())
//        .environment(AppViewModel())
//}



