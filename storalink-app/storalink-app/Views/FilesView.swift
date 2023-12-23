//
//  FilesView.swift
//  storalink-app
//
//  Created by Yunze Zhao on 11/26/23.
//

import SwiftUI
struct FilesView: View {
    @StateObject var viewModel = SearchBarViewModel()
    let items = Array(1...9)
    var body: some View {
        ZStack{
            VStack{
               SearchBarView(viewModel: viewModel)
                    .padding(.bottom)
                ScrollView(.vertical, showsIndicators: false) {
                            VStack {
                                ForEach(0..<numberOfRows(items.count), id: \.self) { rowIndex in
                                    HStack {
                                        ForEach(0..<2, id: \.self) { columnIndex in
                                            if let item = itemForRowAndColumn(row: rowIndex, column: columnIndex) {
                                                FolderItemView()
                                            } else {
                                                Spacer() // Ensures the HStack keeps its structure even if there's only one item in the last row
                                            }
                                        }
                                    }
                                }
                            }
                        }
            }
            
            VStack{
                SearchBarDropDownView(viewModel: viewModel)
                Spacer()
            }
            
        }.padding(.bottom, Spacing.customNavigationBarHeight )
        
    }
    
    func numberOfRows(_ count: Int) -> Int {
            return (count + 1) / 2
        }
    
    func itemForRowAndColumn(row: Int, column: Int) -> Int? {
            let index = row * 2 + column
            return index < items.count ? items[index] : nil
        }
}

#Preview {
    FilesView(viewModel: SearchBarViewModel())
}
