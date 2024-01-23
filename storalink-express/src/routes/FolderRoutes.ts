import express from "express";
import FolderController from "../controllers/FolderController";
import { ValidateSchema } from "../middleware/ValidateSchema";
import { Schemas } from "../middleware/ValidateSchema";
import { ValidateJWTToken } from "../middleware/ValidateJWTToken";
const router = express.Router();

/**
 * POST /create
 * Create a folder under a certain user
 *
 * Request body (any of the following fields):
 * {
 *   "folderDescription": string,
 *   "folderName": string,
 *   "creatorId" : string
 * }
 *
 * Success response:
 * Status: 200 OK
 * { Folder }
 *
 * Error response:
 * Status: 401 Unauthorized
 */
router.post(
  "/create",
  ValidateSchema(Schemas.folder.create),
  FolderController.createFolder
);

export default router;
