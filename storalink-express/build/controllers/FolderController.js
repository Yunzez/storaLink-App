"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Folder_1 = __importDefault(require("../models/Folder"));
const createFolder = (req, res, next) => {
    const currentUserId = req.userId;
    if (!currentUserId) {
        return res.status(404).json({ message: "Unable to fetch user" });
    }
    const { folderDescription, folderName, creatorId, imageUrl = "", // Default value if not provided
    linkIds = [], // Default value if not provided
    parentFolderId = "", // Default value if not provided
    subFolderIds = [], // Default value if not provided
    modifierId = "", // Default value if not provided
     } = req.body;
    if (creatorId !== currentUserId) {
        console.log("creatorId: ", creatorId, "currentUser.id: ", currentUserId.toString());
        return res.status(401).json({ message: "Unauthorized" });
    }
    // Since creatorId must match the current user's ID, we use currentUser.id directly
    const folder = new Folder_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        folderDescription,
        creatorId, // Use the ID from the JWT token
        folderName,
        imageUrl,
        linkIds,
        parentFolderId,
        subFolderIds,
        modifierId,
    });
    return folder
        .save()
        .then((folder) => res.status(201).json(folder))
        .catch((err) => res.status(500).json({ error: err }));
};
exports.default = {
    createFolder,
};
