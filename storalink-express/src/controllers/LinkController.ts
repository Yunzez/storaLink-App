import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Link from "../models/Link";
import { UserRequest } from "../middleware/ValidateJWTToken";
import Folder from "../models/Folder";

const createLink = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const currentUserId = req.userId;
  if (!currentUserId) {
    return res.status(404).json({ message: "Unable to fetch user" });
  }

  const {
    linkDescription,
    linkName,
    linkUrl,
    imageUrl = "", // Default value if not provided
    iconUrl = "", // Default value if not provided
    parentFolderId, // Assume this is provided and valid
    modifierId = "", // Default value if not provided
  } = req.body;

  console.log("create new link to folder: ", parentFolderId);

  try {
    const folder = await Folder.findById(parentFolderId).exec();
    if (!folder) {
      return res.status(404).json({ message: "ParentFolder not found" });
    }

    const link = new Link({
      _id: new mongoose.Types.ObjectId(),
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
    await folder.save(); // Wait for the folder to be updated

    // Now save the link
    const savedLink = await link.save();
    res.status(201).json(savedLink);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const deleteLink = async (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const linkId = req.params.id;

  try {
    const link = await Link.findById(linkId).exec();
    if (!link) {
      return res.status(404).json({ message: "Link not found" });
    }

    const parentFolderId = link.parentFolderId;
    if (parentFolderId) {
      const folder = await Folder.findById(parentFolderId).exec();
      if (folder) {
        // Remove the linkId from the folder's linkIds array
        folder.linkIds = folder.linkIds.filter(
          (id) => id.toString() !== linkId
        );
        await folder.save(); // Wait for the folder update to complete
        console.log("deleted link from folder: ", parentFolderId);
      } else {
        console.log("ParentFolder not found or already deleted.");
      }
    }

    // Proceed to delete the link after updating the folder
    await Link.findByIdAndDelete(linkId).exec();
    res.status(200).json({ message: "Link deleted" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const updateLink = (req: UserRequest, res: Response, next: NextFunction) => {
  const { linkId } = req.params;
  const { linkDescription, linkName, linkUrl, imageUrl } = req.body;
  Link.findById(linkId)
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

export default {
  createLink,
  deleteLink,
  updateLink,
};
