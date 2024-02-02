//
//  FolderManager.swift
//  storalink-app
//
//  Created by Yunze Zhao on 2/1/24.
//

import Foundation
import SwiftData
import KeychainAccess
class FolderManager {
    private let keychainStorage = KeychainStorage()
    static let manager = FolderManager()
    
    func createFolder(modelContext: ModelContext, folder: Folder, completion: @escaping (Result<Folder, Error>) -> Void) {
        let createRequest = CreateRequest(folderName: folder.title, folderDescription: folder.desc ?? " ")
        Task {
            do {
                guard let url = URL(string: "\(Configuration.baseURL)/folder/create") else {
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
                
                let createResponse = try JSONDecoder().decode(CreateResponse.self, from: data)
                folder.mongoId = createResponse._id
                completion(.success(folder))
            } catch {
                completion(.failure(error))
            }
        }
    }

    
    func deleteFolder(modelContext: ModelContext, folder: Folder) throws {
        Task {
            if let mongoId = folder.mongoId {
                print("found mongo id, sync action with cloud")
                guard let url = URL(string: "\(Configuration.baseURL)/folder/delete/\(mongoId)") else {
                    throw NSError(domain: "Invalid URL", code: 0, userInfo: nil)
                }
                var urlRequest = URLRequest(url: url)
                urlRequest.httpMethod = "POST"
                urlRequest.addValue("application/json", forHTTPHeaderField: "Content-Type")
                
                let (_, response) = try await URLSession.shared.data(for: urlRequest)
                
                guard let httpResponse = response as? HTTPURLResponse, httpResponse.statusCode > 200 , httpResponse.statusCode < 300 else {
                    print("failed checking 200+ status")
                    throw NSError(domain: "Invalid response", code: 0, userInfo: [NSLocalizedDescriptionKey: "Incorrect email or password"])
                }
                
            }
        }
        
        // local operation
        modelContext.delete(folder)
        do  {
            try modelContext.save()
        }
        catch {
            print("failure saving model context")
        }
        
        
    }
    
    func updateFolder(modelContext: ModelContext, folder: Folder) {
        if let mongoId = folder.mongoId {
            print("found mongo id, sync action with cloud")
        }
    }
    
     func readFolder(modelContext: ModelContext, folder: Folder) {
        Task {
            if let mongoId = folder.mongoId {
                print("found mongo id, sync action with cloud")
                guard let url = URL(string: "\(Configuration.baseURL)/folder/delete/\(mongoId)") else {
                    throw NSError(domain: "Invalid URL", code: 0, userInfo: nil)
                }
                var urlRequest = URLRequest(url: url)
                urlRequest.httpMethod = "GET"
                urlRequest.addValue("application/json", forHTTPHeaderField: "Content-Type")
                
                let (data, response) = try await URLSession.shared.data(for: urlRequest)
                
                print("get folder:", data)
                guard let httpResponse = response as? HTTPURLResponse, httpResponse.statusCode > 200 , httpResponse.statusCode < 300 else {
                    print("failed checking 200+ status")
                    throw NSError(domain: "Invalid response", code: 0, userInfo: [NSLocalizedDescriptionKey: "Incorrect email or password"])
                }
            }
        }
    }
    
  
}

struct CreateRequest: Encodable {
    let folderName: String
    let folderDescription: String
}

struct CreateResponse: Decodable {
    let _id: String
    let folderName: String
    let imageUrl: String
    let linkIds: [String]
    
}


