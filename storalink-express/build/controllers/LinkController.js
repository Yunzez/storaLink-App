"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Link_1 = __importDefault(require("../models/Link"));
const Folder_1 = __importDefault(require("../models/Folder"));
const createLink = (req, res, next) => {
    const currentUserId = req.userId;
    if (!currentUserId) {
        return res.status(404).json({ message: "Unable to fetch user" });
    }
    const { linkDescription, linkName, creatorId, linkUrl, imageUrl = "", // Default value if not provided
    parentFolderId, // Default value if not provided
    modifierId = "", // Default value if not provided
     } = req.body;
    if (creatorId !== currentUserId) {
        console.log("creatorId: ", creatorId, "currentUser.id: ", currentUserId.toString());
        return res.status(401).json({ message: "Unauthorized" });
    }
    console.log("create new link to folder: ", parentFolderId);
    // Since creatorId must match the current user's ID, we use currentUser.id directly
    const link = new Link_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        linkDescription,
        creatorId, // Use the ID from the JWT token
        linkName,
        linkUrl,
        imageUrl,
        parentFolderId,
        modifierId,
    });
    Folder_1.default.findById(parentFolderId)
        .exec()
        .then((folder) => {
        if (!folder) {
            return res.status(404).json({ message: "ParentFolder not found" });
        }
        folder.linkIds.push(link._id);
    });
    return link
        .save()
        .then((link) => res.status(201).json(link))
        .catch((err) => res.status(500).json({ error: err }));
};
const deleteLink = (req, res, next) => {
    const { linkId } = req.params;
    Link_1.default.findById(linkId)
        .exec()
        .then((link) => {
        const parentFolderId = link === null || link === void 0 ? void 0 : link.parentFolderId;
        Folder_1.default.findById(parentFolderId)
            .exec()
            .then((folder) => {
            if (!folder) {
                return res.status(404).json({ message: "ParentFolder not found" });
            }
            folder.linkIds = folder.linkIds.filter((id) => id !== linkId);
            folder.save();
        });
        console.log("deleted link from folder: ", parentFolderId);
    });
    Link_1.default.findByIdAndDelete(linkId)
        .exec()
        .then((link) => {
        if (!link) {
            return res.status(404).json({ message: "Link not found" });
        }
        res.status(200).json({ message: "Link deleted" });
    })
        .catch((err) => res.status(500).json({ error: err }));
};
const updateLink = (req, res, next) => {
    const { linkId } = req.params;
    const { linkDescription, linkName, linkUrl, imageUrl } = req.body;
    Link_1.default.findById(linkId)
        .exec()
        .then((link) => {
        if (!link) {
            return res.status(404).json({ message: "Link not found" });
        }
        link.description = linkDescription;
        link.linkName = linkName;
        link.linkUrl = linkUrl;
        link.imageUrl = imageUrl;
        link.save().then((link) => res.status(200).json(link));
    });
};
exports.default = {
    createLink,
    deleteLink,
    updateLink,
};
