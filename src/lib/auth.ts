// ============================================================
// Authentication & Session Management — Jay Shankar Readymade Store
// Uses bcryptjs for hashing & jose for Edge/Node JWT cookies
// ============================================================

import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { prisma, isDatabaseConfigured } from "./prisma";

const COOKIE_NAME = "js_admin_session";
const JWT_SECRET = process.env.AUTH_SECRET || "jay-shankar-dev-auth-secret-change-in-production-min32chars";
const key = new TextEncoder().encode(JWT_SECRET);

export interface AdminSessionPayload {
  userId: string;
  email: string;
  name: string;
  role: string;
  expiresAt: number;
}

// In-memory rate limiting for brute-force protection
const loginAttempts = new Map<string, { count: number; firstAttempt: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes window

export function checkRateLimit(identifier: string): { allowed: boolean; retryAfterSeconds?: number } {
  const now = Date.now();
  const record = loginAttempts.get(identifier);

  if (!record) {
    loginAttempts.set(identifier, { count: 1, firstAttempt: now });
    return { allowed: true };
  }

  if (now - record.firstAttempt > WINDOW_MS) {
    loginAttempts.set(identifier, { count: 1, firstAttempt: now });
    return { allowed: true };
  }

  if (record.count >= MAX_ATTEMPTS) {
    const retryAfter = Math.ceil((record.firstAttempt + WINDOW_MS - now) / 1000);
    return { allowed: false, retryAfterSeconds: retryAfter };
  }

  record.count += 1;
  return { allowed: true };
}

export function resetRateLimit(identifier: string) {
  loginAttempts.delete(identifier);
}

/**
 * Hash a plaintext password with bcrypt (12 rounds)
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

/**
 * Verify a plaintext password against a bcrypt hash
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Create a signed JWT session token
 */
export async function createSessionToken(user: { id: string; email: string; name: string; role: string }): Promise<string> {
  const expiresAt = Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60; // 7 days
  return new SignJWT({
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresAt)
    .sign(key);
}

/**
 * Verify and decode a JWT session token
 */
export async function verifySessionToken(token: string): Promise<AdminSessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, key, {
      algorithms: ["HS256"],
    });
    return {
      userId: payload.userId as string,
      email: payload.email as string,
      name: payload.name as string,
      role: payload.role as string,
      expiresAt: payload.exp as number,
    };
  } catch {
    return null;
  }
}

/**
 * Set session cookie in Next.js response context
 */
export async function setSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
  });
}

/**
 * Delete session cookie for logout
 */
export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

/**
 * Get current session token string from cookies
 */
export async function getSessionToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value;
}

/**
 * Server-side authorization check.
 * Verifies session cookie AND database record (when configured).
 * Throws or returns null if unauthorized.
 */
export async function getAuthenticatedAdmin(): Promise<{ id: string; email: string; name: string; role: string } | null> {
  const token = await getSessionToken();
  if (!token) return null;

  const payload = await verifySessionToken(token);
  if (!payload) return null;

  // Verify user still exists in database if DB is configured
  if (isDatabaseConfigured()) {
    try {
      const user = await prisma.adminUser.findUnique({
        where: { id: payload.userId },
        select: { id: true, email: true, name: true, role: true },
      });
      if (!user) return null;
      return user;
    } catch (error) {
      console.error("[AUTH] Database verification error:", error);
      return null;
    }
  }

  // Fallback for development without active database
  return {
    id: payload.userId,
    email: payload.email,
    name: payload.name,
    role: payload.role,
  };
}
