//
//  LocalFileManager.swift
//  storalink-app
//
//  Created by Yunze Zhao on 1/7/24.
//

import Foundation
import UIKit
final class LocalFileManager {
    
    static let manager = LocalFileManager()
    
    func saveImage(image: UIImage) -> String {
        guard let data = image.jpegData(compressionQuality: 1) else { print("Error getting image data"); return "" }
        let checksum = generateChecksum(for: data)
        let fileManager = FileManager.default

        // Define the directory where you'll save and check for images
        guard let directoryUrl = fileManager.urls(for: .cachesDirectory, in: .userDomainMask).first else {
            print("Could not find caches directory")
            return ""
        }

        // Define the path for the new image based on its checksum
        let newFileUrl = directoryUrl.appendingPathComponent(checksum)

        // Check if a file with the same checksum already exists
        if fileManager.fileExists(atPath: newFileUrl.path) {
            print("A file with the same checksum exists. No need to save the image again.")
            return newFileUrl.path // Return the existing file path
        } else {
            // Save the new image
            do {
                try data.write(to: newFileUrl)
                print("Saved new image with checksum: \(checksum)")
                return newFileUrl.path // Return the new file path
            } catch {
                print("Error saving image: \(error)")
                return ""
            }
        }
    }
    
    func getImage(path: String)-> UIImage? {
        if path.isEmpty {return nil}
        let fileURL = URL(fileURLWithPath: path)
        do {
            let imageData = try Data(contentsOf: fileURL)
            return UIImage(data: imageData)
        } catch {
            print("Error loading image: \(error)")
            return nil
        }
    }
    
    func generateChecksum(for imageData: Data) -> String {
        let hash = imageData.reduce(0) { ($0 << 5) &+ $0 &+ Int($1) } // Simple hash function
        return String(hash)
    }

}
