// ============================================================
// TEMPORARY Diagnostic Route — /api/debug/database
// Reports ONLY safe metadata (boolean presence, lengths, schemes, masked host)
// NEVER exposes passwords, secrets, credentials, or connection strings.
// ============================================================

import { NextResponse } from "next/server";
import { prisma, isDatabaseConfigured } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function cleanEnvUrl(val: string | undefined): string {
  if (!val) return "";
  let cleaned = val.trim();
  if (
    (cleaned.startsWith('"') && cleaned.endsWith('"')) ||
    (cleaned.startsWith("'") && cleaned.endsWith("'"))
  ) {
    cleaned = cleaned.slice(1, -1).trim();
  }
  return cleaned;
}

function getUrlScheme(val: string | undefined): string | null {
  const cleaned = cleanEnvUrl(val);
  if (!cleaned || !cleaned.includes("://")) return null;
  return cleaned.split("://")[0];
}

function maskHost(val: string | undefined): string | null {
  const cleaned = cleanEnvUrl(val);
  if (!cleaned) return null;
  try {
    const match = cleaned.match(/@([^/:?#]+)/);
    const host = match ? match[1] : cleaned.includes("localhost") ? "localhost" : null;
    if (!host) return null;
    if (host === "localhost" || host === "127.0.0.1") return host;
    const parts = host.split(".");
    if (parts.length > 1) {
      const prefix = parts[0];
      const maskedPrefix = prefix.length > 3 ? `${prefix.slice(0, 3)}****` : "****";
      return [maskedPrefix, ...parts.slice(1)].join(".");
    }
    return "****";
  } catch {
    return "masked-host";
  }
}

export async function GET() {
  const rawDbUrl = process.env.DATABASE_URL;
  const rawDirectUrl = process.env.DIRECT_URL;
  const cleanDbUrl = cleanEnvUrl(rawDbUrl);
  const cleanDirectUrl = cleanEnvUrl(rawDirectUrl);

  const databaseUrlPresent = Boolean(cleanDbUrl.length > 0);
  const databaseUrlLength = rawDbUrl ? rawDbUrl.length : 0;
  const databaseUrlScheme = getUrlScheme(rawDbUrl);
  const databaseUrlHostMasked = maskHost(rawDbUrl);

  const directUrlPresent = Boolean(cleanDirectUrl.length > 0);
  const directUrlLength = rawDirectUrl ? rawDirectUrl.length : 0;
  const directUrlScheme = getUrlScheme(rawDirectUrl);

  const selectedDatabaseSource = cleanDbUrl
    ? "DATABASE_URL"
    : cleanDirectUrl
    ? "DIRECT_URL"
    : null;

  const configured = isDatabaseConfigured();

  // Test 1: SELECT 1
  let select1Success = false;
  let select1ErrorType: string | null = null;
  let select1ErrorMessage: string | null = null;

  try {
    await prisma.$queryRawUnsafe("SELECT 1 as health");
    select1Success = true;
  } catch (err: unknown) {
    select1Success = false;
    select1ErrorType = err instanceof Error ? err.constructor.name : "UnknownError";
    select1ErrorMessage = err instanceof Error ? err.message : String(err);
  }

  // Test 2: Prisma Model Queries
  let prismaSuccess = false;
  let productCount: number | null = null;
  let categoryCount: number | null = null;
  let brandCount: number | null = null;
  let adminCount: number | null = null;
  let prismaErrorType: string | null = null;
  let prismaErrorMessage: string | null = null;

  try {
    const [pCount, cCount, bCount, aCount] = await Promise.all([
      prisma.product.count(),
      prisma.category.count(),
      prisma.brand.count(),
      prisma.adminUser.count(),
    ]);
    productCount = pCount;
    categoryCount = cCount;
    brandCount = bCount;
    adminCount = aCount;
    prismaSuccess = true;
  } catch (err: unknown) {
    prismaSuccess = false;
    prismaErrorType = err instanceof Error ? err.constructor.name : "UnknownError";
    prismaErrorMessage = err instanceof Error ? err.message : String(err);
  }

  // Server-side safe diagnostic log
  console.log("[SERVER_DB_DIAGNOSTIC]", {
    databaseUrlPresent,
    directUrlPresent,
    selectedDatabaseSource,
    databaseUrlScheme,
    databaseUrlHostMasked,
    isDatabaseConfigured: configured,
    select1: { success: select1Success, errorType: select1ErrorType },
    prisma: {
      success: prismaSuccess,
      productCount,
      categoryCount,
      brandCount,
      adminCount,
      errorType: prismaErrorType,
    },
  });

  const responseBody = {
    databaseUrlPresent,
    databaseUrlLength,
    databaseUrlScheme,
    databaseUrlHostMasked,
    directUrlPresent,
    directUrlLength,
    directUrlScheme,
    selectedDatabaseSource,
    isDatabaseConfigured: configured,
    select1: {
      success: select1Success,
      errorType: select1ErrorType,
      errorMessage: select1ErrorMessage,
    },
    prismaConnection: {
      success: prismaSuccess,
      productCount,
      categoryCount,
      brandCount,
      adminCount,
      errorType: prismaErrorType,
      errorMessage: prismaErrorMessage,
    },
  };

  return NextResponse.json(responseBody, { status: 200 });
}
