//
//  BottomSheetOption.swift
//  storalink-app
//
//  Created by Yunze Zhao on 12/31/23.
//

import SwiftUI

struct BottomSheetOption: View {
    var onClick: () -> Void
    var systemImageString: String?
    var assetImageString: String?
    var text: String

    init(onClick: @escaping () -> Void, text: String, systemImageString: String? = nil, assetImageString: String? = nil) {
        self.onClick = onClick
        self.text = text
        self.systemImageString = systemImageString
        self.assetImageString = assetImageString
    }
    
    var body: some View {
        Button(action: onClick) {
            HStack {
                CustomImageView(systemImageString: systemImageString, assetImageString: assetImageString)
                
                Text(text)
                    .font(.title2)
                    .padding(.leading, Spacing.small)
                
                Spacer()
            }
            .foregroundColor(Color("ThemeGray"))
        }
    }
}

struct CustomImageView: View {
    var systemImageString: String?
    var assetImageString: String?

    var body: some View {
        Group {
            if let systemImage = systemImageString, !systemImage.isEmpty {
                Image(systemName: systemImage)
                    .resizable()
                    .aspectRatio(contentMode: .fit)
                    .frame(width: 25, height: 25)
            } else if let assetImage = assetImageString, !assetImage.isEmpty {
                Image(assetImage)
                    .resizable()
                    .aspectRatio(contentMode: .fit)
                    .frame(width: 25, height: 25)
                    .foregroundColor(Color("ThemeGray"))  
            }
        }
        .padding(.leading)
    }
}

#Preview {
    BottomSheetOption(onClick: {
        print("Button tapped")
    }, text: "Sample Text", systemImageString: "person.fill")
}
