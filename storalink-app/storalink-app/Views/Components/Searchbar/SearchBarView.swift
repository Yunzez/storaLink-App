//
//  SearchBarView.swift
//  storalink-app
//
//  Created by Yunze Zhao on 11/27/23.
//

import SwiftUI

struct SearchBarView: View {
    @State var viewModel: SearchBarViewModel
    @FocusState private var inputFocus: Bool
    @State private var showResults = false
    @State private var searchBarFrame: CGRect = .zero
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
                            viewModel.search()
                            withAnimation(.spring(response: 0.55, dampingFraction: 0.45)) {
                                viewModel.isSearching = viewModel.searchText.isEmpty ? false : true
                            }
                            
                        }
                } .background(Color(.systemGray6))
                    .cornerRadius(10)
                    .overlay(
                        RoundedRectangle(cornerRadius: Spacing.roundMd)
                            .stroke( inputFocus ? Color("ThemeColor") : Color.gray , lineWidth: 2)
                    )
                    .padding(.horizontal)
                    .frame(height: Spacing.customSearchBarHeight)
                // Search results list
                if viewModel.isSearching && inputFocus {
                    
                    VStack{
                        ScrollView {
                            VStack {
                                ForEach(viewModel.results, id: \.self) { result in
                                    Button(action: {
                                        print("Result selected: \(result)")
                                        // Any state changes you want to animate go here
                                        //                                        viewModel.selectResult(result)
                                    }) {
                                        BottomSheetOption(onClick: {
                                            print("Click")
                                        }, text: result, assetImageString: "Folder")
                                    }
                                    .foregroundColor(.primary)
                                    .frame(width: UIScreen.main.bounds.width * 0.9)
                                }
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
                    }.frame(width: UIScreen.main.bounds.width * 0.9, height: Spacing.customSearchBarHeight * 3)
                    .zIndex(2.0)
                    .foregroundStyle(.white)
                    .transition(.offset(x: 0, y: -Spacing.customSearchBarHeight * 3).combined(with: .opacity))
                }
            }
    }
}

// Extend UIApplication to dismiss the keyboard
extension UIApplication {
    func endEditing() {
        sendAction(#selector(UIResponder.resignFirstResponder), to: nil, from: nil, for: nil)
    }
}

#Preview {
    SearchBarView(viewModel: SearchBarViewModel())
}
