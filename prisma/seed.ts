// ============================================================
// Database Seed Script — Jay Shankar Readymade Store
// Idempotent migration of verified categories, brands, sample products & admin
// ============================================================

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// Data from verified business catalogue
const categoriesData = [
  // CORE WHOLESALE SEGMENTS (isCore: true)
  {
    name: "Hosiery",
    nameHindi: "होजरी",
    slug: "hosiery",
    description: "Vests, briefs, socks, innerwear and all hosiery items — wholesale supply.",
    icon: "Shirt",
    isCore: true,
    color: "bg-blue-50",
    sortOrder: 1,
  },
  {
    name: "Kolkata Readymade",
    nameHindi: "कोलकाता रेडीमेड",
    slug: "kolkata-readymade",
    description: "Premium Kolkata readymade garments — sarees, suits, kurtas and more.",
    icon: "Package",
    isCore: true,
    color: "bg-indigo-50",
    sortOrder: 2,
  },
  {
    name: "Umbrella",
    nameHindi: "छाता",
    slug: "umbrella",
    description: "Wholesale umbrellas — various sizes, designs and colours for all seasons.",
    icon: "Umbrella",
    isCore: true,
    color: "bg-sky-50",
    sortOrder: 3,
  },
  {
    name: "Panni",
    nameHindi: "पन्नी",
    slug: "panni",
    description: "Wholesale plastic bags and panni products for trade and retail use.",
    icon: "ShoppingBag",
    isCore: true,
    color: "bg-green-50",
    sortOrder: 4,
  },
  {
    name: "Zeel Raincoat",
    nameHindi: "ज़ील रेनकोट",
    slug: "zeel-raincoat",
    description: "Zeel branded raincoats — durable, waterproof, wholesale available.",
    icon: "CloudRain",
    isCore: true,
    color: "bg-cyan-50",
    sortOrder: 5,
  },
  {
    name: "Newar",
    nameHindi: "नेवार",
    slug: "newar",
    description: "Wholesale Newar — cotton/nylon webbing tape used in furniture and handicrafts.",
    icon: "Layers",
    isCore: true,
    color: "bg-amber-50",
    sortOrder: 6,
  },
  {
    name: "Tripal",
    nameHindi: "त्रिपाल",
    slug: "tripal",
    description: "Heavy-duty tarpaulin / tripal sheets — waterproof, wholesale supply.",
    icon: "Box",
    isCore: true,
    color: "bg-orange-50",
    sortOrder: 7,
  },
  {
    name: "Jhola",
    nameHindi: "झोला",
    slug: "jhola",
    description: "Cloth bags / jhola — various sizes, wholesale for trade use.",
    icon: "ShoppingBag",
    isCore: true,
    color: "bg-rose-50",
    sortOrder: 8,
  },
  // ADDITIONAL CATEGORIES (isCore: false)
  {
    name: "Saree",
    nameHindi: "साड़ी",
    slug: "saree",
    description: "Wholesale sarees — various fabrics, designs and occasions.",
    icon: "Sparkles",
    isCore: false,
    color: "bg-pink-50",
    sortOrder: 9,
  },
  {
    name: "Ladies Suit",
    nameHindi: "लेडीज़ सूट",
    slug: "ladies-suit",
    description: "Wholesale ladies suits — cotton, synthetic, designer.",
    icon: "User",
    isCore: false,
    color: "bg-fuchsia-50",
    sortOrder: 10,
  },
  {
    name: "Jeans",
    nameHindi: "जींस",
    slug: "jeans",
    description: "Wholesale jeans — men's and women's in various styles.",
    icon: "Shirt",
    isCore: false,
    color: "bg-slate-50",
    sortOrder: 11,
  },
  {
    name: "Shirt",
    nameHindi: "शर्ट",
    slug: "shirt",
    description: "Wholesale shirts — formal, casual, and party wear for men.",
    icon: "Shirt",
    isCore: false,
    color: "bg-blue-50",
    sortOrder: 12,
  },
  {
    name: "Raincoat",
    nameHindi: "रेनकोट",
    slug: "raincoat",
    description: "Wholesale raincoats — assorted brands and styles.",
    icon: "CloudRain",
    isCore: false,
    color: "bg-teal-50",
    sortOrder: 13,
  },
  {
    name: "Blanket",
    nameHindi: "कम्बल",
    slug: "blanket",
    description: "Wholesale blankets and quilts — winter stock.",
    icon: "Box",
    isCore: false,
    color: "bg-purple-50",
    sortOrder: 14,
  },
  {
    name: "Undergarments",
    nameHindi: "अंडरगारमेंट",
    slug: "undergarments",
    description: "Wholesale undergarments — men's and women's innerwear.",
    icon: "Shirt",
    isCore: false,
    color: "bg-red-50",
    sortOrder: 15,
  },
  {
    name: "Readymade Garments",
    nameHindi: "रेडीमेड गारमेंट",
    slug: "readymade-garments",
    description: "General wholesale readymade garments — mixed categories.",
    icon: "Package",
    isCore: false,
    color: "bg-lime-50",
    sortOrder: 16,
  },
  {
    name: "Winter Wear",
    nameHindi: "विंटर वेयर",
    slug: "winter-wear",
    description: "Wholesale winter wear — jackets, sweaters, warmers and more.",
    icon: "Wind",
    isCore: false,
    color: "bg-blue-50",
    sortOrder: 17,
  },
  {
    name: "Other Wholesale Products",
    nameHindi: "अन्य थोक उत्पाद",
    slug: "other-wholesale",
    description: "Miscellaneous wholesale products available at Jay Shankar Store.",
    icon: "MoreHorizontal",
    isCore: false,
    color: "bg-gray-50",
    sortOrder: 18,
  },
];

