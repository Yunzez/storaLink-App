//
//  UserManager.swift
//  storalink-app
//
//  Created by Yunze Zhao on 2/12/24.
//

import Foundation

import Foundation
import SwiftData

public actor UserActor: ModelActor {
    private let keychainStorage = KeychainStorage()
    
    static let actor = UserActor()
    public let modelContainer: ModelContainer
    public let modelExecutor: any ModelExecutor
    private var modelContext: ModelContext { modelExecutor.modelContext }
    
    public init() {
        self.modelContainer = ProdModelContainer
        let context = ModelContext(modelContainer)
        modelExecutor = DefaultSerialModelExecutor(modelContext: context)
    }
    
    
    func updateUser(user: User, completion: @escaping (Result<User, Error>) -> Void) {
        let userMongoId = user.mongoId
        Task {
            do {
                
                guard let url = URL(string: "\(Configuration.baseURL)/storalinker/update/\(userMongoId)") else {
                    completion(.failure(NSError(domain: "URLCreationError", code: 0, userInfo: [NSLocalizedDescriptionKey: "Invalid URL"])))
                    return
                }
                
                var urlRequest = URLRequest(url: url)
                urlRequest.httpMethod = "PATCH"
                urlRequest.addValue("application/json", forHTTPHeaderField: "Content-Type")
                
                
                urlRequest = try await keychainStorage.appendURLAuthHeader(to: &urlRequest)
                let userRequest = UserRequest(
                    username: user.name, email: user.email, avatorPath: user.avatorPath ?? "", avatorPathRemote: user.avatorPathRemote ?? ""
                )
                urlRequest.httpBody = try JSONEncoder().encode(userRequest)
                let (_, response) = try await URLSession.shared.data(for: urlRequest)
                
                if let httpResponse = response as? HTTPURLResponse {
                    // Now that httpResponse is of type HTTPURLResponse, you can access statusCode
                    guard (200...299).contains(httpResponse.statusCode) else {
                        // If statusCode is not in the 200-299 range, report failure
                        completion(.failure(NSError(domain: "HTTPError", code: httpResponse.statusCode, userInfo: [NSLocalizedDescriptionKey: "Failed request with status code: \(httpResponse.statusCode)"])))
                        return
                    }
                }
                
                completion(.success(user))
            } catch {
                completion(.failure(error))
            }
        }
    }
    
    // MARK: -delete user section
    
    func deleteUser(user: User, password: String,  completion: @escaping (Result<String, Error>) -> Void) async {
        guard let hashedPassword = hashPassword(password) else {
            completion(.failure(AppError.passwordHashingFailed))
            return
        }
        Task {
            do {
                
                guard let url = URL(string: "\(Configuration.baseURL)/storalinker/delete") else {
                    completion(.failure(NSError(domain: "URLCreationError", code: 0, userInfo: [NSLocalizedDescriptionKey: "Invalid URL"])))
                    return
                }
                
                var urlRequest = URLRequest(url: url)
                urlRequest.httpMethod = "POST"
                urlRequest.addValue("application/json", forHTTPHeaderField: "Content-Type")
                urlRequest = try await keychainStorage.appendURLAuthHeader(to: &urlRequest)
                
                let deleteRequest = DeleteRequest(password: hashedPassword)
                
                urlRequest.httpBody = try JSONEncoder().encode(deleteRequest)
                let (_, response) = try await URLSession.shared.data(for: urlRequest)
                
                if let httpResponse = response as? HTTPURLResponse {
                    // Now that httpResponse is of type HTTPURLResponse, you can access statusCode
                    guard (200...299).contains(httpResponse.statusCode) else {
                        // If statusCode is not in the 200-299 range, report failure
                        completion(.failure(NSError(domain: "HTTPError", code: httpResponse.statusCode, userInfo: [NSLocalizedDescriptionKey: "Failed request with status code: \(httpResponse.statusCode)"])))
                        return
                        
                    }
                    
                    
                }
            }
            
        }
    }
    
    struct DeleteRequest: Encodable {
        let password: String
    }
    
    
    struct UserRequest: Encodable {
        let username: String
        let email: String
        let avatorPath: String
        let avatorPathRemote: String
    }
}
