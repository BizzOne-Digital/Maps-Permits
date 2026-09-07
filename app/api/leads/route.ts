import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Lead, { LEAD_STATUSES } from "@/models/Lead";
import { requireAdmin } from "@/lib/auth";
import { validateLeadInput } from "@/lib/validations";

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
  const status = searchParams.get("status");
  const search = searchParams.get("search");

  const query: Record<string, unknown> = {};
  if (status && LEAD_STATUSES.includes(status as (typeof LEAD_STATUSES)[number])) {
    query.status = status;
  }
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { phone: { $regex: search, $options: "i" } },
    ];
  }

  const leads = await Lead.find(query).sort({ createdAt: -1 }).lean();
  return NextResponse.json({ leads });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { valid, errors } = validateLeadInput(body);
    if (!valid) {
      return NextResponse.json({ error: "Please check the form.", errors }, { status: 400 });
    }

    await connectToDatabase();

    const lead = await Lead.create({
      name: body.name,
      email: body.email,
      phone: body.phone,
      postalCode: body.postalCode,
      projectType: body.projectType,
      municipality: body.municipality,
      propertyAddress: body.propertyAddress,
      message: body.message,
      source: "website",
    });

    return NextResponse.json({ success: true, id: lead._id });
  } catch (err) {
    console.error("Lead creation error:", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, status } = await req.json();
    if (!id || !LEAD_STATUSES.includes(status)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    await connectToDatabase();
    const lead = await Lead.findByIdAndUpdate(id, { status }, { new: true }).lean();
    if (!lead) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }

    return NextResponse.json({ lead });
  } catch (err) {
    console.error("Lead update error:", err);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
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
  await Lead.findByIdAndDelete(id);
  return NextResponse.json({ success: true });
}
