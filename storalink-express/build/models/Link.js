"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const LinkSchema = new mongoose_1.Schema({
    creatorId: { type: String, required: true, ref: "Storalinker" },
    createdAt: { type: Date, default: Date.now, required: true },
    parentFolderId: { type: String, required: true },
    modifiedAt: { type: Date, default: Date.now, required: true },
    linkName: { type: String, required: true },
    description: { type: String, default: "" },
    linkUrl: { type: String, required: true },
    imageUrl: { type: String, required: true },
    iconUrl: { type: String },
    sourceType: { type: String, default: "Unknown" },
    collaboratorIds: { type: [String], required: false },
});
exports.default = mongoose_1.default.model("Link", LinkSchema, "link");
