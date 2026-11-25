"use client";

import { useState, useMemo, useCallback, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, X, Package, ArrowUpDown } from "lucide-react";
import { products as defaultProducts } from "@/data/products";
import { categories as defaultCategories } from "@/data/categories";
import { brands as defaultBrands } from "@/data/brands";
import { ProductCard } from "@/components/ui/ProductCard";
import { SearchBar } from "./SearchBar";
import { Product, Category, Brand } from "@/types";
import { ProductFilter, FilterState } from "./ProductFilter";
import { getBulkEnquiryUrl } from "@/lib/whatsapp";

interface ProductGridProps {
  initialCategory?: string;
  initialBrand?: string;
  initialProducts?: Product[];
  initialCategories?: Category[];
  initialBrands?: Brand[];
}

type SortOption = "featured" | "newest" | "name-asc" | "name-desc";

function ProductGridContent({
  initialCategory = "",
  initialBrand = "",
  initialProducts,
  initialCategories,
  initialBrands,
}: ProductGridProps) {
  const searchParams = useSearchParams();

  // Read initial state from URL query parameters (or fallback to props)
  const urlCategory = searchParams.get("category") ?? initialCategory;
  const urlBrand = searchParams.get("brand") ?? initialBrand;
  const urlSearch = searchParams.get("search") ?? searchParams.get("q") ?? "";
  const urlSort = (searchParams.get("sort") as SortOption) ?? "featured";
  const urlWholesaleOnly = searchParams.get("wholesale") === "true";

  const [search, setSearch] = useState(urlSearch);
  const [sortOption, setSortOption] = useState<SortOption>(urlSort);
  const [filters, setFilters] = useState<FilterState>({
    category: urlCategory,
    brand: urlBrand,
    wholesaleOnly: urlWholesaleOnly,
  });
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const allProducts = initialProducts && initialProducts.length > 0 ? initialProducts : defaultProducts;
  const allCategories = initialCategories && initialCategories.length > 0 ? initialCategories : defaultCategories;
  const allBrands = initialBrands && initialBrands.length > 0 ? initialBrands : defaultBrands;

  // Sync state changes to URL
  const updateUrlParams = useCallback(
    (newSearch: string, newFilters: FilterState, newSort: SortOption, pushHistory = false) => {
      const params = new URLSearchParams();
      if (newSearch.trim()) params.set("search", newSearch.trim());
      if (newFilters.category) params.set("category", newFilters.category);
      if (newFilters.brand) params.set("brand", newFilters.brand);
      if (newFilters.wholesaleOnly) params.set("wholesale", "true");
      if (newSort !== "featured") params.set("sort", newSort);

      const queryString = params.toString();
      const newUrl = queryString ? `/products?${queryString}` : "/products";
      if (pushHistory) {
        window.history.pushState(null, "", newUrl);
      } else {
        window.history.replaceState(null, "", newUrl);
      }
    },
    []
  );

  const handleSearchChange = (val: string) => {
    setSearch(val);
    updateUrlParams(val, filters, sortOption, false);
  };

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    updateUrlParams(search, newFilters, sortOption, true);
  };

  const handleSortChange = (newSort: SortOption) => {
    setSortOption(newSort);
    updateUrlParams(search, filters, newSort, true);
  };

  // Synchronize state with browser Back/Forward navigation (popstate)
  useEffect(() => {
    const handlePopState = () => {
      const currentParams = new URLSearchParams(window.location.search);
      const cat = currentParams.get("category") ?? initialCategory;
      const br = currentParams.get("brand") ?? initialBrand;
      const q = currentParams.get("search") ?? currentParams.get("q") ?? "";
      const sort = (currentParams.get("sort") as SortOption) ?? "featured";
      const wholesale = currentParams.get("wholesale") === "true";

      setSearch(q);
      setSortOption(sort);
      setFilters({
        category: cat,
        brand: br,
        wholesaleOnly: wholesale,
      });
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [initialCategory, initialBrand]);

  // Lock body scroll when mobile filter is open
  useEffect(() => {
    if (mobileFilterOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileFilterOpen]);

  // Close mobile filter on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileFilterOpen) {
        setMobileFilterOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileFilterOpen]);

  // Compute filtered & sorted products
  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    // Search query
    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.brand && p.brand.toLowerCase().includes(q)) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.description.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (filters.category) {
      result = result.filter((p) => p.category === filters.category);
    }

    // Brand filter
    if (filters.brand) {
      result = result.filter((p) => p.brand === filters.brand);
    }

    // Wholesale only
    if (filters.wholesaleOnly) {
      result = result.filter((p) => p.isWholesale);
    }

    // Sort order
    switch (sortOption) {
      case "newest":
        // Newest items first (fallback to reverse index if no createdAt)
        result.reverse();
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name, "hi"));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name, "hi"));
        break;
      case "featured":
      default:
        // Featured products first, then preserving order
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }

    return result;
  }, [search, filters, sortOption, allProducts]);

  const hasActiveFilters =
    filters.category !== "" || filters.brand !== "" || filters.wholesaleOnly || search !== "";

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.category) count++;
    if (filters.brand) count++;
    if (filters.wholesaleOnly) count++;
    return count;
  }, [filters]);

  const resetAll = useCallback(() => {
    setSearch("");
    const defaultFilters = { category: "", brand: "", wholesaleOnly: false };
    setFilters(defaultFilters);
    setSortOption("featured");
    updateUrlParams("", defaultFilters, "featured", true);
  }, [updateUrlParams]);

  const activeCategory = filters.category
    ? allCategories.find((c) => c.slug === filters.category)
    : null;
  const activeBrand = filters.brand
    ? allBrands.find((b) => b.slug === filters.brand)
    : null;

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-start">
      {/* Desktop Sidebar Filter */}
      <aside className="hidden lg:block w-72 shrink-0">
        <div className="sticky top-28">
          <ProductFilter
            filters={filters}
            onChange={handleFiltersChange}
            categoriesList={allCategories}
            brandsList={allBrands}
            totalResults={filteredProducts.length}
          />
        </div>
      </aside>

      {/* Main Catalogue Area */}
      <div className="flex-1 min-w-0 w-full">
        {/* Top Controls Bar: Search + Mobile Filter Button + Sort Select */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-4">
          {/* Search Bar */}
          <div className="flex-1 min-w-0">
            <SearchBar value={search} onChange={handleSearchChange} />
          </div>

          <div className="flex items-center gap-2.5 shrink-0 justify-between sm:justify-end">
            {/* Mobile Filter Trigger Button */}
            <button
              type="button"
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 sm:py-3 bg-white border border-[#E3DED6] hover:border-[#B77B50] rounded-xl text-xs sm:text-sm font-semibold text-[#242426] shadow-2xs transition-all active:scale-[0.98] cursor-pointer"
              aria-label="फ़िल्टर पैनल खोलें"
              aria-expanded={mobileFilterOpen}
              aria-controls="mobile-filter-drawer"
            >
              <SlidersHorizontal size={15} className="text-[#B77B50]" aria-hidden="true" />
              <span>फ़िल्टर</span>
              {activeFilterCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-[#B77B50] text-white text-[10px] font-bold flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Sort Dropdown */}
            <div className="relative flex items-center">
              <label htmlFor="catalogue-sort" className="sr-only">
                उत्पाद क्रमबद्ध करें (Sort products)
              </label>
              <div className="flex items-center gap-1.5 px-3 py-2.5 sm:py-3 bg-white border border-[#E3DED6] hover:border-[#B77B50] rounded-xl shadow-2xs transition-colors">
                <ArrowUpDown size={14} className="text-[#B77B50] shrink-0" aria-hidden="true" />
                <select
                  id="catalogue-sort"
                  value={sortOption}
                  onChange={(e) => handleSortChange(e.target.value as SortOption)}
                  className="bg-transparent text-xs sm:text-sm font-semibold text-[#242426] focus:outline-none cursor-pointer pr-1"
                >
                  <option value="featured">क्रम: मुख्य उत्पाद (Featured)</option>
                  <option value="newest">क्रम: नवीनतम (Newest)</option>
                  <option value="name-asc">नाम: A से Z</option>
                  <option value="name-desc">नाम: Z से A</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Active Filter Chips Strip */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 mb-4 p-3 bg-white border border-[#E3DED6] rounded-xl shadow-2xs">
            <span className="text-xs font-bold text-[#686469] uppercase tracking-wider mr-1">
              सक्रिय फ़िल्टर:
            </span>

            {search && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F3EFE8] border border-[#D8C9B7] text-[#242426] text-xs font-semibold rounded-full shadow-2xs">
                <span>खोज: &ldquo;{search}&rdquo;</span>
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    updateUrlParams("", filters, sortOption, true);
                  }}
                  className="p-0.5 hover:text-[#B77B50] transition-colors cursor-pointer"
                  aria-label="खोज हटाएं"
                >
                  <X size={12} aria-hidden="true" />
                </button>
              </span>
            )}

            {filters.category && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F3EFE8] border border-[#D8C9B7] text-[#242426] text-xs font-semibold rounded-full shadow-2xs">
                <span>श्रेणी: {activeCategory?.nameHindi || filters.category}</span>
                <button
                  type="button"
                  onClick={() => handleFiltersChange({ ...filters, category: "" })}
                  className="p-0.5 hover:text-[#B77B50] transition-colors cursor-pointer"
                  aria-label="श्रेणी फ़िल्टर हटाएं"
                >
                  <X size={12} aria-hidden="true" />
                </button>
              </span>
            )}

            {filters.brand && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F3EFE8] border border-[#D8C9B7] text-[#242426] text-xs font-semibold rounded-full shadow-2xs">
                <span>ब्रांड: {activeBrand?.name || filters.brand}</span>
                <button
                  type="button"
                  onClick={() => handleFiltersChange({ ...filters, brand: "" })}
                  className="p-0.5 hover:text-[#B77B50] transition-colors cursor-pointer"
                  aria-label="ब्रांड फ़िल्टर हटाएं"
                >
                  <X size={12} aria-hidden="true" />
                </button>
              </span>
            )}

            {filters.wholesaleOnly && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F3EFE8] border border-[#D8C9B7] text-[#242426] text-xs font-semibold rounded-full shadow-2xs">
                <span>केवल थोक</span>
                <button
                  type="button"
                  onClick={() => handleFiltersChange({ ...filters, wholesaleOnly: false })}
                  className="p-0.5 hover:text-[#B77B50] transition-colors cursor-pointer"
                  aria-label="थोक फ़िल्टर हटाएं"
                >
                  <X size={12} aria-hidden="true" />
                </button>
              </span>
            )}

            <button
              type="button"
              onClick={resetAll}
              className="text-xs text-[#B77B50] hover:text-[#242426] font-bold underline transition-colors ml-auto cursor-pointer"
            >
              सभी साफ़ करें
            </button>
          </div>
        )}

        {/* Results Count & Scope Indicator */}
        <div className="flex items-center justify-between text-xs text-[#686469] mb-4">
          <p className="font-medium">
            कुल <strong className="text-[#242426] font-bold">{filteredProducts.length}</strong> उत्पाद प्रदर्शित
            {activeCategory ? ` — ${activeCategory.nameHindi}` : ""}
            {activeBrand ? ` (${activeBrand.name})` : ""}
          </p>
          <span className="hidden sm:inline-block text-[11px] font-semibold text-[#B77B50] uppercase tracking-wider">
            थोक आपूर्ति • शहडोल (म.प्र.)
          </span>
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="flex flex-col items-center py-16 px-4 bg-white border border-[#E3DED6] rounded-2xl text-center shadow-2xs my-4">
            <div className="w-16 h-16 rounded-2xl bg-[#F3EFE8] border border-[#D8C9B7] flex items-center justify-center mb-4 shadow-2xs">
              <Package size={28} className="text-[#B77B50]" aria-hidden="true" />
            </div>
            <h3 className="text-lg font-bold text-[#242426] font-display mb-1.5">
              कोई उत्पाद नहीं मिला
            </h3>
            <p className="text-xs sm:text-sm text-[#686469] max-w-md mb-6 leading-relaxed">
              आपकी खोज या चुने गए फ़िल्टर से मेल खाता कोई उत्पाद उपलब्ध नहीं है। कृपया दूसरा नाम खोजें या WhatsApp पर संपर्क करें।
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={resetAll}
                className="w-full sm:w-auto px-6 py-3 bg-[#242426] hover:bg-[#39383B] text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-xs cursor-pointer border border-[#B77B50]/30"
              >
                सभी उत्पाद देखें (Reset Filters)
              </button>
              <a
                href={getBulkEnquiryUrl(search || activeCategory?.nameHindi || undefined)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#128C7E] text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-xs"
                aria-label="WhatsApp पर थोक पूछताछ करें"
              >
                <span>WhatsApp पर थोक पूछताछ करें</span>
              </a>
            </div>
          </div>
        )}

        {/* 2-Column Mobile & 3-Column Desktop Product Grid */}
        {filteredProducts.length > 0 && (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3 sm:gap-5 lg:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* Mobile Filter Drawer / Bottom Sheet */}
      {mobileFilterOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setMobileFilterOpen(false)}
            aria-hidden="true"
          />

          {/* Sliding Bottom Sheet */}
          <div
            id="mobile-filter-drawer"
            className="relative z-10 bg-white rounded-t-3xl max-h-[85vh] w-full overflow-hidden flex flex-col shadow-2xl border-t border-[#E3DED6] animate-in slide-in-from-bottom duration-300"
            role="dialog"
            aria-label="उत्पाद फ़िल्टर (Product Filters)"
            aria-modal="true"
          >
            {/* Visual Pull Handle */}
            <div className="w-12 h-1 bg-[#D8C9B7] rounded-full mx-auto mt-2.5 mb-1 shrink-0" aria-hidden="true" />

            <ProductFilter
              filters={filters}
              onChange={handleFiltersChange}
              onClose={() => setMobileFilterOpen(false)}
              isMobileDrawer={true}
              categoriesList={allCategories}
              brandsList={allBrands}
              totalResults={filteredProducts.length}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export function ProductGrid(props: ProductGridProps) {
  return (
    <Suspense fallback={<div className="py-20 text-center text-sm text-[#686469]">कैटलॉग लोड हो रहा है...</div>}>
      <ProductGridContent {...props} />
    </Suspense>
  );
}
