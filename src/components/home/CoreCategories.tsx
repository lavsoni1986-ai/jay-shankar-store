import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getCategories } from "@/lib/db/categories";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CategoryCard } from "@/components/ui/CategoryCard";

export async function CoreCategories() {
  const allCategories = await getCategories();
  const coreCategories = allCategories.filter((c) => c.isCore);
  return (
    <section
      className="py-16 lg:py-20 bg-[#F8FAFC]"
      aria-labelledby="core-categories-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="मुख्य थोक श्रेणियाँ"
          titleHindi="Core Wholesale Segments"
          subtitle="हमारे प्राथमिक थोक व्यापार की श्रेणियाँ — डीलर और खुदरा विक्रेताओं के लिए थोक आपूर्ति।"
          id="core-categories-heading"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {coreCategories.map((category) => (
            <CategoryCard
              key={category.slug}
              category={category}
              showEnquiry={true}
            />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0F2A5C] hover:text-[#0EA5E9] transition-colors group"
          >
            सभी श्रेणियाँ देखें
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
