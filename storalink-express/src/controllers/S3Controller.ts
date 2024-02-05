import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
  ObjectCannedACL,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import express, { Request, Response } from "express";
import multer from "multer";
import { Upload } from "@aws-sdk/lib-storage";
import fs from "fs";
import path from "path";
import { config } from "../config/config";

// Initialize S3 client
const s3Client = new S3Client({
  region: "us-east-2",
  credentials: {
    accessKeyId: config.aws.accessKeyId,
    secretAccessKey: config.aws.secretAccessKey,
  },
});

// Configure multer for local storage
const upload = multer({ dest: "uploads/" });

// Upload image to S3
const uploadImage = upload.single("image"); // Middleware for local file upload

const handleImageUpload = async (req: Request, res: Response) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send("File upload failed");
  }

  const fileStream = fs.createReadStream(file.path);

  try {
    const uploadParams = {
      Bucket: "storalink-image",
      Key: `images/${Date.now().toString()}-${file.originalname}`,
      Body: fileStream,
      // ACL: "public-read" as ObjectCannedACL,
    };

    // Using high-level upload utility
    const parallelUploads3 = new Upload({
      client: s3Client,
      params: uploadParams,
    });
    console.log("uploading image");
    await parallelUploads3.done();

    res.json({
      message: "Upload successful",
      fileUrl: `https://${uploadParams.Bucket}.s3.amazonaws.com/${uploadParams.Key}`,
    });
  } catch (error) {
    console.error("Error uploading file: ", error);
    res.status(500).send("Error uploading file");
  } finally {
    // Clean up the uploaded file from the server
    fs.unlinkSync(file.path);
  }
};

// Delete image from S3
const deleteImage = async (req: Request, res: Response) => {
  const { key } = req.params;

  try {
    await s3Client.send(
      new DeleteObjectCommand({
        Bucket: "storalink-image",
        Key: key,
      })
    );

    res.send({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("Error deleting the image: ", error);
    res.status(500).send("Error deleting the image");
  }
};

// Get image (generate a pre-signed URL)
const getImage = async (req: Request, res: Response) => {
  const { key } = req.params;

  try {
    const url = await getSignedUrl(
      s3Client,
      new GetObjectCommand({
        Bucket: "storalink-image",
        Key: key,
      }),
      { expiresIn: 300 }
    ); // URL expires in 5 minutes

    res.send({ imageUrl: url });
  } catch (error) {
    console.error("Error generating URL: ", error);
    res.status(500).send("Error generating image URL");
  }
};

export default {
  uploadImage: [uploadImage, handleImageUpload],
  deleteImage,
  getImage,
};
