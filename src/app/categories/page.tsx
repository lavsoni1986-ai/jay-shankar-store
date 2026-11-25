import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import { getCategories } from "@/lib/db/categories";
import { CategoryCard } from "@/components/ui/CategoryCard";
import { StickyWhatsApp } from "@/components/ui/StickyWhatsApp";
import { Layers, Sparkles } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "उत्पाद श्रेणियाँ | थोक रेडीमेड और होजरी संग्रह",
  description:
    "Jay Shankar Readymade Store की सभी थोक श्रेणियाँ — Hosiery, Kolkata Readymade, Umbrella, Panni, Raincoat, Newar, Tripal, Jhola और अधिक।",
  alternates: {
    canonical: `${siteConfig.url}/categories`,
  },
};

export default async function CategoriesPage() {
  const allCategories = await getCategories();
  const coreCategories = allCategories.filter((c) => c.isCore);
  const additionalCategories = allCategories.filter((c) => !c.isCore);

  return (
    <div className="bg-[#F3EFE8] min-h-screen text-[#242426]">
      {/* Editorial Header */}
      <section className="bg-[#242426] text-[#F3EFE8] pt-10 pb-12 sm:pt-14 sm:pb-16 border-b border-[#39383B] relative overflow-hidden">
        {/* Subtle decorative background glow */}
        <div 
          className="absolute -top-24 right-0 w-96 h-96 bg-[#B77B50]/10 rounded-full blur-3xl pointer-events-none" 
          aria-hidden="true" 
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-xs text-[#D8C9B7]/70">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-[#D4A37F] font-semibold" aria-current="page">
                Categories
              </li>
            </ol>
          </nav>

          {/* Kicker badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#39383B] border border-[#B77B50]/40 text-[#D4A37F] text-xs font-bold tracking-widest uppercase mb-4">
            <Layers size={13} className="text-[#B77B50]" aria-hidden="true" />
            <span>थोक उत्पाद श्रेणियाँ &bull; PRODUCT CATEGORIES</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight font-display text-hindi mb-3">
                समस्त थोक श्रेणियाँ
              </h1>
              <p className="text-sm sm:text-base text-[#D8C9B7] max-w-2xl leading-relaxed text-hindi font-sans">
                शहडोल एवं विंध्य क्षेत्र के खुदरा व्यापारियों व कपड़ा प्रतिष्ठानों के लिए उपलब्ध प्रमाणित थोक श्रेणियाँ। अपनी आवश्यकतानुसार श्रेणी चुनें और ताज़ा पार्सल दरें जानें।
              </p>
            </div>

            {/* Total categories badge */}
            <div className="shrink-0">
              <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#39383B]/80 border border-[#B77B50]/30 text-xs sm:text-sm font-semibold text-white">
                <span className="w-2.5 h-2.5 rounded-full bg-[#B77B50] animate-pulse" />
                <span>कुल <strong className="text-[#D4A37F] font-bold">{allCategories.length}</strong> श्रेणियाँ उपलब्ध</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Core Wholesale Categories */}
        <section aria-labelledby="core-cat-heading" className="mb-14 sm:mb-16">
          <div className="flex items-center gap-2.5 mb-2">
            <Sparkles size={16} className="text-[#B77B50]" aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#B77B50]">
              प्राथमिक थोक खंड &bull; Primary Wholesale
            </span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6 sm:mb-8 pb-3 border-b border-[#E3DED6]">
            <div>
              <h2 id="core-cat-heading" className="text-2xl sm:text-3xl font-bold text-[#242426] font-display text-hindi">
                मुख्य थोक श्रेणियाँ
              </h2>
              <p className="text-xs sm:text-sm text-[#686469] text-hindi mt-1">
                दैनिक थोक मांग और सर्वाधिक चलने वाले रेडीमेड एवं वस्त्र खंड
              </p>
            </div>
            <span className="text-xs font-bold text-[#B77B50] bg-white px-3 py-1 rounded-full border border-[#E3DED6] self-start sm:self-auto">
              {coreCategories.length} मुख्य श्रेणियाँ
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {coreCategories.map((cat) => (
              <CategoryCard key={cat.slug} category={cat} showEnquiry={true} />
            ))}
          </div>
        </section>

        {/* Additional Categories */}
        {additionalCategories.length > 0 && (
          <section aria-labelledby="additional-cat-heading">
            <div className="flex items-center gap-2.5 mb-2">
              <Layers size={16} className="text-[#B77B50]" aria-hidden="true" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#B77B50]">
                विस्तृत कैटलॉग &bull; Extended Collection
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6 sm:mb-8 pb-3 border-b border-[#E3DED6]">
              <div>
                <h2 id="additional-cat-heading" className="text-2xl sm:text-3xl font-bold text-[#242426] font-display text-hindi">
                  अतिरिक्त उत्पाद श्रेणियाँ
                </h2>
                <p className="text-xs sm:text-sm text-[#686469] text-hindi mt-1">
                  दुकान एवं व्यापारिक आवश्यकताओं के लिए उपयोगी सहायक श्रेणियाँ
                </p>
              </div>
              <span className="text-xs font-bold text-[#686469] bg-white px-3 py-1 rounded-full border border-[#E3DED6] self-start sm:self-auto">
                {additionalCategories.length} श्रेणियाँ
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
              {additionalCategories.map((cat) => (
                <CategoryCard key={cat.slug} category={cat} showEnquiry={true} />
              ))}
            </div>
          </section>
        )}
      </main>

      <StickyWhatsApp />
    </div>
  );
}
