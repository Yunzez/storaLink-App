//
//  S3ImageUpload.swift
//  storalink-app
//
//  Created by Yunze Zhao on 2/5/24.
//

import Foundation
import AWSS3
func uploadImageToS3(imageName: String, filePath: String, completion: @escaping (Result<String, Error>) -> Void) {
    let fileUrl = URL(fileURLWithPath: filePath)
    let bucketName = "storalink-image"
    let s3Key = "images/\(imageName).jpeg" // Unique S3 key for the image
    
    // Configure the upload request
    let expression = AWSS3TransferUtilityUploadExpression()
    expression.progressBlock = { (task, progress) in
        DispatchQueue.main.async {
            // Update progress UI here if needed
        }
    }
    
    var completionHandler: AWSS3TransferUtilityUploadCompletionHandlerBlock?
    completionHandler = { (task, error) -> Void in
        DispatchQueue.main.async {
            if let error = error {
                completion(.failure(error))
            } else {
                let imageUrl = "https://\(bucketName).s3.amazonaws.com/\(s3Key)"
                completion(.success(imageUrl))
            }
        }
    }
    
    let transferUtility = AWSS3TransferUtility.default()
    
    transferUtility.uploadFile(fileUrl, bucket: bucketName, key: s3Key, contentType: "image/jpeg", expression: expression, completionHandler: completionHandler).continueWith { (task) -> AnyObject? in
        if let error = task.error {
            print("Error: \(error.localizedDescription)")
        }
        
        if let _ = task.result {
            // The upload started successfully
        }
        
        return nil
    }
}
