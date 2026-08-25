import "dotenv/config";
import { defineConfig } from "prisma/config";

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

const databaseUrl = cleanEnvUrl(process.env.DATABASE_URL) || cleanEnvUrl(process.env.DIRECT_URL) || "";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    seed: 'ts-node --compiler-options {"module":"CommonJS"} prisma/seed.ts',
  },
  datasource: {
    url: databaseUrl,
  },
});



