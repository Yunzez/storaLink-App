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
    
    @State private var searchBarFrame: CGRect = .zero
    var body: some View {
        ZStack {
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
                
            }
            
        }.environmentObject(viewModel)
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
