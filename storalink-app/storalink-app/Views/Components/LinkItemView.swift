//
//  LinkItemView.swift
//  storalink-app
//
//  Created by Yunze Zhao on 11/27/23.
//

import SwiftUI

struct LinkItemView: View {
    var body: some View {
        HStack(spacing: Spacing.small) {
            Image("LinkPlaceholder") // Replace with actual image
                .resizable()
                .aspectRatio(contentMode: .fit)
                .cornerRadius(Spacing.roundMd)
                .frame(width: 80, height: 80)
            VStack(alignment: .leading) {
                Text("Long Link Title Placeholder 1")
                    .font(.headline)
                Text("@author_author")
                    .font(.subheadline)
            }
        }
        .padding()
        .frame(height: 80) // Adjust size as needed
        .background(Color.gray.opacity(0.1)) // Placeholder for card background
        .cornerRadius(10)
    }
}

#Preview {
    LinkItemView()
}
