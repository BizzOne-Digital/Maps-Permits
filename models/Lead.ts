import mongoose, { Schema, models, model } from "mongoose";
import { LEAD_STATUSES, LeadStatus } from "@/lib/constants";

export { LEAD_STATUSES };
export type { LeadStatus };

export interface ILead {
  name: string;
  email: string;
  phone?: string;
  postalCode?: string;
  projectType?: string;
  municipality?: string;
  propertyAddress?: string;
  message?: string;
  status: LeadStatus;
  source?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const LeadSchema = new Schema<ILead>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    postalCode: { type: String },
    projectType: { type: String },
    municipality: { type: String },
    propertyAddress: { type: String },
    message: { type: String },
    status: {
      type: String,
      enum: LEAD_STATUSES,
      default: "new",
    },
    source: { type: String, default: "website" },
  },
  { timestamps: true }
);

const Lead =
  (models.Lead as mongoose.Model<ILead>) || model<ILead>("Lead", LeadSchema);

export default Lead;
