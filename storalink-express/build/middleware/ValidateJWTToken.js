"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateJWTToken = void 0;
const config_1 = require("../config/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ValidateJWTToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null)
        return res.sendStatus(401); // No token
    jsonwebtoken_1.default.verify(token, config_1.config.auth.jwtSecret, (err, payload) => {
        if (err)
            return res.sendStatus(403).json({ message: "Invalid Token" }); // Invalid token
        req.userId = payload.userId;
        next();
    });
};
exports.ValidateJWTToken = ValidateJWTToken;
