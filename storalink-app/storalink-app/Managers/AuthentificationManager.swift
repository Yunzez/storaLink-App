//
//  AuthentificationManager.swift
//  storalink-app
//
//  Created by Yunze Zhao on 1/23/24.
//

import Foundation
import CommonCrypto

/// <#Description#>
class AuthenticationManager {
    
    // singleton
    static let manager = AuthenticationManager()
    
    
    private let keychainStorage = KeychainStorage()
    static let shared = AuthenticationManager()
    
    
    // MARK: - Login section
    
    /// Login in a user and save refresh token, access token in keychain
    /// - Parameters:
    ///   - email: email of the user
    ///   - password: user password, unhashed
    ///   - completion: (Sucess: Bool, errorMessage: String?, User: User?)
    func login(email: String, password: String, completion: @escaping (Bool, String?, User?) -> Void) async {
        // Hash the password
        
        guard let hashedPassword = hashPassword(password) else {
            completion(false, "Failed to hash password", nil)
            return
        }
        
        
        //        let hashedPassword = password
        // Prepare login request
        let loginRequest = LoginRequest(email: email, password: hashedPassword)
        
        // Send login request to server (implement sendLoginRequest)
        do {
            let loginResponse = try await sendLoginRequest(loginRequest)
            // Save tokens in keychain
            print("loginResponse:", loginResponse)
            try await keychainStorage.saveData(data: Data(loginResponse.accessToken.utf8), with: "accessToken")
            try await keychainStorage.saveData(data: Data(loginResponse.storalinker.refreshToken.utf8), with: "refreshToken")
            
            let newUser = User(
                name : loginResponse.storalinker.username,
                email : loginResponse.storalinker.email,
                mongoId: loginResponse.storalinker._id,
                avatorPath: loginResponse.storalinker.avatorPath ?? "",
                avatorPathRemote: loginResponse.storalinker.avatorPathRemote ?? ""
            )
            completion(true, nil, newUser)
        } catch {
            completion(false, "Login failed: \(error.localizedDescription)", nil)
        }
    }
    
    private func sendLoginRequest(_ request: LoginRequest) async throws -> AuthResponse {
        guard let url = URL(string: "\(Configuration.baseURL)/auth/login") else {
            throw NSError(domain: "Invalid URL", code: 0, userInfo: nil)
        }
        
        var urlRequest = URLRequest(url: url)
        urlRequest.httpMethod = "POST"
        urlRequest.addValue("application/json", forHTTPHeaderField: "Content-Type")
        
        let requestBody = try JSONEncoder().encode(request)
        
        //        print(String(data: requestBody, encoding: .utf8) ?? "Invalid request body")
        
        urlRequest.httpBody = requestBody
        
        let (data, response) = try await URLSession.shared.data(for: urlRequest)
        
        print("data and response: ", data, response)
        guard let httpResponse = response as? HTTPURLResponse, httpResponse.statusCode == 200 else {
            print("failed checking 200 status")
            throw NSError(domain: "Invalid response", code: 0, userInfo: [NSLocalizedDescriptionKey: "Incorrect email or password"])
        }
        
        let loginResponse = try JSONDecoder().decode(AuthResponse.self, from: data)
        return loginResponse
    }
    
    private func hashPassword(_ password: String) -> String? {
        guard let data = password.data(using: .utf8) else { return nil }
        var hash = [UInt8](repeating: 0, count: Int(CC_SHA256_DIGEST_LENGTH))
        data.withUnsafeBytes {
            _ = CC_SHA256($0.baseAddress, CC_LONG(data.count), &hash)
        }
        return hash.map { String(format: "%02x", $0) }.joined()
    }
    
    
    
    // MARK: - Signup section
    
    /// sign up new user
    /// - Parameters:
    ///   - username: user input, username
    ///   - email: email
    ///   - password: password, this will need to be hased
    ///   - completion:(Sucess: Bool, errorMessage: String?, User: User?)
    func signup (username: String, email: String, password: String, completion: @escaping (Bool, String?, User?) -> Void) async {
        print("auth manager sign up")
        guard let hashedPassword = hashPassword(password) else {
            completion(false, "Failed to hash password", nil)
            return
        }
        let signupRequest = SignupRequest(username: username, email: email, password: hashedPassword)
        
        do {
            let signupResponse = try await sendSignupRequest(signupRequest)
            // Save tokens in keychain
            print("loginResponse:", signupResponse)
            try await keychainStorage.saveData(data: Data(signupResponse.accessToken.utf8), with: "accessToken")
            try await keychainStorage.saveData(data: Data(signupResponse.storalinker.refreshToken.utf8), with: "refreshToken")
            
            let newUser = User(
                name : signupResponse.storalinker.username,
                email : signupResponse.storalinker.email,
                mongoId: signupResponse.storalinker._id,
                avatorPath: "",
                avatorPathRemote: ""
            )
            completion(true, nil, newUser)
        } catch {
            completion(false, "\(error.localizedDescription)", nil)
        }
    }
    
