//
//  LinkManager.swift
//  storalink-app
//
//  Created by Yunze Zhao on 2/1/24.
//

import Foundation
import SwiftData

public actor LinkActor: ModelActor {
    
    private let keychainStorage = KeychainStorage()
    
    static let actor = LinkActor()
    public let modelContainer: ModelContainer
    public let modelExecutor: any ModelExecutor
    private var modelContext: ModelContext { modelExecutor.modelContext }
    
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
        
        let createRequest = CreateLinkRequest(linkName: link.title, linkUrl: link.linkUrl ?? " ", description: link.desc ?? " ", imageUrl: link.imgUrl ?? "none", iconUrl: link.iconUrl ?? "none", parentFolderId: parentFolderMongoId)
        
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
                urlRequest.httpMethod = "GET"
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
                let createResponses = try JSONDecoder().decode([LinkResponse].self, from: data)
                
                saveResponseToLink(modelContext: modelContext, responses: createResponses, attachedTo: user)
                
                completion(.success(createResponses))
            } catch {
                completion(.failure(error))
            }
        }
        
    }
    
    func saveResponseToLink(modelContext: ModelContext, responses: [LinkResponse], attachedTo: User) {
        let selectedResponses = syncLinks(modelContext: modelContext, responses: responses, userId: attachedTo.id)
        let userId = attachedTo.id
        do {
            // Fetch current folders to ensure we have the latest state
            let currentFolders = try modelContext.fetch(FetchDescriptor<Folder>(
                predicate: #Predicate { folder in
                    return folder.user?.id == userId
                }
            ))
            
            // Map folders by their mongoId for quick access
            let foldersById = Dictionary(uniqueKeysWithValues: currentFolders.map { ($0.mongoId, $0) })
            
            for oneResponse in selectedResponses {
                // Find the parent folder for each link
                if let parentFolder = foldersById[oneResponse.parentFolderId] {
                    // Create the link and append it to the parent folder's links
                    let newLink = Link(
                        title: oneResponse.linkName,
                        imgUrl: oneResponse.imageUrl,
                        iconUrl: oneResponse.iconUrl,
                        desc: oneResponse.description,
                        mongoId: oneResponse._id,
                        linkUrl: oneResponse.linkUrl
                    )
                    parentFolder.links.append(newLink)
                } else {
                    print("Warning: Parent folder not found for link \(oneResponse._id)")
                }
            }
            
            // Save changes after all new links have been added
            try modelContext.save()
            print("Saved links: ", selectedResponses.count)
        } catch {
            print("Failed saving links: \(error)")
        }
    }

    
    func syncLinks(modelContext: ModelContext, responses: [LinkResponse], userId: UUID) -> [LinkResponse]{
        
            do {
                // Fetch current folders for the user
                
                let currentFolders = try modelContext.fetch(FetchDescriptor<Folder>(
                    predicate: #Predicate { folder in
                        return folder.user?.id == userId
                    }
                ))
                
                print("in synclink, current folders", currentFolders)
                let foldersById = currentFolders.reduce(into: [String: Folder]()) { result, folder in
                    result[folder.mongoId] = folder
                }
                
                var currentLinks: [Link] = []
                
                for folder in currentFolders {
                    currentLinks.append(contentsOf: folder.links)
                }

                let currentLinkIds: Set<String> = Set(currentLinks.compactMap { $0.mongoId })
                
                let newLinkIds: Set<String> = Set(responses.map { $0._id })
                
                // Determine folders to add (present in newFolderIds but not in currentFolderIds)
                let idsToAdd = newLinkIds.subtracting(currentLinkIds)
                
                // Determine folders to delete (present in currentFolderIds but not in newFolderIds)
                let idsToDelete = currentLinkIds.subtracting(newLinkIds)
                
                print("current link id:", currentLinkIds)
                print("newLinkIds:", newLinkIds)
                // Perform delete operations
                if !idsToDelete.isEmpty {
                    for idToDelete in idsToDelete {
                        if let linkToDelete = currentLinks.first(where: { $0.mongoId == idToDelete }) {
                            modelContext.delete(linkToDelete)
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
                    print(foldersById)
                    return responsesToAdd
                    //                try modelContext.save()
                } else {
                    print("No new folders to add")
                }
                return []
            } catch {
                print("Synchronization Error: \(error)")
            }
            return []
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
