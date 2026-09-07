import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import StoredUpload from "@/models/StoredUpload";
import { requireAdmin } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectToDatabase();

  const { searchParams } = new URL(req.url);
  const folder = searchParams.get("folder");
  const search = searchParams.get("search");

  const query: Record<string, unknown> = {};
  if (folder && folder !== "all") query.folder = folder;
  if (search) query.filename = { $regex: search, $options: "i" };

  const uploads = await StoredUpload.find(query)
    .select("-data")
    .sort({ createdAt: -1 })
    .lean();

  return NextResponse.json({ uploads });
}

export async function DELETE(req: NextRequest) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  await connectToDatabase();
  await StoredUpload.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
