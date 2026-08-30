import Link from "next/link";
import { Category } from "@/types";
import { getCategoryEnquiryUrl } from "@/lib/whatsapp";
import { CategoryIcon, getCategoryTheme } from "@/components/ui/CategoryIcon";

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
  const theme = getCategoryTheme(category.slug);

  if (variant === "compact") {
    return (
      <Link
        href={`/categories/${category.slug}`}
        className="group flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-xl hover:border-[#0EA5E9] hover:shadow-[0_4px_16px_rgba(14,165,233,0.12)] transition-all duration-200"
        aria-label={`${category.name} — ${category.nameHindi}`}
      >
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105"
          style={{ backgroundColor: theme.bgPastel }}
        >
          <CategoryIcon slug={category.slug} size={28} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-[#0F2A5C] group-hover:text-[#0EA5E9] transition-colors truncate">
            {category.name}
          </p>
          <p
            className="text-xs font-medium truncate text-hindi"
            style={{ color: theme.primaryColor }}
          >
            {category.nameHindi}
          </p>
        </div>
      </Link>
    );
  }

  return (
    <div className="group bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-[0_8px_30px_rgba(15,42,92,0.08)] hover:border-slate-200 transition-all duration-200 flex flex-col justify-between">
      <div>
        {/* Header with Icon Circle and Titles */}
        <div className="flex items-center gap-4 mb-3.5">
          {/* Soft Pastel Circle Container with Icon */}
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-105 group-hover:shadow-md"
            style={{ backgroundColor: theme.bgPastel }}
          >
            <CategoryIcon slug={category.slug} size={42} />
          </div>

          {/* Category Names */}
          <div className="min-w-0">
            <h3 className="text-base font-bold text-[#0F2A5C] leading-tight group-hover:text-[#0F2A5C] transition-colors">
              {category.name}
            </h3>
            <p
              className="text-sm font-semibold mt-0.5 text-hindi"
              style={{ color: theme.primaryColor }}
            >
              {category.nameHindi}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-500 leading-relaxed mb-5 line-clamp-2">
          {category.description}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 mt-auto pt-1">
        <Link
          href={`/categories/${category.slug}`}
          className="flex-1 text-center text-sm font-semibold text-[#0F2A5C] border border-[#0F2A5C]/80 rounded-xl py-2.5 hover:bg-[#0F2A5C] hover:text-white transition-all duration-200 shadow-sm"
        >
          उत्पाद देखें
        </Link>
        {showEnquiry && (
          <a
            href={getCategoryEnquiryUrl(category.nameHindi)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-10 h-10 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-xl transition-all duration-200 shadow-sm shrink-0 hover:scale-105"
            aria-label={`${category.nameHindi} के लिए WhatsApp पूछताछ`}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-white"
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
