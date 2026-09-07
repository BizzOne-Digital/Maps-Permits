import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Service from "@/models/Service";
import { requireAdmin } from "@/lib/auth";
import { validateServiceInput } from "@/lib/validations";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  await connectToDatabase();
  const { searchParams } = new URL(req.url);
  const all = searchParams.get("all");

  let authorized = false;
  if (all) {
    try {
      await requireAdmin();
      authorized = true;
    } catch {
      authorized = false;
    }
  }

  const query = authorized ? {} : { published: true };
  const services = await Service.find(query).sort({ order: 1, createdAt: 1 }).lean();
  return NextResponse.json({ services });
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { valid, errors } = validateServiceInput(body);
    if (!valid) {
      return NextResponse.json({ error: "Please check the form.", errors }, { status: 400 });
    }

    await connectToDatabase();

    const existing = await Service.findOne({ slug: body.slug });
    if (existing) {
      return NextResponse.json(
        { error: "A service with this slug already exists.", errors: { slug: "Slug already in use." } },
        { status: 400 }
      );
    }

    const service = await Service.create(body);
    return NextResponse.json({ service });
  } catch (err) {
    console.error("Service creation error:", err);
    return NextResponse.json({ error: "Creation failed" }, { status: 500 });
  }
}
