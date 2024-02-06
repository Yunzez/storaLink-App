//
//  FolderManager.swift
//  storalink-app
//
//  Created by Yunze Zhao on 2/1/24.
//

import Foundation
import SwiftData
import KeychainAccess
public actor FolderManager: ModelActor {
    private let keychainStorage = KeychainStorage()
    
    static let manager = FolderManager()
    public let modelContainer: ModelContainer
    public let modelExecutor: any ModelExecutor
    private var context: ModelContext { modelExecutor.modelContext }
    
    public init() {
            self.modelContainer = ProdModelContainer
            let context = ModelContext(modelContainer)
            modelExecutor = DefaultSerialModelExecutor(modelContext: context)
        }
    
    func createFolder( folder: Folder, completion: @escaping (Result<Folder, Error>) -> Void) {
        let createRequest = CreateRequest(folderName: folder.title, folderDescription: folder.desc ?? " ", imageUrl: folder.imgUrl)
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
    
    
    func deleteFolder(folder: Folder, completion: @escaping (Result<String, Error>) -> Void ) {
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
    
    func updateFolder(folder: Folder, completion: @escaping (Result<Folder, Error>) -> Void) {
        
        if let mongoId = folder.mongoId {
            print("found mongo id, sync action with cloud")
            let createRequest = CreateRequest(folderName: folder.title, folderDescription: folder.desc ?? " ", imageUrl: folder.imgUrl)
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
    
    func getAllFolders(user: User, completion: @escaping (Result<[CreateResponse], Error>) -> Void) {
        Task{
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
                    
                    
                    // return an empty array if there is no folder
                    if foldersResponses.isEmpty {
                        completion(.success([]))
                    }
                    saveResponseToFolder(modelContext: context, responses: foldersResponses, attachedTo: user)
                    
                    return completion(.success(foldersResponses))
//                        var ret = saveResponseToFolder(modelContext: modelContext, responses: foldersResponses, attachedTo: user)
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

    
    func saveResponseToFolder(modelContext: ModelContext, responses: [CreateResponse], attachedTo: User) {
        let selectedResponses = syncFolders(modelContext: modelContext, responses: responses, userId: attachedTo.id)
        for oneResponse in selectedResponses {
            modelContext.insert(Folder(mongoId: oneResponse._id, title: oneResponse.folderName, imgUrl: oneResponse.imageUrl ?? "", user: attachedTo, links: []))
        }
        do {
            try modelContext.save()
            print("save folders: ", selectedResponses.count)
        } catch {
            print("failed saving folders")
        }
        
//        return Folder(mongoId: response._id, title: response.folderName, imgUrl: response.imageUrl ?? "", user: attachedTo, links: [])
    }
    
    func syncFolders(modelContext: ModelContext, responses: [CreateResponse], userId: UUID) -> [CreateResponse] {
        do {
            // Fetch current folders for the user
            let currentFolders = try modelContext.fetch(FetchDescriptor<Folder>(
                predicate: #Predicate { folder in
                    return folder.user?.id == userId
                }
            ))

            // Assuming mongoId is non-optional, or you've handled optionality elsewhere
            let currentFolderIds: Set<String> = Set(currentFolders.compactMap { $0.mongoId })
            let newFolderIds: Set<String> = Set(responses.map { $0._id })

            // Determine folders to add (present in newFolderIds but not in currentFolderIds)
            let idsToAdd = newFolderIds.subtracting(currentFolderIds)

            // Determine folders to delete (present in currentFolderIds but not in newFolderIds)
            let idsToDelete = currentFolderIds.subtracting(newFolderIds)

            print("add number:", idsToAdd.count)
            print("delete number:", idsToDelete.count)

            // Perform delete operations
            if !idsToDelete.isEmpty {
                for idToDelete in idsToDelete {
                    if let folderToDelete = currentFolders.first(where: { $0.mongoId == idToDelete }) {
                        modelContext.delete(folderToDelete)
                    }
                }
            }

            // Save changes if there are any additions or deletions
            if !idsToDelete.isEmpty {
                try modelContext.save()
            }

            // Filter responses to add based on idsToAdd
            let responsesToAdd = responses.filter { idsToAdd.contains($0._id) }

            if !responsesToAdd.isEmpty {
                // Return the filtered responses for folders to be added
                return responsesToAdd
            } else {
                print("No new folders to add")
            }

        } catch {
            print("Synchronization Error: \(error)")
        }
        return []
    }


    
}

struct CreateRequest: Encodable {
    let folderName: String
    let folderDescription: String
    let imageUrl: String
}

struct CreateResponse: Decodable {
    let _id: String
    let folderName: String
    let imageUrl: String?
    let linkIds: [String]?
}




