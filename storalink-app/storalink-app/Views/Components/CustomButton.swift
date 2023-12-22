//
//  CustomButton.swift
//  storalink-app
//
//  Created by Yunze Zhao on 12/21/23.
//

import Foundation
import SwiftUI

struct CustomButton: View {
    enum ButtonStyle {
        case outline, fill
    }
    
    let action: () -> Void
    let label: String
    let imageSystemName: String
    let style: ButtonStyle
    
    var body: some View {
        Button(action: action) {
            HStack {
                Image(systemName: imageSystemName)
                    .imageScale(.medium)
                if !label.isEmpty {
                    Text(label)
                        .fontWeight(.semibold)
                }
            }
            .padding(Spacing.small)
            .foregroundColor(style == .fill ? .white : .accentColor)
            .background(style == .fill ? Color("ThemeColor") : .clear)
            .cornerRadius(Spacing.small)
            .overlay(
                RoundedRectangle(cornerRadius: Spacing.small)
                    .stroke(Color("ThemeColor"), lineWidth: 2)
                    .opacity(style == .outline ? 1 : 0)
            )
        }
    }
}


#Preview {
    Group{
        CustomButton(action: {
            print("Button tapped")
        }, label: "Search", imageSystemName: "magnifyingglass", style: .outline)

        CustomButton(action: {
            print("Button tapped")
        }, label: "Search", imageSystemName: "magnifyingglass", style: .fill)
    }
}
