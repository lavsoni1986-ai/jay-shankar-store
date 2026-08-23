import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { brands } from "@/data/brands";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { BrandCard } from "@/components/ui/BrandCard";

export function BrandDealerships() {
  return (
    <section
      className="py-16 lg:py-20 bg-white"
      aria-labelledby="brands-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="हमारे प्रमुख ब्रांड"
          titleHindi="Brand Availability"
          subtitle="Jay Shankar Readymade Store पर उपलब्ध प्रमुख ब्रांड — थोक व्यापार के लिए।"
          id="brands-heading"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {brands.map((brand) => (
            <BrandCard key={brand.slug} brand={brand} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/brands"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0F2A5C] hover:text-[#0EA5E9] transition-colors group"
          >
            सभी ब्रांड देखें
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
