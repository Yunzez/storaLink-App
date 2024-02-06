//
//  LinkManager.swift
//  storalink-app
//
//  Created by Yunze Zhao on 2/1/24.
//

import Foundation
import SwiftData

public actor LinkManager: ModelActor {
    
    private let keychainStorage = KeychainStorage()
    
    static let manager = LinkManager()
    public let modelContainer: ModelContainer
    public let modelExecutor: any ModelExecutor
    private var context: ModelContext { modelExecutor.modelContext }
    
    public init() {
            self.modelContainer = ProdModelContainer
            let context = ModelContext(modelContainer)
            modelExecutor = DefaultSerialModelExecutor(modelContext: context)
        }
    func createLink(link: Link, completion: @escaping (Result<Link, Error>) -> Void) {
        guard let parentFolderMongoId = link.parentFolder?.mongoId else {
            completion(.failure(NSError(domain: "URLCreationError", code: 0, userInfo: [NSLocalizedDescriptionKey: "No Mongo Id of parent folder"])))
            return
        }
        
        let createRequest = CreateLinkRequest(linkName: link.title, linkUrl: link.linkUrl ?? " ", description: link.desc ?? " ", imageUrl: link.imgUrl ?? " ", iconUrl: link.iconUrl ?? " ", parentFolderId: parentFolderMongoId)
        
        Task {
            do {
                
                guard let url = URL(string: "\(Configuration.baseURL)/link/create") else {
                    completion(.failure(NSError(domain: "URLCreationError", code: 0, userInfo: [NSLocalizedDescriptionKey: "Invalid URL"])))
                    return
                }
                
                var urlRequest = URLRequest(url: url)
                urlRequest.httpMethod = "POST"
                urlRequest.addValue("application/json", forHTTPHeaderField: "Content-Type")
                urlRequest.httpBody = try JSONEncoder().encode(createRequest)
                
                urlRequest = try await keychainStorage.appendURLAuthHeader(to: &urlRequest)
                
                let (data, response) = try await URLSession.shared.data(for: urlRequest)
                
                if let httpResponse = response as? HTTPURLResponse {
                    // Now that httpResponse is of type HTTPURLResponse, you can access statusCode
                    guard (200...299).contains(httpResponse.statusCode) else {
                        // If statusCode is not in the 200-299 range, report failure
                        completion(.failure(NSError(domain: "HTTPError", code: httpResponse.statusCode, userInfo: [NSLocalizedDescriptionKey: "Failed request with status code: \(httpResponse.statusCode)"])))
                        return
                    }
                }
                
                let createResponse = try JSONDecoder().decode(LinkResponse.self, from: data)
                link.mongoId = createResponse._id
                completion(.success(link))
            } catch {
                completion(.failure(error))
            }
        }
    }
    
    func updateLink(link: Link, completion: @escaping (Result<Link, Error>) -> Void) {
        guard let linkMongoId = link.mongoId else {
            completion(.failure(NSError(domain: "URLCreationError", code: 0, userInfo: [NSLocalizedDescriptionKey: "No Mongo Id of link"])))
            return
        }
        
        print(linkMongoId)
    }
    
    func deleteLink(link: Link, completion: @escaping (Result<String, Error>) -> Void) {
        guard let parentFolderMongoId = link.parentFolder?.mongoId else {
            completion(.failure(NSError(domain: "URLCreationError", code: 0, userInfo: [NSLocalizedDescriptionKey: "No Mongo Id of parent folder"])))
            return
        }
        
        guard let linkMongoId = link.mongoId else {
            completion(.failure(NSError(domain: "URLCreationError", code: 0, userInfo: [NSLocalizedDescriptionKey: "No Mongo Id of link"])))
            return
        }
        
        Task {
            do {
                
                guard let url = URL(string: "\(Configuration.baseURL)/link/delete/\(linkMongoId)") else {
                    completion(.failure(NSError(domain: "URLCreationError", code: 0, userInfo: [NSLocalizedDescriptionKey: "Invalid URL"])))
                    return
                }
                
                var urlRequest = URLRequest(url: url)
                urlRequest.httpMethod = "POST"
                urlRequest.addValue("application/json", forHTTPHeaderField: "Content-Type")
            
                
                urlRequest = try await keychainStorage.appendURLAuthHeader(to: &urlRequest)
                
                let (_, response) = try await URLSession.shared.data(for: urlRequest)
                
                if let httpResponse = response as? HTTPURLResponse {
                    // Now that httpResponse is of type HTTPURLResponse, you can access statusCode
                    guard (200...299).contains(httpResponse.statusCode) else {
                        // If statusCode is not in the 200-299 range, report failure
                        completion(.failure(NSError(domain: "HTTPError", code: httpResponse.statusCode, userInfo: [NSLocalizedDescriptionKey: "Failed request with status code: \(httpResponse.statusCode)"])))
                        return
                    }
                }
                
                completion(.success("Deleted"))
            } catch {
                completion(.failure(error))
            }
        }
    }
    
    func readLink(link: Link, completion: @escaping (Result<Link, Error>) -> Void) {
        
        guard let linkMongoId = link.mongoId else {
            completion(.failure(NSError(domain: "URLCreationError", code: 0, userInfo: [NSLocalizedDescriptionKey: "No Mongo Id of link"])))
            return
        }
        
    }
    
    func getAllLink(user:User, completion: @escaping (Result<[LinkResponse], Error>) -> Void) {
        
        Task {
            do {
                
                guard let url = URL(string: "\(Configuration.baseURL)/link/getAll") else {
                    completion(.failure(NSError(domain: "URLCreationError", code: 0, userInfo: [NSLocalizedDescriptionKey: "Invalid URL"])))
                    return
                }
                
                var urlRequest = URLRequest(url: url)
                urlRequest.httpMethod = "POST"
                urlRequest.addValue("application/json", forHTTPHeaderField: "Content-Type")
            
                
                urlRequest = try await keychainStorage.appendURLAuthHeader(to: &urlRequest)
                
                let (data, response) = try await URLSession.shared.data(for: urlRequest)
                
                if let httpResponse = response as? HTTPURLResponse {
                    // Now that httpResponse is of type HTTPURLResponse, you can access statusCode
                    guard (200...299).contains(httpResponse.statusCode) else {
                        // If statusCode is not in the 200-299 range, report failure
                        completion(.failure(NSError(domain: "HTTPError", code: httpResponse.statusCode, userInfo: [NSLocalizedDescriptionKey: "Failed request with status code: \(httpResponse.statusCode)"])))
                        return
                    }
                }
                let createResponse = try JSONDecoder().decode([LinkResponse].self, from: data)
                completion(.success(createResponse))
            } catch {
                completion(.failure(error))
            }
        }
        
    }
}

struct CreateLinkRequest: Encodable {
    let linkName: String
    let linkUrl: String
    let description: String
    let imageUrl: String
    let iconUrl: String
    let parentFolderId: String
}

struct LinkResponse: Decodable {
    let _id: String
    let linkName: String
    let linkUrl: String
    let description: String
    let imageUrl: String
    let iconUrl: String
    let parentFolderId: String
}
