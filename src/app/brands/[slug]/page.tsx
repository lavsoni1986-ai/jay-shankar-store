import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getBrandBySlug, getBrands } from "@/lib/db/brands";
import { getCategories } from "@/lib/db/categories";
import { getPublishedProducts } from "@/lib/db/products";
import { siteConfig } from "@/data/siteConfig";
import { getBrandEnquiryUrl } from "@/lib/whatsapp";
import { ProductCard } from "@/components/ui/ProductCard";
import { StickyWhatsApp } from "@/components/ui/StickyWhatsApp";
import { getOptimizedImageUrl } from "@/lib/image-utils";
import { Package, MessageCircle, ArrowLeft, Award } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const brand = await getBrandBySlug(slug);
  if (!brand) return { title: "ब्रांड नहीं मिला" };
  return {
    title: `${brand.name} | ब्रांड थोक उत्पाद — Jay Shankar Store`,
    description: `${brand.description} — Jay Shankar Readymade Store, Shahdol। थोक भाव के लिए WhatsApp: ${siteConfig.contact.whatsappDisplay}`,
    alternates: {
      canonical: `${siteConfig.url}/brands/${slug}`,
    },
  };
}

export async function generateStaticParams() {
  const allBrands = await getBrands();
  return allBrands.map((b) => ({ slug: b.slug }));
}

