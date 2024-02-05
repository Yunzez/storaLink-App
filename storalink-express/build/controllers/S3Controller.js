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
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const multer_1 = __importDefault(require("multer"));
const lib_storage_1 = require("@aws-sdk/lib-storage");
const fs_1 = __importDefault(require("fs"));
// Initialize S3 client
const s3Client = new client_s3_1.S3Client({ region: "us-west-1" });
// Configure multer for local storage
const upload = (0, multer_1.default)({ dest: "uploads/" });
// Upload image to S3
const uploadImage = upload.single("image"); // Middleware for local file upload
const handleImageUpload = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    if (!file) {
        return res.status(400).send("File upload failed");
    }
    const fileStream = fs_1.default.createReadStream(file.path);
    try {
        const uploadParams = {
            Bucket: "storalink-image",
            Key: `images/${Date.now().toString()}-${file.originalname}`,
            Body: fileStream,
            ACL: "public-read",
        };
        // Using high-level upload utility
        const parallelUploads3 = new lib_storage_1.Upload({
            client: s3Client,
            params: uploadParams,
        });
        yield parallelUploads3.done();
        res.json({
            message: "Upload successful",
            fileUrl: `https://${uploadParams.Bucket}.s3.amazonaws.com/${uploadParams.Key}`,
        });
    }
    catch (error) {
        console.error("Error uploading file: ", error);
        res.status(500).send("Error uploading file");
    }
    finally {
        // Clean up the uploaded file from the server
        fs_1.default.unlinkSync(file.path);
    }
});
// Delete image from S3
const deleteImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { key } = req.params;
    try {
        yield s3Client.send(new client_s3_1.DeleteObjectCommand({
            Bucket: "storalink-image",
            Key: key,
        }));
        res.send({ message: "Image deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting the image: ", error);
        res.status(500).send("Error deleting the image");
    }
});
// Get image (generate a pre-signed URL)
const getImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { key } = req.params;
    try {
        const url = yield (0, s3_request_presigner_1.getSignedUrl)(s3Client, new client_s3_1.GetObjectCommand({
            Bucket: "storalink-image",
            Key: key,
        }), { expiresIn: 300 }); // URL expires in 5 minutes
        res.send({ imageUrl: url });
    }
    catch (error) {
        console.error("Error generating URL: ", error);
        res.status(500).send("Error generating image URL");
    }
});
exports.default = {
    uploadImage: [uploadImage, handleImageUpload],
    deleteImage,
    getImage,
};
