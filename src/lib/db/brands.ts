// ============================================================
// Database Data Layer: Brands — Jay Shankar Readymade Store
// ============================================================

import { prisma, isDatabaseConfigured } from "../prisma";
import { brands as staticBrands } from "@/data/brands";
import { Brand } from "@/types";

export async function getBrands(): Promise<Brand[]> {
  if (isDatabaseConfigured()) {
    try {
      const dbBrands = await prisma.brand.findMany({
        orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
      });
      return dbBrands.map((b) => ({
        id: b.id,
        name: b.name,
        slug: b.slug,
        description: b.description,
        categories: [],
        logoPlaceholder: b.logoPlaceholder,
        accentColor: b.accentColor,
      }));
    } catch (error) {
      console.error("[DB_ERROR] Failed to fetch brands from PostgreSQL:", error);
      if (process.env.NODE_ENV === "production") {
        throw new Error("Database query failed while fetching brands in production.");
      }
    }
  }

  // Development / unconfigured DB fallback
  return staticBrands;
}

export async function getBrandBySlug(slug: string): Promise<Brand | null> {
  if (isDatabaseConfigured()) {
    try {
      const b = await prisma.brand.findUnique({
        where: { slug },
      });
      if (!b) return null;
      return {
        id: b.id,
        name: b.name,
        slug: b.slug,
        description: b.description,
        categories: [],
        logoPlaceholder: b.logoPlaceholder,
        accentColor: b.accentColor,
      };
    } catch (error) {
      console.error(`[DB_ERROR] Failed to fetch brand '${slug}' from PostgreSQL:`, error);
      if (process.env.NODE_ENV === "production") {
        throw new Error(`Database query failed for brand '${slug}' in production.`);
      }
    }
  }

  return staticBrands.find((b) => b.slug === slug) ?? null;
}
