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
    folderDescription = "",
    folderName,
    imageUrl = "", // Default value if not provided
    linkIds = [], // Default value if not provided
    modifierId = "", // Default value if not provided
  } = req.body;

  // Since creatorId must match the current user's ID, we use currentUser.id directly
  const folder = new Folder({
    _id: new mongoose.Types.ObjectId(),
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
  const folderId = req.params.id;

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

const getAllFolders = (req: UserRequest, res: Response, next: NextFunction) => {
  // Assuming req.userId is a string that contains the user's ID
  const userId = req.userId; // Corrected from const { useId } = req.userId;

  console.log("get all folders for user, userId: ", userId);
  Folder.find({ creatorId: userId })
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

const deleteFolder = (req: Request, res: Response, next: NextFunction) => {
  const folderId = req.params.id;
  console.log("delete: folderId, ", folderId);
  Folder.findById(folderId)
    .exec()
    .then((folder) => {
      if (!folder) {
        res.status(404).json({ message: "Folder not found" });
        return; // Ensure we return undefined here
      }
      // Ensure deletion is awaited before proceeding
      return Folder.findByIdAndDelete(folderId).then(() => {
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

export default {
  createFolder,
  getFolder,
  updateFolder,
  deleteFolder,
  getAllFolders,
};
