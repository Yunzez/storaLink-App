import AWS from "aws-sdk";
import express, { Request, Response } from "express";
import multer from "multer";
import multerS3 from "multer-s3";

type S3Request = Request & { file: any };
// Configure AWS SDK
AWS.config.update({
  region: "your-region", // e.g., 'us-west-2'
  // Credentials are automatically loaded if you're using IAM roles
});

const s3 = new AWS.S3();

// Configure multer for S3
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "storalink-image",
    acl: "public-read", // Adjust based on your privacy needs
    key: function (request, file, cb) {
      cb(null, `images/${Date.now().toString()}-${file.originalname}`);
    },
  }),
});

// Function to upload an image
const uploadImage = () => {
  [
    upload.single("image"), // 'image' is the name of the file input field
    (req: S3Request, res: Response) => {
      if (req.file) {
        res.json({
          message: "Upload successful",
          fileUrl: req.file.location, // URL of the uploaded file
        });
      } else {
        res.status(400).send("File upload failed");
      }
    },
  ];
};

// Function to delete an image
const deleteImage = (req: S3Request, res: Response) => {
  const { key } = req.params; // Assuming the image key is passed as a URL parameter

  s3.deleteObject(
    {
      Bucket: "your-bucket-name",
      Key: key,
    },
    (err, data) => {
      if (err) {
        console.log(err, err.stack);
        res.status(500).send("Error deleting the image");
      } else {
        res.send({ message: "Image deleted successfully" });
      }
    }
  );
};

// Function to get an image (generate a pre-signed URL for private images)
const getImage = (req: S3Request, res: Response) => {
  const { key } = req.params; // Assuming the image key is passed as a URL parameter

  const url = s3.getSignedUrl("getObject", {
    Bucket: "your-bucket-name",
    Key: key,
    Expires: 60 * 5, // URL expires in 5 minutes
  });

  res.send({ imageUrl: url });
};

export default {
  uploadImage,
  deleteImage,
  getImage,
};
