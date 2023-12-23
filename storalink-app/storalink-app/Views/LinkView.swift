//
//  LinkView.swift
//  storalink-app
//
//  Created by Yunze Zhao on 12/22/23.
//

import SwiftUI

struct LinkView: View {
    @Environment(\.presentationMode) var presentationMode: Binding<PresentationMode>
    @EnvironmentObject var navigationStateManager: NavigationStateManager
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
                    ForEach(1..<5) { i in
                        Text("i is \(i)")
                    }
                }
            }.padding()
            Spacer()
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
    LinkView().environmentObject(NavigationStateManager())
}
