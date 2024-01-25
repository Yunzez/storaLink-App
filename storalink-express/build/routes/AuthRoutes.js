"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const StoralinkerController_1 = __importDefault(require("../controllers/StoralinkerController"));
const RefreshTokenController_1 = __importDefault(require("../controllers/RefreshTokenController"));
const ValidateSchema_1 = require("../middleware/ValidateSchema");
const ValidateSchema_2 = require("../middleware/ValidateSchema");
const router = express_1.default.Router();
/**
 * POST /signup
 * Creates a new Storalinker instance and saves it to the database.
 *
 * Request body:
 * {
 *   email: string,       // Email of the Storalinker
 *   username: string,    // Username for the Storalinker
 *   password: string,    // Password for the Storalinker account
 *   dob: Date            // Date of birth of the Storalinker
 * }
 *
 * Success response:
 * Status: 201 Created
 * Error response:
 * Status: 500 Internal Server Error
 * {
 *   error: string        // Description of the error
 * }
 */
router.post("/signup", (0, ValidateSchema_1.ValidateSchema)(ValidateSchema_2.Schemas.storalinker.create), StoralinkerController_1.default.createStoralinker);
/**
 * GET /login
 * Retrieves a specific Storalinker instance from the database by its ID.
 *
 * Request body:
 * {
 *   email: string,       // Email of the Storalinker
 *   password: string,    // Username for the Storalinker
 * }
 *
 * Success response:
 * Status: 200 OK
 * {Storalinker}
 *
 * Error response:
 * Status: 404 Not Found
 * {
 *   message: "Storalinker not found"
 * }
 */
router.post("/login", StoralinkerController_1.default.loginStoralinker);
/**
 * GET /refresh
 * Retrieves a new access token from the refresh token.
 *
 * Request body:
 * {
 *   userId: string,       // Email of the Storalinker
 *   refreshToken: string,    // Username for the Storalinker
 * }
 *
 * Success response:
 * Status: 200 OK
 * {jwtToken: string}
 *
 * Error response:
 * Status: 403 Unauthenticaed
 * Status: 404 Not Found
 */
router.post("/refresh", RefreshTokenController_1.default.validateRefreshToken);
exports.default = router;
