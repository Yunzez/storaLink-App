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

const uploadImage = async (req: Request, res: Response) => {
  console.log("Uploading image...");
  const { checksum } = req.query;

  // Use the checksum in the key to ensure uniqueness based on content
  // const key = `images/${checksum}-${Date.now().toString()}`;
  const key = `images/${checksum}`;
  const command = new PutObjectCommand({
    Bucket: "storalink-image",
    Key: key,
    ContentType: "image/jpeg", // Assuming JPEG images
  });

  try {
    const url = await getSignedUrl(s3Client, command, { expiresIn: 360 }); // URL expires in 1 hour
    res.json({
      message: "Pre-signed URL generated successfully",
      url: url,
      filePath: `${key}`,
    });
  } catch (error) {
    console.error("Error generating pre-signed URL: ", error);
    res.status(500).send("Error generating pre-signed URL");
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
  uploadImage: [uploadImage],
  deleteImage,
  getImage,
};
