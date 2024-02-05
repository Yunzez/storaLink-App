"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const FolderController_1 = __importDefault(require("../controllers/FolderController"));
const ValidateSchema_1 = require("../middleware/ValidateSchema");
const ValidateSchema_2 = require("../middleware/ValidateSchema");
const ValidateUserOwnership_1 = __importDefault(require("../middleware/ValidateUserOwnership"));
const Folder_1 = __importDefault(require("../models/Folder"));
const router = express_1.default.Router();
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
router.post("/create", (0, ValidateSchema_1.ValidateSchema)(ValidateSchema_2.Schemas.folder.create), FolderController_1.default.createFolder);
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
router.patch("/update/:id", (0, ValidateSchema_1.ValidateSchema)(ValidateSchema_2.Schemas.folder.update), (0, ValidateUserOwnership_1.default)(Folder_1.default), FolderController_1.default.updateFolder);
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
router.post("/delete/:id", (0, ValidateUserOwnership_1.default)(Folder_1.default), FolderController_1.default.deleteFolder);
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
router.get("/get/:id", (0, ValidateUserOwnership_1.default)(Folder_1.default), FolderController_1.default.getFolder);
/**
 * GET /getAll
 * Retrieves all Folder instances from the database.
 *
 * Success response:
 * Status: 200 OK
 * { Folder[] }
 *
 * Error response:
 * Status: 500 Internal Server Error
 * {
 *   error: string        // Description of the error
 * }
 */
console.log("checking get all route");
router.get("/getAll", FolderController_1.default.getAllFolders);
exports.default = router;
