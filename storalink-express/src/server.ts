import express from "express";
import http from "http";
import mongoose, { connect } from "mongoose";
import { config } from "./config/config";
import StoralinkerRoutes from "./routes/StoralinkerRoutes";
import AuthRoutes from "./routes/AuthRoutes";
import { ValidateJWTToken } from "./middleware/ValidateJWTToken";
import FolderRoutes from "./routes/FolderRoutes";
import LinkRoutes from "./routes/LinkRoutes";
import S3Rountes from "./routes/S3Routes";
const router = express();
const publicRouter = express.Router();
/** * connect to mongo */
mongoose
  .connect(config.mongo.url, { retryWrites: true, w: "majority" })
  .then(() => {
    console.log("Connected to MongoDB");
    StartServer();
  })
  .catch((err) => {
    console.log(err);
  });

/** * start server */
const StartServer = () => {
  router.use((req, res, next) => {
    console.log("----------");
    console.log("Time:", Date.now());
    console.log("Request Type:", req.method);
    console.log("Request URL:", req.originalUrl);
    console.log("IP Address:", req.ip);
    console.log("----------");

    res.on("finish", () => {
      console.log("----------");
      console.log("Time:", Date.now());
      console.log("Request Type:", req.method);
      console.log("Request URL:", req.originalUrl);
      console.log("IP Address:", req.ip);
      console.log("Status Code:", res.statusCode);
      console.log("----------");
    });

    next();
  });

  router.use(express.urlencoded({ extended: true }));
  router.use(express.json());

  // * CORS and other rules
  router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials"
    );
    res.header("Access-Control-Allow-Credentials", "true");

    if (req.method === "OPTIONS") {
      res.header(
        "Access-Control-Allow-Methods",
        "PUT, POST, GET, DELETE, PATCH"
      );
      return res.status(200).json({});
    }

    next();
  });

  // * test call
  router.get("/ping", (req, res, next) => {
    res.status(200).json({ message: "connected" });
  });

  router.get("/", (req, res, next) => {
    res.status(200).json({ message: "connected" });
  });

  // * Public Routes */
  router.use("/auth", AuthRoutes);

  // info: Add validateJWT middeleware, below are protected routes */
  router.use(ValidateJWTToken);

  // * Protected Routes */
  // info: storalinker routes: storalinker/...actual routes
  router.use("/storalinker", StoralinkerRoutes);

  router.use("/folder", FolderRoutes);

  router.use("/link", LinkRoutes);

  router.use("/s3", S3Rountes);

  // * Error
  router.use((req, res, next) => {
    const error = new Error("Not Found");
    res.status(404).json({ message: error.message });
  });

  http.createServer(router).listen(config.server.port, () => {
    console.log(`Server is running on port ${config.server.port}`);
  });
};
