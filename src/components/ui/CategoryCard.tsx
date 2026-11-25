import Link from "next/link";
import { Category } from "@/types";
import { getCategoryEnquiryUrl } from "@/lib/whatsapp";
import { CategoryIcon } from "@/components/ui/CategoryIcon";

interface CategoryCardProps {
  category: Category;
  variant?: "default" | "compact";
  showEnquiry?: boolean;
}

export function CategoryCard({
  category,
  variant = "default",
  showEnquiry = false,
}: CategoryCardProps) {
  if (variant === "compact") {
    return (
      <Link
        href={`/categories/${category.slug}`}
        className="group flex items-center gap-3 p-3 bg-white border border-[#D8C9B7]/70 rounded-2xl hover:border-[#B77B50] hover:shadow-sm transition-all duration-200"
        aria-label={`${category.name} — ${category.nameHindi}`}
      >
        <div className="w-11 h-11 rounded-xl bg-[#F3EFE8] border border-[#D8C9B7]/80 flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 group-hover:bg-[#EAE4DC] group-hover:border-[#B77B50]/60">
          <CategoryIcon slug={category.slug} size={26} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs sm:text-sm font-bold text-[#242426] group-hover:text-[#B77B50] transition-colors truncate text-hindi">
            {category.nameHindi}
          </p>
          <p className="text-[11px] font-semibold text-[#B77B50] truncate mt-0.5">
            {category.name}
          </p>
        </div>
      </Link>
    );
  }

  return (
    <div className="group bg-white border border-[#D8C9B7]/70 rounded-2xl p-5 hover:shadow-[0_8px_30px_rgba(36,36,38,0.08)] hover:border-[#B77B50] transition-all duration-300 flex flex-col justify-between h-full">
      <div>
        {/* Header with Icon and Bilingual Titles */}
        <div className="flex items-start gap-3.5 mb-3">
          <div className="w-13 h-13 rounded-2xl bg-[#F3EFE8] border border-[#D8C9B7]/80 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-105 group-hover:bg-[#EAE4DC] group-hover:border-[#B77B50]/60 shadow-2xs">
            <CategoryIcon slug={category.slug} size={32} />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-base sm:text-lg font-bold text-[#242426] leading-snug group-hover:text-[#B77B50] transition-colors text-hindi">
              {category.nameHindi}
            </h3>
            <p className="text-xs font-semibold text-[#B77B50] tracking-wide mt-0.5 break-words">
              {category.name}
            </p>
          </div>
        </div>

        {/* Description: 2-3 lines readable presentation with consistent min-height */}
        <p className="text-xs sm:text-sm text-[#686469] leading-relaxed mb-4 min-h-[3.75rem] line-clamp-3 text-hindi">
          {category.description}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 mt-auto pt-3 border-t border-[#E3DED6]">
        <Link
          href={`/categories/${category.slug}`}
          className="flex-1 text-center text-xs sm:text-sm font-bold text-[#242426] border border-[#242426] rounded-xl py-2.5 hover:bg-[#242426] hover:text-white transition-all shadow-2xs active:scale-[0.98]"
        >
          उत्पाद देखें
        </Link>
        {showEnquiry && (
          <a
            href={getCategoryEnquiryUrl(category.nameHindi)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-xl transition-all shadow-2xs shrink-0 hover:scale-105 active:scale-95"
            aria-label={`${category.nameHindi} के लिए WhatsApp पूछताछ`}
            title={`${category.nameHindi} थोक पूछताछ`}
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
          </a>
        )}
      </div>
    </div>
  );
}
