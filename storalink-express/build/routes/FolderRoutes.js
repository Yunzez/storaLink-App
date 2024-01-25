"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const FolderController_1 = __importDefault(require("../controllers/FolderController"));
const ValidateSchema_1 = require("../middleware/ValidateSchema");
const ValidateSchema_2 = require("../middleware/ValidateSchema");
const router = express_1.default.Router();
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
router.post("/create", (0, ValidateSchema_1.ValidateSchema)(ValidateSchema_2.Schemas.folder.create), FolderController_1.default.createFolder);
exports.default = router;
