// ============================================================
// Admin Products API Route — Jay Shankar Readymade Store
// GET list & POST create product with Cloudinary images
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedAdmin } from "@/lib/auth";
import { prisma, isDatabaseConfigured } from "@/lib/prisma";
import { ProductInputSchema } from "@/lib/validations";
import { getAdminProducts } from "@/lib/db/products";

export async function GET(request: NextRequest) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || undefined;
  const categoryId = searchParams.get("categoryId") || undefined;
  const brandId = searchParams.get("brandId") || undefined;

  try {
    const products = await getAdminProducts({ search, categoryId, brandId });
    return NextResponse.json({ products });
  } catch (error) {
    console.error("[ADMIN_PRODUCTS_GET_ERROR]", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      { error: "Database is not configured. Please configure DATABASE_URL." },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const parsed = ProductInputSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Check slug uniqueness
    const existingSlug = await prisma.product.findUnique({
      where: { slug: data.slug },
    });

    if (existingSlug) {
      return NextResponse.json(
        { error: "A product with this slug already exists. Please choose another slug." },
        { status: 400 }
      );
    }

    // Verify category exists
    const category = await prisma.category.findUnique({
      where: { id: data.categoryId },
    });

    if (!category) {
      return NextResponse.json({ error: "Selected category does not exist." }, { status: 400 });
    }

    // If brandId is provided, verify brand exists
    if (data.brandId) {
      const brand = await prisma.brand.findUnique({
        where: { id: data.brandId },
      });
      if (!brand) {
        return NextResponse.json({ error: "Selected brand does not exist." }, { status: 400 });
      }
    }

    // Create product with nested images
    const createdProduct = await prisma.product.create({
      data: {
        name: data.name,
        slug: data.slug,
        description: data.description,
        shortDescription: data.shortDescription,
        categoryId: data.categoryId,
        brandId: data.brandId || null,
        tags: data.tags,
        isWholesale: data.isWholesale,
        isFeatured: data.isFeatured,
        isPublished: data.isPublished,
        enquiryAvailable: data.enquiryAvailable,
        isDemo: data.isDemo,
        sortOrder: data.sortOrder,
        images: {
          create: data.images.map((img, index) => ({
            url: img.url,
            publicId: img.publicId,
            alt: img.alt || data.name,
            sortOrder: img.sortOrder ?? index,
          })),
        },
      },
      include: {
        category: true,
        brand: true,
        images: true,
      },
    });

    return NextResponse.json({ success: true, product: createdProduct }, { status: 201 });
  } catch (error) {
    console.error("[ADMIN_PRODUCT_CREATE_ERROR]", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
