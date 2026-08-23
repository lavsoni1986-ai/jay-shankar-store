// ============================================================
// Admin Categories API Route — Jay Shankar Readymade Store
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedAdmin } from "@/lib/auth";
import { prisma, isDatabaseConfigured } from "@/lib/prisma";
import { CategoryInputSchema } from "@/lib/validations";
import { getCategories } from "@/lib/db/categories";

export async function GET() {
  const admin = await getAuthenticatedAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const categories = await getCategories();
    return NextResponse.json({ categories });
  } catch (error) {
    console.error("[ADMIN_CATEGORIES_GET_ERROR]", error);
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
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
    const parsed = CategoryInputSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Validation failed", details: parsed.error.format() }, { status: 400 });
    }

    const data = parsed.data;

    const existing = await prisma.category.findUnique({
      where: { slug: data.slug },
    });

    if (existing) {
      return NextResponse.json({ error: "A category with this slug already exists." }, { status: 400 });
    }

    const created = await prisma.category.create({
      data,
    });

    return NextResponse.json({ success: true, category: created }, { status: 201 });
  } catch (error) {
    console.error("[ADMIN_CATEGORY_CREATE_ERROR]", error);
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 });
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
      return NextResponse.json({ error: "Category ID required" }, { status: 400 });
    }

    const parsed = CategoryInputSchema.safeParse(rest);
    if (!parsed.success) {
      return NextResponse.json({ error: "Validation failed", details: parsed.error.format() }, { status: 400 });
    }

    const updated = await prisma.category.update({
      where: { id },
      data: parsed.data,
    });

    return NextResponse.json({ success: true, category: updated });
  } catch (error) {
    console.error("[ADMIN_CATEGORY_UPDATE_ERROR]", error);
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 });
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
    return NextResponse.json({ error: "Category ID required" }, { status: 400 });
  }

  try {
    await prisma.category.delete({
      where: { id },
    });
    return NextResponse.json({ success: true, message: "Category deleted" });
  } catch (error) {
    console.error("[ADMIN_CATEGORY_DELETE_ERROR]", error);
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 });
  }
}
