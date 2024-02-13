import mongoose, { Document, Schema } from "mongoose";

export interface IStoralinker extends Document {
  email: string;
  username: string;
  password: string;
  dob: Date;
  createdAt: Date;
  enabled: boolean;

  // * avator info:
  avatorPath: string;
  avatorPathRemote: string;

  // * refresh token info:
  refreshToken?: string;
  refreshTokenExpiry?: Date;
}

const StoralinkerSchema: Schema = new Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  dob: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  enabled: { type: Boolean, default: true },
  avatorPath: { type: String, required: false },
  avatorPathRemote: { type: String, required: false },
  // * refresh token info:
  refreshToken: { type: String, required: false },
  refreshTokenExpiry: { type: Date, required: false },
});

export default mongoose.model<IStoralinker>(
  "Storalinker",
  StoralinkerSchema,
  "storalinker"
);
