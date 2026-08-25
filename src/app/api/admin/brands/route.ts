// ============================================================
// Admin Brands API Route — Jay Shankar Readymade Store
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedAdmin } from "@/lib/auth";
import { prisma, isDatabaseConfigured } from "@/lib/prisma";
import { BrandInputSchema } from "@/lib/validations";
import { getBrands } from "@/lib/db/brands";

export async function GET() {
  const admin = await getAuthenticatedAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const brands = await getBrands();
    return NextResponse.json({ brands });
  } catch (error) {
    console.error("[ADMIN_BRANDS_GET_ERROR]", error);
    return NextResponse.json({ error: "Failed to fetch brands" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isDatabaseConfigured()) {
    return NextResponse.json({ error: "Database is not configured." }, { status: 500 });
  }

  try {
    const body = await request.json();
    const parsed = BrandInputSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Validation failed", details: parsed.error.format() }, { status: 400 });
    }

    const data = parsed.data;

    const existing = await prisma.brand.findUnique({
      where: { slug: data.slug },
    });

    if (existing) {
      return NextResponse.json({ error: "A brand with this slug already exists." }, { status: 400 });
    }

    const created = await prisma.brand.create({
      data: {
        ...data,
        logoUrl: data.logoUrl?.trim() || null,
      },
    });

    return NextResponse.json({ success: true, brand: created }, { status: 201 });
  } catch (error) {
    console.error("[ADMIN_BRAND_CREATE_ERROR]", error);
    return NextResponse.json({ error: "Failed to create brand" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isDatabaseConfigured()) {
    return NextResponse.json({ error: "Database is not configured." }, { status: 500 });
  }

  try {
    const body = await request.json();
    const { id, ...rest } = body;

    if (!id) {
      return NextResponse.json({ error: "Brand ID required" }, { status: 400 });
    }

    const parsed = BrandInputSchema.safeParse(rest);
    if (!parsed.success) {
      return NextResponse.json({ error: "Validation failed", details: parsed.error.format() }, { status: 400 });
    }

    const data = parsed.data;
    const updated = await prisma.brand.update({
      where: { id },
      data: {
        ...data,
        logoUrl: data.logoUrl?.trim() || null,
      },
    });

    return NextResponse.json({ success: true, brand: updated });
  } catch (error) {
    console.error("[ADMIN_BRAND_UPDATE_ERROR]", error);
    return NextResponse.json({ error: "Failed to update brand" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isDatabaseConfigured()) {
    return NextResponse.json({ error: "Database is not configured." }, { status: 500 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Brand ID required" }, { status: 400 });
  }

  try {
    await prisma.brand.delete({
      where: { id },
    });
    return NextResponse.json({ success: true, message: "Brand deleted" });
  } catch (error) {
    console.error("[ADMIN_BRAND_DELETE_ERROR]", error);
    return NextResponse.json({ error: "Failed to delete brand" }, { status: 500 });
  }
}
