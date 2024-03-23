//
//  DataManager.swift
//  storalink-app
//
//  Created by Yunze Zhao on 11/26/23.
//

import Foundation
import SwiftData

@Observable
final class ModelUtilManager {
    static let manager = ModelUtilManager()
    
    private init() {} // Private initializer for Singleton
    
    func addLinkToFolder(link: Link, folder: Folder, modelContext: ModelContext) {
        modelContext.insert(Notice(type: NoticeActionType.linkCreate, name: folder.title))
        if (folder.getLinkNum() == 0) {
            folder.links = [link]
        } else {
            folder.linksNumber = folder.links.count + 1
            folder.links.append(link)
        }
        do {
            try modelContext.save()
        } catch {
            print("saving failed")
        }
    }
    
//    func createFolder() {
//        
//    }
    
    func deleteFolder(modelContext: ModelContext, folder: Folder) {
        print("deleting folder")

        modelContext.insert(Notice(type: NoticeActionType.folderDelete, name: folder.title))
        modelContext.delete(folder)
        do {
            try modelContext.save()
            
            // MARK: - Temp deletetion until Cascade in Swiftdata works
            try modelContext.delete(model: Link.self, where: #Predicate<Link> { link in
                link.parentFolder == nil
            })
            
        } catch {
            print("Saving deletion error: \(error)")
        }
    }
    
    func createFolder(modelContext: ModelContext, folder: Folder) {
        modelContext.insert(Notice(type: NoticeActionType.folderCreate, name: folder.title))
        modelContext.insert(folder)
        do {
            try modelContext.save()
        } catch {
            print("errors on creating folder")
        }
    }
    
    func deleteNotice(modelContext: ModelContext, notice: Notice) {
        modelContext.delete(notice)
        do {
            try modelContext.save()
        } catch {
            print("errors on deleting notice")
        }
    }
    
   
    
    func addUserToLocalDB(modelContext: ModelContext, user: User) {
        do {
            modelContext.insert(user)
            try modelContext.save()
        } catch {
            print("error")
        }
    }
    
    
    
}
