//
//  S3ImageUpload.swift
//  storalink-app
//
//  Created by Yunze Zhao on 2/5/24.
//

import Foundation
import CryptoKit
import UIKit

/// Fetches a pre-signed URL from the backend for uploading an image.
/// - Parameters:
///   - imagePath: The local path of the image file to be uploaded.
///   - completion: A completion handler that receives either a URL string on success or an error.
func getPresignedURL(image: UIImage, completion: @escaping (Result<String, Error>) -> Void) {
    print("start getting presigned url")
    guard let data = image.jpegData(compressionQuality: 0.9) else {
        print("Error getting image data")
        completion(.failure(NSError(domain: "ImageError", code: 1, userInfo: [NSLocalizedDescriptionKey: "Could not convert image to JPEG"])))
        return
    }
    let checksum = generateSHA256Checksum(for: data)
    
    guard let url = URL(string: "\(Configuration.baseURL)/s3/generate-presigned-url?checksum=\(checksum)") else {
        completion(.failure(NSError(domain: "URLCreationError", code: 0, userInfo: [NSLocalizedDescriptionKey: "Invalid URL"])))
        return
    }
    
    Task {
        do {
            let keychainStorage = KeychainStorage()
            var request = URLRequest(url: url)
            request.httpMethod = "GET"
            request.addValue("application/json", forHTTPHeaderField: "Content-Type")
            request = try await keychainStorage.appendURLAuthHeader(to: &request)
            print(request.allHTTPHeaderFields ?? "")
            let (data, _) = try await URLSession.shared.data(for: request)
            print("s3 image:", data)
            guard let json = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
                  let preSignedUrl = json["url"] as? String else {
                completion(.failure(NSError(domain: "AppError", code: 2, userInfo: [NSLocalizedDescriptionKey: "Failed to decode response"])))
                return
            }
            
            print("success in getting presigned url")
            completion(.success(preSignedUrl))
        } catch {
            completion(.failure(error))
        }
    }
}


func uploadImageToS3(image: UIImage, completion: @escaping (Result<String, Error>) -> Void){
    
    print("start upload image to s3")
    getPresignedURL(image: image) { result in
        switch(result){
        case .success(let presignedUrl):
            print(presignedUrl)
            uploadImage(presignUrl: presignedUrl, image: image) { result in
                switch(result){
                case .success(let imageUrl):
                    print("success, image url: ", imageUrl)
                    completion(.success(imageUrl))
                    return
                case.failure:
                    print("some error occured")
                    completion(.failure(NSError(domain: "ImageError", code: 0, userInfo: [NSLocalizedDescriptionKey: "Could not convert image to JPEG"])))
                    return
                }
            }
        case.failure:
            print("some error occured")
            return
        }
    }
}

    func uploadImage(presignUrl: String, image: UIImage, completion: @escaping (Result<String, Error>) -> Void){
        guard let imageData = image.jpegData(compressionQuality: 0.9) else {
            completion(.failure(NSError(domain: "ImageError", code: 0, userInfo: [NSLocalizedDescriptionKey: "Could not convert image to JPEG"])))
            return
        }
        guard let url = URL(string: presignUrl) else {
            return
        }
        
        var request = URLRequest(url: url)
        request.httpMethod = "PUT"
        request.setValue("image/jpeg", forHTTPHeaderField: "Content-Type")
        request.httpBody = imageData
        
        let task = URLSession.shared.dataTask(with: request) { data, response, error in
                guard let httpResponse = response as? HTTPURLResponse, (200...299).contains(httpResponse.statusCode) else {
                    if let error = error {
                        completion(.failure(error))
                    } else {
                        completion(.failure(NSError(domain: "UploadError", code: 2, userInfo: [NSLocalizedDescriptionKey: "Failed to upload image"])))
                    }
                    return
                }
                // On success, return the URL where the image can be accessed
                completion(.success(presignUrl.components(separatedBy: "?").first ?? "URL not available"))
            }
            task.resume()
    }

// this function suffices the need for s3 duplicate checking
func generateSHA256Checksum(for imageData: Data) -> String {
    let hash = SHA256.hash(data: imageData)
    return hash.compactMap { String(format: "%02x", $0) }.joined()
}



//this function download the image using link from aws s3
func downloadImage(from urlString: String, completion: @escaping (UIImage?) -> Void) {
    guard let url = URL(string: urlString) else {
        completion(nil)
        return
    }
    URLSession.shared.dataTask(with: url) { data, response, error in
        guard let data = data, error == nil, let image = UIImage(data: data) else {
            completion(nil)
            return
        }
        DispatchQueue.main.async {
            completion(image)
        }
    }.resume()
}

