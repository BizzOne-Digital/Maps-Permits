import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectToDatabase from "@/lib/mongodb";
import Admin from "@/models/Admin";
import { createAdminSession } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const admin = await Admin.findOne({ email: String(email).toLowerCase().trim() });
    if (!admin) {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    }

    const matches = await bcrypt.compare(password, admin.passwordHash);
    if (!matches) {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    }

    await createAdminSession({
      adminId: String(admin._id),
      email: admin.email,
      role: admin.role,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ error: "Login failed." }, { status: 500 });
  }
}
