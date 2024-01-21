//
//  InfoView.swift
//  storalink-app
//
//  Created by Yunze Zhao on 11/26/23.
//

import SwiftUI

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
                        Text("Shared with you")
                            .foregroundColor(sectionSelected == 0 ? .themeWhite : .themeBlack)
                            .padding(Spacing.medium)
                    }
                    .background(sectionSelected == 0 ? Color("ThemeColor") : Color("ThemeWhite"))
                    
                    Button(action: {
                        withAnimation() {
                            sectionSelected = 1
                        }
                    }) {
                        Text("Your Activity")
                            .foregroundColor(sectionSelected == 1 ? .themeWhite : .themeBlack)
                            .padding(Spacing.medium)
                    }
                    .background(sectionSelected == 1 ? Color("ThemeColor") : Color("ThemeWhite"))
                    
                }
                .frame(height: 50)
                .background(Color("ThemeWhite"))
                .cornerRadius(Spacing.small)
                .shadow(radius: 4)
                
                Spacer()
                
                Button(action: {
                    // Action for settings button
                }) {
                    Image(systemName: "ellipsis")
                        .foregroundColor(.themeBlack)
                }
                .frame(width: 40, height: 40)
                .background(Color("ThemeWhite"))
                .cornerRadius(Spacing.small)
                .shadow(radius: 4)
            }
            .padding(.horizontal)
            
            Spacer()
            Image("NoInfo")
            Text("No Notification Yet!")
            Spacer()
        }
        
    }
}

#Preview {
    InfoView()
}
