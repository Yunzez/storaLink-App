import express from "express";
import StoralinkerController from "../controllers/StoralinkerController";
import RefreshTokenController from "../controllers/RefreshTokenController";
import { ValidateSchema } from "../middleware/ValidateSchema";
import { Schemas } from "../middleware/ValidateSchema";

const router = express.Router();

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
router.post(
  "/signup",
  ValidateSchema(Schemas.storalinker.create),
  StoralinkerController.createStoralinker
);

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
router.post("/login", StoralinkerController.loginStoralinker);

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
router.post("/refresh", RefreshTokenController.validateRefreshToken);

export default router;
