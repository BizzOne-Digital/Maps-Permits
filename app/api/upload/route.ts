import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import StoredUpload, { UPLOAD_FOLDERS, UploadFolder } from "@/models/StoredUpload";
import { requireAdmin } from "@/lib/auth";

export const runtime = "nodejs";

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_SIZE_BYTES = 8 * 1024 * 1024; // 8MB

function sanitizeFilename(name: string): string | null {
  if (!name) return null;
  if (name.includes("..") || name.includes("/") || name.includes("\\")) {
    return null;
  }
  return name.replace(/[^a-zA-Z0-9._-]/g, "_");
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const folder = String(formData.get("folder") || "");
    const file = formData.get("file");

    if (!UPLOAD_FOLDERS.includes(folder as UploadFolder)) {
      return NextResponse.json({ error: "Invalid folder" }, { status: 400 });
    }

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json({ error: "Unsupported file type" }, { status: 400 });
    }

    if (file.size > MAX_SIZE_BYTES) {
      return NextResponse.json({ error: "File too large (max 8MB)" }, { status: 400 });
    }

    const originalName = sanitizeFilename(file.name);
    if (!originalName) {
      return NextResponse.json({ error: "Invalid filename" }, { status: 400 });
    }

    await connectToDatabase();

    const ext = originalName.includes(".")
      ? originalName.slice(originalName.lastIndexOf("."))
      : "";
    const base = originalName.includes(".")
      ? originalName.slice(0, originalName.lastIndexOf("."))
      : originalName;
    const uniqueFilename = `${base}-${Date.now()}${ext}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    await StoredUpload.create({
      folder: folder as UploadFolder,
      filename: uniqueFilename,
      mimeType: file.type,
      size: file.size,
      data: buffer,
    });

    return NextResponse.json({
      url: `/api/uploads/${folder}/${uniqueFilename}`,
    });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
