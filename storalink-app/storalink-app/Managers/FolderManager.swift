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
    
    
    func deleteFolder(modelContext: ModelContext, folder: Folder, completion: @escaping (Result<String, Error>) -> Void ) {
        if let mongoId = folder.mongoId {
            print("found mongo id, sync action with cloud")
            Task {
                do {
                    guard let url = URL(string: "\(Configuration.baseURL)/folder/delete/\(mongoId)") else {
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
                    
                    
                    completion(.success("Success"))
                }catch {
                    completion(.failure(error))
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
    
    func updateFolder(modelContext: ModelContext, folder: Folder, completion: @escaping (Result<Folder, Error>) -> Void) {
        
        if let mongoId = folder.mongoId {
            print("found mongo id, sync action with cloud")
            let createRequest = CreateRequest(folderName: folder.title, folderDescription: folder.desc ?? " ")
            Task {
                do {
                    guard let url = URL(string: "\(Configuration.baseURL)/folder/update/\(mongoId)") else {
                        completion(.failure(NSError(domain: "URLCreationError", code: 0, userInfo: [NSLocalizedDescriptionKey: "Invalid URL"])))
                        return
                    }
                    
                    var urlRequest = URLRequest(url: url)
                    urlRequest.httpMethod = "PATCH"
                    urlRequest.addValue("application/json", forHTTPHeaderField: "Content-Type")
                    
                    
                    urlRequest = try await keychainStorage.appendURLAuthHeader(to: &urlRequest)
                    urlRequest.httpBody = try JSONEncoder().encode(createRequest)
                    
                    let (data, response) = try await URLSession.shared.data(for: urlRequest)
                    
                    if let httpResponse = response as? HTTPURLResponse {
                        // Now that httpResponse is of type HTTPURLResponse, you can access statusCode
                        guard (200...299).contains(httpResponse.statusCode) else {
                            // If statusCode is not in the 200-299 range, report failure
                            completion(.failure(NSError(domain: "HTTPError", code: httpResponse.statusCode, userInfo: [NSLocalizedDescriptionKey: "Failed request with status code: \(httpResponse.statusCode)"])))
                            return
                        }
                    }
                    
                    _ = try JSONDecoder().decode(CreateResponse.self, from: data)
                    print("done")
                    completion(.success(folder))
                } catch {
                    completion(.failure(error))
                }
            }
        } else {
            print("folder has no mango id")
        }
    }
    
    
    func readOneFolder(modelContext: ModelContext, folder: Folder, completion: @escaping (Result<Folder, Error>) -> Void) {
        if let mongoId = folder.mongoId {
            print("found mongo id, sync action with cloud")
            Task {
                do {
                    guard let url = URL(string: "\(Configuration.baseURL)/folder/update/\(mongoId)") else {
                        completion(.failure(NSError(domain: "URLCreationError", code: 0, userInfo: [NSLocalizedDescriptionKey: "Invalid URL"])))
                        return
                    }
                    
                    var urlRequest = URLRequest(url: url)
                    urlRequest.httpMethod = "GET"
                    urlRequest.addValue("application/json", forHTTPHeaderField: "Content-Type")
                    urlRequest = try await keychainStorage.appendURLAuthHeader(to: &urlRequest)
                    let (data, response) = try await URLSession.shared.data(for: urlRequest)
                    
                    print("get folder:", data)
                    if let httpResponse = response as? HTTPURLResponse {
                        // Now that httpResponse is of type HTTPURLResponse, you can access statusCode
                        guard (200...299).contains(httpResponse.statusCode) else {
                            // If statusCode is not in the 200-299 range, report failure
                            completion(.failure(NSError(domain: "HTTPError", code: httpResponse.statusCode, userInfo: [NSLocalizedDescriptionKey: "Failed request with status code: \(httpResponse.statusCode)"])))
                            return
                        }
                    }
                    completion(.success(folder))
                } catch {
                    completion(.failure(error))
                }
            }
        }
    }
    
    func getAllFolders(user: User, completion: @escaping (Result<[Folder], Error>) -> Void) {
        Task {
            do {
                guard let url = URL(string: "\(Configuration.baseURL)/folder/getAll/") else {
                    completion(.failure(NSError(domain: "URLCreationError", code: 0, userInfo: [NSLocalizedDescriptionKey: "Invalid URL"])))
                    return
                }
                
                var urlRequest = URLRequest(url: url)
                urlRequest.httpMethod = "GET"
                urlRequest.addValue("application/json", forHTTPHeaderField: "Content-Type")
                urlRequest = try await keychainStorage.appendURLAuthHeader(to: &urlRequest)
                
                let (data, response) = try await URLSession.shared.data(for: urlRequest)
                
                if let httpResponse = response as? HTTPURLResponse, (200...299).contains(httpResponse.statusCode) {
                    // Decode the data into an array of Folders
                    let foldersResponses = try JSONDecoder().decode([CreateResponse].self, from: data)
                    var ret: [Folder] = []
                    
                    // return an empty array if there is no folder
                    if foldersResponses.isEmpty {
                        completion(.success([]))
                    }
                    
                    for foldersResponse in foldersResponses {
                        ret.append(translateResponseToFolder(response: foldersResponse, attachedTo: user))
                    }
                    completion(.success(ret))
                } else {
                    // Handle unsuccessful HTTP responses
                    let statusCode = (response as? HTTPURLResponse)?.statusCode ?? 0
                    completion(.failure(NSError(domain: "HTTPError", code: statusCode, userInfo: [NSLocalizedDescriptionKey: "Failed request with status code: \(statusCode)"])))
                }
            } catch {
                // Handle any errors that occurred during the request or decoding process
                completion(.failure(error))
            }
        }
    }

    
    private func translateResponseToFolder(response: CreateResponse, attachedTo: User) -> Folder {
        return Folder(mongoId: response._id, title: response.folderName, imgUrl: response.imageUrl ?? "", user: attachedTo, links: [])
    }
    
}

struct CreateRequest: Encodable {
    let folderName: String
    let folderDescription: String
}

struct CreateResponse: Decodable {
    let _id: String
    let folderName: String
    let imageUrl: String?
    let linkIds: [String]?
}




