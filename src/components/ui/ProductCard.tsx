import Link from "next/link";
import Image from "next/image";
import { Package } from "lucide-react";
import { Product } from "@/types";
import { categories } from "@/data/categories";
import { brands } from "@/data/brands";
import { getProductEnquiryUrl } from "@/lib/whatsapp";
import { getOptimizedImageUrl } from "@/lib/image-utils";

interface ProductCardProps {
  product: Product;
  variant?: "default" | "compact";
}

// Minimal placeholder — clean gradient by category
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
      <Package
        size={32}
        className="text-slate-400 mb-2"
        aria-hidden="true"
      />
      <p className="text-xs text-slate-400 text-center px-2 leading-tight">
        {productName}
      </p>
    </div>
  );
}

export function ProductCard({ product, variant = "default" }: ProductCardProps) {
  const category = categories.find((c) => c.slug === product.category);
  const brand = product.brand ? brands.find((b) => b.slug === product.brand) : null;
  const enquiryUrl = getProductEnquiryUrl(product.name);
  const primaryImage =
    Array.isArray(product.images) && product.images.length > 0 && product.images[0]?.trim()
      ? product.images[0].trim()
      : null;

  if (variant === "compact") {
    return (
      <Link
        href={`/products/${product.slug}`}
        className="group flex gap-3 p-3 bg-white border border-slate-100 rounded-xl hover:border-[#0EA5E9] hover:shadow-sm transition-all duration-200"
        aria-label={`${product.name} — विवरण देखें`}
      >
        <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-slate-100 relative">
          {primaryImage ? (
            <Image
              src={getOptimizedImageUrl(primaryImage, { width: 120, height: 120 })}
              alt={product.name}
              fill
              sizes="64px"
              className="object-contain p-1"
              unoptimized
            />
          ) : (
            <ProductImagePlaceholder
              categorySlug={product.category}
              productName={product.name}
            />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-[#0F2A5C] group-hover:text-[#0EA5E9] transition-colors line-clamp-1">
            {product.name}
          </h3>
          {category && (
            <p className="text-xs text-slate-500 mt-0.5">{category.nameHindi}</p>
          )}
          <p className="text-xs text-[#0EA5E9] font-medium mt-1">
            थोक भाव पर उपलब्ध
          </p>
        </div>
      </Link>
    );
  }

  return (
    <div className="group bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-[0_4px_20px_rgba(15,42,92,0.08)] hover:border-slate-200 transition-all duration-200 flex flex-col">
      {/* Product Image */}
      <Link
        href={`/products/${product.slug}`}
        className="block h-48 bg-slate-50 overflow-hidden relative"
        aria-label={`${product.name} — विवरण देखें`}
        tabIndex={0}
      >
        <div className="absolute inset-0">
          {primaryImage ? (
            <Image
              src={getOptimizedImageUrl(primaryImage, { width: 400, height: 400 })}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
              unoptimized
            />
          ) : (
            <ProductImagePlaceholder
              categorySlug={product.category}
              productName={product.name}
            />
          )}
        </div>
        {/* Wholesale badge */}
        {product.isWholesale && (
          <div className="absolute top-2 left-2 z-10">
            <span className="text-[10px] font-bold px-2 py-0.5 bg-[#0F2A5C] text-white rounded-full uppercase tracking-wide shadow-xs">
              Wholesale
            </span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Category + Brand */}
        <div className="flex items-center gap-2 mb-2">
          {category && (
            <Link
              href={`/categories/${category.slug}`}
              className="text-xs text-[#0EA5E9] font-medium hover:underline"
            >
              {category.nameHindi}
            </Link>
          )}
          {brand && (
            <>
              <span className="text-xs text-slate-300" aria-hidden="true">•</span>
              <Link
                href={`/brands/${brand.slug}`}
                className="text-xs text-slate-500 hover:text-[#0F2A5C] transition-colors"
              >
                {brand.name}
              </Link>
            </>
          )}
        </div>

        {/* Product Name */}
        <h3 className="text-sm font-bold text-[#0F2A5C] leading-snug mb-1.5 line-clamp-2 flex-1">
          <Link
            href={`/products/${product.slug}`}
            className="hover:text-[#0EA5E9] transition-colors"
          >
            {product.name}
          </Link>
        </h3>

        {/* Pricing — no fake prices */}
        <p className="text-xs text-slate-500 italic mb-3">
          थोक भाव के लिए WhatsApp करें
        </p>

        {/* CTA */}
        <a
          href={enquiryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#25D366] hover:bg-[#128C7E] text-white text-xs font-bold rounded-xl transition-colors"
          aria-label={`${product.name} के लिए WhatsApp पूछताछ`}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-white shrink-0"
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          WhatsApp पर पूछताछ करें
        </a>
      </div>
    </div>
  );
}
