// ============================================================
// Database Data Layer: Categories — Jay Shankar Readymade Store
// ============================================================

import { prisma, isDatabaseConfigured } from "../prisma";
import { categories as staticCategories } from "@/data/categories";
import { Category } from "@/types";

export async function getCategories(): Promise<Category[]> {
  if (isDatabaseConfigured()) {
    try {
      const dbCategories = await prisma.category.findMany({
        orderBy: [{ isCore: "desc" }, { sortOrder: "asc" }, { name: "asc" }],
      });
      return dbCategories.map((c) => ({
        id: c.id,
        name: c.name,
        nameHindi: c.nameHindi,
        slug: c.slug,
        description: c.description,
        icon: c.icon,
        isCore: c.isCore,
        color: c.color,
      }));
    } catch (error) {
      console.error("[DB_ERROR] Failed to fetch categories from PostgreSQL:", error);
      if (process.env.NODE_ENV === "production") {
        throw new Error("Database query failed while fetching categories in production.");
      }
    }
  }

  // Development / unconfigured DB fallback
  return staticCategories;
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  if (isDatabaseConfigured()) {
    try {
      const c = await prisma.category.findUnique({
        where: { slug },
      });
      if (!c) return null;
      return {
        id: c.id,
        name: c.name,
        nameHindi: c.nameHindi,
        slug: c.slug,
        description: c.description,
        icon: c.icon,
        isCore: c.isCore,
        color: c.color,
      };
    } catch (error) {
      console.error(`[DB_ERROR] Failed to fetch category '${slug}' from PostgreSQL:`, error);
      if (process.env.NODE_ENV === "production") {
        throw new Error(`Database query failed for category '${slug}' in production.`);
      }
    }
  }

  return staticCategories.find((c) => c.slug === slug) ?? null;
}
