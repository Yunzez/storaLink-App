import Foundation
import React

@objc(UserDefaultsBridge)
class UserDefaultsBridge: NSObject, RCTBridgeModule {
  
  static func moduleName() -> String! {
    return "UserDefaultsBridge"
  }
  
  @objc func saveData(_ key: String, value: String, resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) -> Void {
    if let userDefaults = UserDefaults(suiteName: "group.com.storalink.app") {
      userDefaults.set(value, forKey: key)
      resolver("Data saved successfully")
    } else {
      rejecter("SAVE_ERROR", "Could not save data", nil)
    }
  }
  
  @objc func getData(_ key: String, resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) -> Void {
    if let userDefaults = UserDefaults(suiteName: "group.com.storalink.app"),
       let value = userDefaults.string(forKey: key) {
      resolver(value)
    } else {
      rejecter("GET_ERROR", "No data found for key", nil)
    }
  }
}
