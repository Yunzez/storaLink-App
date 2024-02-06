//
//  LinkManager.swift
//  storalink-app
//
//  Created by Yunze Zhao on 2/1/24.
//

import Foundation
import SwiftData

class LinkManager {
    private let keychainStorage = KeychainStorage()
    
    static let manager = LinkManager()
    
    func createFolder(modelContext: ModelContext, link: Link, completion: @escaping (Result<Link, Error>) -> Void) {
        let createRequest = CreateLinkRequest(linkName: link.title, linkUrl: link.linkUrl ?? " ", description: link.desc ?? " ", imageUrl: link.imgUrl ?? " ", iconUrl: link.iconUrl ?? " ")
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
    
    func updateLink(modelContext: ModelContext, link: Link) {
        if let mongoId = link.mongoId {
            print("found mongo id, sync action with cloud")
        }
    }
    
    func deleteLink(modelContext: ModelContext, link: Link) {
        if let mongoId = link.mongoId {
            print("found mongo id, sync action with cloud")
        }
    }
    
    func readLink(modelContext: ModelContext, link: Link) {
        if let mongoId = link.mongoId {
            print("found mongo id, sync action with cloud")
        }
    }
}

struct CreateLinkRequest: Encodable {
    let linkName: String
    let linkUrl: String
    let description: String
    let imageUrl: String
    let iconUrl: String
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
