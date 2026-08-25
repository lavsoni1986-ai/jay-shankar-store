import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Package, ArrowLeft, Tag } from "lucide-react";
import { getPublishedProductBySlug, getPublishedProducts } from "@/lib/db/products";
import { getCategoryBySlug } from "@/lib/db/categories";
import { getBrandBySlug } from "@/lib/db/brands";
import { siteConfig } from "@/data/siteConfig";
import { getProductEnquiryUrl, getBulkEnquiryUrl } from "@/lib/whatsapp";
import { ProductCard } from "@/components/ui/ProductCard";
import { StickyWhatsApp } from "@/components/ui/StickyWhatsApp";
import { getOptimizedImageUrl } from "@/lib/image-utils";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getPublishedProductBySlug(slug);
  if (!product) {
    return { title: "उत्पाद नहीं मिला" };
  }
  const category = await getCategoryBySlug(product.category);
  const ogImage = product.images && product.images.length > 0
    ? getOptimizedImageUrl(product.images[0], { width: 1200, height: 630 })
    : undefined;

  return {
    title: `${product.name} | ${category?.nameHindi || product.category}`,
    description: `${product.shortDescription} — थोक भाव के लिए WhatsApp करें: ${siteConfig.contact.whatsappDisplay}`,
    alternates: {
      canonical: `${siteConfig.url}/products/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} | Jay Shankar Readymade Store`,
      description: product.shortDescription,
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
  };
}

export async function generateStaticParams() {
  const allProducts = await getPublishedProducts();
  return allProducts.map((p) => ({ slug: p.slug }));
}

