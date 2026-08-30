// ============================================================
// Categories Data — Jay Shankar Readymade Store
// ============================================================
import { Category } from "@/types";

// ---- CORE WHOLESALE SEGMENTS (isCore: true) ----
// These are the primary business categories — show first everywhere.

export const categories: Category[] = [
  {
    id: "hosiery",
    name: "Hosiery",
    nameHindi: "होजरी",
    slug: "hosiery",
    description:
      "Vests, briefs, socks, innerwear and all hosiery products.",
    icon: "Shirt",
    isCore: true,
    color: "bg-blue-50",
  },
  {
    id: "kolkata-readymade",
    name: "Kolkata Readymade",
    nameHindi: "कोलकाता रेडीमेड",
    slug: "kolkata-readymade",
    description:
      "Premium Kolkata readymade garments — quality wholesale.",
    icon: "Package",
    isCore: true,
    color: "bg-indigo-50",
  },
  {
    id: "umbrella",
    name: "Umbrella",
    nameHindi: "छाता",
    slug: "umbrella",
    description:
      "Wholesale umbrellas — various sizes, designs and quality.",
    icon: "Umbrella",
    isCore: true,
    color: "bg-sky-50",
  },
  {
    id: "panni",
    name: "Panni",
    nameHindi: "पन्नी",
    slug: "panni",
    description:
      "Wholesale plastic bags and panni products for trade and business.",
    icon: "ShoppingBag",
    isCore: true,
    color: "bg-green-50",
  },
  {
    id: "zeel-raincoat",
    name: "Zeel Raincoat",
    nameHindi: "ज़ील रेनकोट",
    slug: "zeel-raincoat",
    description:
      "Raincoats and rainwear products for all seasons.",
    icon: "CloudRain",
    isCore: true,
    color: "bg-cyan-50",
  },
  {
    id: "newar",
    name: "Newar",
    nameHindi: "नेवार",
    slug: "newar",
    description:
      "High quality newar, sweaters and warm innerwear.",
    icon: "Layers",
    isCore: true,
    color: "bg-amber-50",
  },
  {
    id: "tripal",
    name: "Tripal",
    nameHindi: "त्रिपाल",
    slug: "tripal",
    description:
      "Strong and durable tripal for various industrial uses.",
    icon: "Box",
    isCore: true,
    color: "bg-orange-50",
  },
  {
    id: "jhola",
    name: "Jhola",
    nameHindi: "झोला",
    slug: "jhola",
    description:
      "Wholesale jhola, bags and carry products in bulk.",
    icon: "ShoppingBag",
    isCore: true,
    color: "bg-rose-50",
  },

  // ---- ADDITIONAL CATALOGUE CATEGORIES (isCore: false) ----
  // Part of the broader product ecosystem.

  {
    id: "saree",
    name: "Saree",
    nameHindi: "साड़ी",
    slug: "saree",
    description: "Wholesale sarees — various fabrics, designs and occasions.",
    icon: "Sparkles",
    isCore: false,
    color: "bg-pink-50",
  },
  {
    id: "ladies-suit",
    name: "Ladies Suit",
    nameHindi: "लेडीज़ सूट",
    slug: "ladies-suit",
    description: "Wholesale ladies suits — cotton, synthetic, designer.",
    icon: "User",
    isCore: false,
    color: "bg-fuchsia-50",
  },
  {
    id: "jeans",
    name: "Jeans",
    nameHindi: "जींस",
    slug: "jeans",
    description: "Wholesale jeans — men's and women's in various styles.",
    icon: "Shirt",
    isCore: false,
    color: "bg-slate-50",
  },
  {
    id: "shirt",
    name: "Shirt",
    nameHindi: "शर्ट",
    slug: "shirt",
    description:
      "Wholesale shirts — formal, casual, and party wear for men.",
    icon: "Shirt",
    isCore: false,
    color: "bg-blue-50",
  },
  {
    id: "raincoat",
    name: "Raincoat",
    nameHindi: "रेनकोट",
    slug: "raincoat",
    description: "Wholesale raincoats — assorted brands and styles.",
    icon: "CloudRain",
    isCore: false,
    color: "bg-teal-50",
  },
  {
    id: "blanket",
    name: "Blanket",
    nameHindi: "कम्बल",
    slug: "blanket",
    description: "Wholesale blankets and quilts — winter stock.",
    icon: "Box",
    isCore: false,
    color: "bg-purple-50",
  },
  {
    id: "undergarments",
    name: "Undergarments",
    nameHindi: "अंडरगारमेंट",
    slug: "undergarments",
    description: "Wholesale undergarments — men's and women's innerwear.",
    icon: "Shirt",
    isCore: false,
    color: "bg-red-50",
  },
  {
    id: "readymade-garments",
    name: "Readymade Garments",
    nameHindi: "रेडीमेड गारमेंट",
    slug: "readymade-garments",
    description: "General wholesale readymade garments — mixed categories.",
    icon: "Package",
    isCore: false,
    color: "bg-lime-50",
  },
  {
    id: "winter-wear",
    name: "Winter Wear",
    nameHindi: "विंटर वेयर",
    slug: "winter-wear",
    description:
      "Wholesale winter wear — jackets, sweaters, warmers and more.",
    icon: "Wind",
    isCore: false,
    color: "bg-blue-50",
  },
  {
    id: "other-wholesale",
    name: "Other Wholesale Products",
    nameHindi: "अन्य थोक उत्पाद",
    slug: "other-wholesale",
    description:
      "Miscellaneous wholesale products available at Jay Shankar Store.",
    icon: "MoreHorizontal",
    isCore: false,
    color: "bg-gray-50",
  },
];

export const coreCategories = categories.filter((c) => c.isCore);
export const additionalCategories = categories.filter((c) => !c.isCore);

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
