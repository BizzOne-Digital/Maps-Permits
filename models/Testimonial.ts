import mongoose, { Schema, models, model } from "mongoose";

export interface ITestimonial {
  name: string;
  location: string;
  projectType: string;
  rating: number;
  quote: string;
  image?: string;
  published: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    projectType: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    quote: { type: String, required: true },
    image: { type: String },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Testimonial =
  (models.Testimonial as mongoose.Model<ITestimonial>) ||
  model<ITestimonial>("Testimonial", TestimonialSchema);

export default Testimonial;
