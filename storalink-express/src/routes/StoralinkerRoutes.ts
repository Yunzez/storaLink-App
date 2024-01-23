import express from "express";
import StoralinkerController from "../controllers/StoralinkerController";

const router = express.Router();

/**
 * POST /storalinker
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
router.post("/create", StoralinkerController.createStoralinker);

/**
 * GET /read/:id
 * Retrieves a specific Storalinker instance from the database by its ID.
 *
 * URL parameters:
 * id: string            // The unique identifier of the Storalinker to retrieve
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
router.get("/read/:id", StoralinkerController.readStoralinker);

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
