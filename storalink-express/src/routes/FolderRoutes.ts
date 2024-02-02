import express from "express";
import FolderController from "../controllers/FolderController";
import { ValidateSchema } from "../middleware/ValidateSchema";
import { Schemas } from "../middleware/ValidateSchema";
import { ValidateJWTToken } from "../middleware/ValidateJWTToken";
import validateUserOwnership from "../middleware/ValidateUserOwnership";
import Folder from "../models/Folder";
const router = express.Router();

/**
 * POST /create
 * Create a folder under a certain user
 *
 * Request body (any of the following fields):
 * {
 *   "folderDescription": string,
 *   "folderName": string,
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

/**
 * PATCH /update/:folderId
 * Updates a specific Folder instance in the database.
 *
 * URL parameters:
 * folderId: string            // The unique identifier of the Folder to update
 *
 * Request body (any of the following fields):
 * {
 *   folderDescription?: string,
 *   folderName?: string,
 *   imageUrl?: string
 * }
 *
 * Success response:
 * Status: 200 OK
 * { Folder }
 *
 * Error response:
 * Status: 404 Not Found
 * {
 *   message: "Folder not found"
 * }
 */

router.patch(
  "/update/:id",
  ValidateSchema(Schemas.folder.update),
  validateUserOwnership(Folder),
  FolderController.updateFolder
);

/**
 * DELETE /delete/:folderId
 * Deletes a specific Folder instance from the database.
 *
 * URL parameters:
 * folderId: string            // ! The unique identifier of the Folder to delete
 *
 * Request body:
 * {
 *   creatorId: string            // ! The unique identifier of the user who created the folder
 * }
 *
 * Success response:
 * Status: 204
 * {message: "Folder deleted"}
 *
 * Error response:
 * Status: 404 Not Found
 * {
 *   message: "Folder not found"
 * }
 */
router.post(
  "/delete/:id",
  validateUserOwnership(Folder),
  FolderController.deleteFolder
);

/**
 * GET /get/:folderId
 * Retrieves a specific Folder instance from the database by its ID.
 *
 * URL parameters:
 * folderId: string            // The unique identifier of the Folder to retrieve
 *
 * Success response:
 * Status: 200 OK
 * {Folder}
 *
 * Request body:
 * {
 *   creatorId: string            // ! The unique identifier of the user who created the folder
 * }
 *
 * Error response:
 * Status: 404 Not Found
 *
 * {
 *   message: "Folder not found"
 * }
 */
router.get(
  "/get/:id",
  validateUserOwnership(Folder),
  FolderController.getFolder
);

export default router;
