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

router.post(
  "/create",
  ValidateSchema(Schemas.link.create),
  LinkController.createLink
);

/**  POST /delete/:id
 * Deletes a specific Link instance from the database.
 *
 * URL parameters:
 * id: string            // The unique identifier of the Link to delete
 *
 * Success response:
 * Status: 200
 * {message: "Link deleted"}
 *
 * Error response:
 * Status: 500 Internal Server Error
 * {
 *   error: string        // Description of the error
 * }
 * Status: 404 Link not found
 * {
 *   error: string        // Description of the error
 * }
 */

router.post("/delete/:id", LinkController.deleteLink);

/**
 * PATCH /update/:id
 * Updates a specific Link instance in the database.
 *  Request body : (any part of the Link object):
 *
 */
router.patch("/update/:id", LinkController.updateLink);

/**
 * GET /getAll
 * Retrieves all Link instances from the database.
 *
 * Success response:
 * Status: 200 OK
 * { Link[] }
 *
 * Error response:
 * Status: 404 Not Found
 * {
 *   message: "Link not found"
 * }
 */
router.get("/getAll", LinkController.getAllLinks);

export default router;
