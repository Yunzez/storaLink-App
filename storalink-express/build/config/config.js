"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const NODE_ENV = process.env.NODE_ENV || "dev";
const JWT_SECRET = process.env.JWT_SECRET || "";
const MONGO_USERNAME = process.env.MONGO_USERNAME || "";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "";
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.jyvliuq.mongodb.net/storalink_db`; // Replace with your MongoDB URL
console.log(NODE_ENV);
exports.config = {
    mongo: {
        url: NODE_ENV === "dev" ? "mongodb://localhost:27017/storalink_db" : MONGO_URL,
    },
    server: {
        port: process.env.PORT || 3001,
    },
    auth: {
        jwtSecret: JWT_SECRET,
    },
};
