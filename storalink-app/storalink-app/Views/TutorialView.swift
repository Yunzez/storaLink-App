//
//  TutorialView.swift
//  storalink-app
//
//  Created by Yunze Zhao on 1/4/24.
//

import SwiftUI

enum TutorialStep {
    case Welcome, External, Internal, Organize, Folder
}

struct TutorialView: View {
    @Environment(AppViewModel.self) var appViewModel: AppViewModel
    @State var currentStage: TutorialStep = TutorialStep.Welcome
    var body: some View {
        VStack {
            // Your tutorial content view
            switch currentStage {
            case .Welcome:
                welcomeView
            case .External:
                externalView
            case .Internal:
                internalView
            case .Organize:
                organizeView
            case .Folder:
                folderView
            }
            
            // Progress Indicator
            progressIndicator
            
            Spacer()
        }
    }
    
    
    
    private var progressIndicator: some View {
        HStack {
            ForEach(TutorialStep.allCases, id: \.self) { step in
                Circle()
                    .frame(width: step == currentStage ? 15 : 10, height: step == currentStage ? 15 : 10)
                    .foregroundColor(step == currentStage ? .blue : .gray)
                    .transition(.scale)  // Animate the scaling when the step changes
            }
        }
        .animation(.easeInOut, value: currentStage)  // Animate when the currentStage changes
        .padding()
    }
    
    var welcomeView: some View {
        VStack {
            Text("Hello, World!")
            Button(action: {
                withAnimation {
                    currentStage = TutorialStep.External
                }
            }) {
                Text("Get Started")
            }
        }
    }
    
    var externalView: some View {
        VStack{
            Button(action: {
                withAnimation {
                    currentStage = TutorialStep.Internal
                }
            }) {
                Text("Get Started")
            }
            
            Text("External")
        }
    }
    
    var internalView: some View {
        VStack{
            Button(action: {
                withAnimation {
                    currentStage = TutorialStep.Organize
                }
            }) {
                Text("Get Started")
            }
            
            Text("Internal")
        }
    }
    var organizeView: some View {
        VStack{
            Button(action: {
                withAnimation {
                    currentStage = TutorialStep.Folder
                }
            }) {
                Text("Get Started")
            }
            
            Text("Organize")
        }
    }
    
    var folderView: some View {
        VStack{
            Button(action: {
                withAnimation {
                    appViewModel.isFirstLaunch = false
                }
            }) {
                Text("Get Started")
            }
            
            Text("Folder")
        }
    }
}

extension TutorialStep: CaseIterable {}

#Preview {
    TutorialView().environment(AppViewModel())
}
