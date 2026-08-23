import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import { ProductGrid } from "@/components/products/ProductGrid";
import { StickyWhatsApp } from "@/components/ui/StickyWhatsApp";
import { getPublishedProducts } from "@/lib/db/products";
import { getCategories } from "@/lib/db/categories";
import { getBrands } from "@/lib/db/brands";

export const metadata: Metadata = {
  title: "उत्पाद कैटलॉग | थोक रेडीमेड और होजरी",
  description:
    "Jay Shankar Readymade Store का थोक उत्पाद कैटलॉग — Hosiery, Kolkata Readymade, Umbrella, Raincoat, Newar, Tripal, Jhola और अधिक। थोक भाव के लिए WhatsApp: 7000766562",
  alternates: {
    canonical: `${siteConfig.url}/products`,
  },
};

export default async function ProductsPage() {
  const [products, categories, brands] = await Promise.all([
    getPublishedProducts(),
    getCategories(),
    getBrands(),
  ]);

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* Page header */}
      <div className="bg-[#0F2A5C] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-xs text-white/50">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-white/80" aria-current="page">
                Products
              </li>
            </ol>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
            उत्पाद कैटलॉग
          </h1>
          <p className="text-white/60 text-sm">
            थोक रेडीमेड, होजरी और अधिक — सभी उत्पाद एक स्थान पर ({products.length} उत्पाद)
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <ProductGrid
          initialProducts={products}
          initialCategories={categories}
          initialBrands={brands}
        />
      </div>

      <StickyWhatsApp />
    </div>
  );
}
