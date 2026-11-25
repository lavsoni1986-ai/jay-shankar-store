"use client";

import { X, Check } from "lucide-react";
import { categories as defaultCategories } from "@/data/categories";
import { brands as defaultBrands } from "@/data/brands";
import { Category, Brand } from "@/types";

export interface FilterState {
  category: string;
  brand: string;
  wholesaleOnly: boolean;
}

interface ProductFilterProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onClose?: () => void;
  isMobileDrawer?: boolean;
  categoriesList?: Category[];
  brandsList?: Brand[];
  totalResults?: number;
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h3 className="text-[11px] font-bold text-[#B77B50] uppercase tracking-widest mb-3">
        {title}
      </h3>
      {children}
    </div>
  );
}

export function ProductFilter({
  filters,
  onChange,
  onClose,
  isMobileDrawer = false,
  categoriesList,
  brandsList,
  totalResults,
}: ProductFilterProps) {
  const categories = categoriesList && categoriesList.length > 0 ? categoriesList : defaultCategories;
  const brands = brandsList && brandsList.length > 0 ? brandsList : defaultBrands;

  const hasActiveFilters =
    filters.category !== "" || filters.brand !== "" || filters.wholesaleOnly;

  const reset = () =>
    onChange({ category: "", brand: "", wholesaleOnly: false });

  // Calculate active filter count
  let activeCount = 0;
  if (filters.category) activeCount++;
  if (filters.brand) activeCount++;
  if (filters.wholesaleOnly) activeCount++;

  return (
    <aside
      className={
        isMobileDrawer
          ? "h-full flex flex-col bg-white"
          : "bg-white border border-[#E3DED6] rounded-2xl p-5 shadow-2xs"
      }
      aria-label="उत्पाद फ़िल्टर (Product filters)"
    >
      {/* Mobile Drawer Header */}
      {isMobileDrawer && (
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E3DED6] bg-[#FAF8F5]">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-[#242426] font-display">
              उत्पाद फ़िल्टर
            </h2>
            {activeCount > 0 && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#B77B50] text-white">
                {activeCount}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#686469] hover:text-[#242426] hover:bg-[#F3EFE8] rounded-lg transition-colors cursor-pointer"
            aria-label="फ़िल्टर बंद करें"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>
      )}

      {/* Main Filter Content */}
      <div className={isMobileDrawer ? "flex-1 overflow-y-auto p-5" : ""}>
        {/* Desktop Header */}
        {!isMobileDrawer && (
          <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#E3DED6]">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-[#242426] font-display">
                फ़िल्टर विकल्प
              </h2>
              {activeCount > 0 && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#F3EFE8] text-[#B77B50] border border-[#D8C9B7]">
                  {activeCount}
                </span>
              )}
            </div>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={reset}
                className="text-xs text-[#B77B50] hover:text-[#242426] font-semibold transition-colors cursor-pointer"
              >
                सभी साफ़ करें
              </button>
            )}
          </div>
        )}

        {/* Category Filter */}
        <FilterSection title="श्रेणी (Category)">
          <div className="space-y-1">
            <label
              className={`flex items-center justify-between px-2.5 py-1.5 rounded-xl cursor-pointer transition-colors text-xs sm:text-sm ${
                filters.category === ""
                  ? "bg-[#F3EFE8] text-[#242426] font-bold"
                  : "text-[#686469] hover:text-[#242426] hover:bg-[#FAF8F5]"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <input
                  type="radio"
                  name="category"
                  checked={filters.category === ""}
                  onChange={() => onChange({ ...filters, category: "" })}
                  className="w-3.5 h-3.5 text-[#B77B50] border-[#D8C9B7] focus:ring-[#B77B50]"
                  aria-label="सभी श्रेणियाँ"
                />
                <span>सभी श्रेणियाँ</span>
              </div>
              {filters.category === "" && (
                <Check size={14} className="text-[#B77B50] shrink-0" aria-hidden="true" />
              )}
            </label>

            {categories.map((cat) => {
              const isSelected = filters.category === cat.slug;
              return (
                <label
                  key={cat.slug}
                  className={`flex items-center justify-between px-2.5 py-1.5 rounded-xl cursor-pointer transition-colors text-xs sm:text-sm ${
                    isSelected
                      ? "bg-[#F3EFE8] text-[#242426] font-bold"
                      : "text-[#686469] hover:text-[#242426] hover:bg-[#FAF8F5]"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <input
                      type="radio"
                      name="category"
                      checked={isSelected}
                      onChange={() => onChange({ ...filters, category: cat.slug })}
                      className="w-3.5 h-3.5 text-[#B77B50] border-[#D8C9B7] focus:ring-[#B77B50]"
                      aria-label={cat.nameHindi || cat.name}
                    />
                    <span className="truncate">
                      {cat.nameHindi || cat.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 shrink-0 ml-2">
                    {cat.isCore && (
                      <span className="text-[9px] px-1.5 py-0.2 bg-[#242426] text-[#D4A37F] rounded font-semibold uppercase tracking-wider">
                        Core
                      </span>
                    )}
                    {isSelected && (
                      <Check size={14} className="text-[#B77B50] ml-1" aria-hidden="true" />
                    )}
                  </div>
                </label>
              );
            })}
          </div>
        </FilterSection>

        {/* Brand Filter */}
        <FilterSection title="ब्रांड (Brand)">
          <div className="space-y-1">
            <label
              className={`flex items-center justify-between px-2.5 py-1.5 rounded-xl cursor-pointer transition-colors text-xs sm:text-sm ${
                filters.brand === ""
                  ? "bg-[#F3EFE8] text-[#242426] font-bold"
                  : "text-[#686469] hover:text-[#242426] hover:bg-[#FAF8F5]"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <input
                  type="radio"
                  name="brand"
                  checked={filters.brand === ""}
                  onChange={() => onChange({ ...filters, brand: "" })}
                  className="w-3.5 h-3.5 text-[#B77B50] border-[#D8C9B7] focus:ring-[#B77B50]"
                  aria-label="सभी ब्रांड"
                />
                <span>सभी ब्रांड</span>
              </div>
              {filters.brand === "" && (
                <Check size={14} className="text-[#B77B50] shrink-0" aria-hidden="true" />
              )}
            </label>

            {brands.map((brand) => {
              const isSelected = filters.brand === brand.slug;
              return (
                <label
                  key={brand.slug}
                  className={`flex items-center justify-between px-2.5 py-1.5 rounded-xl cursor-pointer transition-colors text-xs sm:text-sm ${
                    isSelected
                      ? "bg-[#F3EFE8] text-[#242426] font-bold"
                      : "text-[#686469] hover:text-[#242426] hover:bg-[#FAF8F5]"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <input
                      type="radio"
                      name="brand"
                      checked={isSelected}
                      onChange={() => onChange({ ...filters, brand: brand.slug })}
                      className="w-3.5 h-3.5 text-[#B77B50] border-[#D8C9B7] focus:ring-[#B77B50]"
                      aria-label={brand.name}
                    />
                    <span className="truncate">{brand.name}</span>
                  </div>
                  {isSelected && (
                    <Check size={14} className="text-[#B77B50] shrink-0 ml-2" aria-hidden="true" />
                  )}
                </label>
              );
            })}
          </div>
        </FilterSection>

        {/* Wholesale Only Toggle */}
        <FilterSection title="उपलब्धता (Availability)">
          <label className="flex items-center justify-between p-2.5 bg-[#FAF8F5] border border-[#E3DED6] rounded-xl cursor-pointer hover:border-[#B77B50] transition-colors">
            <div className="flex items-center gap-2.5">
              <input
                type="checkbox"
                checked={filters.wholesaleOnly}
                onChange={(e) =>
                  onChange({ ...filters, wholesaleOnly: e.target.checked })
                }
                className="w-4 h-4 text-[#B77B50] border-[#D8C9B7] rounded focus:ring-[#B77B50]"
                aria-label="केवल थोक उत्पाद"
              />
              <span className="text-xs sm:text-sm font-semibold text-[#242426]">
                केवल थोक उत्पाद
              </span>
            </div>
            <span className="text-[10px] text-[#B77B50] font-bold uppercase tracking-wider">
              B2B
            </span>
          </label>
        </FilterSection>
      </div>

      {/* Mobile Drawer Bottom Actions */}
      {isMobileDrawer && (
        <div className="p-4 border-t border-[#E3DED6] bg-[#FAF8F5] flex gap-3 pb-[calc(1rem+env(safe-area-inset-bottom,0px))]">
          <button
            type="button"
            onClick={reset}
            className="flex-1 py-3 border border-[#D8C9B7] text-[#686469] hover:text-[#242426] bg-white text-xs sm:text-sm font-semibold rounded-xl hover:bg-[#F3EFE8] transition-colors cursor-pointer"
          >
            सभी साफ़ करें
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 bg-[#242426] hover:bg-[#39383B] text-white text-xs sm:text-sm font-bold rounded-xl transition-colors shadow-xs cursor-pointer border border-[#B77B50]/30"
          >
            {totalResults !== undefined ? `${totalResults} उत्पाद देखें` : "लागू करें"}
          </button>
        </div>
      )}
    </aside>
  );
}
