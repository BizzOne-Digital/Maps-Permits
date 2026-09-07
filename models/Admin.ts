import mongoose, { Schema, models, model } from "mongoose";

export interface IAdmin {
  name: string;
  email: string;
  passwordHash: string;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const AdminSchema = new Schema<IAdmin>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, default: "admin" },
  },
  { timestamps: true }
);

const Admin =
  (models.Admin as mongoose.Model<IAdmin>) || model<IAdmin>("Admin", AdminSchema);

export default Admin;
