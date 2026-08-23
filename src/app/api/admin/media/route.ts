// ============================================================
// Admin Media Library API Route — Jay Shankar Readymade Store
// Scoped strictly to project assets (jay-shankar-store/products/)
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedAdmin } from "@/lib/auth";
import { prisma, isDatabaseConfigured } from "@/lib/prisma";
import { deleteImageFromCloudinary } from "@/lib/cloudinary";
import { Prisma } from "@/generated/prisma";

type MediaImageWithProduct = Prisma.ProductImageGetPayload<{
  include: {
    product: { select: { id: true; name: true; slug: true } };
  };
}>;

export async function GET() {
  const admin = await getAuthenticatedAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isDatabaseConfigured()) {
    return NextResponse.json({ images: [] });
  }

  try {
    const images: MediaImageWithProduct[] = await prisma.productImage.findMany({
      include: {
        product: { select: { id: true, name: true, slug: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      images: images.map((img: MediaImageWithProduct) => ({
        id: img.id,
        url: img.url,
        publicId: img.publicId,
        alt: img.alt,
        productName: img.product?.name || "Unassigned",
        productSlug: img.product?.slug || null,
        createdAt: img.createdAt,
      })),
    });
  } catch (error) {
    console.error("[ADMIN_MEDIA_GET_ERROR]", error);
    return NextResponse.json({ error: "Failed to fetch media assets" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const admin = await getAuthenticatedAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const publicId = searchParams.get("publicId");

  if (!id && !publicId) {
    return NextResponse.json({ error: "Image ID or Public ID required" }, { status: 400 });
  }

  try {
    if (isDatabaseConfigured() && id) {
      const img = await prisma.productImage.findUnique({ where: { id } });
      if (img) {
        if (img.publicId) {
          await deleteImageFromCloudinary(img.publicId);
        }
        await prisma.productImage.delete({ where: { id } });
      }
    } else if (publicId) {
      await deleteImageFromCloudinary(publicId);
    }

    return NextResponse.json({ success: true, message: "Asset deleted" });
  } catch (error) {
    console.error("[ADMIN_MEDIA_DELETE_ERROR]", error);
    return NextResponse.json({ error: "Failed to delete media asset" }, { status: 500 });
  }
}
