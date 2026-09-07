import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import SiteSettings from "@/models/SiteSettings";
import { requireAdmin } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  await connectToDatabase();
  let settings = await SiteSettings.findOne().lean();
  if (!settings) {
    settings = (await SiteSettings.create({})).toObject();
  }
  return NextResponse.json({ settings });
}

export async function PATCH(req: NextRequest) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  await connectToDatabase();

  let settings = await SiteSettings.findOne();
  if (!settings) {
    settings = await SiteSettings.create(body);
  } else {
    Object.assign(settings, body);
    await settings.save();
  }

  return NextResponse.json({ settings });
}
