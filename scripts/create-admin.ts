import "dotenv/config";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import Admin from "../models/Admin";

async function main() {
  const MONGODB_URI = process.env.MONGODB_URI;
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

  if (!MONGODB_URI) {
    console.error("MONGODB_URI is not set in the environment.");
    process.exit(1);
  }
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.error("ADMIN_EMAIL and ADMIN_PASSWORD must be set in the environment.");
    process.exit(1);
  }

  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB.");

  const existing = await Admin.findOne({ email: ADMIN_EMAIL.toLowerCase().trim() });
  if (existing) {
    console.log(`Admin with email ${ADMIN_EMAIL} already exists. Skipping creation.`);
    await mongoose.disconnect();
    process.exit(0);
  }

  const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10);

  await Admin.create({
    name: "Admin",
    email: ADMIN_EMAIL.toLowerCase().trim(),
    passwordHash,
    role: "admin",
  });

  console.log(`Admin account created for ${ADMIN_EMAIL}.`);
  await mongoose.disconnect();
  process.exit(0);
}

main().catch((err) => {
  console.error("Failed to create admin:", err);
  process.exit(1);
});
