import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import { brands } from "@/data/brands";
import { BrandCard } from "@/components/ui/BrandCard";
import { StickyWhatsApp } from "@/components/ui/StickyWhatsApp";

export const metadata: Metadata = {
  title: "हमारे प्रमुख ब्रांड | Brand Availability",
  description:
    "Jay Shankar Readymade Store पर उपलब्ध प्रमुख ब्रांड — Lux, Essdee, Zeel Rainwear, Sharmeelee, Pooja Ragenee, Arman। थोक भाव के लिए WhatsApp: 7000766562",
  alternates: {
    canonical: `${siteConfig.url}/brands`,
  },
};

export default function BrandsPage() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* Header */}
      <div className="bg-[#0F2A5C] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-xs text-white/50">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-white/80" aria-current="page">Brands</li>
            </ol>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
            हमारे प्रमुख ब्रांड
          </h1>
          <p className="text-white/60 text-sm">
            Jay Shankar Readymade Store पर उपलब्ध ब्रांड — ब्रांड उपलब्धता
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {brands.map((brand) => (
            <BrandCard key={brand.slug} brand={brand} />
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-10 p-4 bg-white border border-slate-100 rounded-xl">
          <p className="text-xs text-slate-500 leading-relaxed">
            <strong className="text-slate-600">नोट:</strong> ऊपर सूचीबद्ध ब्रांड Jay Shankar Readymade Store पर उपलब्ध हैं।
            थोक भाव, उपलब्ध डिज़ाइन और स्टॉक की जानकारी के लिए WhatsApp पर संपर्क करें।
          </p>
        </div>
      </div>

      <StickyWhatsApp />
    </div>
  );
}
