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
    @Binding var isEnabled: Bool
    
    init(placeholder: String, text: Binding<String>, isEnabled: Binding<Bool> = .constant(true)) {
            self.placeholder = placeholder
            self._text = text
            self._isEnabled = isEnabled
        }
    
    var body: some View {
        TextField(placeholder, text: $text)
            .padding(EdgeInsets(top: 12, leading: 16, bottom: 12, trailing: 16))
            .background(Color.white)
            .cornerRadius(10)
            .overlay(
                RoundedRectangle(cornerRadius: 10)
                    .stroke(Color(UIColor.separator), lineWidth: 1)
            )
            .disabled(!isEnabled)
    }
}

#Preview {
    @State var folderName: String = ""
    
    return Group{
        StandardTextField(placeholder: "Your most creative name", text: $folderName)
    }
}
