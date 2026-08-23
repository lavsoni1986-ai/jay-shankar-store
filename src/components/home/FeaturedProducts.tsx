import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getPublishedFeaturedProducts } from "@/lib/db/products";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProductCard } from "@/components/ui/ProductCard";

export async function FeaturedProducts() {
  const displayProducts = await getPublishedFeaturedProducts(6);

  return (
    <section
      className="py-16 lg:py-20 bg-[#F8FAFC]"
      aria-labelledby="featured-products-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="उत्पाद कैटलॉग झलक"
          titleHindi="Sample Catalogue"
          subtitle="हमारे थोक उत्पाद कैटलॉग की झलक — पूरा कैटलॉग देखें या WhatsApp पर पूछताछ करें।"
          id="featured-products-heading"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-10 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0F2A5C] hover:bg-[#0EA5E9] text-white text-sm font-bold rounded-xl transition-colors"
          >
            पूरा कैटलॉग देखें
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
