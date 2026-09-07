import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Testimonial from "@/models/Testimonial";
import { requireAdmin } from "@/lib/auth";
import { validateTestimonialInput } from "@/lib/validations";

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
  const testimonials = await Testimonial.find(query).sort({ createdAt: -1 }).lean();
  return NextResponse.json({ testimonials });
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { valid, errors } = validateTestimonialInput(body);
    if (!valid) {
      return NextResponse.json({ error: "Please check the form.", errors }, { status: 400 });
    }

    await connectToDatabase();
    const testimonial = await Testimonial.create(body);
    return NextResponse.json({ testimonial });
  } catch (err) {
    console.error("Testimonial creation error:", err);
    return NextResponse.json({ error: "Creation failed" }, { status: 500 });
  }
}