function ProductImagePlaceholder({
  categorySlug,
  productName,
}: {
  categorySlug: string;
  productName: string;
}) {
  const gradients: Record<string, string> = {
    hosiery: "from-blue-100 to-blue-200",
    "kolkata-readymade": "from-indigo-100 to-purple-200",
    umbrella: "from-sky-100 to-cyan-200",
    panni: "from-green-100 to-emerald-200",
    "zeel-raincoat": "from-cyan-100 to-teal-200",
    newar: "from-amber-100 to-yellow-200",
    tripal: "from-orange-100 to-amber-200",
    jhola: "from-rose-100 to-pink-200",
    saree: "from-pink-100 to-rose-200",
    "ladies-suit": "from-fuchsia-100 to-purple-200",
    jeans: "from-slate-100 to-blue-200",
    shirt: "from-blue-100 to-sky-200",
    raincoat: "from-teal-100 to-cyan-200",
    blanket: "from-purple-100 to-violet-200",
    undergarments: "from-red-100 to-rose-200",
    "readymade-garments": "from-lime-100 to-green-200",
    "winter-wear": "from-blue-100 to-indigo-200",
    "other-wholesale": "from-gray-100 to-slate-200",
  };
  const gradient = gradients[categorySlug] || "from-slate-100 to-slate-200";
  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-center bg-gradient-to-br ${gradient}`}
      aria-label={`${productName} — उत्पाद की छवि`}
      role="img"
    >
      <Package size={48} className="text-slate-400 mb-3" aria-hidden="true" />
      <p className="text-sm text-slate-500 text-center px-4 leading-snug font-medium">
        {productName}
      </p>
    </div>
  );
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getPublishedProductBySlug(slug);
  if (!product) notFound();

  const [category, brand, allPublished] = await Promise.all([
    getCategoryBySlug(product.category),
    product.brand ? getBrandBySlug(product.brand) : Promise.resolve(null),
    getPublishedProducts(),
  ]);

  const enquiryUrl = getProductEnquiryUrl(product.name);
  const bulkUrl = getBulkEnquiryUrl(category?.nameHindi);

  // Related: same category, different product
  const related = allPublished
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const images = (product.images || []).filter(
    (img): img is string => Boolean(img && typeof img === "string" && img.trim().length > 0)
  );
  const primaryImage = images.length > 0 ? images[0] : null;

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-xs text-slate-500 flex-wrap">
            <li>
              <Link href="/" className="hover:text-[#0F2A5C] transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/products" className="hover:text-[#0F2A5C] transition-colors">
                Products
              </Link>
            </li>
            {category && (
              <>
                <li aria-hidden="true">/</li>
                <li>
                  <Link
                    href={`/categories/${category.slug}`}
                    className="hover:text-[#0F2A5C] transition-colors"
                  >
                    {category.nameHindi}
                  </Link>
                </li>
              </>
            )}
            <li aria-hidden="true">/</li>
            <li className="text-[#0F2A5C] font-medium" aria-current="page">
              {product.name}
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images Gallery */}
          <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden p-4 shadow-xs">
            <div className="h-72 sm:h-96 rounded-2xl overflow-hidden relative bg-slate-50 flex items-center justify-center">
              {primaryImage ? (
                <Image
                  src={getOptimizedImageUrl(primaryImage, { width: 800, height: 800 })}
                  alt={product.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain p-4"
                  priority
                  unoptimized
                />
              ) : (
                <ProductImagePlaceholder
                  categorySlug={product.category}
                  productName={product.name}
                />
              )}
            </div>

            {/* Additional image thumbnails if multiple */}
            {images.length > 1 && (
              <div className="flex items-center gap-3 mt-4 overflow-x-auto pb-2">
                {images.map((imgUrl, i) => (
                  <div
                    key={imgUrl + i}
                    className="w-16 h-16 rounded-xl border border-slate-200 overflow-hidden relative shrink-0 bg-slate-50"
                  >
                    <Image
                      src={getOptimizedImageUrl(imgUrl, { width: 160, height: 160 })}
                      alt={`${product.name} view ${i + 1}`}
                      fill
                      sizes="64px"
                      className="object-contain p-1"
                      unoptimized
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            {/* Category + Brand */}
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              {category && (
                <Link
                  href={`/categories/${category.slug}`}
                  className="text-xs px-2.5 py-1 bg-[#F0F9FF] text-[#0284C7] border border-[#BAE6FD] rounded-full font-medium hover:bg-[#E0F2FE] transition-colors"
                >
                  {category.nameHindi}
                </Link>
              )}
              {brand && (
                <Link
                  href={`/brands/${brand.slug}`}
                  className="text-xs px-2.5 py-1 bg-slate-100 text-slate-600 border border-slate-200 rounded-full font-medium hover:bg-slate-200 transition-colors"
                >
                  {brand.name}
                </Link>
              )}
              {product.isWholesale && (
                <span className="text-xs px-2.5 py-1 bg-[#0F2A5C] text-white rounded-full font-bold">
                  Wholesale
                </span>
              )}
            </div>

            {/* Product Name */}
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0F2A5C] mb-3 leading-tight">
              {product.name}
            </h1>

            {/* Description */}
            <p className="text-slate-600 text-sm leading-relaxed mb-5">
              {product.description}
            </p>

            {/* Pricing — no fake prices */}
            <div className="bg-[#F0F9FF] border border-[#BAE6FD] rounded-2xl p-4 mb-6">
              <p className="text-sm font-bold text-[#0F2A5C] mb-1">
                थोक भाव और उपलब्धता (Wholesale Rate & Availability)
              </p>
              <p className="text-sm text-slate-600">
                इस उत्पाद के थोक भाव, उपलब्ध डिज़ाइन और MOQ की जानकारी के लिए सीधे WhatsApp करें।
              </p>
            </div>

            {/* Primary CTA */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <a
                href={enquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-sm rounded-xl transition-colors shadow-sm"
                aria-label={`${product.name} के लिए WhatsApp पर थोक भाव पूछें`}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-white shrink-0"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                थोक भाव के लिए WhatsApp करें
              </a>
              <a
                href={bulkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 border-2 border-[#0F2A5C] text-[#0F2A5C] hover:bg-[#0F2A5C] hover:text-white font-semibold text-sm rounded-xl transition-colors"
                aria-label="इस श्रेणी का थोक ऑर्डर"
              >
                थोक ऑर्डर पूछें
              </a>
            </div>

            {/* Tags */}
            {product.tags.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <Tag size={14} className="text-slate-400" aria-hidden="true" />
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section aria-labelledby="related-heading" className="mt-4">
            <h2 id="related-heading" className="text-xl font-bold text-[#0F2A5C] mb-6">
              इसी श्रेणी के अन्य उत्पाद (Related Products)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}

        {/* Back link */}
        <div className="mt-10">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-[#0F2A5C] transition-colors"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            सभी उत्पाद देखें
          </Link>
        </div>
      </div>

      <StickyWhatsApp />
    </div>
  );
}
