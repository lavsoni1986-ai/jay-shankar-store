// ============================================================
// Brands Data — Jay Shankar Readymade Store
// REAL CLIENT DATA — 6 confirmed brand associations
// Neutral wording: "हमारे प्रमुख ब्रांड" — no ownership claims invented
// ============================================================
import { Brand } from "@/types";

export const brands: Brand[] = [
  {
    id: "lux",
    name: "Lux",
    slug: "lux",
    description:
      "Lux innerwear and hosiery products — available wholesale at Jay Shankar Store.",
    categories: ["hosiery", "undergarments"],
    logoPlaceholder: "LUX",
    accentColor: "#1e40af",
  },
  {
    id: "essdee",
    name: "Essdee",
    slug: "essdee",
    description:
      "Essdee hosiery products — wholesale supply for dealers and retailers.",
    categories: ["hosiery", "undergarments"],
    logoPlaceholder: "SD",
    accentColor: "#0f766e",
  },
  {
    id: "zeel-rainwear",
    name: "Zeel Rainwear",
    slug: "zeel-rainwear",
    description:
      "Zeel Rainwear — wholesale raincoats and rain protection products.",
    categories: ["zeel-raincoat", "raincoat"],
    logoPlaceholder: "ZR",
    accentColor: "#0369a1",
  },
  {
    id: "sharmeelee",
    name: "Sharmeelee",
    slug: "sharmeelee",
    description:
      "Sharmeelee — readymade garments and fashion products, wholesale available.",
    categories: ["kolkata-readymade", "saree", "ladies-suit"],
    logoPlaceholder: "SH",
    accentColor: "#7c3aed",
  },
  {
    id: "pooja-ragenee",
    name: "Pooja Ragenee",
    slug: "pooja-ragenee",
    description:
      "Pooja Ragenee — ladies readymade and fashion products, wholesale supply.",
    categories: ["kolkata-readymade", "saree", "ladies-suit"],
    logoPlaceholder: "PR",
    accentColor: "#db2777",
  },
  {
    id: "arman",
    name: "Arman",
    slug: "arman",
    description:
      "Arman — readymade garments and fashion products available at wholesale rates.",
    categories: ["readymade-garments", "shirt", "jeans"],
    logoPlaceholder: "AR",
    accentColor: "#b45309",
  },
];

export function getBrandBySlug(slug: string): Brand | undefined {
  return brands.find((b) => b.slug === slug);
}
