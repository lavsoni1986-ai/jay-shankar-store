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

function ProductImageFallback({
  productName,
  categoryName,
}: {
  productName: string;
  categoryName?: string;
}) {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center p-3 bg-gradient-to-br from-[#F3EFE8] to-[#EAE4DC] text-[#686469] select-none"
      role="img"
      aria-label={`${productName} — उत्पाद की छवि`}
    >
      <div className="w-10 h-10 rounded-xl bg-white/80 border border-[#D8C9B7]/80 flex items-center justify-center mb-2 shadow-2xs">
        <Package size={22} className="text-[#242426]/40" aria-hidden="true" />
      </div>
      <p className="text-[11px] font-semibold text-[#242426] text-center line-clamp-1 max-w-[90%]">
        {productName}
      </p>
      {categoryName && (
        <span className="text-[10px] text-[#686469] mt-0.5 truncate">
          {categoryName}
        </span>
      )}
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
        className="group flex gap-3 p-3 bg-white border border-[#D8C9B7]/70 rounded-2xl hover:border-[#B77B50] hover:shadow-sm transition-all duration-200"
        aria-label={`${product.name} — विवरण देखें`}
      >
        <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-[#FDFBF7] border border-[#E3DED6] relative">
          {primaryImage ? (
            <Image
              src={getOptimizedImageUrl(primaryImage, { width: 140, height: 140 })}
              alt={product.name}
              fill
              sizes="64px"
              className="object-contain p-1 group-hover:scale-105 transition-transform duration-200"
              unoptimized
            />
          ) : (
            <ProductImageFallback
              productName={product.name}
              categoryName={category?.nameHindi}
            />
          )}
        </div>
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <h3 className="text-xs sm:text-sm font-bold text-[#242426] group-hover:text-[#B77B50] transition-colors truncate">
            {product.name}
          </h3>
          {category && (
            <p className="text-[11px] text-[#B77B50] font-semibold truncate mt-0.5">
              {category.nameHindi || category.name}
            </p>
          )}
          <p className="text-[10px] text-[#686469] font-medium mt-1">
            थोक भाव उपलब्ध
          </p>
        </div>
      </Link>
    );
  }

  return (
    <div className="group bg-white border border-[#D8C9B7]/70 rounded-2xl overflow-hidden hover:shadow-[0_8px_24px_rgba(36,36,38,0.08)] hover:border-[#B77B50] transition-all duration-300 flex flex-col h-full">
      {/* Product Image Frame */}
      <Link
        href={`/products/${product.slug}`}
        className="block relative aspect-square w-full bg-[#FDFBF7] border-b border-[#E3DED6] overflow-hidden"
        aria-label={`${product.name} — विवरण देखें`}
      >
        <div className="absolute inset-0 flex items-center justify-center p-2.5">
          {primaryImage ? (
            <Image
              src={getOptimizedImageUrl(primaryImage, { width: 440, height: 440 })}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-contain p-2 group-hover:scale-105 transition-transform duration-300 ease-out"
              unoptimized
            />
          ) : (
            <ProductImageFallback
              productName={product.name}
              categoryName={category?.nameHindi}
            />
          )}
        </div>

        {/* Wholesale Badge */}
        {product.isWholesale && (
          <div className="absolute top-2.5 left-2.5 z-10">
            <span className="text-[9px] sm:text-[10px] font-bold px-2 py-0.5 bg-[#242426] text-[#F3EFE8] border border-[#B77B50]/40 rounded uppercase tracking-wider shadow-2xs">
              Wholesale
            </span>
          </div>
        )}

        {/* Brand Tag (if present) */}
        {brand && (
          <div className="absolute top-2.5 right-2.5 z-10">
            <span className="text-[9px] sm:text-[10px] font-semibold px-2 py-0.5 bg-white/90 backdrop-blur-xs text-[#242426] border border-[#D8C9B7] rounded shadow-2xs">
              {brand.name}
            </span>
          </div>
        )}
      </Link>

      {/* Card Content */}
      <div className="p-3 sm:p-4 flex flex-col flex-1">
        {/* Category & Brand Meta */}
        <div className="flex items-center gap-1.5 mb-1.5 text-[11px] truncate">
          {category && (
            <Link
              href={`/categories/${category.slug}`}
              className="font-semibold text-[#B77B50] hover:text-[#242426] transition-colors truncate"
            >
              {category.nameHindi || category.name}
            </Link>
          )}
          {brand && !category && (
            <Link
              href={`/brands/${brand.slug}`}
              className="font-semibold text-[#686469] hover:text-[#242426] transition-colors truncate"
            >
              {brand.name}
            </Link>
          )}
        </div>

        {/* Product Title */}
        <h3 className="text-xs sm:text-sm font-bold text-[#242426] leading-snug line-clamp-2 mb-2 flex-1 group-hover:text-[#B77B50] transition-colors">
          <Link href={`/products/${product.slug}`}>
            {product.name}
          </Link>
        </h3>

        {/* Wholesale Availability Note */}
        <p className="text-[11px] text-[#686469] italic mb-3 flex items-center gap-1">
          <span>थोक भाव के लिए संपर्क करें</span>
        </p>

        {/* WhatsApp Direct Action Button */}
        <a
          href={enquiryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 w-full py-2 sm:py-2.5 bg-[#25D366] hover:bg-[#128C7E] text-white text-xs font-bold rounded-xl transition-all shadow-2xs hover:shadow-xs active:scale-[0.98] mt-auto"
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
          <span>WhatsApp पूछताछ</span>
        </a>
      </div>
    </div>
  );
}
