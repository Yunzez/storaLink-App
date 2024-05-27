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
    var imageSystemName: String? = nil
    let style: ButtonStyle
    let larger: Bool? 
    
    var body: some View {
        Button(action: action) {
            HStack {
                if imageSystemName != nil{
                    Image(systemName: imageSystemName!)
                        .imageScale(.medium)
                }
                
                if !label.isEmpty {
                    Text(label)
                        .fontWeight(.semibold)
                }
            }
            .padding(larger ?? false ?  Spacing.medium: Spacing.small)
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


