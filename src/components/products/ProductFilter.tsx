"use client";

import { X } from "lucide-react";
import { categories } from "@/data/categories";
import { brands } from "@/data/brands";

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
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h3 className="text-xs font-bold text-[#0F2A5C] uppercase tracking-widest mb-3">
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
}: ProductFilterProps) {
  const hasActiveFilters =
    filters.category !== "" || filters.brand !== "" || filters.wholesaleOnly;

  const reset = () =>
    onChange({ category: "", brand: "", wholesaleOnly: false });

  return (
    <aside
      className={
        isMobileDrawer
          ? "h-full flex flex-col bg-white"
          : "bg-white border border-slate-100 rounded-2xl p-5"
      }
      aria-label="Product filters"
    >
      {isMobileDrawer && (
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <h2 className="text-base font-bold text-[#0F2A5C]">फ़िल्टर</h2>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-lg transition-colors"
            aria-label="फ़िल्टर बंद करें"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>
      )}

      <div className={isMobileDrawer ? "flex-1 overflow-y-auto p-5" : ""}>
        {!isMobileDrawer && (
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-bold text-[#0F2A5C]">फ़िल्टर</h2>
            {hasActiveFilters && (
              <button
                onClick={reset}
                className="text-xs text-[#0EA5E9] hover:text-[#0284C7] font-medium transition-colors"
              >
                साफ़ करें
              </button>
            )}
          </div>
        )}

        {/* Category Filter */}
        <FilterSection title="श्रेणी">
          <div className="space-y-1.5">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="category"
                checked={filters.category === ""}
                onChange={() => onChange({ ...filters, category: "" })}
                className="w-4 h-4 text-[#0EA5E9] border-slate-300 focus:ring-[#0EA5E9]"
                aria-label="सभी श्रेणियाँ"
              />
              <span className="text-sm text-slate-600 group-hover:text-[#0F2A5C] transition-colors">
                सभी श्रेणियाँ
              </span>
            </label>
            {categories.map((cat) => (
              <label
                key={cat.slug}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="radio"
                  name="category"
                  checked={filters.category === cat.slug}
                  onChange={() => onChange({ ...filters, category: cat.slug })}
                  className="w-4 h-4 text-[#0EA5E9] border-slate-300 focus:ring-[#0EA5E9]"
                  aria-label={cat.nameHindi}
                />
                <span className="text-sm text-slate-600 group-hover:text-[#0F2A5C] transition-colors flex items-center gap-1.5">
                  {cat.nameHindi}
                  {cat.isCore && (
                    <span className="text-[10px] px-1.5 py-0.5 bg-[#0F2A5C] text-white rounded-full font-bold">
                      Core
                    </span>
                  )}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Brand Filter */}
        <FilterSection title="ब्रांड">
          <div className="space-y-1.5">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="radio"
                name="brand"
                checked={filters.brand === ""}
                onChange={() => onChange({ ...filters, brand: "" })}
                className="w-4 h-4 text-[#0EA5E9] border-slate-300 focus:ring-[#0EA5E9]"
                aria-label="सभी ब्रांड"
              />
              <span className="text-sm text-slate-600 group-hover:text-[#0F2A5C] transition-colors">
                सभी ब्रांड
              </span>
            </label>
            {brands.map((brand) => (
              <label
                key={brand.slug}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <input
                  type="radio"
                  name="brand"
                  checked={filters.brand === brand.slug}
                  onChange={() => onChange({ ...filters, brand: brand.slug })}
                  className="w-4 h-4 text-[#0EA5E9] border-slate-300 focus:ring-[#0EA5E9]"
                  aria-label={brand.name}
                />
                <span className="text-sm text-slate-600 group-hover:text-[#0F2A5C] transition-colors">
                  {brand.name}
                </span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Wholesale toggle */}
        <FilterSection title="उपलब्धता">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              checked={filters.wholesaleOnly}
              onChange={(e) =>
                onChange({ ...filters, wholesaleOnly: e.target.checked })
              }
              className="w-4 h-4 text-[#0EA5E9] border-slate-300 rounded focus:ring-[#0EA5E9]"
              aria-label="केवल थोक उत्पाद"
            />
            <span className="text-sm text-slate-600 group-hover:text-[#0F2A5C] transition-colors">
              केवल थोक उत्पाद
            </span>
          </label>
        </FilterSection>
      </div>

      {isMobileDrawer && (
        <div className="p-4 border-t border-slate-100 flex gap-3">
          <button
            onClick={reset}
            className="flex-1 py-2.5 border border-slate-200 text-slate-600 text-sm font-medium rounded-xl hover:bg-slate-50 transition-colors"
          >
            साफ़ करें
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2.5 bg-[#0F2A5C] text-white text-sm font-bold rounded-xl hover:bg-[#0EA5E9] transition-colors"
          >
            लागू करें
          </button>
        </div>
      )}
    </aside>
  );
}
