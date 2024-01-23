import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Folder from "../models/Folder";

const createFolder = (req: Request, res: Response, next: NextFunction) => {
  let {
    folderDescription,
    creatorId,
    folderName,
    imageUrl,
    linkIds,
    parentFolderId,
    subFolderIds,
    modifierId,
  } = req.body;

  const folder = new Folder({
    _id: new mongoose.Types.ObjectId(),
    folderDescription,
    creatorId,
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
