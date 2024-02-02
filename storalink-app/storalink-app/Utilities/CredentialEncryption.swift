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
    
    /// Appends the Authorization header with the JWT token to the given URLRequest.
    /// - Parameter request: The URLRequest to which the Authorization header should be added.
    /// - Throws: An error if the token cannot be retrieved.
    /// - Returns: A URLRequest with the Authorization header appended.
    func appendURLAuthHeader(to request: inout URLRequest) async throws -> URLRequest {
        guard let tokenData = try await getData(for: "accessToken"), let token = String(data: tokenData, encoding: .utf8) else {
            throw NSError(domain: "KeychainStorageError", code: 0, userInfo: [NSLocalizedDescriptionKey: "No access token available"])
        }
        
        request.addValue("Bearer \(token)", forHTTPHeaderField: "Authorization")
        return request
    }
}