const brandsData = [
  {
    name: "Lux",
    slug: "lux",
    description: "Lux innerwear and hosiery products — available wholesale at Jay Shankar Store.",
    logoPlaceholder: "LUX",
    accentColor: "#1e40af",
    sortOrder: 1,
  },
  {
    name: "Essdee",
    slug: "essdee",
    description: "Essdee hosiery products — wholesale supply for dealers and retailers.",
    logoPlaceholder: "SD",
    accentColor: "#0f766e",
    sortOrder: 2,
  },
  {
    name: "Zeel Rainwear",
    slug: "zeel-rainwear",
    description: "Zeel Rainwear — wholesale raincoats and rain protection products.",
    logoPlaceholder: "ZR",
    accentColor: "#0369a1",
    sortOrder: 3,
  },
  {
    name: "Sharmeelee",
    slug: "sharmeelee",
    description: "Sharmeelee — readymade garments and fashion products, wholesale available.",
    logoPlaceholder: "SH",
    accentColor: "#7c3aed",
    sortOrder: 4,
  },
  {
    name: "Pooja Ragenee",
    slug: "pooja-ragenee",
    description: "Pooja Ragenee — ladies readymade and fashion products, wholesale supply.",
    logoPlaceholder: "PR",
    accentColor: "#db2777",
    sortOrder: 5,
  },
  {
    name: "Arman",
    slug: "arman",
    description: "Arman — readymade garments and fashion products available at wholesale rates.",
    logoPlaceholder: "AR",
    accentColor: "#b45309",
    sortOrder: 6,
  },
];

