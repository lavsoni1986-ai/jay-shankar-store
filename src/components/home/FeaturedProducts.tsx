import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { getPublishedFeaturedProducts } from "@/lib/db/products";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProductCard } from "@/components/ui/ProductCard";
import { getGeneralEnquiryUrl } from "@/lib/whatsapp";

export async function FeaturedProducts() {
  const displayProducts = await getPublishedFeaturedProducts(6);

  return (
    <section
      id="featured-products"
      className="py-14 sm:py-16 lg:py-20 bg-white scroll-mt-20 lg:scroll-mt-24"
      aria-labelledby="featured-products-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          titleHindi="थोक कैटलॉग संग्रह"
          title="प्रमुख थोक उत्पाद"
          subtitle="हमारे थोक उत्पाद संग्रह की एक झलक — संपूर्ण कैटलॉग देखें या किसी भी उत्पाद के थोक भाव के लिए WhatsApp पर पूछताछ करें।"
          id="featured-products-heading"
        />

        {/* 2-column mobile grid, 3-column desktop grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 lg:gap-6">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Footer CTAs */}
        <div className="mt-10 sm:mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Link
            href="/products"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#242426] hover:bg-[#39383B] text-white text-sm font-bold rounded-xl transition-all shadow-md active:scale-[0.98] border border-[#B77B50]/30"
          >
            <span>पूरा कैटलॉग देखें</span>
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <a
            href={getGeneralEnquiryUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#F3EFE8] hover:bg-[#EAE4DC] border border-[#D8C9B7] text-[#242426] text-sm font-semibold rounded-xl transition-all"
            aria-label="WhatsApp पर थोक पूछताछ करें"
          >
            <MessageCircle size={16} className="text-[#25D366]" aria-hidden="true" />
            <span>थोक पूछताछ करें</span>
          </a>
        </div>
      </div>
    </section>
  );
}
