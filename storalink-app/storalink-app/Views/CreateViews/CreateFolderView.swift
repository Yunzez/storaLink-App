//
//  CreateFolderView.swift
//  storalink-app
//
//  Created by Yunze Zhao on 12/25/23.
//

import SwiftUI

struct CreateFolderView: View {
    @Environment(\.presentationMode) var presentationMode: Binding<PresentationMode>
    @ObservedObject private var viewModel = CreateFolderViewModel()
    var body: some View {
        VStack {
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
                
                Image("Folder").resizable().frame(width: 25, height: 25 )
                Text("New Folder")
            }
            .padding(.horizontal)
            ScrollView {
                VStack(alignment: .leading) {
                    if viewModel.error {
                        Text(viewModel.errorMessage).foregroundColor(Color("Warning"))
                            .padding()
                            .background(Color("LightWarning"))
                            .overlay(RoundedRectangle(cornerRadius: Spacing.small) // Match this radius with the cornerRadius value above
                            .stroke(Color("Warning"), lineWidth: 2)).padding(.horizontal)
                        
                    }
                    Text("Select A Cover")
                        .font(.headline)
                        .padding(.top)
                        .padding(.horizontal)
                    
                    ScrollView(.horizontal, showsIndicators: true) {
                        HStack {
                            ForEach(0..<9, id: \.self) { index in
                                Image("folderAsset\(index)") // Corrected line
                                    .resizable()
                                    .scaledToFill()
                                    .frame(width: 80, height: 80)
                                    .clipShape(Circle())
                                    .overlay(Circle().stroke(Color("ThemeColor"), lineWidth: viewModel.selectedCoverIndex == index ? 3 : 0))
                                    .onTapGesture {
                                        viewModel.selectedCoverIndex = index
                                    }
                                    .padding(4)
                            }
                        }.padding(.vertical)
                    }
                    .frame(height: 100)

                    // Cover selection will go here
                    Text("Folder Name").padding(.horizontal)
                    StandardTextField( placeholder:"Your most creative name", text: $viewModel.folderName).padding([.bottom, .horizontal])

                    HStack {
                        Text("Description")
                        Text("(Optional)").fontWeight(.light).foregroundColor(Color.gray)
                    }
                    .padding(.horizontal)

                    TextEditor(text: $viewModel.folderDescription)
                        .padding(4) // This padding is for inside the TextEditor, between the text and the border
                        .frame(minHeight: 100)
                        .background(Color.white) // Set the background color to white or any other color as needed
                        .cornerRadius(10) // Set the corner radius as needed
                        .overlay(
                            RoundedRectangle(cornerRadius: 10) // Match this radius with the cornerRadius value above
                                .stroke(Color(UIColor.separator), lineWidth: 1)
                        )
                        .padding([.bottom, .horizontal])

                    
                    
                    HStack{
                        Text("Share")
                        Text("(Optional)").fontWeight(.light).foregroundColor(Color("Gray"))
                    }.padding(.horizontal)
                    StandardTextField( placeholder:"search other user", text: $viewModel.searchUser).padding([.bottom, .horizontal])
                        
                }
                
                Button(action: {
                    // Action for folder creation
                    viewModel.createFolder()
                }) {
                    Text("Create Folder")
                        .frame(minWidth: 0, maxWidth: .infinity)
                        .frame(height: 50)
                        .foregroundColor(.white)
                        .background(Color.orange)
                        .cornerRadius(25)
                        .padding([.leading, .bottom, .trailing])
                }
            }
        }
        .navigationTitle("Folder Creation")
    }
}

struct CreateFolderView_Previews: PreviewProvider {
    static var previews: some View {
        CreateFolderView()
    }
}