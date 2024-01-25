"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
/**
 * Generates a refresh token and its expiration date.
 * @param {number} daysValid - The number of days the token should be valid.
 * @returns {object} An object containing the refresh token and its expiry date.
 */
const generateRefreshToken = (minutesValid) => {
    const refreshToken = crypto_1.default.randomBytes(64).toString("hex");
    const expiryDate = new Date();
    expiryDate.setMinutes(expiryDate.getMinutes() + minutesValid);
    return {
        refreshToken,
        expiryDate,
    };
};
exports.default = generateRefreshToken;
