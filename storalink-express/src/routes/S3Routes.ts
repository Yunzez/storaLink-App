import express from "express";
import S3Controller from "../controllers/S3Controller";
const router = express.Router();

// Route for uploading an image
router.get("/generate-presigned-url", S3Controller.uploadImage);

// Route for deleting an image
// Expects a URL like /delete/images/myImage.jpg
router.delete("/delete/:key", S3Controller.deleteImage);

// Route for getting a pre-signed URL to an image
// Expects a URL like /image/images/myImage.jpg
router.get("/image/:key", S3Controller.getImage);

export default router;
