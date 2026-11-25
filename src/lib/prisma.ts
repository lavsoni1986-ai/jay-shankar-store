// ============================================================
// Prisma Client Singleton with PostgreSQL Adapter — Jay Shankar Store
// ============================================================

import { PrismaClient } from "@/generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  pool: Pool | undefined;
};

/**
 * Safely clean environment variables by removing accidental quotes and whitespace
 */
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

/**
 * Get active connection string from DATABASE_URL or DIRECT_URL
 */
function getResolvedConnectionString(): string {
  let url = cleanEnvUrl(process.env.DATABASE_URL) || cleanEnvUrl(process.env.DIRECT_URL);
  if (!url) {
    return "postgresql://postgres:postgres@localhost:5432/jayshankar";
  }

  // Explicitly upgrade legacy 'sslmode=require' to 'sslmode=verify-full' to prevent
  // pg v8.23+ SECURITY WARNING deprecation noise. Neon PostgreSQL natively supports
  // verify-full with valid public CA certificates.
  if (url.includes("sslmode=require") && !url.includes("uselibpqcompat")) {
    url = url.replace("sslmode=require", "sslmode=verify-full");
  }

  return url;
}

const connectionString = getResolvedConnectionString();

const pool = globalForPrisma.pool ?? new Pool({ connectionString });
const adapter = new PrismaPg(pool);

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === "development"
        ? process.env.PRISMA_LOG_QUERIES === "true"
          ? ["query", "error", "warn"]
          : ["error", "warn"]
        : ["error"],
  });

// Always cache client and pool on globalThis to prevent connection leaks in serverless runtimes
globalForPrisma.prisma = prisma;
globalForPrisma.pool = pool;

/**
 * Check whether a real production database URL is configured
 */
export function isDatabaseConfigured(): boolean {
  const dbUrl = cleanEnvUrl(process.env.DATABASE_URL);
  const directUrl = cleanEnvUrl(process.env.DIRECT_URL);
  const url = dbUrl || directUrl;

  if (!url) return false;
  // Ignore unfilled placeholders
  if (
    url.includes("YOUR_") ||
    url.includes("your_") ||
    (!url.startsWith("postgresql://") && !url.startsWith("postgres://"))
  ) {
    return false;
  }
  return true;
}

/**
 * Safe diagnostic logging that reports presence, lengths, and schemes
 * without ever exposing passwords, connection strings, credentials, or secrets.
 */
export function logSafeDatabaseDiagnostics(): void {
  const rawDbUrl = process.env.DATABASE_URL;
  const rawDirectUrl = process.env.DIRECT_URL;
  const cleanDbUrl = cleanEnvUrl(rawDbUrl);
  const cleanDirectUrl = cleanEnvUrl(rawDirectUrl);

  const getScheme = (u: string) => (u.includes("://") ? u.split("://")[0] : "none");

  console.log("[DB_DIAGNOSTICS]", {
    DATABASE_URL: {
      present: Boolean(cleanDbUrl.length > 0),
      length: rawDbUrl ? rawDbUrl.length : 0,
      scheme: getScheme(cleanDbUrl),
    },
    DIRECT_URL: {
      present: Boolean(cleanDirectUrl.length > 0),
      length: rawDirectUrl ? rawDirectUrl.length : 0,
      scheme: getScheme(cleanDirectUrl),
    },
    selectedSource: cleanDbUrl ? "DATABASE_URL" : cleanDirectUrl ? "DIRECT_URL" : "default_fallback",
    isConfigured: isDatabaseConfigured(),
  });
}

/**
 * Minimal server-side database connectivity test (SELECT 1 & Product count)
 */
export async function verifyDatabaseConnectivity(): Promise<{
  selectOneSuccess: boolean;
  productQuerySuccess: boolean;
  productCount?: number;
  error?: string;
}> {
  try {
    // 1. Raw query test (SELECT 1)
    await prisma.$queryRawUnsafe("SELECT 1 as health");

    // 2. Prisma model query test
    const productCount = await prisma.product.count();

    return {
      selectOneSuccess: true,
      productQuerySuccess: true,
      productCount,
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Unknown database query failure";
    console.error("[DB_CONNECTIVITY_TEST_ERROR]", errorMsg);
    return {
      selectOneSuccess: false,
      productQuerySuccess: false,
      error: errorMsg,
    };
  }
}

