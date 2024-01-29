import { Request, Response, NextFunction } from "express";
import { IFolder } from "../models/Folder";
import Folder from "../models/Folder";
import Link from "../models/Link";
import { Model } from "mongoose";
import { UserRequest } from "./ValidateJWTToken";

// * This middleware is used to validate if the user is the owner of the resource
const validateUserOwnership = (model: Model<any>) => {
  return (req: UserRequest, res: Response, next: NextFunction) => {
    const { id } = req.params; // Assuming the parameter name is 'id' for both Folder and Link
    const mongoUserId = req.userId;
    model
      .findById(id)
      .exec()
      .then((item) => {
        if (!item) {
          return res
            .status(404)
            .json({ message: `${model.modelName} not found` });
        }

        if (item.creatorId !== mongoUserId) {
          return res.status(401).json({ message: "Unauthorized" });
        }

        next();
      })
      .catch((err) => res.status(500).json({ error: err }));
  };
};

export default validateUserOwnership;
