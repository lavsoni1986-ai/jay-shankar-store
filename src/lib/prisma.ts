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

const connectionString =
  process.env.DATABASE_URL || "postgresql://postgres:postgres@localhost:5432/jayshankar";

const pool = globalForPrisma.pool ?? new Pool({ connectionString });
const adapter = new PrismaPg(pool);

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
  globalForPrisma.pool = pool;
}

/**
 * Check whether a real production database URL is configured
 */
export function isDatabaseConfigured(): boolean {
  const url = process.env.DATABASE_URL?.trim();
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
