import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getBrands } from "@/lib/db/brands";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { BrandCard } from "@/components/ui/BrandCard";

export async function BrandDealerships() {
  const brands = await getBrands();

  return (
    <section
      className="py-14 sm:py-16 lg:py-20 bg-white"
      aria-labelledby="brands-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          titleHindi="अधिकृत एवं प्रमुख ब्रांड्स"
          title="हमारे प्रमुख ब्रांड"
          subtitle="Jay Shankar Readymade Store पर उपलब्ध प्रमुख ब्रांड्स — थोक व्यापार और वस्त्र विक्रेताओं के लिए सर्वोत्तम गुणवत्ता।"
          id="brands-heading"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {brands.map((brand) => (
            <BrandCard key={brand.slug} brand={brand} />
          ))}
        </div>

        <div className="mt-10 sm:mt-12 text-center">
          <Link
            href="/brands"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#F3EFE8] hover:bg-[#EAE4DC] border border-[#D8C9B7] hover:border-[#B77B50] text-sm font-bold text-[#242426] rounded-xl transition-all shadow-xs group"
          >
            <span>सभी ब्रांड देखें</span>
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform text-[#B77B50]"
              aria-hidden="true"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
