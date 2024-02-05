"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
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
router.post("/create", LinkController_1.default.createLink);
exports.default = router;
