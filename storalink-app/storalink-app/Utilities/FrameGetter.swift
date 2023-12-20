//
//  FrameGetter.swift
//  storalink-app
//
//  Created by Yunze Zhao on 11/30/23.
//

import Foundation
import SwiftUI
struct FrameGetter: ViewModifier {
    @Binding var frame: CGRect

    func body(content: Content) -> some View {
        content
            .background(GeometryReader { geometry in
                Color.clear
                    .onAppear {
                        self.frame = geometry.frame(in: .global)
                    }
            })
    }
}
