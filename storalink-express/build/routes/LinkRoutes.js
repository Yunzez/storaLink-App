"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ValidateSchema_1 = require("../middleware/ValidateSchema");
const ValidateSchema_2 = require("../middleware/ValidateSchema");
const LinkController_1 = __importDefault(require("../controllers/LinkController"));
const router = express_1.default.Router();
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
router.post("/create", (0, ValidateSchema_1.ValidateSchema)(ValidateSchema_2.Schemas.link.create), LinkController_1.default.createLink);
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
router.post("/delete/:id", LinkController_1.default.deleteLink);
/**
 * PATCH /update/:id
 * Updates a specific Link instance in the database.
 *  Request body : (any part of the Link object):
 *
 */
router.patch("/update/:id", LinkController_1.default.updateLink);
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
router.get("/getAll", LinkController_1.default.getAllLinks);
exports.default = router;
