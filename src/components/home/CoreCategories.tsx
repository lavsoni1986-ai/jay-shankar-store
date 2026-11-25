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
      className="py-14 sm:py-16 lg:py-20 bg-[#F3EFE8] border-t border-b border-[#E3DED6]"
      aria-labelledby="core-categories-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          titleHindi="थोक व्यापार श्रेणियाँ"
          title="मुख्य थोक श्रेणियाँ"
          subtitle="डीलर, रिटेलर एवं वस्त्र व्यापारियों के लिए हमारी प्राथमिक थोक आपूर्ति श्रेणियाँ — हर श्रेणी में व्यापक वैरायटी।"
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

        <div className="mt-10 sm:mt-12 text-center">
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-[#FDFBF7] border border-[#D8C9B7] hover:border-[#B77B50] text-sm font-bold text-[#242426] rounded-xl transition-all shadow-xs group"
          >
            <span>सभी श्रेणियाँ देखें</span>
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