export default async function BrandDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const [brand, allBrands, allCategories, allPublished] = await Promise.all([
    getBrandBySlug(slug),
    getBrands(),
    getCategories(),
    getPublishedProducts(),
  ]);

  if (!brand) notFound();

  const brandProducts = allPublished.filter((p) => p.brand === slug);
  const brandCategories = allCategories.filter((c) =>
    brand.categories?.includes(c.slug) || brandProducts.some((p) => p.category === c.slug)
  );
  const otherBrands = allBrands.filter((b) => b.slug !== slug).slice(0, 5);
  const enquiryUrl = getBrandEnquiryUrl(brand.name);

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
            <ol className="flex items-center gap-2 text-xs text-[#D8C9B7]/70 flex-wrap">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/brands" className="hover:text-white transition-colors">
                  Brands
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-[#D4A37F] font-semibold" aria-current="page">
                {brand.name}
              </li>
            </ol>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="flex items-start gap-4 sm:gap-5 max-w-3xl">
              {/* Brand Logo / Monogram Container */}
              <div
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center shadow-md overflow-hidden relative bg-white border border-[#E3DED6] p-2 shrink-0"
                aria-label={`${brand.name} logo`}
              >
                {brand.logoUrl ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={getOptimizedImageUrl(brand.logoUrl, { width: 160, height: 160 })}
                      alt={`${brand.name} logo`}
                      fill
                      sizes="80px"
                      className="object-contain p-0.5"
                      priority
                      unoptimized
                    />
                  </div>
                ) : (
                  <div
                    className="w-full h-full rounded-xl flex items-center justify-center text-[#F3EFE8] bg-[#39383B] font-bold text-lg sm:text-xl"
                    aria-hidden="true"
                  >
                    {brand.logoPlaceholder}
                  </div>
                )}
              </div>

              <div>
                {/* Availability Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#39383B] border border-[#B77B50]/40 text-[#D4A37F] text-xs font-bold uppercase tracking-wider mb-2">
                  <Award size={12} className="text-[#B77B50]" aria-hidden="true" />
                  <span>ब्रांड उपलब्धता &bull; Available Brand</span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight font-display mb-1.5">
                  {brand.name}
                </h1>
                <p className="text-xs sm:text-sm text-[#D8C9B7] leading-relaxed text-hindi font-sans max-w-2xl">
                  {brand.description}
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <a
                href={enquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#25D366] hover:bg-[#128C7E] text-white text-sm sm:text-base font-bold rounded-xl transition-all shadow-md active:scale-[0.98]"
                aria-label={`${brand.name} के लिए WhatsApp थोक पूछताछ`}
              >
                <MessageCircle size={18} className="fill-current" aria-hidden="true" />
                <span>{brand.name} थोक पूछताछ करें</span>
              </a>

              <Link
                href="/brands"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-[#39383B] hover:bg-[#47454A] border border-[#504E53] text-[#F3EFE8] text-sm font-semibold rounded-xl transition-colors"
              >
                <ArrowLeft size={16} aria-hidden="true" />
                <span>सभी ब्रांड</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Brand Categories Filter Chips */}
        {brandCategories.length > 0 && (
          <section aria-labelledby="brand-cat-heading" className="mb-10 p-5 bg-white border border-[#E3DED6] rounded-2xl shadow-2xs">
            <h2 id="brand-cat-heading" className="text-xs sm:text-sm font-bold text-[#686469] uppercase tracking-wider mb-3">
              {brand.name} में उपलब्ध श्रेणियाँ:
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {brandCategories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/categories/${cat.slug}`}
                  className="px-3.5 py-1.5 bg-[#F3EFE8] border border-[#D8C9B7] hover:border-[#B77B50] rounded-xl text-xs sm:text-sm font-semibold text-[#242426] hover:text-[#B77B50] transition-colors text-hindi"
                >
                  {cat.nameHindi} ({cat.name}) &rarr;
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Results Header */}
        <div className="flex items-center justify-between gap-4 mb-6 pb-3 border-b border-[#E3DED6]">
          <h2 className="text-lg sm:text-xl font-bold text-[#242426] font-display text-hindi">
            {brand.name} उत्पाद संग्रह ({brandProducts.length})
          </h2>
          <span className="text-xs font-semibold text-[#B77B50] uppercase tracking-wider">
            थोक आपूर्ति &bull; शहडोल (म.प्र.)
          </span>
        </div>

        {/* Product Grid or Empty State */}
        {brandProducts.length === 0 ? (
          <div className="flex flex-col items-center py-16 px-4 bg-white border border-[#E3DED6] rounded-2xl text-center shadow-2xs my-4">
            <div className="w-16 h-16 rounded-2xl bg-[#F3EFE8] border border-[#D8C9B7] flex items-center justify-center mb-4 shadow-2xs">
              <Package size={28} className="text-[#B77B50]" aria-hidden="true" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#242426] mb-2 text-hindi">
              {brand.name} के उत्पाद जल्द कैटलॉग में जोड़े जा रहे हैं
            </h3>
            <p className="text-xs sm:text-sm text-[#686469] max-w-md mb-6 leading-relaxed text-hindi">
              इस ब्रांड के उपलब्ध साइज़, ताज़ा थोक दरें एवं पार्सल बुकिंग की जानकारी सीधे WhatsApp पर उपलब्ध है।
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <a
                href={enquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[#25D366] hover:bg-[#128C7E] text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-md active:scale-[0.98]"
              >
                {brand.name} थोक पूछताछ करें
              </a>
              <Link
                href="/brands"
                className="px-6 py-3 bg-white border border-[#D8C9B7] hover:border-[#B77B50] text-[#242426] text-xs sm:text-sm font-bold rounded-xl transition-colors"
              >
                अन्य ब्रांड देखें
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 mb-14">
            {brandProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Other Brands Recommendations */}
        {otherBrands.length > 0 && (
          <section className="mt-14 pt-10 border-t border-[#E3DED6]" aria-labelledby="other-brands-heading">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 id="other-brands-heading" className="text-lg sm:text-xl font-bold text-[#242426] font-display text-hindi">
                  अन्य प्रमुख ब्रांड्स
                </h3>
                <p className="text-xs text-[#686469] text-hindi mt-0.5">
                  हमारे थोक संग्रह में उपलब्ध अन्य प्रतिष्ठित ब्रांड्स
                </p>
              </div>
              <Link
                href="/brands"
                className="text-xs font-bold text-[#B77B50] hover:text-[#242426] underline transition-colors"
              >
                सभी देखें &rarr;
              </Link>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {otherBrands.map((b) => (
                <Link
                  key={b.slug}
                  href={`/brands/${b.slug}`}
                  className="px-4 py-2 bg-white border border-[#E3DED6] hover:border-[#B77B50] rounded-xl text-xs sm:text-sm font-semibold text-[#242426] hover:text-[#B77B50] shadow-2xs transition-colors"
                >
                  {b.name}
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <StickyWhatsApp />
    </div>
  );
}
