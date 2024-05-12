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
        private var currentImage: UIImage?
        
    init(iconName: String, title: String) {
            self.iconName = iconName
            self.title = title
            // Try to load a named image, fall back to a system image if unavailable
            self.currentImage = UIImage(named: iconName) ?? UIImage(systemName: iconName)
        }
        
        var body: some View {
            HStack {
                Image(systemName: iconName)
                    .resizable()
                    .scaledToFit()
                    .frame(width: 24, height: 24)
                    .foregroundColor(Color("ThemeBlack"))  // This will now properly apply because it's a system image
                
                Text(title)
                    .foregroundColor(Color("ThemeBlack"))
                
                Spacer()
            }
            .padding()
            .background(Color("ThemeWhite")) // Make sure 'ThemeWhite' is defined in your assets
            .cornerRadius(10)
            .shadow(radius: 2)
        }
}

#Preview {
    var item = "test"
    return Group{
        UserSettingTab(iconName: "trash.fill", title: "Test")
    }
    
}
