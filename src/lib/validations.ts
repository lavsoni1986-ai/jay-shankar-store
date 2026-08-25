// ============================================================
// Input Validations — Jay Shankar Readymade Store
// Zod Schemas for API Routes & Server Actions
// ============================================================

import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email("वैध ईमेल पता दर्ज करें (Enter a valid email)").trim().toLowerCase(),
  password: z.string().min(6, "पासवर्ड कम से कम 6 अक्षरों का होना चाहिए (Password must be at least 6 characters)"),
});

export const ProductImageInputSchema = z.object({
  url: z.string().url("Valid image URL required"),
  publicId: z.string().min(1, "Public ID required"),
  alt: z.string().optional().nullable(),
  sortOrder: z.number().int().default(0),
});

export const ProductInputSchema = z.object({
  name: z.string().min(2, "Product name must be at least 2 characters").max(150),
  slug: z.string().min(2).max(150).regex(/^[a-z0-9-]+$/, "Slug must only contain lowercase letters, numbers, and hyphens"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  shortDescription: z.string().min(2).max(250),
  categoryId: z.string().min(1, "Category is required"),
  brandId: z.string().optional().nullable(),
  tags: z.array(z.string()).default([]),
  isWholesale: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  isPublished: z.boolean().default(true),
  enquiryAvailable: z.boolean().default(true),
  isDemo: z.boolean().default(false),
  sortOrder: z.number().int().default(0),
  images: z.array(ProductImageInputSchema).default([]),
});

export const CategoryInputSchema = z.object({
  name: z.string().min(2).max(100),
  nameHindi: z.string().min(2).max(100),
  slug: z.string().min(2).max(100).regex(/^[a-z0-9-]+$/),
  description: z.string().min(5).max(300),
  icon: z.string().default("Package"),
  isCore: z.boolean().default(false),
  color: z.string().default("bg-blue-50"),
  sortOrder: z.number().int().default(0),
});

export const BrandInputSchema = z.object({
  name: z.string().min(2).max(100),
  slug: z.string().min(2).max(100).regex(/^[a-z0-9-]+$/),
  description: z.string().min(5).max(300),
  logoPlaceholder: z.string().min(1).max(10),
  logoUrl: z.string().url("Valid URL required").optional().nullable().or(z.literal("")),
  accentColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Must be a valid hex color (#RRGGBB)"),
  sortOrder: z.number().int().default(0),
});
