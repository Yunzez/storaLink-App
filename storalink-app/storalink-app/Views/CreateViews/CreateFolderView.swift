//
//  CreateFolderView.swift
//  storalink-app
//
//  Created by Yunze Zhao on 12/25/23.
//

import SwiftUI

struct CreateFolderView: View {
    @State private var folderName: String = ""
    @State private var folderDescription: String = ""
    @State private var searchUser: String = ""
    @State private var selectedCover: Int = -1
    @Environment(\.presentationMode) var presentationMode: Binding<PresentationMode>
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
                                    .overlay(Circle().stroke(Color.gray, lineWidth: selectedCover == index ? 3 : 0))
                                    .onTapGesture {
                                        self.selectedCover = index
                                    }
                                    .padding(4)
                            }
                        }.padding(.vertical)
                    }
                    .frame(height: 100)

                    // Cover selection will go here
                    Text("Folder Name").padding(.horizontal)
                    TextField("Your most creative name", text: $folderName)
                        .textFieldStyle(RoundedBorderTextFieldStyle())
                        .padding([.bottom, .horizontal])
                        
                    HStack{
                        Text("Description")
                        Text("Optional").fontWeight(.light).foregroundColor(Color("Gray"))
                    }.padding(.horizontal)
                    
                    TextField("What's this folder about?", text: $folderDescription)
                        .textFieldStyle(RoundedBorderTextFieldStyle())
                        .padding([.bottom, .horizontal])
                    
                    TextField("Search other Storalink users", text: $searchUser)
                        .textFieldStyle(RoundedBorderTextFieldStyle())
                        .padding([.bottom, .horizontal])
                }
                
                Button(action: {
                    // Action for folder creation
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
