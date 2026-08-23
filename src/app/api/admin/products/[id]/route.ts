// ============================================================
// Admin Product Single API Route — Jay Shankar Readymade Store
// GET, PUT update & DELETE product with reconciled Cloudinary assets
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedAdmin } from "@/lib/auth";
import { prisma, isDatabaseConfigured } from "@/lib/prisma";
import { ProductInputSchema } from "@/lib/validations";
import { getAdminProductById, deleteProductById } from "@/lib/db/products";
import { deleteImageFromCloudinary } from "@/lib/cloudinary";
import { ProductImage, Prisma } from "@/generated/prisma";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(_request: NextRequest, { params }: Params) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  try {
    const product = await getAdminProductById(id);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json({ product });
  } catch (error) {
    console.error("[ADMIN_PRODUCT_GET_ID_ERROR]", error);
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: Params) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isDatabaseConfigured()) {
    return NextResponse.json({ error: "Database is not configured." }, { status: 500 });
  }

  const { id } = await params;

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

    // Check existing product
    const existing = await prisma.product.findUnique({
      where: { id },
      include: { images: true },
    });

    if (!existing) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Check slug collision with another product
    if (data.slug !== existing.slug) {
      const slugTaken = await prisma.product.findUnique({
        where: { slug: data.slug },
      });
      if (slugTaken && slugTaken.id !== id) {
        return NextResponse.json(
          { error: "Slug is already used by another product." },
          { status: 400 }
        );
      }
    }

    // Identify images to remove from Cloudinary
    const incomingPublicIds = new Set(data.images.map((img) => img.publicId).filter(Boolean));
    const imagesToDelete = existing.images.filter((img: ProductImage) => !incomingPublicIds.has(img.publicId));

    for (const img of imagesToDelete) {
      if (img.publicId) {
        await deleteImageFromCloudinary(img.publicId);
      }
    }

    // Update product & images in transaction
    const updatedProduct = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      // Delete old product images from DB
      await tx.productImage.deleteMany({
        where: { productId: id },
      });

      // Update product info & recreate images with new ordering
      return tx.product.update({
        where: { id },
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
          images: { orderBy: { sortOrder: "asc" } },
        },
      });
    });

    return NextResponse.json({ success: true, product: updatedProduct });
  } catch (error) {
    console.error("[ADMIN_PRODUCT_UPDATE_ERROR]", error);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: Params) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const success = await deleteProductById(id);
    if (!success) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("[ADMIN_PRODUCT_DELETE_ERROR]", error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
