//
//  CredentialEncryption.swift
//  storalink-app
//
//  Created by Yunze Zhao on 1/4/24.
//

import Foundation
import CommonCrypto
import KeychainAccess
func hashPassword(_ password: String) -> String? {
    guard let data = password.data(using: .utf8) else { return nil }
    var hash = [UInt8](repeating: 0,  count: Int(CC_SHA256_DIGEST_LENGTH))
    data.withUnsafeBytes {
        _ = CC_SHA256($0.baseAddress, CC_LONG(data.count), &hash)
    }
    return hash.map { String(format: "%02x", $0) }.joined()
}


final class KeychainStorage {
    
    // https://github.com/kishikawakatsumi/KeychainAccess#requirements
    // documentation above
    
    private static let keychain = Keychain(service: "com.storalink.storalinkApp").accessibility(.afterFirstUnlock)
    
    func saveData(data: Data, with key: String) async throws {
        do {
            try KeychainStorage.keychain.set(data, key: key)
        } catch {
            throw error
        }
    }
    
    func getData(for key: String) async throws -> Data? {
        do {
            return try  KeychainStorage.keychain.getData(key)
        } catch {
            throw error
        }
    }
    
    func deleteItem(for key: String) async throws {
        do {
            try  KeychainStorage.keychain.remove(key)
        } catch {
            throw error
        }
    }
}
