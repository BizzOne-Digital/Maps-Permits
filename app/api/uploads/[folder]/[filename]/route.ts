import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import StoredUpload, { UPLOAD_FOLDERS, UploadFolder } from "@/models/StoredUpload";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function sanitize(part: string): string {
  return part.replace(/[^a-zA-Z0-9._-]/g, "");
}

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ folder: string; filename: string }> }
) {
  const { folder, filename } = await context.params;
  const safeFolder = sanitize(folder);
  const safeFilename = sanitize(filename);

  if (!UPLOAD_FOLDERS.includes(safeFolder as UploadFolder) || !safeFilename) {
    return new Response("Not found", { status: 404 });
  }

  await connectToDatabase();

  const upload = await StoredUpload.findOne({
    folder: safeFolder as UploadFolder,
    filename: safeFilename,
  }).lean();

  if (!upload) {
    return new Response("Not found", { status: 404 });
  }

  const data = upload.data as unknown as Buffer;

  return new Response(new Uint8Array(data), {
    status: 200,
    headers: {
      "Content-Type": upload.mimeType,
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Length": String(upload.size),
    },
  });
}