const sampleProductsData = [
  {
    name: "Men's Cotton Vest (Baniyan)",
    slug: "mens-cotton-vest",
    categorySlug: "hosiery",
    brandSlug: "lux",
    description: "Premium cotton vests for men — available in all sizes. Wholesale supply for dealers and retailers.",
    shortDescription: "Premium cotton vests — wholesale supply.",
    tags: ["vest", "baniyan", "innerwear", "men", "cotton"],
    isWholesale: true,
    isFeatured: true,
    isPublished: true,
    enquiryAvailable: true,
    isDemo: true,
    sortOrder: 1,
  },
  {
    name: "Men's Brief / Underwear",
    slug: "mens-brief-underwear",
    categorySlug: "hosiery",
    brandSlug: "lux",
    description: "Cotton briefs and underwear for men — all sizes, wholesale rates available.",
    shortDescription: "Cotton briefs — all sizes, wholesale.",
    tags: ["brief", "underwear", "innerwear", "men"],
    isWholesale: true,
    isFeatured: false,
    isPublished: true,
    enquiryAvailable: true,
    isDemo: true,
    sortOrder: 2,
  },
  {
    name: "Socks (Cotton / Nylon)",
    slug: "socks-cotton-nylon",
    categorySlug: "hosiery",
    brandSlug: "essdee",
    description: "Wholesale socks — cotton and nylon, men's and children's, assorted designs.",
    shortDescription: "Wholesale socks — assorted designs.",
    tags: ["socks", "cotton", "nylon", "hosiery"],
    isWholesale: true,
    isFeatured: false,
    isPublished: true,
    enquiryAvailable: true,
    isDemo: true,
    sortOrder: 3,
  },
  {
    name: "Kolkata Cotton Kurti",
    slug: "kolkata-cotton-kurti",
    categorySlug: "kolkata-readymade",
    brandSlug: "sharmeelee",
    description: "Premium Kolkata cotton kurtis — available in various designs and sizes. Wholesale supply.",
    shortDescription: "Kolkata cotton kurtis — wholesale.",
    tags: ["kurti", "ladies", "kolkata", "cotton"],
    isWholesale: true,
    isFeatured: true,
    isPublished: true,
    enquiryAvailable: true,
    isDemo: true,
    sortOrder: 4,
  },
  {
    name: "Kolkata Printed Saree",
    slug: "kolkata-printed-saree",
    categorySlug: "kolkata-readymade",
    brandSlug: "pooja-ragenee",
    description: "Kolkata printed sarees — attractive designs, wholesale rates for dealers.",
    shortDescription: "Kolkata printed sarees — wholesale.",
    tags: ["saree", "kolkata", "printed", "ladies"],
    isWholesale: true,
    isFeatured: true,
    isPublished: true,
    enquiryAvailable: true,
    isDemo: true,
    sortOrder: 5,
  },
  {
    name: "Standard Folding Umbrella",
    slug: "standard-folding-umbrella",
    categorySlug: "umbrella",
    brandSlug: null,
    description: "Three-fold compact umbrellas — durable frame, assorted colours. Wholesale supply.",
    shortDescription: "Compact folding umbrellas — wholesale.",
    tags: ["umbrella", "folding", "compact", "rain"],
    isWholesale: true,
    isFeatured: true,
    isPublished: true,
    enquiryAvailable: true,
    isDemo: true,
    sortOrder: 6,
  },
  {
    name: "Large Straight Umbrella",
    slug: "large-straight-umbrella",
    categorySlug: "umbrella",
    brandSlug: null,
    description: "Full-size straight umbrellas for men and women — wholesale available.",
    shortDescription: "Full-size umbrellas — wholesale.",
    tags: ["umbrella", "straight", "large", "men", "women"],
    isWholesale: true,
    isFeatured: false,
    isPublished: true,
    enquiryAvailable: true,
    isDemo: true,
    sortOrder: 7,
  },
  {
    name: "Zeel Raincoat (Adult)",
    slug: "zeel-raincoat-adult",
    categorySlug: "zeel-raincoat",
    brandSlug: "zeel-rainwear",
    description: "Zeel brand waterproof raincoats for adults — various sizes. Wholesale dealer supply.",
    shortDescription: "Zeel raincoats — adult, wholesale.",
    tags: ["raincoat", "zeel", "waterproof", "adult"],
    isWholesale: true,
    isFeatured: true,
    isPublished: true,
    enquiryAvailable: true,
    isDemo: true,
    sortOrder: 8,
  },
  {
    name: "Zeel Children's Raincoat",
    slug: "zeel-childrens-raincoat",
    categorySlug: "zeel-raincoat",
    brandSlug: "zeel-rainwear",
    description: "Zeel brand colourful raincoats for children — durable and lightweight.",
    shortDescription: "Zeel kids raincoats — wholesale.",
    tags: ["raincoat", "zeel", "children", "kids"],
    isWholesale: true,
    isFeatured: false,
    isPublished: true,
    enquiryAvailable: true,
    isDemo: true,
    sortOrder: 9,
  },
  {
    name: "Cotton Newar (Webbing Tape)",
    slug: "cotton-newar",
    categorySlug: "newar",
    brandSlug: null,
    description: "Cotton Newar / webbing tape — used in cots, furniture and packaging. Wholesale supply.",
    shortDescription: "Cotton Newar — furniture & trade use.",
    tags: ["newar", "webbing", "cotton", "tape"],
    isWholesale: true,
    isFeatured: false,
    isPublished: true,
    enquiryAvailable: true,
    isDemo: true,
    sortOrder: 10,
  },
  {
    name: "Waterproof Tarpaulin (Tripal)",
    slug: "waterproof-tripal",
    categorySlug: "tripal",
    brandSlug: null,
    description: "Heavy-duty waterproof tarpaulin / tripal — various sizes. Wholesale supply.",
    shortDescription: "Heavy-duty tripal — various sizes.",
    tags: ["tripal", "tarpaulin", "waterproof", "heavy-duty"],
    isWholesale: true,
    isFeatured: false,
    isPublished: true,
    enquiryAvailable: true,
    isDemo: true,
    sortOrder: 11,
  },
  {
    name: "Cotton Jhola (Cloth Bag)",
    slug: "cotton-jhola",
    categorySlug: "jhola",
    brandSlug: null,
    description: "Cotton cloth bags / jhola — various sizes, durable, wholesale supply.",
    shortDescription: "Cotton jhola bags — wholesale.",
    tags: ["jhola", "bag", "cotton", "cloth"],
    isWholesale: true,
    isFeatured: false,
    isPublished: true,
    enquiryAvailable: true,
    isDemo: true,
    sortOrder: 12,
  },
  {
    name: "Plastic Carry Bags (Panni)",
    slug: "plastic-carry-bags",
    categorySlug: "panni",
    brandSlug: null,
    description: "Wholesale plastic carry bags — assorted sizes for retail and trade use.",
    shortDescription: "Plastic carry bags — wholesale.",
    tags: ["panni", "plastic", "bag", "carry"],
    isWholesale: true,
    isFeatured: false,
    isPublished: true,
    enquiryAvailable: true,
    isDemo: true,
    sortOrder: 13,
  },
  {
    name: "Ladies Salwar Suit",
    slug: "ladies-salwar-suit",
    categorySlug: "ladies-suit",
    brandSlug: "pooja-ragenee",
    description: "Ladies salwar suits — cotton and synthetic, various designs, wholesale supply.",
    shortDescription: "Ladies salwar suits — wholesale.",
    tags: ["suit", "ladies", "salwar", "kurta"],
    isWholesale: true,
    isFeatured: true,
    isPublished: true,
    enquiryAvailable: true,
    isDemo: true,
    sortOrder: 14,
  },
  {
    name: "Men's Casual Shirt",
    slug: "mens-casual-shirt",
    categorySlug: "shirt",
    brandSlug: "arman",
    description: "Men's casual shirts — assorted colours and sizes. Wholesale available.",
    shortDescription: "Men's casual shirts — wholesale.",
    tags: ["shirt", "men", "casual", "readymade"],
    isWholesale: true,
    isFeatured: false,
    isPublished: true,
    enquiryAvailable: true,
    isDemo: true,
    sortOrder: 15,
  },
  {
    name: "Winter Blanket",
    slug: "winter-blanket",
    categorySlug: "blanket",
    brandSlug: null,
    description: "Warm winter blankets — single and double bed sizes, wholesale supply.",
    shortDescription: "Winter blankets — wholesale.",
    tags: ["blanket", "winter", "warm", "bed"],
    isWholesale: true,
    isFeatured: false,
    isPublished: true,
    enquiryAvailable: true,
    isDemo: true,
    sortOrder: 16,
  },
];

