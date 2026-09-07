import mongoose, { Schema, models, model } from "mongoose";
import { UPLOAD_FOLDERS, UploadFolder } from "@/lib/constants";

export { UPLOAD_FOLDERS };
export type { UploadFolder };

export interface IStoredUpload {
  folder: UploadFolder;
  filename: string;
  mimeType: string;
  size: number;
  data: Buffer;
  createdAt?: Date;
  updatedAt?: Date;
}

const StoredUploadSchema = new Schema<IStoredUpload>(
  {
    folder: {
      type: String,
      enum: UPLOAD_FOLDERS,
      required: true,
    },
    filename: { type: String, required: true },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true },
    data: { type: Buffer, required: true },
  },
  { timestamps: true }
);

StoredUploadSchema.index({ folder: 1, filename: 1 }, { unique: true });

const StoredUpload =
  (models.StoredUpload as mongoose.Model<IStoredUpload>) ||
  model<IStoredUpload>("StoredUpload", StoredUploadSchema);

export default StoredUpload;
