// ============================================================
// Admin Login API Route — Jay Shankar Readymade Store
// Rate-Limited & Secure Password Authentication
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { LoginSchema } from "@/lib/validations";
import { prisma, isDatabaseConfigured } from "@/lib/prisma";
import { AdminUser } from "@/generated/prisma";
import {
  verifyPassword,
  createSessionToken,
  setSessionCookie,
  checkRateLimit,
  resetRateLimit,
} from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "local";
    const body = await request.json();

    // 1. Zod Validation
    const parsed = LoginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "अमान्य विवरण (Invalid email or password format)" },
        { status: 400 }
      );
    }

    const { email, password } = parsed.data;

    // 2. Rate limiting check (per IP & email)
    const rateLimitKey = `${ip}:${email}`;
    const rateCheck = checkRateLimit(rateLimitKey);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          error: `बहुत अधिक प्रयास किए गए। कृपया ${rateCheck.retryAfterSeconds} सेकंड बाद पुनः प्रयास करें। (Too many attempts. Try again later.)`,
        },
        { status: 429 }
      );
    }

    // 3. Database Check
    if (isDatabaseConfigured()) {
      const user: AdminUser | null = await prisma.adminUser.findUnique({
        where: { email },
      });

      if (!user) {
        return NextResponse.json(
          { error: "अमान्य ईमेल या पासवर्ड (Invalid email or password)" },
          { status: 401 }
        );
      }

      const isValid = await verifyPassword(password, user.passwordHash);
      if (!isValid) {
        return NextResponse.json(
          { error: "अमान्य ईमेल या पासवर्ड (Invalid email or password)" },
          { status: 401 }
        );
      }

      // Successful login
      resetRateLimit(rateLimitKey);
      const token = await createSessionToken({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      });

      await setSessionCookie(token);

      return NextResponse.json({
        success: true,
        user: { id: user.id, email: user.email, name: user.name, role: user.role },
      });
    }

    // 4. Fallback for development when DB is not yet running
    // Allows testing admin if ADMIN_EMAIL & ADMIN_INITIAL_PASSWORD are configured in env
    const devAdminEmail = process.env.ADMIN_EMAIL;
    const devAdminPass = process.env.ADMIN_INITIAL_PASSWORD;

    if (devAdminEmail && devAdminPass && email === devAdminEmail.toLowerCase().trim()) {
      if (password === devAdminPass) {
        resetRateLimit(rateLimitKey);
        const token = await createSessionToken({
          id: "dev-admin-id",
          email: devAdminEmail,
          name: "Utkarsh (Admin)",
          role: "ADMIN",
        });

        await setSessionCookie(token);
        return NextResponse.json({
          success: true,
          user: { id: "dev-admin-id", email: devAdminEmail, name: "Utkarsh (Admin)", role: "ADMIN" },
        });
      }
    }

    return NextResponse.json(
      { error: "अमान्य ईमेल या पासवर्ड (Invalid email or password)" },
      { status: 401 }
    );
  } catch (error) {
    console.error("[AUTH_LOGIN_ERROR]", error);
    return NextResponse.json(
      { error: "लॉगिन में त्रुटि हुई। कृपया पुनः प्रयास करें। (Login server error)" },
      { status: 500 }
    );
  }
}
