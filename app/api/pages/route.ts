import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import PageContent from "@/models/PageContent";
import { requireAdmin } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  await connectToDatabase();

  if (slug) {
    const page = await PageContent.findOne({ slug }).lean();
    return NextResponse.json({ page });
  }

  const pages = await PageContent.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json({ pages });
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    if (!body.slug || !body.title) {
      return NextResponse.json({ error: "Slug and title are required." }, { status: 400 });
    }

    await connectToDatabase();
    const existing = await PageContent.findOne({ slug: body.slug });
    if (existing) {
      return NextResponse.json({ error: "A page with this slug already exists." }, { status: 400 });
    }

    const page = await PageContent.create(body);
    return NextResponse.json({ page });
  } catch (err) {
    console.error("Page creation error:", err);
    return NextResponse.json({ error: "Creation failed" }, { status: 500 });
  }
}
