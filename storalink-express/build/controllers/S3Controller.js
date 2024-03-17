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
Object.defineProperty(exports, "__esModule", { value: true });
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const config_1 = require("../config/config");
// Initialize S3 client
const s3Client = new client_s3_1.S3Client({
    region: "us-east-2",
    credentials: {
        accessKeyId: config_1.config.aws.accessKeyId,
        secretAccessKey: config_1.config.aws.secretAccessKey,
    },
});
const uploadImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Uploading image...");
    const { checksum } = req.query;
    // Use the checksum in the key to ensure uniqueness based on content
    // const key = `images/${checksum}-${Date.now().toString()}`;
    const key = `images/${checksum}`;
    const command = new client_s3_1.PutObjectCommand({
        Bucket: "storalink-image",
        Key: key,
        ContentType: "image/jpeg", // Assuming JPEG images
    });
    try {
        const url = yield (0, s3_request_presigner_1.getSignedUrl)(s3Client, command, { expiresIn: 360 }); // URL expires in 1 hour
        res.json({
            message: "Pre-signed URL generated successfully",
            url: url,
            filePath: `${key}`,
        });
    }
    catch (error) {
        console.error("Error generating pre-signed URL: ", error);
        res.status(500).send("Error generating pre-signed URL");
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
    uploadImage: [uploadImage],
    deleteImage,
    getImage,
};
