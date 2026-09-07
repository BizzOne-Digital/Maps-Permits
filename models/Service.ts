import mongoose, { Schema, models, model } from "mongoose";

export interface IServiceProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface IService {
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  icon: string;
  image?: string;
  gallery: string[];
  features: string[];
  process: IServiceProcessStep[];
  seoTitle?: string;
  seoDescription?: string;
  order: number;
  published: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const ServiceProcessStepSchema = new Schema<IServiceProcessStep>(
  {
    step: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { _id: false }
);

const ServiceSchema = new Schema<IService>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, default: "FileText" },
    image: { type: String },
    gallery: { type: [String], default: [] },
    features: { type: [String], default: [] },
    process: { type: [ServiceProcessStepSchema], default: [] },
    seoTitle: { type: String },
    seoDescription: { type: String },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Service =
  (models.Service as mongoose.Model<IService>) ||
  model<IService>("Service", ServiceSchema);

export default Service;
