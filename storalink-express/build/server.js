"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config/config");
const StoralinkerRoutes_1 = __importDefault(require("./routes/StoralinkerRoutes"));
const AuthRoutes_1 = __importDefault(require("./routes/AuthRoutes"));
const ValidateJWTToken_1 = require("./middleware/ValidateJWTToken");
const FolderRoutes_1 = __importDefault(require("./routes/FolderRoutes"));
const LinkRoutes_1 = __importDefault(require("./routes/LinkRoutes"));
const router = (0, express_1.default)();
const publicRouter = express_1.default.Router();
/** * connect to mongo */
mongoose_1.default
    .connect(config_1.config.mongo.url, { retryWrites: true, w: "majority" })
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
    router.use(express_1.default.urlencoded({ extended: true }));
    router.use(express_1.default.json());
    // * CORS and other rules
    router.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
        res.header("Access-Control-Allow-Credentials", "true");
        if (req.method === "OPTIONS") {
            res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH");
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
    router.use("/auth", AuthRoutes_1.default);
    // info: Add validateJWT middeleware, below are protected routes */
    router.use(ValidateJWTToken_1.ValidateJWTToken);
    // * Protected Routes */
    // info: storalinker routes: storalinker/...actual routes
    router.use("/storalinker", StoralinkerRoutes_1.default);
    router.use("/folder", FolderRoutes_1.default);
    router.use("/link", LinkRoutes_1.default);
    // * Error
    router.use((req, res, next) => {
        const error = new Error("Not Found");
        res.status(404).json({ message: error.message });
    });
    http_1.default.createServer(router).listen(config_1.config.server.port, () => {
        console.log(`Server is running on port ${config_1.config.server.port}`);
    });
};
