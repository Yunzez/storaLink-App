//
//  ChangePlanView.swift
//  storalink-app
//
//  Created by Yunze Zhao on 1/16/24.
//

import SwiftUI

struct ChangePlanView: View {
    @State var option: Int = 0
    var body: some View {
        VStack{
            HStack{
                Image(.link)
                Text("Storalink")
            }.foregroundColor(Color("ThemeColor"))
            
            Text("Premium").font(/*@START_MENU_TOKEN@*/.title/*@END_MENU_TOKEN@*/).fontWeight(/*@START_MENU_TOKEN@*/.bold/*@END_MENU_TOKEN@*/)
            
            Grid {
                GridRow {
                    Text("Features Offered").fontWeight(/*@START_MENU_TOKEN@*/.bold/*@END_MENU_TOKEN@*/)
                    Text("Free").fontWeight(/*@START_MENU_TOKEN@*/.bold/*@END_MENU_TOKEN@*/)
                    Text("Premium").fontWeight(/*@START_MENU_TOKEN@*/.bold/*@END_MENU_TOKEN@*/)
                }
                
                Divider()
                
                GridRow {
                    Text("Folders")
                    Text("20")
                    Image(systemName: "infinity")
                }.padding(.vertical, Spacing.small)
                
                Divider()
                
                GridRow {
                    Text("Links Per Folder")
                    Text("50")
                    Image(systemName: "infinity")
                }.padding(.vertical, Spacing.small)
                
                Divider()
                
                GridRow {
                    Text("Folder Collaborators")
                    Text("2")
                    Image(systemName: "infinity")
                }.padding(.vertical, Spacing.small)
                
                Divider()
                
                GridRow{
                    Text("Cloud Storage")
                    Text("-").fontWeight(/*@START_MENU_TOKEN@*/.bold/*@END_MENU_TOKEN@*/)
                    Image(systemName: "checkmark").foregroundColor(.green)
                }.padding(.vertical, Spacing.small)
                
                Divider()
                
                GridRow{
                    Text("App Themes")
                    Text("-").fontWeight(/*@START_MENU_TOKEN@*/.bold/*@END_MENU_TOKEN@*/)
                    Image(systemName: "checkmark").foregroundColor(.green)
                }.padding(.vertical, Spacing.small)
            }
            .padding() // Add padding around the entire VStack

            HStack{
                VStack{
                    Button(action: {
                        option = 0
                    }, label: {
                        VStack{
                            
                            VStack{
                                Text("1").font(/*@START_MENU_TOKEN@*/.title/*@END_MENU_TOKEN@*/).fontWeight(/*@START_MENU_TOKEN@*/.bold/*@END_MENU_TOKEN@*/)
                                Text("Month").font(/*@START_MENU_TOKEN@*/.title/*@END_MENU_TOKEN@*/).fontWeight(/*@START_MENU_TOKEN@*/.bold/*@END_MENU_TOKEN@*/)
                            }.padding(Spacing.large)
                                .foregroundColor(option == 0 ? Color("ThemeWhite") : Color("ThemeColor"))
                                .background(option == 0 ? Color("ThemeColor") : Color("SubtleTheme")) // Set the background color here
                                .cornerRadius(Spacing.small)
                            
                            Text("$0.99")
                                .font(/*@START_MENU_TOKEN@*/.title/*@END_MENU_TOKEN@*/)
                                .fontWeight(/*@START_MENU_TOKEN@*/.bold/*@END_MENU_TOKEN@*/)
                                .foregroundColor(Color.themeBlack)
                        }.padding(Spacing.small)
                            .background(Color("ThemeWhite"))// Set the background color here
                            .cornerRadius(Spacing.small)
                            .shadow(radius: 3)
                    })
                }
                
                VStack {
                    Button(action: {
                        option = 1
                    }, label: {
                        VStack {
                            VStack{
                                Text("12").font(.title).fontWeight(.bold)
                                Text("Month").font(.title).fontWeight(.bold)
                            }
                            .padding(Spacing.large)
                            .foregroundColor(option == 1 ? Color("ThemeWhite") : Color("ThemeColor"))
                            .background(option == 1 ? Color("ThemeColor") : Color("SubtleTheme"))
                            .cornerRadius(Spacing.small) // Apply corner radius to the button label
                            
                            Text("$9.99")
                                .font(/*@START_MENU_TOKEN@*/.title/*@END_MENU_TOKEN@*/)
                                .fontWeight(/*@START_MENU_TOKEN@*/.bold/*@END_MENU_TOKEN@*/)
                                .foregroundColor(Color.themeBlack)
                        }
                        .padding(Spacing.small)
                        .background(Color("ThemeWhite"))
                        .cornerRadius(Spacing.small) // Apply corner radius to the button label
                        .shadow(radius: 3)
                    })
                }
            }
            HStack{
                Text("By placing this order, you agree to Storalink’s ")
                + Text("Terms of Service").fontWeight(.semibold).fontDesign(.rounded)
                      + Text(" and Privacy Policy.")
            }.padding()
            
            Button(action: {
                print("Place order")
            }, label: {
                HStackLayout{
                    Image(systemName: "cart.fill")
                        .foregroundColor(Color.themeWhite)
                        .padding(.leading)
                    Text("Place Order")
                        .font(.title2)
                        .fontWeight(/*@START_MENU_TOKEN@*/.bold/*@END_MENU_TOKEN@*/)
                        .foregroundColor(Color.themeWhite)
                        .padding(.trailing)
                        .padding(.vertical)
                }.background(Color("ThemeColor")).cornerRadius(Spacing.small)
                
            })
        }
        
        Spacer()
    }
}

#Preview {
    ChangePlanView()
}
