import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "";
const MONGO_USERNAME = process.env.MONGO_USERNAME || "";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "";
const MONGO_URL: string = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.jyvliuq.mongodb.net/storalink_db`; // Replace with your MongoDB URL

export const config = {
  mongo: {
    url: MONGO_URL,
  },
  server: {
    port: process.env.SERVER_PORT || 3333,
  },
  auth: {
    jwtSecret: JWT_SECRET,
  },
};
