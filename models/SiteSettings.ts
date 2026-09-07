import mongoose, { Schema, models, model } from "mongoose";

export interface ISiteSettings {
  businessName: string;
  phone: string;
  primaryEmail: string;
  secondaryEmail?: string;
  address?: string;
  serviceArea?: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  logo?: string;
  favicon?: string;
  footerText?: string;
  consultationButtonText?: string;
  consultationButtonLink?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const SiteSettingsSchema = new Schema<ISiteSettings>(
  {
    businessName: { type: String, default: "Maps & Permits" },
    phone: { type: String, default: "437-777-6887" },
    primaryEmail: { type: String, default: "maps.permit@gmail.com" },
    secondaryEmail: { type: String },
    address: { type: String, default: "Brampton, ON" },
    serviceArea: {
      type: String,
      default:
        "Brampton, Mississauga, Toronto, Vaughan, Markham, Richmond Hill, Caledon, Oakville, Milton, Burlington, Etobicoke, Scarborough",
    },
    facebook: { type: String, default: "https://facebook.com/maps.permits" },
    instagram: { type: String, default: "https://instagram.com/maps.permits" },
    linkedin: { type: String, default: "https://linkedin.com/company/maps.permits" },
    logo: { type: String },
    favicon: { type: String },
    footerText: {
      type: String,
      default: "Plans Approved. Projects Moving.",
    },
    consultationButtonText: { type: String, default: "Get a Free Consultation" },
    consultationButtonLink: { type: String, default: "/contact" },
  },
  { timestamps: true }
);

const SiteSettings =
  (models.SiteSettings as mongoose.Model<ISiteSettings>) ||
  model<ISiteSettings>("SiteSettings", SiteSettingsSchema);

export default SiteSettings;
