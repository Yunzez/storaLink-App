import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Folder from "../models/Folder";
import { UserRequest } from "../middleware/ValidateJWTToken";
const createFolder = (req: UserRequest, res: Response, next: NextFunction) => {
  const currentUserId = req.userId;
  if (!currentUserId) {
    return res.status(404).json({ message: "Unable to fetch user" });
  }

  const {
    folderDescription,
    folderName,
    creatorId,
    imageUrl = "", // Default value if not provided
    linkIds = [], // Default value if not provided
    parentFolderId = "", // Default value if not provided
    subFolderIds = [], // Default value if not provided
    modifierId = "", // Default value if not provided
  } = req.body;

  if (creatorId !== currentUserId) {
    console.log(
      "creatorId: ",
      creatorId,
      "currentUser.id: ",
      currentUserId.toString()
    );
    return res.status(401).json({ message: "Unauthorized" });
  }
  // Since creatorId must match the current user's ID, we use currentUser.id directly
  const folder = new Folder({
    _id: new mongoose.Types.ObjectId(),
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

const getFolder = (req: Request, res: Response, next: NextFunction) => {
  const { folderId, mongoId } = req.params;
  Folder.findById(folderId)
    .exec()
    .then((folder) => {
      if (!folder) {
        return res.status(404).json({ message: "Folder not found" });
      }

      if (folder.creatorId !== mongoId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      res.status(200).json(folder);
    })
    .catch((err) => res.status(500).json({ error: err }));
};

export default {
  createFolder,
  getFolder,
};
