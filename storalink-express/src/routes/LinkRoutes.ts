import express from "express";
import FolderController from "../controllers/FolderController";
import { ValidateSchema } from "../middleware/ValidateSchema";
import { Schemas } from "../middleware/ValidateSchema";
import LinkController from "../controllers/LinkController";

const router = express.Router();

/**
 * POST /create
 * Create a folder under a certain user
 *
 * Request body (any of the following fields):
 * {
 *   linkDescription,
 *   linkName,
 *   creatorId,
 *   linkUrl,
 *   imageUrl = "", // Default value if not provided
 *   parentFolderId
 *   modifierId = "", // Default value if not provided
 * }
 *
 * Success response:
 * Status: 200 OK
 * { Link }
 *
 * Error response:
 * Status: 401 Unauthorized
 */

router.post("/create", LinkController.createLink);

export default router;
