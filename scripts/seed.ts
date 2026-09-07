import "dotenv/config";
import mongoose from "mongoose";
import Service from "../models/Service";
import Testimonial from "../models/Testimonial";
import SiteSettings from "../models/SiteSettings";
import { FALLBACK_SERVICES, FALLBACK_TESTIMONIALS } from "../lib/constants";

async function main() {
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    console.error("MONGODB_URI is not set in the environment.");
    process.exit(1);
  }

  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB.");

  const serviceCount = await Service.countDocuments();
  if (serviceCount === 0) {
    await Service.insertMany(
      FALLBACK_SERVICES.map((s, idx) => ({
        title: s.title,
        slug: s.slug,
        shortDescription: s.shortDescription,
        description: s.description,
        icon: s.icon,
        image: s.image,
        gallery: [],
        features: s.features,
        process: s.process,
        order: idx,
        published: true,
      }))
    );
    console.log(`Seeded ${FALLBACK_SERVICES.length} services.`);
  } else {
    console.log("Services already exist. Skipping.");
  }

  const testimonialCount = await Testimonial.countDocuments();
  if (testimonialCount === 0) {
    await Testimonial.insertMany(
      FALLBACK_TESTIMONIALS.map((t) => ({ ...t, published: true }))
    );
    console.log(`Seeded ${FALLBACK_TESTIMONIALS.length} testimonials.`);
  } else {
    console.log("Testimonials already exist. Skipping.");
  }

  const settingsCount = await SiteSettings.countDocuments();
  if (settingsCount === 0) {
    await SiteSettings.create({});
    console.log("Seeded default site settings.");
  } else {
    console.log("Site settings already exist. Skipping.");
  }

  await mongoose.disconnect();
  process.exit(0);
}

main().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
