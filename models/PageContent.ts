import mongoose, { Schema, models, model } from "mongoose";

export interface IPageContent {
  slug: string;
  title: string;
  sections: Record<string, unknown>;
  seo: {
    title?: string;
    description?: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

const PageContentSchema = new Schema<IPageContent>(
  {
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    title: { type: String, required: true },
    sections: { type: Schema.Types.Mixed, default: {} },
    seo: {
      title: { type: String },
      description: { type: String },
    },
  },
  { timestamps: true }
);

const PageContent =
  (models.PageContent as mongoose.Model<IPageContent>) ||
  model<IPageContent>("PageContent", PageContentSchema);

export default PageContent;
