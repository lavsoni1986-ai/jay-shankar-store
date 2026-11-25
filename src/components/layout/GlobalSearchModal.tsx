"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Search, X, Package, Layers, Sparkles, ArrowRight, MessageCircle } from "lucide-react";
import { useSearchModal } from "@/context/SearchContext";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { brands } from "@/data/brands";
import { getOptimizedImageUrl } from "@/lib/image-utils";
import { getGeneralEnquiryUrl } from "@/lib/whatsapp";

const POPULAR_SEARCHES = [
  "होजरी (Hosiery)",
  "कोलकाता रेडीमेड",
  "Lux Cozi",
  "Zeel Rainwear",
  "छाता (Umbrella)",
  "त्रिपाल (Tripal)",
  "नेवार (Newar)",
  "रेनकोट (Rainwear)",
];

export function GlobalSearchModal() {
  const { isOpen, closeSearch } = useSearchModal();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleClose = () => {
    setQuery("");
    closeSearch();
  };

  // Focus input whenever modal opens
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Perform search across products, categories, and brands
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return { products: [], categories: [], brands: [], total: 0 };
    }

    const matchedProducts = products
      .filter((p) => {
        return (
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.brand && p.brand.toLowerCase().includes(q)) ||
          p.description.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
        );
      })
      .slice(0, 6);

    const matchedCategories = categories
      .filter((c) => {
        return (
          c.name.toLowerCase().includes(q) ||
          c.nameHindi.toLowerCase().includes(q) ||
          c.slug.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q)
        );
      })
      .slice(0, 4);

    const matchedBrands = brands
      .filter((b) => {
        return (
          b.name.toLowerCase().includes(q) ||
          b.slug.toLowerCase().includes(q) ||
          b.description.toLowerCase().includes(q)
        );
      })
      .slice(0, 3);

    const total = matchedProducts.length + matchedCategories.length + matchedBrands.length;
    return {
      products: matchedProducts,
      categories: matchedCategories,
      brands: matchedBrands,
      total,
    };
  }, [query]);

  if (!isOpen) return null;

  const handleSelect = (url: string) => {
    handleClose();
    router.push(url);
  };

  const handleFullSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    const targetUrl = `/products?q=${encodeURIComponent(query.trim())}`;
    handleClose();
    router.push(targetUrl);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center p-3 sm:p-6 sm:pt-20 bg-[#1c1c1e]/75 backdrop-blur-sm animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="ग्लोबल उत्पाद खोज (Global Search)"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#E3DED6] overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <form
          onSubmit={handleFullSearchSubmit}
          className="flex items-center gap-3 px-4 py-3.5 border-b border-[#E3DED6] bg-[#F8F5F0]"
        >
          <Search size={20} className="text-[#242426] shrink-0" aria-hidden="true" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="उत्पाद, ब्रांड या श्रेणी खोजें... (उदा. Hosiery, Lux, Zeel)"
            className="flex-1 bg-transparent text-[#242426] placeholder:text-[#686469]/60 text-sm sm:text-base focus:outline-none"
            aria-label="खोजें"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="p-1 text-[#686469] hover:text-[#242426] rounded-md transition-colors"
              aria-label="खोज साफ़ करें"
            >
              <X size={16} />
            </button>
          )}
          <button
            type="button"
            onClick={handleClose}
            className="px-2 py-1 text-xs font-semibold text-[#686469] hover:text-[#242426] bg-white border border-[#D8C9B7] rounded-md shadow-xs transition-colors shrink-0 cursor-pointer"
            aria-label="खोज बंद करें"
          >
            ESC
          </button>
        </form>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Empty Query: Show popular searches & helpful guidance */}
          {!query.trim() && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={16} className="text-[#B77B50]" aria-hidden="true" />
                <h3 className="text-xs font-bold text-[#242426] uppercase tracking-wider">
                  लोकप्रिय थोक खोजें (Popular Searches)
                </h3>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {POPULAR_SEARCHES.map((item) => {
                  const cleaned = item.split(" (")[0];
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setQuery(cleaned)}
                      className="text-xs px-3 py-1.5 bg-[#F3EFE8] hover:bg-[#EAE4DC] text-[#242426] hover:border-[#B77B50] border border-[#D8C9B7] rounded-lg transition-colors cursor-pointer"
                    >
                      {item}
                    </button>
                  );
                })}
              </div>

              <div className="p-3.5 bg-[#F8F5F0] border border-[#E3DED6] rounded-xl">
                <p className="text-xs font-semibold text-[#242426] mb-1">
                  💡 थोक व्यापारियों के लिए सुझाव
                </p>
                <p className="text-xs text-[#686469] leading-relaxed">
                  ब्रांड नाम (उदा. Lux, Zeel), श्रेणी (उदा. कोलकाता रेडीमेड, होजरी, छाता) या उत्पाद का नाम लिखकर तुरंत खोजें।
                </p>
              </div>
            </div>
          )}

          {/* Active Query with Results */}
          {query.trim() && results.total > 0 && (
            <div className="space-y-5">
              {/* Categories */}
              {results.categories.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-[#686469] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Layers size={13} aria-hidden="true" />
                    श्रेणियाँ ({results.categories.length})
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {results.categories.map((cat) => (
                      <button
                        key={cat.slug}
                        type="button"
                        onClick={() => handleSelect(`/categories/${cat.slug}`)}
                        className="flex items-center gap-2.5 p-2.5 bg-[#FDFBF7] hover:bg-[#F3EFE8] border border-[#E3DED6] hover:border-[#B77B50] rounded-xl text-left transition-colors w-full group"
                      >
                        <div className="w-8 h-8 rounded-lg bg-[#F3EFE8] border border-[#D8C9B7] flex items-center justify-center text-[#242426] group-hover:text-[#B77B50] shrink-0 font-bold text-xs">
                          {cat.name.slice(0, 1)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-[#242426] truncate">
                            {cat.nameHindi}
                          </p>
                          <p className="text-[11px] text-[#686469] truncate">{cat.name}</p>
                        </div>
                        <ArrowRight size={13} className="text-[#686469] group-hover:text-[#B77B50] shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Brands */}
              {results.brands.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-[#686469] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Sparkles size={13} aria-hidden="true" />
                    ब्रांड ({results.brands.length})
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {results.brands.map((b) => (
                      <button
                        key={b.slug}
                        type="button"
                        onClick={() => handleSelect(`/brands/${b.slug}`)}
                        className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#F3EFE8] hover:bg-[#EAE4DC] border border-[#D8C9B7] rounded-lg text-xs font-bold text-[#242426] transition-colors"
                      >
                        <span>{b.name}</span>
                        <ArrowRight size={12} className="text-[#686469]" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Products */}
              {results.products.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-[#686469] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Package size={13} aria-hidden="true" />
                    उत्पाद ({results.products.length})
                  </h4>
                  <div className="space-y-2">
                    {results.products.map((prod) => {
                      const image = prod.images && prod.images.length > 0 ? prod.images[0] : null;
                      return (
                        <button
                          key={prod.id}
                          type="button"
                          onClick={() => handleSelect(`/products/${prod.slug}`)}
                          className="flex items-center gap-3 p-2.5 bg-white hover:bg-[#FDFBF7] border border-[#E3DED6] hover:border-[#B77B50] rounded-xl text-left transition-all w-full group shadow-2xs"
                        >
                          <div className="w-12 h-12 rounded-lg bg-[#F8F5F0] overflow-hidden relative shrink-0 flex items-center justify-center border border-[#E3DED6]">
                            {image ? (
                              <Image
                                src={getOptimizedImageUrl(image, { width: 96, height: 96 })}
                                alt={prod.name}
                                fill
                                sizes="48px"
                                className="object-contain p-1"
                                unoptimized
                              />
                            ) : (
                              <Package size={20} className="text-[#686469]/50" />
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-bold text-[#242426] group-hover:text-[#B77B50] transition-colors truncate">
                              {prod.name}
                            </p>
                            <p className="text-[11px] text-[#686469] line-clamp-1">
                              {prod.shortDescription || prod.description}
                            </p>
                            <span className="inline-block text-[10px] font-semibold text-[#B77B50] mt-0.5">
                              थोक भाव उपलब्ध
                            </span>
                          </div>
                          <div className="shrink-0 flex items-center gap-1 text-xs font-semibold text-[#242426] group-hover:translate-x-0.5 transition-transform">
                            <span className="hidden sm:inline">देखें</span>
                            <ArrowRight size={14} className="text-[#B77B50]" />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Active Query with No Results */}
          {query.trim() && results.total === 0 && (
            <div className="py-8 text-center">
              <div className="w-12 h-12 rounded-full bg-[#F3EFE8] flex items-center justify-center mx-auto mb-3 text-[#686469]">
                <Search size={22} />
              </div>
              <p className="text-sm font-bold text-[#242426] mb-1">
                &ldquo;{query}&rdquo; के लिए कोई सीधा परिणाम नहीं मिला
              </p>
              <p className="text-xs text-[#686469] max-w-sm mx-auto mb-5">
                हमारे पास कई उत्पाद स्टॉक में उपलब्ध हैं जो वेबसाइट पर अभी सूचीबद्ध नहीं हैं। कृपया सीधे WhatsApp पर संपर्क करें।
              </p>
              <a
                href={getGeneralEnquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#25D366] hover:bg-[#128C7E] text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
              >
                <MessageCircle size={15} />
                WhatsApp पर इस उत्पाद की जानकारी पूछें
              </a>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        {query.trim() && results.total > 0 && (
          <div className="p-3 bg-[#F8F5F0] border-t border-[#E3DED6] flex items-center justify-between">
            <span className="text-xs text-[#686469]">
              कुल {results.total} परिणाम मिले
            </span>
            <button
              type="button"
              onClick={handleFullSearchSubmit}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#242426] hover:bg-[#39383B] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer border border-[#B77B50]/30"
            >
              <span>कैटलॉग में सभी परिणाम देखें</span>
              <ArrowRight size={13} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
