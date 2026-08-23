import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBrandBySlug, getBrands } from "@/lib/db/brands";
import { getCategories } from "@/lib/db/categories";
import { getPublishedProducts } from "@/lib/db/products";
import { siteConfig } from "@/data/siteConfig";
import { getBrandEnquiryUrl } from "@/lib/whatsapp";
import { ProductCard } from "@/components/ui/ProductCard";
import { StickyWhatsApp } from "@/components/ui/StickyWhatsApp";
import { Package } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const brand = await getBrandBySlug(slug);
  if (!brand) return { title: "ब्रांड नहीं मिला" };
  return {
    title: `${brand.name} | ब्रांड उत्पाद — Jay Shankar Readymade Store`,
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
  const [brand, allCategories, allPublished] = await Promise.all([
    getBrandBySlug(slug),
    getCategories(),
    getPublishedProducts(),
  ]);

  if (!brand) notFound();

  const brandProducts = allPublished.filter((p) => p.brand === slug);
  const brandCategories = allCategories.filter((c) =>
    brand.categories?.includes(c.slug) || brandProducts.some((p) => p.category === c.slug)
  );
  const enquiryUrl = getBrandEnquiryUrl(brand.name);

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* Header */}
      <div className="bg-[#0F2A5C] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-xs text-white/50 flex-wrap">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/brands" className="hover:text-white transition-colors">Brands</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-white/80" aria-current="page">{brand.name}</li>
            </ol>
          </nav>

          <div className="flex items-center gap-4 mb-3">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg"
              style={{ backgroundColor: brand.accentColor }}
              aria-hidden="true"
            >
              {brand.logoPlaceholder}
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-0.5">
                {brand.name}
              </h1>
              <span className="text-xs px-2.5 py-1 bg-white/10 text-white/70 rounded-full">
                ब्रांड उपलब्धता
              </span>
            </div>
          </div>

          <p className="text-white/70 text-sm max-w-xl mb-5">
            {brand.description}
          </p>

          <a
            href={enquiryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#25D366] hover:bg-[#128C7E] text-white text-sm font-bold rounded-xl transition-colors"
            aria-label={`${brand.name} के लिए WhatsApp पूछताछ`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-white" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {brand.name} — थोक पूछताछ करें
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Brand Categories */}
        {brandCategories.length > 0 && (
          <section aria-labelledby="brand-cat-heading" className="mb-10">
            <h2 id="brand-cat-heading" className="text-base font-bold text-[#0F2A5C] mb-4">
              {brand.name} — उपलब्ध श्रेणियाँ
            </h2>
            <div className="flex flex-wrap gap-3">
              {brandCategories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/categories/${cat.slug}`}
                  className="text-sm px-3 py-1.5 bg-white border border-slate-200 text-[#0F2A5C] rounded-lg hover:border-[#0EA5E9] hover:text-[#0EA5E9] transition-colors font-medium"
                >
                  {cat.nameHindi}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Brand Products */}
        {brandProducts.length === 0 ? (
          <div className="flex flex-col items-center py-16 text-center">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
              <Package size={28} className="text-slate-400" aria-hidden="true" />
            </div>
            <h2 className="text-base font-bold text-[#0F2A5C] mb-2">
              इस ब्रांड के उत्पाद जल्द उपलब्ध होंगे
            </h2>
            <p className="text-sm text-slate-500 mb-5">
              {brand.name} के थोक उत्पादों की जानकारी के लिए WhatsApp करें।
            </p>
            <a
              href={enquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-[#25D366] hover:bg-[#128C7E] text-white text-sm font-semibold rounded-xl transition-colors"
            >
              WhatsApp पर पूछताछ करें
            </a>
          </div>
        ) : (
          <>
            <p className="text-xs text-slate-500 mb-5">
              {brandProducts.length} उत्पाद — {brand.name}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {brandProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>

      <StickyWhatsApp />
    </div>
  );
}
