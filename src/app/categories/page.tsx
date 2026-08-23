import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import { coreCategories, additionalCategories } from "@/data/categories";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CategoryCard } from "@/components/ui/CategoryCard";
import { StickyWhatsApp } from "@/components/ui/StickyWhatsApp";

export const metadata: Metadata = {
  title: "उत्पाद श्रेणियाँ | थोक रेडीमेड और होजरी",
  description:
    "Jay Shankar Readymade Store की सभी थोक श्रेणियाँ — Hosiery, Kolkata Readymade, Umbrella, Panni, Raincoat, Newar, Tripal, Jhola और अधिक।",
  alternates: {
    canonical: `${siteConfig.url}/categories`,
  },
};

export default function CategoriesPage() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* Header */}
      <div className="bg-[#0F2A5C] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-xs text-white/50">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-white/80" aria-current="page">Categories</li>
            </ol>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
            उत्पाद श्रेणियाँ
          </h1>
          <p className="text-white/60 text-sm">
            सभी थोक श्रेणियाँ — मुख्य और अतिरिक्त
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Core Wholesale Categories */}
        <section aria-labelledby="core-cat-heading" className="mb-14">
          <SectionHeader
            title="मुख्य थोक श्रेणियाँ"
            titleHindi="Core Wholesale Segments"
            subtitle="हमारे प्राथमिक थोक व्यापार की श्रेणियाँ"
            align="left"
            id="core-cat-heading"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {coreCategories.map((cat) => (
              <CategoryCard key={cat.slug} category={cat} showEnquiry={true} />
            ))}
          </div>
        </section>

        {/* Additional Categories */}
        <section aria-labelledby="additional-cat-heading">
          <SectionHeader
            title="अतिरिक्त उत्पाद श्रेणियाँ"
            titleHindi="Additional Categories"
            subtitle="हमारे विस्तृत थोक कैटलॉग की अन्य श्रेणियाँ"
            align="left"
            id="additional-cat-heading"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {additionalCategories.map((cat) => (
              <CategoryCard key={cat.slug} category={cat} showEnquiry={true} />
            ))}
          </div>
        </section>
      </div>

      <StickyWhatsApp />
    </div>
  );
}
