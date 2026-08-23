"use client";

import { useState, useMemo, useCallback } from "react";
import { SlidersHorizontal, X, Package } from "lucide-react";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { brands } from "@/data/brands";
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

export function ProductGrid({
  initialCategory = "",
  initialBrand = "",
  initialProducts,
  initialCategories,
  initialBrands,
}: ProductGridProps) {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    category: initialCategory,
    brand: initialBrand,
    wholesaleOnly: false,
  });
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const allProducts = initialProducts || products;
  const allCategories = initialCategories || categories;
  const allBrands = initialBrands || brands;

  const filteredProducts = useMemo(() => {
    let result = allProducts;

    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.brand && p.brand.toLowerCase().includes(q)) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (filters.category) {
      result = result.filter((p) => p.category === filters.category);
    }

    if (filters.brand) {
      result = result.filter((p) => p.brand === filters.brand);
    }

    if (filters.wholesaleOnly) {
      result = result.filter((p) => p.isWholesale);
    }

    return result;
  }, [search, filters, allProducts]);

  const hasActiveFilters =
    filters.category !== "" || filters.brand !== "" || filters.wholesaleOnly || search !== "";

  const resetAll = useCallback(() => {
    setSearch("");
    setFilters({ category: "", brand: "", wholesaleOnly: false });
  }, []);

  const activeCategoryName = filters.category
    ? allCategories.find((c) => c.slug === filters.category)?.nameHindi
    : null;
  const activeBrandName = filters.brand
    ? allBrands.find((b) => b.slug === filters.brand)?.name
    : null;

  return (
    <div className="flex gap-8">
      {/* Desktop Sidebar Filter */}
      <aside className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-24">
          <ProductFilter filters={filters} onChange={setFilters} />
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {/* Top Bar */}
        <div className="flex items-center gap-3 mb-5">
          <div className="flex-1">
            <SearchBar value={search} onChange={setSearch} />
          </div>
          {/* Mobile filter toggle */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:border-[#0EA5E9] transition-colors shrink-0"
            aria-label="फ़िल्टर खोलें"
            aria-expanded={mobileFilterOpen}
            aria-controls="mobile-filter-panel"
          >
            <SlidersHorizontal size={16} aria-hidden="true" />
            फ़िल्टर
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-[#0EA5E9]" aria-label="Active filters" />
            )}
          </button>
        </div>

        {/* Active filter chips */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {search && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F0F9FF] border border-[#BAE6FD] text-[#0284C7] text-xs font-medium rounded-full">
                खोज: &ldquo;{search}&rdquo;
                <button onClick={() => setSearch("")} aria-label="खोज हटाएं">
                  <X size={12} aria-hidden="true" />
                </button>
              </span>
            )}
            {filters.category && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F0F9FF] border border-[#BAE6FD] text-[#0284C7] text-xs font-medium rounded-full">
                {activeCategoryName || filters.category}
                <button
                  onClick={() => setFilters({ ...filters, category: "" })}
                  aria-label="श्रेणी फ़िल्टर हटाएं"
                >
                  <X size={12} aria-hidden="true" />
                </button>
              </span>
            )}
            {filters.brand && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F0F9FF] border border-[#BAE6FD] text-[#0284C7] text-xs font-medium rounded-full">
                {activeBrandName || filters.brand}
                <button
                  onClick={() => setFilters({ ...filters, brand: "" })}
                  aria-label="ब्रांड फ़िल्टर हटाएं"
                >
                  <X size={12} aria-hidden="true" />
                </button>
              </span>
            )}
            <button
              onClick={resetAll}
              className="text-xs text-slate-500 hover:text-[#0F2A5C] font-medium underline transition-colors"
            >
              सभी हटाएं
            </button>
          </div>
        )}

        {/* Results count */}
        <p className="text-xs text-slate-500 mb-5">
          {filteredProducts.length} उत्पाद मिले
          {activeCategoryName ? ` — ${activeCategoryName}` : ""}
        </p>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="flex flex-col items-center py-16 text-center">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
              <Package size={28} className="text-slate-400" aria-hidden="true" />
            </div>
            <h3 className="text-base font-bold text-[#0F2A5C] mb-1">
              कोई उत्पाद नहीं मिला
            </h3>
            <p className="text-sm text-slate-500 mb-4">
              आपकी खोज या फ़िल्टर से कोई उत्पाद नहीं मिला।
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={resetAll}
                className="px-5 py-2.5 bg-[#0F2A5C] text-white text-sm font-semibold rounded-xl hover:bg-[#0EA5E9] transition-colors"
              >
                सभी उत्पाद देखें
              </button>
              <a
                href={getBulkEnquiryUrl(search || undefined)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-[#25D366] hover:bg-[#128C7E] text-white text-sm font-semibold rounded-xl transition-colors"
              >
                WhatsApp पर पूछताछ करें
              </a>
            </div>
          </div>
        )}

        {/* Product Grid */}
        {filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* Mobile Filter Drawer */}
      {mobileFilterOpen && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/50"
            onClick={() => setMobileFilterOpen(false)}
            aria-hidden="true"
          />
          <div
            id="mobile-filter-panel"
            className="fixed bottom-0 left-0 right-0 z-[60] bg-white rounded-t-2xl max-h-[85vh] overflow-hidden flex flex-col"
            role="dialog"
            aria-label="Product filters"
            aria-modal="true"
          >
            <ProductFilter
              filters={filters}
              onChange={setFilters}
              onClose={() => setMobileFilterOpen(false)}
              isMobileDrawer={true}
            />
          </div>
        </>
      )}
    </div>
  );
}
