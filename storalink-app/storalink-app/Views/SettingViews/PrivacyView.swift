//
//  PrivacyView.swift
//  storalink-app
//
//  Created by Yunze Zhao on 1/17/24.
//

import SwiftUI
import WebKit

class PrivacyViewController: UIViewController {
    var webView: WKWebView!

    override func viewDidLoad() {
        super.viewDidLoad()

        webView = WKWebView(frame: self.view.bounds)
        self.view.addSubview(webView)

        if let htmlPath = Bundle.main.path(forResource: "privacy", ofType: "html") {
            let url = URL(fileURLWithPath: htmlPath)
            let request = URLRequest(url: url)
            webView.load(request)
        }
    }
}

struct WebView: UIViewRepresentable {
    let htmlFileName: String

    func makeUIView(context: Context) -> WKWebView {
        return WKWebView()
    }

    func updateUIView(_ uiView: WKWebView, context: Context) {
        if let htmlPath = Bundle.main.path(forResource: htmlFileName, ofType: "html") {
            let url = URL(fileURLWithPath: htmlPath)
            let request = URLRequest(url: url)
            uiView.load(request)
        }
    }
}


struct PrivacyView: View {
    var body: some View {
        WebView(htmlFileName: "privacy")
    }
}

#Preview {
    PrivacyView()
}
