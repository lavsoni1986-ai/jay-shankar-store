import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import { ProductGrid } from "@/components/products/ProductGrid";
import { StickyWhatsApp } from "@/components/ui/StickyWhatsApp";
import { getPublishedProducts } from "@/lib/db/products";
import { getCategories } from "@/lib/db/categories";
import { getBrands } from "@/lib/db/brands";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "थोक उत्पाद कैटलॉग | Jay Shankar Readymade Store",
  description:
    "Jay Shankar Readymade Store — शहडोल, MP का संपूर्ण थोक रेडीमेड और होजरी कैटलॉग। Hosiery, Kolkata Readymade, Rainwear, Umbrellas, Newar, Tripal, Jhola। थोक भाव के लिए WhatsApp: 7000766562",
  alternates: {
    canonical: `${siteConfig.url}/products`,
  },
  openGraph: {
    url: `${siteConfig.url}/products`,
    title: "थोक उत्पाद कैटलॉग | Jay Shankar Readymade Store",
    description: "शहडोल, MP में थोक रेडीमेड और होजरी का प्रमुख कैटलॉग।",
  },
};

export default async function ProductsPage() {
  const [products, categories, brands] = await Promise.all([
    getPublishedProducts(),
    getCategories(),
    getBrands(),
  ]);

  return (
    <div className="bg-[#F3EFE8] min-h-screen">
      {/* Editorial Catalogue Header */}
      <div className="bg-gradient-to-b from-[#1C1C1E] via-[#242426] to-[#1F1F21] text-white py-10 sm:py-14 border-b border-[#B77B50]/25 relative overflow-hidden">
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(183,123,80,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(183,123,80,0.5) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-3.5">
            <ol className="flex items-center gap-2 text-xs text-[#D8C9B7]/70 flex-wrap font-medium">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-[#B77B50]">/</li>
              <li className="text-[#D4A37F] font-semibold" aria-current="page">
                Products Catalogue
              </li>
            </ol>
          </nav>

          {/* Editorial Kicker */}
          <p className="text-xs sm:text-sm font-bold text-[#B77B50] uppercase tracking-widest mb-1.5 font-sans">
            थोक कैटलॉग संग्रह &bull; WHOLESALE CATALOGUE
          </p>

          {/* Main Title */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 leading-tight font-display">
            समस्त थोक उत्पाद संग्रह
          </h1>

          {/* Subtitle & Verified Count */}
          <p className="text-xs sm:text-sm text-[#D8C9B7] max-w-2xl leading-relaxed text-hindi">
            होजरी, कोलकाता रेडीमेड, वाटरप्रूफ रेनवेयर, छाता एवं थोक वस्त्र सामग्री — शहडोल (म.प्र.) में प्रमाणित गुणवत्ता एवं थोक भाव पर उपलब्ध ({products.length} उत्पाद)।
          </p>
        </div>
      </div>

      {/* Main Catalogue Grid Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <ProductGrid
          initialProducts={products}
          initialCategories={categories}
          initialBrands={brands}
        />
      </div>

      {/* Floating Desktop WhatsApp Enquiry */}
      <StickyWhatsApp />
    </div>
  );
}
