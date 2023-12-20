//
//  SearchBarDropDownView.swift
//  storalink-app
//
//  Created by Yunze Zhao on 11/30/23.
//

import SwiftUI

extension AnyTransition {
    static var moveAndFade: AnyTransition {
        .asymmetric(
            insertion: .move(edge: .top).combined(with: .opacity),
            removal: .move(edge: .top).combined(with: .opacity)
        )
    }
}

struct SearchBarDropDownView: View {
    @ObservedObject var viewModel: SearchBarViewModel
    @State private var viewHeight: CGFloat = 0
    @State private var opacity: Double = 0
    var body: some View {
        Group {
            if viewModel.isSearching && !viewModel.results.isEmpty {
                ScrollView {
                    VStack(alignment: .leading){
                        ForEach(viewModel.results, id: \.self) { result in
                            Text(result)
                                .onTapGesture {
                                    // Handle result tap
                                    print("Tapped on \(result)")
                                }
                                .padding()
                        }
                    }.frame(maxWidth: .infinity, alignment: .topLeading)
                        .background(Color("ThemeWhite"))
                        .cornerRadius(10)
                        .shadow(radius: 5)
                }.opacity(opacity)
                    .frame(maxHeight: viewHeight)
                    .onAppear {
                        // Start from a specific height and animate to full height
                        withAnimation(.easeInOut(duration: 0.3)) {
                            viewHeight = 500
                            opacity = 1
                        }
                    }
                    .onDisappear {
                        // Reset to initial state
                        viewHeight = 0
                        opacity = 0
                    }
              
                Spacer()
            }
        }
        .frame(maxHeight: 500)
        .onAppear {
            print("Dropdown is \(viewModel.isSearching ? "active" : "inactive")")
            if viewModel.isSearching {
                print("Results: \(viewModel.results)")
            }
        }
    }
}

#Preview {
    let viewModel = SearchBarViewModel()
    viewModel.isSearching = true
    return Group{
        Slider(value: /*@START_MENU_TOKEN@*//*@PLACEHOLDER=Value@*/.constant(10)/*@END_MENU_TOKEN@*/)
        Menu(/*@START_MENU_TOKEN@*/"Menu"/*@END_MENU_TOKEN@*/) {
            /*@START_MENU_TOKEN@*/Text("Menu Item 1")/*@END_MENU_TOKEN@*/
            /*@START_MENU_TOKEN@*/Text("Menu Item 2")/*@END_MENU_TOKEN@*/
            /*@START_MENU_TOKEN@*/Text("Menu Item 3")/*@END_MENU_TOKEN@*/
        }
        Button(action: {
            viewModel.isSearching.toggle()
        }, label: {
            Text("DropDown show")
        })
        
        SearchBarDropDownView(viewModel: viewModel)
    }
        
}
