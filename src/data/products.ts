// ============================================================
// Products Data — Jay Shankar Readymade Store
// NOTE: ALL products below are SAMPLE/DEMO DATA.
// isDemo: true — Replace with real catalogue when provided.
// ============================================================
import { Product } from "@/types";

export const products: Product[] = [
  // ---- HOSIERY ----
  {
    id: "p001",
    name: "Men's Cotton Vest (Baniyan)",
    slug: "mens-cotton-vest",
    category: "hosiery",
    brand: "lux",
    description:
      "Premium cotton vests for men — available in all sizes. Wholesale supply for dealers and retailers.",
    shortDescription: "Premium cotton vests — wholesale supply.",
    images: [],
    tags: ["vest", "baniyan", "innerwear", "men", "cotton"],
    isWholesale: true,
    isFeatured: true,
    enquiryAvailable: true,
    isDemo: true,
  },
  {
    id: "p002",
    name: "Men's Brief / Underwear",
    slug: "mens-brief-underwear",
    category: "hosiery",
    brand: "lux",
    description:
      "Cotton briefs and underwear for men — all sizes, wholesale rates available.",
    shortDescription: "Cotton briefs — all sizes, wholesale.",
    images: [],
    tags: ["brief", "underwear", "innerwear", "men"],
    isWholesale: true,
    isFeatured: false,
    enquiryAvailable: true,
    isDemo: true,
  },
  {
    id: "p003",
    name: "Socks (Cotton / Nylon)",
    slug: "socks-cotton-nylon",
    category: "hosiery",
    brand: "essdee",
    description:
      "Wholesale socks — cotton and nylon, men's and children's, assorted designs.",
    shortDescription: "Wholesale socks — assorted designs.",
    images: [],
    tags: ["socks", "cotton", "nylon", "hosiery"],
    isWholesale: true,
    isFeatured: false,
    enquiryAvailable: true,
    isDemo: true,
  },
  // ---- KOLKATA READYMADE ----
  {
    id: "p004",
    name: "Kolkata Cotton Kurti",
    slug: "kolkata-cotton-kurti",
    category: "kolkata-readymade",
    brand: "sharmeelee",
    description:
      "Premium Kolkata cotton kurtis — available in various designs and sizes. Wholesale supply.",
    shortDescription: "Kolkata cotton kurtis — wholesale.",
    images: [],
    tags: ["kurti", "ladies", "kolkata", "cotton"],
    isWholesale: true,
    isFeatured: true,
    enquiryAvailable: true,
    isDemo: true,
  },
  {
    id: "p005",
    name: "Kolkata Printed Saree",
    slug: "kolkata-printed-saree",
    category: "kolkata-readymade",
    brand: "pooja-ragenee",
    description:
      "Kolkata printed sarees — attractive designs, wholesale rates for dealers.",
    shortDescription: "Kolkata printed sarees — wholesale.",
    images: [],
    tags: ["saree", "kolkata", "printed", "ladies"],
    isWholesale: true,
    isFeatured: true,
    enquiryAvailable: true,
    isDemo: true,
  },
  // ---- UMBRELLA ----
  {
    id: "p006",
    name: "Standard Folding Umbrella",
    slug: "standard-folding-umbrella",
    category: "umbrella",
    description:
      "Three-fold compact umbrellas — durable frame, assorted colours. Wholesale supply.",
    shortDescription: "Compact folding umbrellas — wholesale.",
    images: [],
    tags: ["umbrella", "folding", "compact", "rain"],
    isWholesale: true,
    isFeatured: true,
    enquiryAvailable: true,
    isDemo: true,
  },
  {
    id: "p007",
    name: "Large Straight Umbrella",
    slug: "large-straight-umbrella",
    category: "umbrella",
    description:
      "Full-size straight umbrellas for men and women — wholesale available.",
    shortDescription: "Full-size umbrellas — wholesale.",
    images: [],
    tags: ["umbrella", "straight", "large", "men", "women"],
    isWholesale: true,
    isFeatured: false,
    enquiryAvailable: true,
    isDemo: true,
  },
  // ---- ZEEL RAINCOAT ----
  {
    id: "p008",
    name: "Zeel Raincoat (Adult)",
    slug: "zeel-raincoat-adult",
    category: "zeel-raincoat",
    brand: "zeel-rainwear",
    description:
      "Zeel brand waterproof raincoats for adults — various sizes. Wholesale dealer supply.",
    shortDescription: "Zeel raincoats — adult, wholesale.",
    images: [],
    tags: ["raincoat", "zeel", "waterproof", "adult"],
    isWholesale: true,
    isFeatured: true,
    enquiryAvailable: true,
    isDemo: true,
  },
  {
    id: "p009",
    name: "Zeel Children's Raincoat",
    slug: "zeel-childrens-raincoat",
    category: "zeel-raincoat",
    brand: "zeel-rainwear",
    description:
      "Zeel brand colourful raincoats for children — durable and lightweight.",
    shortDescription: "Zeel kids raincoats — wholesale.",
    images: [],
    tags: ["raincoat", "zeel", "children", "kids"],
    isWholesale: true,
    isFeatured: false,
    enquiryAvailable: true,
    isDemo: true,
  },
  // ---- NEWAR ----
  {
    id: "p010",
    name: "Cotton Newar (Webbing Tape)",
    slug: "cotton-newar",
    category: "newar",
    description:
      "Cotton Newar / webbing tape — used in cots, furniture and packaging. Wholesale supply.",
    shortDescription: "Cotton Newar — furniture & trade use.",
    images: [],
    tags: ["newar", "webbing", "cotton", "tape"],
    isWholesale: true,
    isFeatured: false,
    enquiryAvailable: true,
    isDemo: true,
  },
  // ---- TRIPAL ----
  {
    id: "p011",
    name: "Waterproof Tarpaulin (Tripal)",
    slug: "waterproof-tripal",
    category: "tripal",
    description:
      "Heavy-duty waterproof tarpaulin / tripal — various sizes. Wholesale supply.",
    shortDescription: "Heavy-duty tripal — various sizes.",
    images: [],
    tags: ["tripal", "tarpaulin", "waterproof", "heavy-duty"],
    isWholesale: true,
    isFeatured: false,
    enquiryAvailable: true,
    isDemo: true,
  },
  // ---- JHOLA ----
  {
    id: "p012",
    name: "Cotton Jhola (Cloth Bag)",
    slug: "cotton-jhola",
    category: "jhola",
    description:
      "Cotton cloth bags / jhola — various sizes, durable, wholesale supply.",
    shortDescription: "Cotton jhola bags — wholesale.",
    images: [],
    tags: ["jhola", "bag", "cotton", "cloth"],
    isWholesale: true,
    isFeatured: false,
    enquiryAvailable: true,
    isDemo: true,
  },
  // ---- PANNI ----
  {
    id: "p013",
    name: "Plastic Carry Bags (Panni)",
    slug: "plastic-carry-bags",
    category: "panni",
    description:
      "Wholesale plastic carry bags — assorted sizes for retail and trade use.",
    shortDescription: "Plastic carry bags — wholesale.",
    images: [],
    tags: ["panni", "plastic", "bag", "carry"],
    isWholesale: true,
    isFeatured: false,
    enquiryAvailable: true,
    isDemo: true,
  },
  // ---- ADDITIONAL CATEGORIES ----
  {
    id: "p014",
    name: "Ladies Salwar Suit",
    slug: "ladies-salwar-suit",
    category: "ladies-suit",
    brand: "pooja-ragenee",
    description:
      "Ladies salwar suits — cotton and synthetic, various designs, wholesale supply.",
    shortDescription: "Ladies salwar suits — wholesale.",
    images: [],
    tags: ["suit", "ladies", "salwar", "kurta"],
    isWholesale: true,
    isFeatured: true,
    enquiryAvailable: true,
    isDemo: true,
  },
  {
    id: "p015",
    name: "Men's Casual Shirt",
    slug: "mens-casual-shirt",
    category: "shirt",
    brand: "arman",
    description:
      "Men's casual shirts — assorted colours and sizes. Wholesale available.",
    shortDescription: "Men's casual shirts — wholesale.",
    images: [],
    tags: ["shirt", "men", "casual", "readymade"],
    isWholesale: true,
    isFeatured: false,
    enquiryAvailable: true,
    isDemo: true,
  },
  {
    id: "p016",
    name: "Winter Blanket",
    slug: "winter-blanket",
    category: "blanket",
    description:
      "Warm winter blankets — single and double bed sizes, wholesale supply.",
    shortDescription: "Winter blankets — wholesale.",
    images: [],
    tags: ["blanket", "winter", "warm", "bed"],
    isWholesale: true,
    isFeatured: false,
    enquiryAvailable: true,
    isDemo: true,
  },
];

export const featuredProducts = products.filter((p) => p.isFeatured);

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.category === categorySlug);
}

export function getProductsByBrand(brandSlug: string): Product[] {
  return products.filter((p) => p.brand === brandSlug);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase().trim();
  if (!q) return products;
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      (p.brand && p.brand.toLowerCase().includes(q)) ||
      p.tags.some((t) => t.toLowerCase().includes(q)) ||
      p.description.toLowerCase().includes(q)
  );
}
