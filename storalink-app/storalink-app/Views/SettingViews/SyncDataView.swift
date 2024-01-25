//
//  SyncDataView.swift
//  storalink-app
//
//  Created by Yunze Zhao on 1/25/24.
//

import SwiftUI

struct SyncDataView: View {
    @State private var vibrateOnRing = false
    var body: some View {
        VStack{
            HStack{
                Text("Data (Coming soon)").foregroundColor(.themeGray)
                Spacer()
            }.padding(.horizontal)
            Toggle(isOn: $vibrateOnRing) {
                Text("Sync with Cloud")
            }.toggleStyle(SwitchToggleStyle(tint: Color("ThemeColor")))
                .padding(Spacing.medium)
                .background(Color("SubtleTheme"))
                .cornerRadius(Spacing.small)
                .overlay(RoundedRectangle(cornerRadius: Spacing.small)
                    .stroke(Color("SubtleTheme"), lineWidth: 1))
                .padding(.horizontal)
                .disabled(true)
            Spacer()
        }
    }
}

#Preview {
    SyncDataView()
}
