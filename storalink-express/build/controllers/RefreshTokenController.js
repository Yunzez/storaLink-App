"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const Storalinker_1 = __importDefault(require("../models/Storalinker"));
const RefreshTokenGenerator_1 = __importDefault(require("../library/RefreshTokenGenerator"));
const validateRefreshToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken, email } = req.body;
    const userRefreshToken = refreshToken;
    console.log(userRefreshToken, email);
    if (!refreshToken || !email) {
        return res.status(400).json({ message: "Invalid request" });
    }
    try {
        const user = yield Storalinker_1.default.findOne({
            email: email,
            refreshToken: userRefreshToken,
        });
        if (!user || !user.refreshTokenExpiry) {
            return res.status(403).json({ message: "Invalid refresh token" });
        }
        // Verify if the refresh token is expired
        if (user.refreshTokenExpiry < new Date()) {
            return res.status(403).json({ message: "Refresh token expired" });
        }
        const { refreshToken, expiryDate } = (0, RefreshTokenGenerator_1.default)(1);
        console.log(new Date(), expiryDate);
        // If valid, issue a new access token
        const newAccessToken = jsonwebtoken_1.default.sign({ userId: user._id }, config_1.config.auth.jwtSecret, { expiresIn: "1h" });
        res.json({ accessToken: newAccessToken, refreshToken: refreshToken });
    }
    catch (err) {
        res.status(404).json({ message: "cannot find user" });
    }
});
exports.default = {
    validateRefreshToken,
};
