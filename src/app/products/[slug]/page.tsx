import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Tag, ShieldCheck, CheckCircle2, MessageCircle, Phone } from "lucide-react";
import { getPublishedProductBySlug, getPublishedProducts } from "@/lib/db/products";
import { getCategoryBySlug } from "@/lib/db/categories";
import { getBrandBySlug } from "@/lib/db/brands";
import { siteConfig } from "@/data/siteConfig";
import { getProductEnquiryUrl, getBulkEnquiryUrl } from "@/lib/whatsapp";
import { ProductCard } from "@/components/ui/ProductCard";
import { StickyWhatsApp } from "@/components/ui/StickyWhatsApp";
import { ProductGallery } from "@/components/products/ProductGallery";
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
  const ogImage =
    product.images && product.images.length > 0
      ? getOptimizedImageUrl(product.images[0], { width: 1200, height: 630 })
      : undefined;

  const categoryLabel = category?.nameHindi ? ` | ${category.nameHindi}` : "";

  return {
    title: `${product.name}${categoryLabel} — Jay Shankar Readymade Store`,
    description: `${product.name} — ${product.shortDescription || product.description} — थोक भाव और उपलब्धता के लिए WhatsApp करें: ${siteConfig.contact.whatsappDisplay}`,
    alternates: {
      canonical: `${siteConfig.url}/products/${product.slug}`,
    },
    openGraph: {
      title: `${product.name} | Jay Shankar Readymade Store`,
      description: product.shortDescription || product.description,
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
  };
}