    private func sendSignupRequest(_ request: SignupRequest) async throws -> AuthResponse {
        guard let url = URL(string: "\(Configuration.baseURL)/auth/signup") else {
            throw NSError(domain: "Invalid URL", code: 0, userInfo: nil)
        }
        
        var urlRequest = URLRequest(url: url)
        urlRequest.httpMethod = "POST"
        urlRequest.addValue("application/json", forHTTPHeaderField: "Content-Type")
        
        let requestBody = try JSONEncoder().encode(request)
        
        //        print(String(data: requestBody, encoding: .utf8) ?? "Invalid request body")
        
        urlRequest.httpBody = requestBody
        
        let (data, response) = try await URLSession.shared.data(for: urlRequest)
        
        print("data and response: ", data, response)
        guard let httpResponse = response as? HTTPURLResponse, httpResponse.statusCode == 201 || httpResponse.statusCode == 200 else {
            print("failed checking 200 status")
            if let httpResponse = response as? HTTPURLResponse {
                if httpResponse.statusCode == 409 {
                    let error = NSError(domain: "Invalid response", code: 409, userInfo: [NSLocalizedDescriptionKey: "Email already exists"])
                    throw error
                }
            }
            
            throw NSError(domain: "Invalid response", code: 0, userInfo: [NSLocalizedDescriptionKey: "Signup Failed"])
        }
        
        let loginResponse = try JSONDecoder().decode(AuthResponse.self, from: data)
        print(loginResponse)
        return loginResponse
    }
    
    
    // MARK: - refresh token section
    
    func checkToken(email: String, completion: @escaping (Bool, String?) -> Void) async {
        guard let refreshToken = try? await keychainStorage.getData(for: "refreshToken"),
              let refreshTokenString = String(data: refreshToken, encoding: .utf8) else {
            completion(false, "No refresh token available")
            return
        }
        
        do {
            let refreshedTokens = try await refreshAccessToken(refreshToken: refreshTokenString, email: email)
            // Save the new tokens
            try await keychainStorage.saveData(data: Data(refreshedTokens.accessToken.utf8), with: "accessToken")
            try await keychainStorage.saveData(data: Data(refreshedTokens.refreshToken.utf8), with: "refreshToken")
            completion(true, nil)
        } catch {
            completion(false, error.localizedDescription)
        }
    }
    
    private func refreshAccessToken(refreshToken: String, email: String) async throws -> (accessToken: String, refreshToken: String) {
        guard let url = URL(string: "\(Configuration.baseURL)/auth/refresh") else {
            throw NSError(domain: "Invalid URL", code: 0, userInfo: nil)
        }
        
        var urlRequest = URLRequest(url: url)
        urlRequest.httpMethod = "POST"
        urlRequest.addValue("application/json", forHTTPHeaderField: "Content-Type")
        let requestBody = ["refreshToken": refreshToken, "email": email]
        urlRequest.httpBody = try JSONEncoder().encode(requestBody)
        
        let (data, response) = try await URLSession.shared.data(for: urlRequest)
        guard let httpResponse = response as? HTTPURLResponse, httpResponse.statusCode == 200 else {
            throw NSError(domain: "Invalid response", code: 0, userInfo: nil)
        }
        
        let tokensResponse = try JSONDecoder().decode(TokenResponse.self, from: data)
        return (tokensResponse.accessToken, tokensResponse.refreshToken)
    }
    
    
    
    
    
}

struct TokenResponse: Decodable {
    let accessToken: String
    let refreshToken: String
}

struct SignupRequest: Encodable {
    let username: String
    let email: String
    let password: String
}

struct LoginRequest: Encodable {
    let email: String
    let password: String
}

struct AuthResponse: Decodable {
    let accessToken: String
    let storalinker: UserResponse
}

struct UserResponse: Decodable {
    let _id: String
    let email: String
    let username: String
    //    let dob: Date
    //    let createdAt: Date
    let refreshToken: String
    let avatorPath: String?
    let avatorPathRemote: String?
}
