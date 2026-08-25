// ============================================================
// Database Data Layer: Products — Jay Shankar Readymade Store
// Supports PostgreSQL queries with Cloudinary image associations
// ============================================================

import { prisma, isDatabaseConfigured } from "../prisma";
import { products as staticProducts } from "@/data/products";
import { Product } from "@/types";
import { deleteImageFromCloudinary } from "../cloudinary";
import { Prisma } from "@/generated/prisma";

export type DbProductWithRelations = Prisma.ProductGetPayload<{
  include: {
    category: { select: { slug: true; name: true; nameHindi: true } };
    brand: { select: { slug: true; name: true } };
    images: true;
  };
}>;

export type DbAdminProductWithRelations = Prisma.ProductGetPayload<{
  include: {
    category: { select: { id: true; name: true; nameHindi: true; slug: true } };
    brand: { select: { id: true; name: true; slug: true } };
    images: true;
  };
}>;

function mapDbProductToProduct(dbP: DbProductWithRelations): Product {
  const sortedImages = (dbP.images || [])
    .slice()
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
    .map((img) => img.url)
    .filter((url): url is string => Boolean(url && typeof url === "string" && url.trim().length > 0));

  return {
    id: dbP.id,
    name: dbP.name,
    slug: dbP.slug,
    category: dbP.category?.slug || "",
    brand: dbP.brand ? dbP.brand.slug : undefined,
    description: dbP.description,
    shortDescription: dbP.shortDescription,
    images: sortedImages,
    tags: dbP.tags,
    isWholesale: dbP.isWholesale,
    isFeatured: dbP.isFeatured,
    enquiryAvailable: dbP.enquiryAvailable,
    isDemo: dbP.isDemo,
  };
}

/**
 * Public Catalogue Query: Published products only
 */
export async function getPublishedProducts(): Promise<Product[]> {
  if (isDatabaseConfigured()) {
    try {
      const dbProducts: DbProductWithRelations[] = await prisma.product.findMany({
        where: { isPublished: true },
        include: {
          category: { select: { slug: true, name: true, nameHindi: true } },
          brand: { select: { slug: true, name: true } },
          images: { orderBy: { sortOrder: "asc" } },
        },
        orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      });
      return dbProducts.map((p: DbProductWithRelations) => mapDbProductToProduct(p));
    } catch (error) {
      console.error("[DB_ERROR] Failed to fetch published products from PostgreSQL:", error);
    }
  }

  // Development / unconfigured DB / error fallback (only return sample products that are published)
  return staticProducts;
}

/**
 * Public Featured Products Query: Published & Featured products
 */
export async function getPublishedFeaturedProducts(limit = 6): Promise<Product[]> {
  if (isDatabaseConfigured()) {
    try {
      const dbProducts: DbProductWithRelations[] = await prisma.product.findMany({
        where: { isPublished: true, isFeatured: true },
        include: {
          category: { select: { slug: true, name: true, nameHindi: true } },
          brand: { select: { slug: true, name: true } },
          images: { orderBy: { sortOrder: "asc" } },
        },
        orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
        take: limit,
      });
      return dbProducts.map((p: DbProductWithRelations) => mapDbProductToProduct(p));
    } catch (error) {
      console.error("[DB_ERROR] Failed to fetch featured products from PostgreSQL:", error);
    }
  }

  return staticProducts.filter((p) => p.isFeatured).slice(0, limit);
}

/**
 * Public Product Detail Query: Published product by slug
 */
export async function getPublishedProductBySlug(slug: string): Promise<Product | null> {
  if (isDatabaseConfigured()) {
    try {
      const dbP: DbProductWithRelations | null = await prisma.product.findFirst({
        where: { slug, isPublished: true },
        include: {
          category: { select: { slug: true, name: true, nameHindi: true } },
          brand: { select: { slug: true, name: true } },
          images: { orderBy: { sortOrder: "asc" } },
        },
      });
      if (!dbP) return null;
      return mapDbProductToProduct(dbP);
    } catch (error) {
      console.error(`[DB_ERROR] Failed to fetch product slug '${slug}' from PostgreSQL:`, error);
    }
  }

  return staticProducts.find((p) => p.slug === slug) ?? null;
}

export interface AdminProductItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  categoryId: string;
  categoryName: string;
  brandId: string | null;
  brandName: string | null;
  tags: string[];
  isWholesale: boolean;
  isFeatured: boolean;
  isPublished: boolean;
  enquiryAvailable: boolean;
  isDemo: boolean;
  images: { id?: string; url: string; publicId: string; alt?: string | null; sortOrder?: number }[];
  createdAt: Date;
  updatedAt?: Date;
}

