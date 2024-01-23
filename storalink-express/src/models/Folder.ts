import mongoose, { Document, Schema } from "mongoose";

export interface IFolder extends Document {
  folderDescription: string;
  creatorId: string;
  folderName: string;
  imageUrl: string;
  linkIds: string[];
  parentFolderId: string;
  subFolderIds: string[];
  modifierId: string;
}

const FolderSchema: Schema = new Schema({
  folderDescription: { type: String, required: true },
  creatorId: { type: String, required: true, ref: "Storalinker" },
  folderName: { type: String, required: true },
  imageUrl: { type: String, required: false },
  linkIds: { type: [String], required: false },
  parentFolderId: { type: String, required: false },
  subFolderIds: { type: [String], required: false },
  modifierId: { type: String, required: false },
});

export default mongoose.model<IFolder>("Folder", FolderSchema, "folder");
