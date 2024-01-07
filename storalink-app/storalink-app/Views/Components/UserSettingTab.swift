//
//  UserSettingTab.swift
//  storalink-app
//
//  Created by Yunze Zhao on 11/30/23.
//

import SwiftUI

struct UserSettingTab: View {
    // Define the UserSettingTab component

        var iconName: String
        var title: String
        var action: () -> Void

        var body: some View {
            Button(action: action) {
                HStack {
                    Image(systemName: iconName)
                        .foregroundColor(.gray) // Adjust color as needed
                    Text(title)
                        .foregroundColor(Color("ThemeBlack")) // Adjust color as needed
                    Spacer()
                    Image(systemName: "chevron.right")
                        .foregroundColor(.gray) // Adjust color as needed
                }
            }
            .padding(Spacing.medium)
            .background(Color.white) // Adjust color as needed
            .cornerRadius(10)
            .shadow(radius: 2)
        }
}

#Preview {
    var item = "test"
    return Group{
        Text("\(item)")
        UserSettingTab(iconName:
                        "test", title: "Test") {
            print("hellp")
            item = "help"
            print(item)
        }
    }
    
}
