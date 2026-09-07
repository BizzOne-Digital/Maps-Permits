import crypto from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "mp_admin_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

function getSecret(): string {
  return process.env.ADMIN_SESSION_SECRET || "dev-insecure-secret-change-me";
}

export type AdminSessionPayload = {
  adminId: string;
  email: string;
  role: string;
  exp: number;
};

function base64url(input: Buffer | string): string {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function base64urlDecode(input: string): Buffer {
  input = input.replace(/-/g, "+").replace(/_/g, "/");
  while (input.length % 4) input += "=";
  return Buffer.from(input, "base64");
}

function sign(payload: string): string {
  return base64url(
    crypto.createHmac("sha256", getSecret()).update(payload).digest()
  );
}

export function createSessionToken(data: {
  adminId: string;
  email: string;
  role: string;
}): string {
  const payload: AdminSessionPayload = {
    ...data,
    exp: Date.now() + SESSION_TTL_MS,
  };
  const payloadStr = base64url(JSON.stringify(payload));
  const sig = sign(payloadStr);
  return `${payloadStr}.${sig}`;
}

export function verifySessionToken(
  token: string | undefined | null
): AdminSessionPayload | null {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [payloadStr, sig] = parts;
  const expectedSig = sign(payloadStr);
  const sigBuf = Buffer.from(sig);
  const expectedBuf = Buffer.from(expectedSig);
  if (
    sigBuf.length !== expectedBuf.length ||
    !crypto.timingSafeEqual(sigBuf, expectedBuf)
  ) {
    return null;
  }
  try {
    const payload: AdminSessionPayload = JSON.parse(
      base64urlDecode(payloadStr).toString("utf8")
    );
    if (!payload.exp || payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

export async function createAdminSession(data: {
  adminId: string;
  email: string;
  role: string;
}) {
  const token = createSessionToken(data);
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_MS / 1000,
  });
}

export async function getAdminSession(): Promise<AdminSessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  return verifySessionToken(token);
}

export async function requireAdmin(): Promise<AdminSessionPayload> {
  const session = await getAdminSession();
  if (!session) {
    throw new Error("UNAUTHORIZED");
  }
  return session;
}

export async function destroyAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export const ADMIN_SESSION_COOKIE_NAME = COOKIE_NAME;
