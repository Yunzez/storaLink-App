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
const mongoose_1 = __importDefault(require("mongoose"));
const Storalinker_1 = __importDefault(require("../models/Storalinker"));
const Folder_1 = __importDefault(require("../models/Folder"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const bcrypt_1 = __importDefault(require("bcrypt"));
const RefreshTokenGenerator_1 = __importDefault(require("../library/RefreshTokenGenerator"));
const Link_1 = __importDefault(require("../models/Link"));
// * part of auth route
const createStoralinker = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { email, username, password, dob } = req.body;
        const existingUser = yield Storalinker_1.default.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "Email already in use" });
        }
        if (!dob) {
            dob = new Date();
        }
        // Hash the password
        const saltRounds = 10; // You can adjust the number of salt rounds as needed
        const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
        // Generate initial refresh token
        const { refreshToken, expiryDate } = (0, RefreshTokenGenerator_1.default)(30);
        const storalinker = new Storalinker_1.default({
            _id: new mongoose_1.default.Types.ObjectId(),
            email,
            username,
            password: hashedPassword,
            dob,
            refreshToken: refreshToken,
            refreshTokenExpiry: expiryDate,
        });
        const savedStoralinker = yield storalinker.save();
        // info: Generate JWT token
        const accessToken = jsonwebtoken_1.default.sign({ userId: savedStoralinker.id }, config_1.config.auth.jwtSecret, { expiresIn: "1h" });
        // Return the new user and token, excluding the hashed password
        res.status(201).json({
            storalinker: {
                _id: savedStoralinker._id,
                email: savedStoralinker.email,
                username: savedStoralinker.username,
                dob: savedStoralinker.dob,
                refreshToken: savedStoralinker.refreshToken,
            },
            accessToken,
        });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
});
// * part of auth route
const loginStoralinker = (req, res, next) => {
    const { email, password } = req.body;
    console.log("email", email);
    Storalinker_1.default.findOne({ email })
        .exec()
        .then((storalinker) => __awaiter(void 0, void 0, void 0, function* () {
        if (!storalinker) {
            return res.status(401).json({ message: "Authentication failed" });
        }
        // Verify the password
        console.log("storalinker pw", storalinker.password, password);
        const match = yield bcrypt_1.default.compare(password, storalinker.password);
        if (!match) {
            return res.status(401).json({ message: "Authentication failed" });
        }
        console.log("pass check");
        // Generate new refresh token
        const { refreshToken, expiryDate } = (0, RefreshTokenGenerator_1.default)(30);
        // Update user with new refresh token and its expiry date
        storalinker.refreshToken = refreshToken;
        storalinker.refreshTokenExpiry = expiryDate;
        yield storalinker.save();
        // Generate JWT token
        const accessToken = jsonwebtoken_1.default.sign({ userId: storalinker.id }, config_1.config.auth.jwtSecret, { expiresIn: "1h" });
        console.log("storalinker", storalinker);
        res.status(200).json({ accessToken, storalinker });
    }))
        .catch((err) => res.status(404).json({ message: "Storalinker not found" }));
};
// * part of storalinker route
const updateStoralinker = (req, res, next) => {
    const { id } = req.params;
    console.log("id", id);
    return Storalinker_1.default.findById(id)
        .then((storalinker) => {
        if (!storalinker) {
            return res.status(404).json({ message: "Storalinker not found" });
        }
        storalinker.set(req.body);
        return storalinker
            .save()
            .then((updatedStoralinker) => res.status(200).json(updatedStoralinker));
    })
        .catch((err) => res.status(500).json({ error: err }));
};
// * part of storalinker route
const deleteStoralinker = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { password } = req.body;
    // Verify the password
    Storalinker_1.default.findOne({ creatorId: id })
        .exec()
        .then((storalinker) => __awaiter(void 0, void 0, void 0, function* () {
        if (!storalinker) {
            return res.status(401).json({ message: "Authentication failed" });
        }
        console.log("storalinker pw", storalinker.password, password);
        const match = yield bcrypt_1.default.compare(password, storalinker.password);
        if (!match) {
            return res.status(401).json({ message: "Authentication failed" });
        }
        // Delete all Folders and Links associated with the Storalinker
        yield Folder_1.default.deleteMany({ creatorId: id }).exec();
        try {
            // Delete all Folders and Links associated with the Storalinker
            yield Folder_1.default.deleteMany({ creatorId: id }).exec();
            yield Link_1.default.deleteMany({ creatorId: id }).exec();
            // After successfully deleting Folders and Links, delete the Storalinker
            yield Storalinker_1.default.findByIdAndDelete(id).exec();
            // If everything goes well, send a success response
            res.status(204).json({ message: "Storalinker deleted" });
        }
        catch (err) {
            // If there's an error in any of the deletion processes, send an error response
            res.status(500).json({ error: err });
        }
    }));
});
// * part of storalinker route
const readAll = (req, res, next) => {
    return Storalinker_1.default.find()
        .exec()
        .then((storalinkers) => res.status(200).json(storalinkers))
        .catch((err) => res.status(500).json({ error: err }));
};
exports.default = {
    createStoralinker,
    loginStoralinker,
    updateStoralinker,
    deleteStoralinker,
    readAll,
};
