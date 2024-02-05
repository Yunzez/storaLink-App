"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Folder_1 = __importDefault(require("../models/Folder"));
const createFolder = (req, res, next) => {
    console.log("create new folder");
    const currentUserId = req.userId;
    if (!currentUserId) {
        return res.status(404).json({ message: "Unable to fetch user" });
    }
    const { folderDescription = "", folderName, imageUrl = "", // Default value if not provided
    linkIds = [], // Default value if not provided
    modifierId = "", // Default value if not provided
     } = req.body;
    // Since creatorId must match the current user's ID, we use currentUser.id directly
    const folder = new Folder_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        folderDescription,
        creatorId: currentUserId, // Use the ID from the JWT token
        folderName,
        imageUrl,
        linkIds,
        modifierId,
    });
    console.log("folder: ", folder);
    return folder
        .save()
        .then((folder) => res.status(201).json(folder))
        .catch((err) => {
        console.log("error: ", err);
        return res.status(500).json({ error: err });
    });
};
const getFolder = (req, res, next) => {
    const { folderId } = req.params;
    Folder_1.default.findById(folderId)
        .exec()
        .then((folder) => {
        if (!folder) {
            return res.status(404).json({ message: "Folder not found" });
        }
        res.status(200).json(folder);
    })
        .catch((err) => res.status(500).json({ error: err }));
};
const updateFolder = (req, res, next) => {
    const folderId = req.params.id;
    const { folderDescription, folderName, imageUrl } = req.body;
    Folder_1.default.findById(folderId)
        .exec()
        .then((folder) => {
        if (!folder) {
            return res.status(404).json({ message: "Folder not found" });
        }
        folder.folderDescription = folderDescription;
        folder.folderName = folderName;
        folder.imageUrl = imageUrl;
        folder.save().then((folder) => res.status(200).json(folder));
    })
        .catch((err) => res.status(500).json({ error: err }));
};
const getAllFolders = (req, res, next) => {
    // Assuming req.userId is a string that contains the user's ID
    const userId = req.userId; // Corrected from const { useId } = req.userId;
    console.log("get all folders for user, userId: ", userId);
    Folder_1.default.find({ creatorId: userId })
        .exec()
        .then((folders) => {
        // Check if there are no folders found
        if (!folders || folders.length === 0) {
            console.log("no folders found for user");
            return res.status(200).json({});
        }
        res.status(200).json(folders);
    })
        .catch((err) => res.status(500).json({ error: err }));
};
const deleteFolder = (req, res, next) => {
    const folderId = req.params.id;
    console.log("delete: folderId, ", folderId);
    Folder_1.default.findById(folderId)
        .exec()
        .then((folder) => {
        if (!folder) {
            res.status(404).json({ message: "Folder not found" });
            return; // Ensure we return undefined here
        }
        // Ensure deletion is awaited before proceeding
        return Folder_1.default.findByIdAndDelete(folderId).then(() => {
            res.status(204).json({ message: "Folder deleted" });
            console.log("deleted");
            // No need to return anything here, as we're ending the response
        });
    })
        .catch((err) => {
        res.status(500).json({ error: err });
        // No need to return anything here, as we're ending the response
    });
};
exports.default = {
    createFolder,
    getFolder,
    updateFolder,
    deleteFolder,
    getAllFolders,
};
