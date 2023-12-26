//
//  StandardTextField.swift
//  storalink-app
//
//  Created by Yunze Zhao on 12/25/23.
//

import SwiftUI
struct StandardTextField: View {
    var placeholder: String
    @Binding var text: String
    var body: some View {
        TextField(placeholder, text: $text)
            .padding(EdgeInsets(top: 12, leading: 16, bottom: 12, trailing: 16))
            .background(Color.white)
            .cornerRadius(10)
            .overlay(
                RoundedRectangle(cornerRadius: 10)
                    .stroke(Color(UIColor.separator), lineWidth: 1)
            )
    }
}

#Preview {
    @State var folderName: String = ""
    
    return Group{
        StandardTextField(placeholder: "Your most creative name", text: $folderName)
    }
}
