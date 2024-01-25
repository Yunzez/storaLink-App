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
        if let image = UIImage(named: iconName) {
            currentImage = image
        } else {
        currentImage = UIImage(systemName: iconName)
        }
        
    }
       
        var body: some View {
                HStack {
                    if let image = currentImage {
                        Image(uiImage: image)
                            .scaledToFit()
                            .foregroundColor(Color(.themeGray))
                            
                    }
                    Text(title)
                        .foregroundColor(Color("ThemeBlack")) // Adjust color as needed
                    Spacer()
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
        UserSettingTab(iconName: "CloudSync", title: "Test")
    }
    
}
