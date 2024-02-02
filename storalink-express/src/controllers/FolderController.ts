import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Folder from "../models/Folder";
import { UserRequest } from "../middleware/ValidateJWTToken";
const createFolder = (req: UserRequest, res: Response, next: NextFunction) => {
  console.log("create new folder");
  const currentUserId = req.userId;
  if (!currentUserId) {
    return res.status(404).json({ message: "Unable to fetch user" });
  }

  const {
    folderDescription,
    folderName,
    imageUrl = "", // Default value if not provided
    linkIds = [], // Default value if not provided
    parentFolderId = "", // Default value if not provided
    subFolderIds = [], // Default value if not provided
    modifierId = "", // Default value if not provided
  } = req.body;

  // Since creatorId must match the current user's ID, we use currentUser.id directly
  const folder = new Folder({
    _id: new mongoose.Types.ObjectId(),
    folderDescription,
    currentUserId, // Use the ID from the JWT token
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

const getFolder = (req: Request, res: Response, next: NextFunction) => {
  const { folderId } = req.params;
  Folder.findById(folderId)
    .exec()
    .then((folder) => {
      if (!folder) {
        return res.status(404).json({ message: "Folder not found" });
      }

      res.status(200).json(folder);
    })
    .catch((err) => res.status(500).json({ error: err }));
};

const updateFolder = (req: Request, res: Response, next: NextFunction) => {
  const { folderId } = req.params;
  const { folderDescription, folderName, imageUrl } = req.body;
  Folder.findById(folderId)
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

const deleteFolder = (req: UserRequest, res: Response, next: NextFunction) => {
  const { folderId } = req.params;

  Folder.findById(folderId)
    .exec()
    .then((folder) => {
      if (!folder) {
        return res.status(404).json({ message: "Folder not found" });
      }
      if (folder.creatorId !== req.userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      Folder.findByIdAndDelete(folderId);
    })
    .then(() => res.status(204).json({ message: "Folder deleted" }))
    .catch((err) => res.status(500).json({ error: err }));
};

export default {
  createFolder,
  getFolder,
  updateFolder,
  deleteFolder,
};
