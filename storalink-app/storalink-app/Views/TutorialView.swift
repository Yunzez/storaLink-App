//
//  TutorialView.swift
//  storalink-app
//
//  Created by Yunze Zhao on 1/4/24.
//

import SwiftUI

enum TutorialStep {
    
    // all stages are in order
    case Welcome, External, Internal, Organize, Folder
    
    func next() -> TutorialStep? {
            let allCases = TutorialStep.allCases
            guard let index = allCases.firstIndex(of: self), index + 1 < allCases.count else {
                return nil
            }
            return allCases[index + 1]
        }
    
    func previous() -> TutorialStep? {
            let allCases = TutorialStep.allCases
            guard let index = allCases.firstIndex(of: self), index - 1 >= 0 else {
                return nil
            }
            return allCases[index - 1]
        }
}

struct TutorialView: View {
    @Environment(AppViewModel.self) var appViewModel: AppViewModel
    @State var currentStage: TutorialStep = TutorialStep.Welcome
    var body: some View {
        VStack {
            HStack {
                Button(action: {
                    withAnimation {
                        if let preStage = currentStage.previous() {
                            currentStage = preStage
                        }
                    }
                }) {
                    Text("Back")
                }.foregroundColor(Color("ThemeGray")).fontWeight(.semibold)
                
                Spacer()
                
                Button(action: {
                    withAnimation {
                        appViewModel.isFirstLaunch = false
                    }
                }) {
                    Text("Skip")
                }.foregroundColor(.black).fontWeight(.bold)
            }.padding(.horizontal)
            
            Spacer()
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
            
            Button(action: {
                withAnimation {
                    if let nextStage = currentStage.next() {
                        currentStage = nextStage
                    } else {
                        appViewModel.isFirstLaunch = false
                    }
                }
            }, label: {
                Text("Next")
                    .foregroundColor(.white)  // Set text color to white for better contrast
            })
            .padding()
            .frame(width: 200)
            .background(
                Color("ThemeColor")
            )  // Replace with your color
            .cornerRadius(20)  // Set corner radius
            .padding()  // Add padding around the button for touch comfort
            
            Spacer()
        }
    }
    
    
    
    private var progressIndicator: some View {
        HStack {
            ForEach(TutorialStep.allCases, id: \.self) { step in
                Capsule()
                    .frame(width: step == currentStage ? 32 : 10, height: step == currentStage ? 12 : 10)
                    .foregroundColor(step == currentStage ? Color("ThemeColor") :  Color("ThemeGray"))
                    .transition(.scale)  // Animate the scaling when the step changes
            }
        }
        .animation(.easeInOut, value: currentStage)  // Animate when the currentStage changes
        .padding()
    }
    
    var welcomeView: some View {
        VStack {
            Image("TutorialWelcome").resizable().aspectRatio(contentMode: .fit).frame(width: 300, height: 300)
            Text("Welcome To Storalink").font(.title2).fontWeight(/*@START_MENU_TOKEN@*/.bold/*@END_MENU_TOKEN@*/)
            Text("Storalink facilitates a more connected society by allowing internet-savvy people to share linked resources. We can’t wait to see what your contributions would be to the internet!")
                .multilineTextAlignment(.center)
                .font(.callout)
                .lineSpacing(3)
                .padding()
    
            
        }
    }
    
    var externalView: some View {
        VStack{
            Image("TutorialExternal").resizable().aspectRatio(contentMode: .fit).frame(width: 300, height: 300)
            Text("Add Links Externally").font(.title2).fontWeight(/*@START_MENU_TOKEN@*/.bold/*@END_MENU_TOKEN@*/)
            Text("Storalink provides a quick way for you to upload links to the app! When you are on any social media, you can use the platform’s share functionality to add the link to Storalink. ")
                .multilineTextAlignment(.center)
                .font(.callout)
                .lineSpacing(3)
                .padding()
        }
    }
    
    var internalView: some View {
        VStack{
            Image("TutorialInternal").resizable().aspectRatio(contentMode: .fit).frame(width: 300, height: 300)
            Text("Add Links Internally").font(.title2).fontWeight(/*@START_MENU_TOKEN@*/.bold/*@END_MENU_TOKEN@*/)
            Text("Storalink provides an internal method of adding a link in case the platform you are on has no share functionality or you are attempting to save a link to a website.")
                .multilineTextAlignment(.center)
                .font(.callout)
                .lineSpacing(3)
                .padding()
        }
    }
    var organizeView: some View {
        VStack{
            Image("TutorialOrganize").resizable().aspectRatio(contentMode: .fit).frame(width: 300, height: 300)
            Text("Organize Your Links").font(.title2).fontWeight(/*@START_MENU_TOKEN@*/.bold/*@END_MENU_TOKEN@*/)
            Text("Storalink gives unlimited control when it comes to sorting your links. When you have your links, you can put change how they appear within the app as well as put them in folders.")
                .multilineTextAlignment(.center)
                .font(.callout)
                .lineSpacing(3)
                .padding()
        }
    }
    
    var folderView: some View {
        VStack{
            Image("TutorialFolder").resizable().aspectRatio(contentMode: .fit).frame(width: 300, height: 300)
            Text("Share Your Folders").font(.title2).fontWeight(/*@START_MENU_TOKEN@*/.bold/*@END_MENU_TOKEN@*/)
            Text("Storalink facilitates a more connected and collaborative community by allowing you to share your folders with other Storalink users. Together, great things will happen!")
                .multilineTextAlignment(.center)
                .font(.callout)
                .lineSpacing(3)
                .padding()
        }
    }
}

extension TutorialStep: CaseIterable {}

#Preview {
    TutorialView().environment(AppViewModel())
}
