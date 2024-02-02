//
//  FolderManager.swift
//  storalink-app
//
//  Created by Yunze Zhao on 2/1/24.
//

import Foundation
import SwiftData
class FolderManager {
    
    static let manager = FolderManager()
    
    private func createFolder(modelConext: ModelContext, folder: Folder) throws{
        let createRequest = CreateRequest(folderName: folder.title, folderDescription: folder.desc ?? "")
        Task{
            do {
                guard let url = URL(string: "\(Configuration.baseURL)/folder/create") else {
                    throw NSError(domain: "Invalid URL", code: 0, userInfo: nil)
                }
                
                var urlRequest = URLRequest(url: url)
                urlRequest.httpMethod = "POST"
                urlRequest.addValue("application/json", forHTTPHeaderField: "Content-Type")
                
                let requestBody = try JSONEncoder().encode(createRequest)
                
                //        print(String(data: requestBody, encoding: .utf8) ?? "Invalid request body")
                
                urlRequest.httpBody = requestBody
                
                let (data, response) = try await URLSession.shared.data(for: urlRequest)
                
                print("data and response: ", data, response)
                guard let httpResponse = response as? HTTPURLResponse, httpResponse.statusCode > 200 , httpResponse.statusCode < 300 else {
                    print("failed checking 200+ status")
                    throw NSError(domain: "Invalid response", code: 0, userInfo: [NSLocalizedDescriptionKey: "Incorrect email or password"])
                }
                
                let createResponse = try JSONDecoder().decode(CreateResponse.self, from: data)
                return createResponse
            }
        }
        
        modelConext.insert(folder)
        do  {
            try modelConext.save()
        }
        catch {
            print("failure saving model context")
        }
    }
    
    private func deleteFolder(modelContext: ModelContext, folder: Folder) throws {
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
    
    private func updateFolder(modelContext: ModelContext, folder: Folder) {
        if let mongoId = folder.mongoId {
            print("found mongo id, sync action with cloud")
        }
    }
    
    private func readFolder(modelContext: ModelContext, folder: Folder) {
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
    let folderName: String
}


