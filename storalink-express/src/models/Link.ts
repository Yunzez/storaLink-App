import mongoose, { Document, Schema } from "mongoose";

export interface ILink extends Document {
  creatorId: string;
  createdAt: Date;
  modifiedAt: Date;
  linkName: string;
  description: string;
  linkUrl: string;
  imageUrl: string;
  sourceType: string;
  parentFolderId: string;
  collaboratorIds: string[];
}

const LinkSchema: Schema = new Schema({
  creatorId: { type: String, required: true, ref: "Storalinker" },
  createdAt: { type: Date, default: Date.now, required: true },
  parentFolderId: { type: String, required: true },
  modifiedAt: { type: Date, default: Date.now, required: true },
  linkName: { type: String, required: true },
  description: { type: String, default: "" },
  linkUrl: { type: String, required: true },
  imageUrl: { type: String, required: true },
  sourceType: { type: String, default: "Unknown" },
  collaboratorIds: { type: [String], required: false },
});

export default mongoose.model<ILink>("Link", LinkSchema, "link");
