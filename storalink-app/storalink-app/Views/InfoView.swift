//
//  InfoView.swift
//  storalink-app
//
//  Created by Yunze Zhao on 11/26/23.
//

import Foundation
import SwiftUI
import SwiftData
struct InfoView: View {
    
    @State private var sectionSelected: Int = 1
    var body: some View {
        VStack{
            HStack {
                // Container for the two buttons
                HStack(spacing: 0) { // Set spacing to 0 to remove padding between buttons
                    // Button for "Shared with you"
                    Button(action: {
                        withAnimation {
                            sectionSelected = 0
                        }
                    }) {
                        Text("Dev Notes ")
                            .foregroundColor(sectionSelected == 0 ? .themeWhite : .themeBlack)
                            .padding(Spacing.small)
                    }
                    .background(sectionSelected == 0 ? Color("ThemeColor") : Color.subtleTheme)
                    
                    Button(action: {
                        withAnimation() {
                            sectionSelected = 1
                        }
                    }) {
                        Text("Your Activity")
                            .foregroundColor(sectionSelected == 1 ? .themeWhite : .themeBlack)
                            .padding(Spacing.small)
                    }
                    .background(sectionSelected == 1 ? Color("ThemeColor") : Color.subtleTheme)
                    
                }
                .frame(height: 40)
                .cornerRadius(Spacing.small)
                .overlay(RoundedRectangle(cornerRadius: 5).stroke(Color.themeWhite, lineWidth: 1))
                .background(Color.subtleTheme)
                .padding(.top, 5)
                
                Spacer()
            }
            .padding(.horizontal)
            
            if (sectionSelected == 1) {
                ActivityInfoView()/*.padding(.bottom, Spacing.customNavigationBarHeight )*/
                Spacer()
            } else {
                VStack {
                    VStack {
                        HStack {
                            Text("V-1.0 note")
                                .foregroundColor(.themeGray)
                            Spacer()
                        }
                        HStack{
                            VStack(alignment: .leading, spacing: 5) {
                                Text("Welcome to Storalink!")
//                                Text("We are a bunch o")
                            }
                            Spacer()
                        }
                    }
                }
                .padding()
                .background(Color.subtleTheme) // Use actual card background color
                .clipShape(RoundedRectangle(cornerRadius: 5))
                .padding(Spacing.medium)
                Spacer()
                
            }
        }
        
    }
}


struct ActivityInfoView: View {
    @Query var notices: [Notice]
    let modelUtil = ModelUtilManager.manager
    @Environment(\.modelContext) private var modelContext: ModelContext
    var body: some View {
        
        VStack{
            if notices.count > 0 {
                ScrollView{
                    ForEach(notices) { currentNotice in
                        InfoCard(notice: currentNotice, onDelete: deleteNotice).padding()
                    }
                }
            } else {
                Spacer()
                Image("NoInfo")
                Text("No Notification Yet!")
                Spacer()
            }
        }
    }
    
    private func deleteNotice(notice: Notice ) {
        
        // Assuming you have a method in your modelContext to delete a notice
        modelUtil.deleteNotice(modelContext: modelContext, notice: notice)
        
    }
}


struct InfoCard: View {
    var currentNotice: Notice
    var time: Date
    var type: NoticeActionType
    var name: String
    var onDelete: (_ notice: Notice ) -> Void
    @GestureState private var offset = CGSize.zero
    
    // Set Date Format
    static let dateFormatter: DateFormatter = {
        let formatter = DateFormatter()
        formatter.dateFormat = "yyyy-MM-dd HH:mm" // Example format
        return formatter
    }()
    
    var formattedTime: String {
        Self.dateFormatter.string(from: time)
    }
    
    init(notice: Notice, onDelete: @escaping (_ notice: Notice ) -> Void) {
        self.onDelete = onDelete
        self.currentNotice = notice
        self.time = notice.time
        self.type = notice.type
        self.name = notice.name
    }
    var body: some View {
        ZStack{
            VStack{
                HStack() {
                    Text(formattedTime)
                        .foregroundColor(.themeGray)
                    Spacer()
                }.padding(.bottom, 3)
                HStack() {
                    if(type == NoticeActionType.folderCreate) {
                        Text("You created the folder \(name)")
                    } else if (type == NoticeActionType.linkCreate) {
                        Text("You created a link in folder \(name)")
                    } else if (type == NoticeActionType.folderDelete) {
                        Text("You deleted the folder \(name)")
                    } else if (type == NoticeActionType.linkDelete) {
                        Text("You deleted a link in folder \(name)")
                    }
                    Spacer()
                }
                
            }.padding()
                .background(Color.subtleTheme) // Use actual card background color
                .clipShape(RoundedRectangle(cornerSize: CGSize(width: 6, height: 6)))
            //                .shadow(radius: 5)
                .offset(x: offset.width)
                .gesture(
                    DragGesture()
                        .updating($offset, body: { (value, state, _) in
                            state = CGSize(width: value.translation.width, height: 0)
                        })
                        .onEnded { value in
                            if value.translation.width < -100 { // Threshold to reveal delete button
                                // Trigger delete action or reveal delete button
                                print("delete!")
                                onDelete(currentNotice)
                            }
                        }
                )
            // Delete button, initially hidden and revealed by swipe
            if offset.width < -80 {
                HStack {
                    Spacer()
                    
                    Button {
                        onDelete(currentNotice)
                    } label: {
                        Image(systemName: "trash.fill")
                        // Correcting the scaling factor; adjust the divisor as needed for appropriate scaling
                            .scaleEffect(min(-offset.width / 80, 2.5), anchor: .center) // Ensuring the scale starts small and increases
                            .foregroundColor(.red)
                            .padding()
                            .background(Color.themeWhite)
                            .cornerRadius(5)
                    }
                    .offset(x: offset.width < -80 ? offset.width + 100 : 0) // Adjust this calculation as needed
                    //                    .foregroundColor(Color.accentColor)
                }
                .transition(.move(edge: .trailing))
                .animation(.easeOut, value: offset.width)
            }
        }
        
    }
    
    
}

//#Preview {
//    //    InfoView()
////    InfoCard(notice: Notice(type: NoticeActionType.folderCreate, name: "testing"))
//}
