// ============================================================
// Database Data Layer: Brands — Jay Shankar Readymade Store
// ============================================================

import { prisma, isDatabaseConfigured } from "../prisma";
import { brands as staticBrands } from "@/data/brands";
import { Brand } from "@/types";
import { Brand as DbBrand } from "@/generated/prisma";

export async function getBrands(): Promise<Brand[]> {
  if (isDatabaseConfigured()) {
    try {
      const dbBrands: DbBrand[] = await prisma.brand.findMany({
        orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
      });
      return dbBrands.map((b: DbBrand): Brand => ({
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
    }
  }

  // Development / unconfigured DB / error fallback
  return staticBrands;
}

export async function getBrandBySlug(slug: string): Promise<Brand | null> {
  if (isDatabaseConfigured()) {
    try {
      const b: DbBrand | null = await prisma.brand.findUnique({
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
    }
  }

  return staticBrands.find((b) => b.slug === slug) ?? null;
}
