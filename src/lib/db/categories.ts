// ============================================================
// Database Data Layer: Categories — Jay Shankar Readymade Store
// ============================================================

import { prisma, isDatabaseConfigured } from "../prisma";
import { categories as staticCategories } from "@/data/categories";
import { Category } from "@/types";
import { Category as DbCategory } from "@/generated/prisma";

export async function getCategories(): Promise<Category[]> {
  if (isDatabaseConfigured()) {
    try {
      const dbCategories: DbCategory[] = await prisma.category.findMany({
        orderBy: [{ isCore: "desc" }, { sortOrder: "asc" }, { name: "asc" }],
      });
      return dbCategories.map((c: DbCategory): Category => ({
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
    }
  }

  // Development / unconfigured DB / error fallback
  return staticCategories;
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  if (isDatabaseConfigured()) {
    try {
      const c: DbCategory | null = await prisma.category.findUnique({
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
    }
  }

  return staticCategories.find((c) => c.slug === slug) ?? null;
}