export async function generateStaticParams() {
  const allProducts = await getPublishedProducts();
  return allProducts.map((p) => ({ slug: p.slug }));
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
  const bulkCategoryUrl = getBulkEnquiryUrl(category?.nameHindi || product.category);

  // Related products from same category (excluding current)
  const relatedProducts = allPublished
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const cleanImages = (product.images || []).filter(
    (img): img is string => Boolean(img && typeof img === "string" && img.trim().length > 0)
  );

  return (
    <div className="bg-[#F3EFE8] min-h-screen">
      {/* Editorial Breadcrumbs & Top Kicker Strip */}
      <div className="bg-[#FAF8F5] border-b border-[#E3DED6] py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-xs text-[#686469] flex-wrap font-medium">
              <li>
                <Link href="/" className="hover:text-[#242426] transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="text-[#B77B50]">/</li>
              <li>
                <Link href="/products" className="hover:text-[#242426] transition-colors">
                  Products
                </Link>
              </li>
              {category && (
                <>
                  <li aria-hidden="true" className="text-[#B77B50]">/</li>
                  <li>
                    <Link
                      href={`/categories/${category.slug}`}
                      className="hover:text-[#B77B50] transition-colors"
                    >
                      {category.nameHindi || category.name}
                    </Link>
                  </li>
                </>
              )}
              <li aria-hidden="true" className="text-[#B77B50]">/</li>
              <li className="text-[#242426] font-bold truncate max-w-[200px] sm:max-w-none" aria-current="page">
                {product.name}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Main Product Showcase Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
          {/* Left Column: Interactive Product Image Gallery (5 cols desktop) */}
          <div className="lg:col-span-5 w-full">
            <ProductGallery
              images={cleanImages}
              productName={product.name}
              categoryName={category?.nameHindi || category?.name}
            />
          </div>

          {/* Right Column: Product Information & B2B Wholesale Enquiry (7 cols desktop) */}
          <div className="lg:col-span-7 flex flex-col">
            {/* Badges Strip */}
            <div className="flex items-center gap-2 mb-3.5 flex-wrap">
              {category && (
                <Link
                  href={`/categories/${category.slug}`}
                  className="text-xs px-3 py-1 bg-[#F3EFE8] text-[#B77B50] border border-[#D8C9B7] rounded-full font-bold hover:bg-[#EAE4DC] transition-colors"
                >
                  {category.nameHindi || category.name}
                </Link>
              )}
              {brand && (
                <Link
                  href={`/brands/${brand.slug}`}
                  className="text-xs px-3 py-1 bg-[#242426] text-white rounded-full font-bold hover:bg-[#39383B] transition-colors"
                >
                  {brand.name}
                </Link>
              )}
              {product.isWholesale && (
                <span className="text-xs px-3 py-1 bg-[#FAF8F5] text-[#242426] border border-[#E3DED6] rounded-full font-bold uppercase tracking-wider">
                  थोक केवल &bull; Wholesale
                </span>
              )}
            </div>

            {/* Product Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#242426] mb-3 leading-tight font-display">
              {product.name}
            </h1>

            {/* Short Description Kicker if present */}
            {product.shortDescription && product.shortDescription !== product.description && (
              <p className="text-sm sm:text-base font-semibold text-[#B77B50] mb-3 text-hindi">
                {product.shortDescription}
              </p>
            )}

            {/* Divider */}
            <div className="w-12 h-0.5 bg-[#B77B50] mb-5" aria-hidden="true" />

            {/* Description Body */}
            <div className="text-sm sm:text-base text-[#686469] leading-relaxed mb-6 space-y-3 text-hindi">
              <p>{product.description}</p>
            </div>

            {/* Wholesale Price & Availability Notice Card */}
            <div className="bg-white border border-[#E3DED6] rounded-2xl p-4 sm:p-5 mb-6 shadow-2xs">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#F3EFE8] border border-[#D8C9B7] flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck size={18} className="text-[#B77B50]" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-xs sm:text-sm font-bold text-[#242426] uppercase tracking-wide mb-1">
                    थोक भाव एवं न्यूनतम ऑर्डर (Wholesale Pricing & Inquiry)
                  </h2>
                  <p className="text-xs sm:text-sm text-[#686469] leading-relaxed text-hindi">
                    व्यापारिक थोक खरीद, ताज़ा भाव, उपलब्ध रंगों/डिज़ाइनों और पार्सल डिस्पैच की जानकारी के लिए सीधे WhatsApp पर संपर्क करें।
                  </p>
                </div>
              </div>

              {/* Verified Trust Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mt-4 pt-4 border-t border-[#E3DED6]">
                <div className="flex items-center gap-1.5 text-xs text-[#242426] font-medium">
                  <CheckCircle2 size={14} className="text-[#B77B50] shrink-0" />
                  <span>थोक कपड़ा विक्रेता</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#242426] font-medium">
                  <CheckCircle2 size={14} className="text-[#B77B50] shrink-0" />
                  <span>शहडोल स्थानीय प्रतिष्ठान</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#242426] font-medium col-span-2 sm:col-span-1">
                  <CheckCircle2 size={14} className="text-[#B77B50] shrink-0" />
                  <span>सीधा WhatsApp संवाद</span>
                </div>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              {/* Product WhatsApp Enquiry */}
              <a
                href={enquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2.5 px-6 py-4 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-sm sm:text-base rounded-xl transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
                aria-label={`${product.name} के लिए WhatsApp पर थोक पूछताछ करें`}
              >
                <MessageCircle size={20} className="fill-current" aria-hidden="true" />
                <span>थोक भाव के लिए WhatsApp करें</span>
              </a>

              {/* Direct Call / Contact */}
              <a
                href={`tel:+91${siteConfig.contact.whatsapp}`}
                className="flex items-center justify-center gap-2 px-6 py-4 bg-white hover:bg-[#FAF8F5] border border-[#E3DED6] hover:border-[#B77B50] text-[#242426] font-bold text-sm rounded-xl transition-all shadow-2xs active:scale-[0.98]"
                aria-label={`सीधा कॉल करें: ${siteConfig.contact.whatsappDisplay}`}
              >
                <Phone size={16} className="text-[#B77B50]" aria-hidden="true" />
                <span>कॉल करें ({siteConfig.contact.contactPerson})</span>
              </a>
            </div>

            {/* Category Bulk Order Link */}
            {category && (
              <div className="mb-6">
                <a
                  href={bulkCategoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#B77B50] hover:text-[#242426] font-bold underline transition-colors"
                >
                  <span>पूरे {category.nameHindi || category.name} संग्रह के थोक पार्सल ऑर्डर के लिए पूछताछ करें &rarr;</span>
                </a>
              </div>
            )}

            {/* Product Tags (Rendered only if tags exist) */}
            {product.tags && product.tags.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap pt-2">
                <Tag size={13} className="text-[#B77B50]" aria-hidden="true" />
                <span className="text-xs font-semibold text-[#686469]">संबंधित टैग्स:</span>
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-0.5 bg-white border border-[#E3DED6] text-[#686469] rounded-lg"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section aria-labelledby="related-products-heading" className="pt-10 border-t border-[#E3DED6]">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
              <div>
                <p className="text-xs font-bold text-[#B77B50] uppercase tracking-widest mb-1 font-sans">
                  संबंधित संग्रह &bull; RELATED PRODUCTS
                </p>
                <h2
                  id="related-products-heading"
                  className="text-xl sm:text-2xl font-bold text-[#242426] font-display"
                >
                  {category?.nameHindi ? `${category.nameHindi} के अन्य उत्पाद` : "इसी श्रेणी के अन्य उत्पाद"}
                </h2>
              </div>
              {category && (
                <Link
                  href={`/categories/${category.slug}`}
                  className="text-xs font-bold text-[#B77B50] hover:text-[#242426] transition-colors underline"
                >
                  पूरा {category.nameHindi} संग्रह देखें &rarr;
                </Link>
              )}
            </div>

            {/* 2-column mobile, 3-column desktop related products grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 lg:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}

        {/* Back to Catalogue Navigation Link */}
        <div className="mt-12 pt-6 border-t border-[#E3DED6]">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#686469] hover:text-[#B77B50] transition-colors"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            <span>&larr; संपूर्ण थोक कैटलॉग पर वापस जाएं (Back to Catalogue)</span>
          </Link>
        </div>
      </main>

      {/* Floating Desktop WhatsApp Button */}
      <StickyWhatsApp />
    </div>
  );
}
