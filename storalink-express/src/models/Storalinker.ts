import mongoose, { Document, Schema } from "mongoose";

export interface IStoralinker extends Document {
  email: string;
  username: string;
  password: string;
  dob: Date;
  createdAt: Date;
  enabled: boolean;
  // If you need to include authorities and _class, add them here
}

const StoralinkerSchema: Schema = new Schema({
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  dob: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  enabled: { type: Boolean, default: true },
  // Include other fields if necessary
});

export default mongoose.model<IStoralinker>(
  "Storalinker",
  StoralinkerSchema,
  "storalinker"
);
