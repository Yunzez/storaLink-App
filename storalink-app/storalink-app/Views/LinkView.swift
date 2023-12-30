//
//  LinkView.swift
//  storalink-app
//
//  Created by Yunze Zhao on 12/22/23.
//

import SwiftUI

struct LinkView: View {
    @Environment(\.presentationMode) var presentationMode: Binding<PresentationMode>
    @Environment(NavigationStateManager.self) var navigationStateManager: NavigationStateManager
    var body: some View {
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
                        
                        Text("In some folder")
                    }
                    .padding(.horizontal)
                    
            }.edgesIgnoringSafeArea(.top)
                .frame(maxWidth: .infinity, maxHeight: 60)
                .padding(.bottom)
//                .background(.red)
            
            ScrollView(.horizontal , showsIndicators: true){
                HStack {
                    ForEach(1..<5) { _ in
                        LinkViewCard()
                    }
                }
            }.padding(.horizontal)
            
            HStack{
                Text("01/10")
                Spacer()
            }.padding(.horizontal)
            
            VStack{
                Text("Long Link Title Placeholder 1").font(.title2).fontWeight(/*@START_MENU_TOKEN@*/.bold/*@END_MENU_TOKEN@*/)
                Text("Decently Long Link Description Placeholder and ipsum dolor sit amet consectetur. Elementum viverra urna aenean et orci risus tellus. Donec egestas velit purus vitae.Et platea phasellus mattis cursus euismod nunc lacus felis sit. Adipiscing pellentesque nisl maecenas vel egestas vulputate tempor consectetur. ")
            }.padding(.horizontal)
            Spacer()

            HStack{
                Image(systemName: "ellipsis")
                CustomButton(action: {print("go to link")}, label: "View Live Media", imageSystemName: "link", style: .fill)
            }
        }.onAppear {
            // This is called when the view appears
            navigationStateManager.enterSubMenu()
        }
        .onDisappear {
            // This is called when the view is about to disappear
            navigationStateManager.exitSubMenu()
            
        }.navigationBarBackButtonHidden(true)
    }
}

#Preview {
    LinkView().environment(NavigationStateManager())
}
