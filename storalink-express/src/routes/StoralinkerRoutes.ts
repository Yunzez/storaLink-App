import express from "express";
import StoralinkerController from "../controllers/StoralinkerController";
import { ValidateSchema } from "../middleware/ValidateSchema";
import { Schemas } from "../middleware/ValidateSchema";

const router = express.Router();

/**
 * PATCH /update/:id
 * Updates a specific Storalinker instance in the database.
 *
 * URL parameters:
 * id: string            // The unique identifier of the Storalinker to update
 *
 * Request body (any of the following fields):
 * {
 *   email?: string,
 *   username?: string,
 *   password?: string,
 *   dob?: Date
 * }
 *
 * Success response:
 * Status: 200 OK
 * { Storalinker }
 *
 * Error response:
 * Status: 404 Not Found
 * {
 *   message: "Storalinker not found"
 * }
 */
router.patch("/update/:id", StoralinkerController.updateStoralinker);

/**
 * DELETE /delete/:id
 * Deletes a specific Storalinker instance from the database.
 *
 * URL parameters:
 * id: string            // The unique identifier of the Storalinker to delete
 *
 * Success response:
 * Status: 204
 * {message: "Storalinker deleted"}
 *
 * Error response:
 * Status: 500 Internal Server Error
 * {
 *   error: string        // Description of the error
 * }
 */
router.delete("/delete/:id", StoralinkerController.deleteStoralinker);

/**
 * GET /readall
 * Retrieves all Storalinker instances from the database.
 *
 * Success response:
 * Status: 200 OK
 * { Storalinker[] }
 *
 * Error response:
 * Status: 500 Internal Server Error
 * {
 *   error: string        // Description of the error
 * }
 */
router.get("/readall", StoralinkerController.readAll);

export default router;
