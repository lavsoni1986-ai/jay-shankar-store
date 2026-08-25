import Link from "next/link";
import Image from "next/image";
import { Brand } from "@/types";
import { getBrandEnquiryUrl } from "@/lib/whatsapp";
import { getOptimizedImageUrl } from "@/lib/image-utils";

interface BrandCardProps {
  brand: Brand;
  variant?: "default" | "compact";
}

export function BrandCard({ brand, variant = "default" }: BrandCardProps) {
  const hasLogo = Boolean(brand.logoUrl && brand.logoUrl.trim().length > 0);

  if (variant === "compact") {
    return (
      <Link
        href={`/brands/${brand.slug}`}
        className="group flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-xl hover:border-slate-300 hover:shadow-sm transition-all duration-200"
        aria-label={`${brand.name} — उत्पाद देखें`}
      >
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border border-slate-100 bg-white overflow-hidden relative"
        >
          {hasLogo ? (
            <Image
              src={getOptimizedImageUrl(brand.logoUrl!, { width: 80, height: 80 })}
              alt={`${brand.name} logo`}
              fill
              sizes="40px"
              className="object-contain p-1"
              unoptimized
            />
          ) : (
            <div
              className="w-full h-full flex items-center justify-center text-white font-bold text-xs"
              style={{ backgroundColor: brand.accentColor }}
              aria-hidden="true"
            >
              {brand.logoPlaceholder}
            </div>
          )}
        </div>
        <span className="text-sm font-semibold text-[#0F2A5C] group-hover:text-[#0EA5E9] transition-colors">
          {brand.name}
        </span>
      </Link>
    );
  }

  return (
    <div className="group bg-white border border-slate-100 rounded-2xl p-6 hover:shadow-[0_4px_20px_rgba(15,42,92,0.1)] hover:border-slate-200 transition-all duration-200 flex flex-col">
      {/* Brand logo / placeholder */}
      <div className="flex items-start justify-between mb-5">
        <div
          className="w-16 h-16 rounded-xl flex items-center justify-center shadow-xs border border-slate-100 overflow-hidden relative bg-white shrink-0 p-1.5"
          aria-label={`${brand.name} logo`}
        >
          {hasLogo ? (
            <div className="relative w-full h-full">
              <Image
                src={getOptimizedImageUrl(brand.logoUrl!, { width: 140, height: 140 })}
                alt={`${brand.name} logo`}
                fill
                sizes="64px"
                className="object-contain p-0.5"
                unoptimized
              />
            </div>
          ) : (
            <div
              className="w-full h-full rounded-lg flex items-center justify-center text-white font-bold text-lg"
              style={{ backgroundColor: brand.accentColor }}
              aria-label={`${brand.name} logo placeholder`}
            >
              {brand.logoPlaceholder}
            </div>
          )}
        </div>
        <span className="text-xs px-2 py-1 bg-[#F0F9FF] text-[#0284C7] rounded-full font-medium border border-[#BAE6FD]">
          ब्रांड उपलब्धता
        </span>
      </div>

      {/* Brand name */}
      <h3 className="text-lg font-bold text-[#0F2A5C] mb-2">{brand.name}</h3>

      {/* Description */}
      <p className="text-sm text-slate-500 leading-relaxed mb-5 flex-1">
        {brand.description}
      </p>

      {/* Actions */}
      <div className="flex gap-2">
        <Link
          href={`/brands/${brand.slug}`}
          className="flex-1 text-center text-sm font-medium text-[#0F2A5C] border border-[#0F2A5C] rounded-lg py-2.5 hover:bg-[#0F2A5C] hover:text-white transition-colors"
        >
          उत्पाद देखें
        </Link>
        <a
          href={getBrandEnquiryUrl(brand.name)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center px-4 bg-[#25D366] hover:bg-[#128C7E] rounded-lg transition-colors"
          aria-label={`${brand.name} के लिए WhatsApp पूछताछ`}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-white"
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>
      </div>
    </div>
  );
}
