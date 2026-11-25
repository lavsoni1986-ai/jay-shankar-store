import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import { getBrands } from "@/lib/db/brands";
import { BrandCard } from "@/components/ui/BrandCard";
import { StickyWhatsApp } from "@/components/ui/StickyWhatsApp";
import { Award, Info } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "हमारे प्रमुख ब्रांड | Brand Availability — Jay Shankar Store",
  description:
    "Jay Shankar Readymade Store पर उपलब्ध प्रमुख ब्रांड — Lux, Essdee, Zeel Rainwear, Sharmeelee, Pooja Ragenee, Arman। थोक भाव के लिए WhatsApp: 7000766562",
  alternates: {
    canonical: `${siteConfig.url}/brands`,
  },
};

export default async function BrandsPage() {
  const brands = await getBrands();

  return (
    <div className="bg-[#F3EFE8] min-h-screen text-[#242426]">
      {/* Editorial Header */}
      <section className="bg-[#242426] text-[#F3EFE8] pt-10 pb-12 sm:pt-14 sm:pb-16 border-b border-[#39383B] relative overflow-hidden">
        {/* Subtle decorative glow */}
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
                Brands
              </li>
            </ol>
          </nav>

          {/* Kicker badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#39383B] border border-[#B77B50]/40 text-[#D4A37F] text-xs font-bold tracking-widest uppercase mb-4">
            <Award size={13} className="text-[#B77B50]" aria-hidden="true" />
            <span>थोक ब्रांड संग्रह &bull; FEATURED BRANDS</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight font-display text-hindi mb-3">
                हमारे प्रमुख ब्रांड
              </h1>
              <p className="text-sm sm:text-base text-[#D8C9B7] max-w-2xl leading-relaxed text-hindi font-sans">
                होजरी, रेडीमेड एवं मौसमी परिधानों में प्रसिद्ध भारतीय ब्रांड्स का प्रामाणिक संग्रह। प्रत्येक ब्रांड के उपलब्ध थोक उत्पादों और पार्सल दरों की जानकारी प्राप्त करें।
              </p>
            </div>

            {/* Total brands count badge */}
            <div className="shrink-0">
              <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#39383B]/80 border border-[#B77B50]/30 text-xs sm:text-sm font-semibold text-white">
                <span className="w-2.5 h-2.5 rounded-full bg-[#B77B50] animate-pulse" />
                <span>कुल <strong className="text-[#D4A37F] font-bold">{brands.length}</strong> ब्रांड उपलब्ध</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Brand Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-12">
          {brands.map((brand) => (
            <BrandCard key={brand.slug} brand={brand} />
          ))}
        </div>

        {/* Verified Neutral Disclaimer Box */}
        <div className="p-5 sm:p-6 bg-white border border-[#E3DED6] rounded-2xl shadow-2xs">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#F3EFE8] border border-[#D8C9B7] flex items-center justify-center shrink-0 mt-0.5">
              <Info size={16} className="text-[#B77B50]" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-xs sm:text-sm font-bold text-[#242426] uppercase tracking-wide mb-1">
                व्यापारिक उपलब्धता एवं आपूर्ति सूचना
              </h2>
              <p className="text-xs sm:text-sm text-[#686469] leading-relaxed text-hindi">
                <strong className="text-[#242426]">नोट:</strong> ऊपर सूचीबद्ध ब्रांड Jay Shankar Readymade Store के नियमित थोक व्यापार में उपलब्ध हैं। थोक भाव, उपलब्ध साइज़, न्यूनतम पार्सल मात्रा (MOQ) और ताज़ा स्टॉक की पुष्टि के लिए सीधे हमारे WhatsApp व्यापारिक डेस्क पर संपर्क करें।
              </p>
            </div>
          </div>
        </div>
      </main>

      <StickyWhatsApp />
    </div>
  );
}
