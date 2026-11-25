import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategoryBySlug, getCategories } from "@/lib/db/categories";
import { getPublishedProducts } from "@/lib/db/products";
import { siteConfig } from "@/data/siteConfig";
import { getCategoryEnquiryUrl } from "@/lib/whatsapp";
import { ProductCard } from "@/components/ui/ProductCard";
import { StickyWhatsApp } from "@/components/ui/StickyWhatsApp";
import { Package, MessageCircle, Layers, ArrowLeft } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return { title: "श्रेणी नहीं मिली" };
  return {
    title: `${category.nameHindi} (${category.name}) | थोक उत्पाद — Jay Shankar Store`,
    description: `${category.description} — Jay Shankar Readymade Store, Shahdol। थोक भाव के लिए WhatsApp: ${siteConfig.contact.whatsappDisplay}`,
    alternates: {
      canonical: `${siteConfig.url}/categories/${slug}`,
    },
  };
}

export async function generateStaticParams() {
  const allCategories = await getCategories();
  return allCategories.map((c) => ({ slug: c.slug }));
}

export default async function CategoryDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const [category, allCategories, allPublished] = await Promise.all([
    getCategoryBySlug(slug),
    getCategories(),
    getPublishedProducts(),
  ]);

  if (!category) notFound();

  const categoryProducts = allPublished.filter((p) => p.category === slug);
  const otherCategories = allCategories.filter((c) => c.slug !== slug).slice(0, 6);
  const enquiryUrl = getCategoryEnquiryUrl(category.nameHindi);

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
                <Link href="/categories" className="hover:text-white transition-colors">
                  Categories
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-[#D4A37F] font-semibold" aria-current="page">
                {category.nameHindi}
              </li>
            </ol>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-3xl">
              {/* Kicker badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#39383B] border border-[#B77B50]/40 text-[#D4A37F] text-xs font-bold tracking-widest uppercase mb-3">
                <Layers size={13} className="text-[#B77B50]" aria-hidden="true" />
                <span>{category.name} &bull; थोक श्रेणी</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight font-display text-hindi mb-2">
                {category.nameHindi}
              </h1>
              <p className="text-sm font-semibold text-[#B77B50] mb-3">
                {category.name}
              </p>
              <p className="text-sm sm:text-base text-[#D8C9B7] leading-relaxed text-hindi font-sans">
                {category.description}
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <a
                href={enquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#25D366] hover:bg-[#128C7E] text-white text-sm sm:text-base font-bold rounded-xl transition-all shadow-md active:scale-[0.98]"
                aria-label={`${category.nameHindi} के लिए WhatsApp थोक पूछताछ`}
              >
                <MessageCircle size={18} className="fill-current" aria-hidden="true" />
                <span>{category.nameHindi} थोक भाव पूछें</span>
              </a>

              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-[#39383B] hover:bg-[#47454A] border border-[#504E53] text-[#F3EFE8] text-sm font-semibold rounded-xl transition-colors"
              >
                <ArrowLeft size={16} aria-hidden="true" />
                <span>सभी उत्पाद</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Results Header */}
        <div className="flex items-center justify-between gap-4 mb-6 pb-3 border-b border-[#E3DED6]">
          <h2 className="text-lg sm:text-xl font-bold text-[#242426] font-display text-hindi">
            उपलब्ध उत्पाद ({categoryProducts.length})
          </h2>
          <span className="text-xs font-semibold text-[#B77B50] uppercase tracking-wider">
            थोक आपूर्ति &bull; शहडोल (म.प्र.)
          </span>
        </div>

        {/* Product Grid or Empty State */}
        {categoryProducts.length === 0 ? (
          <div className="flex flex-col items-center py-16 px-4 bg-white border border-[#E3DED6] rounded-2xl text-center shadow-2xs my-4">
            <div className="w-16 h-16 rounded-2xl bg-[#F3EFE8] border border-[#D8C9B7] flex items-center justify-center mb-4 shadow-2xs">
              <Package size={28} className="text-[#B77B50]" aria-hidden="true" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#242426] mb-2 text-hindi">
              इस श्रेणी में उत्पाद वर्तमान में सूचीबद्ध नहीं हैं
            </h3>
            <p className="text-xs sm:text-sm text-[#686469] max-w-md mb-6 leading-relaxed text-hindi">
              {category.nameHindi} के नवीनतम थोक स्टॉक, रंग-डिज़ाइन और पार्सल डिस्पैच की जानकारी सीधे WhatsApp पर उपलब्ध है।
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <a
                href={enquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[#25D366] hover:bg-[#128C7E] text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-md active:scale-[0.98]"
              >
                {category.nameHindi} की थोक पूछताछ करें
              </a>
              <Link
                href="/categories"
                className="px-6 py-3 bg-white border border-[#D8C9B7] hover:border-[#B77B50] text-[#242426] text-xs sm:text-sm font-bold rounded-xl transition-colors"
              >
                अन्य श्रेणियाँ देखें
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 mb-14">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Other Categories Recommendations */}
        {otherCategories.length > 0 && (
          <section className="mt-14 pt-10 border-t border-[#E3DED6]" aria-labelledby="other-cat-heading">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 id="other-cat-heading" className="text-lg sm:text-xl font-bold text-[#242426] font-display text-hindi">
                  अन्य थोक श्रेणियाँ देखें
                </h3>
                <p className="text-xs text-[#686469] text-hindi mt-0.5">
                  विस्तृत थोक कैटलॉग से अन्य श्रेणियाँ चुनें
                </p>
              </div>
              <Link
                href="/categories"
                className="text-xs font-bold text-[#B77B50] hover:text-[#242426] underline transition-colors"
              >
                सभी देखें &rarr;
              </Link>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {otherCategories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/categories/${cat.slug}`}
                  className="px-4 py-2 bg-white border border-[#E3DED6] hover:border-[#B77B50] rounded-xl text-xs sm:text-sm font-semibold text-[#242426] hover:text-[#B77B50] shadow-2xs transition-colors text-hindi"
                >
                  {cat.nameHindi} ({cat.name})
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      <StickyWhatsApp />
    </div>
  );
}
