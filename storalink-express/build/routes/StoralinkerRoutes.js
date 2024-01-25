"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const StoralinkerController_1 = __importDefault(require("../controllers/StoralinkerController"));
const router = express_1.default.Router();
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
router.patch("/update/:id", StoralinkerController_1.default.updateStoralinker);
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
router.delete("/delete/:id", StoralinkerController_1.default.deleteStoralinker);
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
router.get("/readall", StoralinkerController_1.default.readAll);
exports.default = router;
