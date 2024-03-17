"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Link_1 = __importDefault(require("../models/Link"));
const Folder_1 = __importDefault(require("../models/Folder"));
const createLink = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const currentUserId = req.userId;
    if (!currentUserId) {
        return res.status(404).json({ message: "Unable to fetch user" });
    }
    const { linkDescription, linkName, linkUrl, imageUrl = "", // Default value if not provided
    iconUrl = "", // Default value if not provided
    parentFolderId, // Assume this is provided and valid
    modifierId = "", // Default value if not provided
     } = req.body;
    console.log("create new link to folder: ", parentFolderId);
    try {
        const folder = yield Folder_1.default.findById(parentFolderId).exec();
        if (!folder) {
            return res.status(404).json({ message: "ParentFolder not found" });
        }
        const link = new Link_1.default({
            _id: new mongoose_1.default.Types.ObjectId(),
            linkDescription,
            creatorId: currentUserId, // Use the ID from the JWT token
            linkName,
            linkUrl,
            imageUrl,
            iconUrl,
            parentFolderId,
            modifierId,
        });
        // Push the new link ID to the folder's linkIds array and save the folder
        folder.linkIds.push(link._id);
        yield folder.save(); // Wait for the folder to be updated
        // Now save the link
        const savedLink = yield link.save();
        res.status(201).json(savedLink);
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});
const deleteLink = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const linkId = req.params.id;
    try {
        const link = yield Link_1.default.findById(linkId).exec();
        if (!link) {
            return res.status(404).json({ message: "Link not found" });
        }
        const parentFolderId = link.parentFolderId;
        if (parentFolderId) {
            const folder = yield Folder_1.default.findById(parentFolderId).exec();
            if (folder) {
                // Remove the linkId from the folder's linkIds array
                folder.linkIds = folder.linkIds.filter((id) => id.toString() !== linkId);
                yield folder.save(); // Wait for the folder update to complete
                console.log("deleted link from folder: ", parentFolderId);
            }
            else {
                console.log("ParentFolder not found or already deleted.");
            }
        }
        // Proceed to delete the link after updating the folder
        yield Link_1.default.findByIdAndDelete(linkId).exec();
        res.status(200).json({ message: "Link deleted" });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});
const updateLink = (req, res, next) => {
    const linkId = req.params.id;
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
const getAllLinks = (req, res, next) => {
    const userId = req.userId;
    Link_1.default.find({ creatorId: userId })
        .exec()
        .then((links) => {
        // Check if there are no folders found
        if (!links || links.length === 0) {
            console.log("no folders found for user");
            return res.status(200).json({});
        }
        res.status(200).json(links);
    })
        .catch((err) => res.status(500).json({ error: err }));
};
exports.default = {
    createLink,
    deleteLink,
    updateLink,
    getAllLinks,
};
