//
//  SearchBarView.swift
//  storalink-app
//
//  Created by Yunze Zhao on 11/27/23.
//

import SwiftUI

struct SearchBarView: View {
    @ObservedObject var viewModel: SearchBarViewModel
    @FocusState private var inputFocus: Bool
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
                      }
                } .background(Color(.systemGray6))
                    .cornerRadius(10)
                    .overlay(
                        RoundedRectangle(cornerRadius: Spacing.roundMd)
                            .stroke( inputFocus ? Color("ThemeColor") : Color.gray , lineWidth: 2)
                    )
                    .padding(.horizontal)
                
                // Results list
                if viewModel.isSearching && !viewModel.results.isEmpty {
                    List(viewModel.results, id: \.self) { result in
                        Text(result).onTapGesture {
                            // Handle result tap
                            print("Tapped on \(result)")
                            // Here you would typically do something like close the search and navigate to the detail view of the tapped item.
                        }
                    }
                    .listStyle(PlainListStyle())
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