/**
 * Admin Product Query: All products with draft/published status
 */
export async function getAdminProducts(params?: {
  search?: string;
  categoryId?: string;
  brandId?: string;
}): Promise<AdminProductItem[]> {
  if (!isDatabaseConfigured()) {
    return staticProducts.map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      description: p.description,
      shortDescription: p.shortDescription,
      categoryId: p.category,
      categoryName: p.category,
      brandId: p.brand || null,
      brandName: p.brand || null,
      tags: p.tags,
      isWholesale: p.isWholesale,
      isFeatured: p.isFeatured,
      isPublished: true,
      enquiryAvailable: p.enquiryAvailable,
      isDemo: p.isDemo,
      images: p.images.map((img, i) => ({ id: `img-${i}`, url: img, publicId: "", alt: "", sortOrder: i })),
      createdAt: new Date(),
    }));
  }

  const whereClause: Prisma.ProductWhereInput = {};

  if (params?.categoryId) {
    whereClause.categoryId = params.categoryId;
  }
  if (params?.brandId) {
    whereClause.brandId = params.brandId;
  }
  if (params?.search && params.search.trim() !== "") {
    const q = params.search.trim();
    whereClause.OR = [
      { name: { contains: q, mode: "insensitive" } },
      { slug: { contains: q, mode: "insensitive" } },
      { description: { contains: q, mode: "insensitive" } },
    ];
  }

  const products: DbAdminProductWithRelations[] = await prisma.product.findMany({
    where: whereClause,
    include: {
      category: { select: { id: true, name: true, nameHindi: true, slug: true } },
      brand: { select: { id: true, name: true, slug: true } },
      images: { orderBy: { sortOrder: "asc" } },
    },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  return products.map((p: DbAdminProductWithRelations): AdminProductItem => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    description: p.description,
    shortDescription: p.shortDescription,
    categoryId: p.categoryId,
    categoryName: p.category?.nameHindi || p.category?.name || "Unknown",
    brandId: p.brandId,
    brandName: p.brand?.name || null,
    tags: p.tags,
    isWholesale: p.isWholesale,
    isFeatured: p.isFeatured,
    isPublished: p.isPublished,
    enquiryAvailable: p.enquiryAvailable,
    isDemo: p.isDemo,
    images: p.images,
    createdAt: p.createdAt,
    updatedAt: p.updatedAt,
  }));
}

export type AdminProductDetail = Prisma.ProductGetPayload<{
  include: {
    category: true;
    brand: true;
    images: { orderBy: { sortOrder: "asc" } };
  };
}>;

/**
 * Admin Product Query by ID (for edit form)
 */
export async function getAdminProductById(id: string): Promise<AdminProductDetail | null> {
  if (!isDatabaseConfigured()) {
    const p = staticProducts.find((item) => item.id === id);
    if (!p) return null;
    return {
      id: p.id,
      name: p.name,
      slug: p.slug,
      description: p.description,
      shortDescription: p.shortDescription,
      categoryId: p.category,
      category: {
        id: p.category,
        name: p.category,
        nameHindi: p.category,
        slug: p.category,
        description: "",
        icon: "Package",
        isCore: false,
        color: "bg-blue-50",
        sortOrder: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      brandId: p.brand || null,
      brand: p.brand ? {
        id: p.brand,
        name: p.brand,
        slug: p.brand,
        description: "",
        logoPlaceholder: p.brand.slice(0, 2).toUpperCase(),
        accentColor: "#0F2A5C",
        sortOrder: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      } : null,
      tags: p.tags,
      isWholesale: p.isWholesale,
      isFeatured: p.isFeatured,
      isPublished: true,
      enquiryAvailable: p.enquiryAvailable,
      isDemo: p.isDemo,
      sortOrder: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      images: [],
    };
  }

  return prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
      brand: true,
      images: { orderBy: { sortOrder: "asc" } },
    },
  });
}

/**
 * Admin Delete Product: Safely clean up associated Cloudinary images
 */
export async function deleteProductById(id: string): Promise<boolean> {
  if (!isDatabaseConfigured()) {
    return true;
  }

  // Fetch product images to clean Cloudinary assets
  const product = await prisma.product.findUnique({
    where: { id },
    include: { images: true },
  });

  if (!product) return false;

  // Clean Cloudinary images in background
  for (const img of product.images) {
    if (img.publicId) {
      await deleteImageFromCloudinary(img.publicId);
    }
  }

  // Cascade delete handles ProductImage rows in DB
  await prisma.product.delete({
    where: { id },
  });

  return true;
}
