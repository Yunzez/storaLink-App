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
    
    var currentLink: Link {
        if let focusedLink = navigationStateManager.focusLink {
            return focusedLink
        }
        else {
            return Link(title: "Test Link 1", imgUrl: "", desc: "testing link one")
        }
    }
    var currentFolder: Folder {
        if let folder = currentLink.parentFolder {
            return folder
        } else {
            return Folder(title: "Error", imgUrl: "")
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
                            print("Click return")
                            self.presentationMode.wrappedValue.dismiss()
                        }, label: {
                            Image(systemName: "arrow.uturn.backward")
                                .foregroundColor(.black)
                                .imageScale(.large)
                                .padding(Spacing.medium)
                        })
                        .background(Color("SubtleTheme").opacity(0.8))
                        .cornerRadius(Spacing.medium)
                        .shadow(radius:7)
                        Spacer()
                        
                        Text("In Folder: \(currentFolder.title)")
                    }
                    .padding(.horizontal)
                    
                }.edgesIgnoringSafeArea(.top)
                    .frame(maxWidth: .infinity, maxHeight: 60)
                    .padding(.bottom)
//                                .background(.red)
                
//                ScrollView(.horizontal, showsIndicators: true) {
                    ZStack {
                        ForEach(Array(currentFolder.links?.enumerated() ?? [].enumerated()), id: \.element.id) { index, link in
                            LinkViewCard()
                                .shadow(radius: /*@START_MENU_TOKEN@*/10/*@END_MENU_TOKEN@*/)
                                .offset(x: cardOffSet(for: index))
                                .scaleEffect(x: cardScale(for: index), y: cardScale(for: index))
                                .overlay(Color.white.opacity(1-cardScale(for: index)))
                                .zIndex(-Double (index))
                                .frame(width: screenWidth)
                                .gesture(
                                    DragGesture().onChanged{ value in
                                        print(value)
                                        self.dragOffSet = value.translation.width
                                    }.onEnded{ endVal in
                                        print("end", endVal)
                                        let threshold = screenWidth * 0.3
                                        
                                        withAnimation{
                                            if endVal.translation.width < -threshold {
                                                currentLinkIndex = min(currentLinkIndex + 1, currentFolder.links?.count ?? 0)
                                            } else if(endVal.translation.width > threshold) {
                                                    currentLinkIndex = max(currentLinkIndex - 1,  0)
                                            }
                                        }
                                        
                                        withAnimation{
                                            dragOffSet = 0
                                        }
                                    }
                                )// Assuming LinkViewCard takes a Link object
                        }
                    }
                   
//                }.padding(.horizontal)
                
                HStack{
                    Text("0\(currentLinkIndex + 1)/\(currentFolder.getLinkNum())")
                    Spacer()
                }.padding(.horizontal)
                
                VStack{
                    Text("Title Placeholder 1").font(.title2).fontWeight(/*@START_MENU_TOKEN@*/.bold/*@END_MENU_TOKEN@*/)
                    Text("Decently Long Link Description Placeholder and ipsum dolor sit amet consectetur. Elementum viverra urna aenean et orci risus tellus. Donec egestas velit purus vitae.Et platea phasellus mattis cursus euismod nunc lacus felis sit. Adipiscing pellentesque nisl maecenas vel egestas vulputate tempor consectetur. ")
                }.padding(.horizontal)
                Spacer()
                
                HStack{
                    Image(systemName: "ellipsis")
                    CustomButton(action: {print("go to link")}, label: "View Live Media", imageSystemName: "link", style: .fill)
                }
            }.onAppear {
                screenWidth = reader.size.width
                navigationStateManager.enterSubMenu()
            }
            .onDisappear {
                navigationStateManager.exitSubMenu()
            }.navigationBarBackButtonHidden(true)
        }
    }
}


//
//#Preview {
//    MainNavStack()
//        .modelContainer(PreviewContainer)
//        .environment(NavigationStateManager())
//        .environment(AppViewModel())
//}



