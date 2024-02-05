import dotenv from "dotenv";

dotenv.config();
const NODE_ENV = process.env.NODE_ENV || "dev";
const JWT_SECRET = process.env.JWT_SECRET || "";
const MONGO_USERNAME = process.env.MONGO_USERNAME || "";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "";
const MONGO_URL: string = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.jyvliuq.mongodb.net/storalink_db`; // Replace with your MongoDB URL
console.log(NODE_ENV);
const AWS_ACCESS_ID = process.env.AWS_ACCESS_KEY || " ";
const AWS_SECRET_KEY = process.env.AWS_ACCESS_SECRET || "";
console.log(NODE_ENV);
export const config = {
  mongo: {
    url:
      NODE_ENV === "dev" ? "mongodb://localhost:27017/storalink_db" : MONGO_URL,
  },
  server: {
    port: process.env.PORT || 3001,
  },
  auth: {
    jwtSecret: JWT_SECRET,
  },
  aws: {
    accessKeyId: AWS_ACCESS_ID,
    secretAccessKey: AWS_SECRET_KEY,
  },
};
