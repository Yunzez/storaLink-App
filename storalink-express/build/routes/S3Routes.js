"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const S3Controller_1 = __importDefault(require("../controllers/S3Controller"));
const router = express_1.default.Router();
// Route for uploading an image
router.get("/generate-presigned-url", S3Controller_1.default.uploadImage);
// Route for deleting an image
// Expects a URL like /delete/images/myImage.jpg
router.delete("/delete/:key", S3Controller_1.default.deleteImage);
// Route for getting a pre-signed URL to an image
// Expects a URL like /image/images/myImage.jpg
router.get("/image/:key", S3Controller_1.default.getImage);
exports.default = router;