async function main() {
  console.log("🌱 Starting idempotent database seed for Jay Shankar Readymade Store...");

  // 1. Seed Categories
  console.log("📦 Seeding categories...");
  const categoryMap = new Map<string, string>(); // slug -> id
  for (const cat of categoriesData) {
    const upserted = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {
        name: cat.name,
        nameHindi: cat.nameHindi,
        description: cat.description,
        icon: cat.icon,
        isCore: cat.isCore,
        color: cat.color,
        sortOrder: cat.sortOrder,
      },
      create: cat,
    });
    categoryMap.set(cat.slug, upserted.id);
  }
  console.log(`✓ Seeded ${categoriesData.length} categories.`);

  // 2. Seed Brands
  console.log("🏷️  Seeding brands...");
  const brandMap = new Map<string, string>(); // slug -> id
  for (const brand of brandsData) {
    const upserted = await prisma.brand.upsert({
      where: { slug: brand.slug },
      update: {
        name: brand.name,
        description: brand.description,
        logoPlaceholder: brand.logoPlaceholder,
        accentColor: brand.accentColor,
        sortOrder: brand.sortOrder,
      },
      create: brand,
    });
    brandMap.set(brand.slug, upserted.id);
  }
  console.log(`✓ Seeded ${brandsData.length} brands.`);

  // 3. Seed Sample Products
  console.log("👕 Seeding sample products...");
  for (const p of sampleProductsData) {
    const categoryId = categoryMap.get(p.categorySlug);
    if (!categoryId) {
      console.warn(`Category ${p.categorySlug} not found for product ${p.slug}`);
      continue;
    }
    const brandId = p.brandSlug ? brandMap.get(p.brandSlug) ?? null : null;

    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {
        name: p.name,
        description: p.description,
        shortDescription: p.shortDescription,
        categoryId,
        brandId,
        tags: p.tags,
        isWholesale: p.isWholesale,
        isFeatured: p.isFeatured,
        isPublished: p.isPublished,
        enquiryAvailable: p.enquiryAvailable,
        isDemo: p.isDemo,
        sortOrder: p.sortOrder,
      },
      create: {
        name: p.name,
        slug: p.slug,
        description: p.description,
        shortDescription: p.shortDescription,
        categoryId,
        brandId,
        tags: p.tags,
        isWholesale: p.isWholesale,
        isFeatured: p.isFeatured,
        isPublished: p.isPublished,
        enquiryAvailable: p.enquiryAvailable,
        isDemo: p.isDemo,
        sortOrder: p.sortOrder,
      },
    });
  }
  console.log(`✓ Seeded ${sampleProductsData.length} products.`);

  // 4. Seed Initial Admin (from Environment Variables)
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_INITIAL_PASSWORD;

  if (adminEmail && adminPassword) {
    console.log(`🔐 Processing admin user '${adminEmail}' from environment...`);
    const existingAdmin = await prisma.adminUser.findUnique({
      where: { email: adminEmail.toLowerCase().trim() },
    });

    if (existingAdmin) {
      console.log(`ℹ️  Admin user '${adminEmail}' already exists. Preserving existing password.`);
    } else {
      const passwordHash = await bcrypt.hash(adminPassword, 12);
      await prisma.adminUser.create({
        data: {
          email: adminEmail.toLowerCase().trim(),
          passwordHash,
          name: "Utkarsh (Admin)",
          role: "ADMIN",
        },
      });
      console.log(`✓ Initial admin user '${adminEmail}' created securely.`);
    }
  } else {
    console.log("ℹ️  Note: ADMIN_EMAIL or ADMIN_INITIAL_PASSWORD not set in environment. Skipping initial admin seed.");
  }

  console.log("✨ Seed completed successfully.");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
