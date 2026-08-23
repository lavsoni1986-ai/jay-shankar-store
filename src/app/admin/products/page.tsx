"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Plus,
  Search,
  Trash2,
  Edit,
  ExternalLink,
  Package,
  CheckCircle,
  XCircle,
  Star,
  Loader2,
  AlertTriangle,
} from "lucide-react";

interface ProductItem {
  id: string;
  name: string;
  slug: string;
  categoryName: string;
  categoryId: string;
  brandName: string | null;
  brandId: string | null;
  isPublished: boolean;
  isFeatured: boolean;
  isWholesale: boolean;
  images: { url: string; publicId: string }[];
  createdAt: string;
}

interface CategoryOption {
  id: string;
  name: string;
  nameHindi: string;
}

interface BrandOption {
  id: string;
  name: string;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [brands, setBrands] = useState<BrandOption[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "PUBLISHED" | "DRAFT">("ALL");

  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const [prodRes, catRes, brandRes] = await Promise.all([
          fetch("/api/admin/products"),
          fetch("/api/admin/categories"),
          fetch("/api/admin/brands"),
        ]);

        if (prodRes.ok && active) {
          const pData = await prodRes.json();
          setProducts(pData.products || []);
        }
        if (catRes.ok && active) {
          const cData = await catRes.json();
          setCategories(cData.categories || []);
        }
        if (brandRes.ok && active) {
          const bData = await brandRes.json();
          setBrands(bData.brands || []);
        }
      } catch (err) {
        console.error("Fetch products error", err);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      active = false;
    };
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (search.trim()) {
        const q = search.toLowerCase();
        const match =
          p.name.toLowerCase().includes(q) ||
          p.slug.toLowerCase().includes(q) ||
          p.categoryName.toLowerCase().includes(q) ||
          (p.brandName && p.brandName.toLowerCase().includes(q));
        if (!match) return false;
      }
      if (categoryFilter && p.categoryId !== categoryFilter) {
        return false;
      }
      if (brandFilter && p.brandId !== brandFilter) {
        return false;
      }
      if (statusFilter === "PUBLISHED" && !p.isPublished) return false;
      if (statusFilter === "DRAFT" && p.isPublished) return false;

      return true;
    });
  }, [products, search, categoryFilter, brandFilter, statusFilter]);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
        setDeleteConfirmId(null);
      } else {
        alert("हटाने में त्रुटि हुई (Delete failed)");
      }
    } catch (e) {
      console.error("Delete error", e);
      alert("हटाने में त्रुटि हुई (Delete failed)");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#0F2A5C]">
            उत्पाद सूची (Product Catalogue)
          </h1>
          <p className="text-xs text-slate-500">
            कुल {products.length} उत्पाद • {filteredProducts.length} फ़िल्टर किए गए
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0F2A5C] hover:bg-[#0EA5E9] text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
        >
          <Plus size={16} />
          + नया उत्पाद जोड़ें (Add Product)
        </Link>
      </div>

      {/* Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex flex-col md:flex-row gap-3 items-stretch md:items-center">
        {/* Search */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search size={16} />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="उत्पाद खोजें (Search by name, slug, tag)..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#0EA5E9] focus:bg-white"
          />
        </div>

        {/* Category Filter */}
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:border-[#0EA5E9]"
        >
          <option value="">सभी श्रेणियाँ (All Categories)</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nameHindi} ({c.name})
            </option>
          ))}
        </select>

        {/* Brand Filter */}
        <select
          value={brandFilter}
          onChange={(e) => setBrandFilter(e.target.value)}
          className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:border-[#0EA5E9]"
        >
          <option value="">सभी ब्रांड (All Brands)</option>
          {brands.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as "ALL" | "PUBLISHED" | "DRAFT")}
          className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:border-[#0EA5E9]"
        >
          <option value="ALL">सभी स्थिति (All Status)</option>
          <option value="PUBLISHED">केवल प्रकाशित (Published Only)</option>
          <option value="DRAFT">केवल ड्राफ्ट (Draft Only)</option>
        </select>
      </div>

      {/* Products Table Card */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-400">
            <Loader2 size={32} className="animate-spin text-[#0EA5E9]" />
            <p className="text-xs">उत्पाद लोड हो रहे हैं...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="py-16 text-center text-slate-500">
            <Package size={36} className="mx-auto mb-2 text-slate-300" />
            <p className="text-sm font-bold text-[#0F2A5C]">कोई उत्पाद नहीं मिला</p>
            <p className="text-xs text-slate-400 mt-1">
              आपकी खोज या फ़िल्टर से कोई मेल नहीं खाता।
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                  <th className="py-3.5 px-4">छवि (Image)</th>
                  <th className="py-3.5 px-4">उत्पाद का नाम (Name & Slug)</th>
                  <th className="py-3.5 px-4">श्रेणी (Category)</th>
                  <th className="py-3.5 px-4">ब्रांड (Brand)</th>
                  <th className="py-3.5 px-4">स्थिति (Status)</th>
                  <th className="py-3.5 px-4 text-right">कार्य (Actions)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Image Thumbnail */}
                    <td className="py-3 px-4">
                      <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden relative flex items-center justify-center">
                        {p.images && p.images[0]?.url ? (
                          <Image
                            src={p.images[0].url}
                            alt={p.name}
                            fill
                            sizes="48px"
                            className="object-contain p-0.5"
                            unoptimized
                          />
                        ) : (
                          <Package size={20} className="text-slate-300" />
                        )}
                      </div>
                    </td>

                    {/* Name & Slug */}
                    <td className="py-3 px-4">
                      <Link
                        href={`/admin/products/${p.id}/edit`}
                        className="font-bold text-[#0F2A5C] hover:text-[#0EA5E9] transition-colors block text-sm leading-snug"
                      >
                        {p.name}
                      </Link>
                      <span className="text-[11px] text-slate-400 font-mono block mt-0.5">
                        /{p.slug}
                      </span>
                    </td>

                    {/* Category */}
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-md font-medium text-[11px]">
                        {p.categoryName}
                      </span>
                    </td>

                    {/* Brand */}
                    <td className="py-3 px-4 text-slate-600">
                      {p.brandName ? (
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md font-medium text-[11px]">
                          {p.brandName}
                        </span>
                      ) : (
                        <span className="text-slate-400 text-[11px]">—</span>
                      )}
                    </td>

                    {/* Status Badges */}
                    <td className="py-3 px-4">
                      <div className="flex flex-col gap-1 items-start">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold ${
                            p.isPublished
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {p.isPublished ? (
                            <>
                              <CheckCircle size={11} /> Published
                            </>
                          ) : (
                            <>
                              <XCircle size={11} /> Draft
                            </>
                          )}
                        </span>
                        {p.isFeatured && (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-purple-50 text-purple-700 border border-purple-200 rounded text-[9px] font-bold">
                            <Star size={9} /> Featured
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {p.isPublished && (
                          <Link
                            href={`/products/${p.slug}`}
                            target="_blank"
                            className="p-1.5 text-slate-400 hover:text-[#0EA5E9] hover:bg-slate-100 rounded-lg transition-colors"
                            title="View on Public Site"
                          >
                            <ExternalLink size={15} />
                          </Link>
                        )}
                        <Link
                          href={`/admin/products/${p.id}/edit`}
                          className="p-1.5 text-[#0F2A5C] hover:text-[#0EA5E9] hover:bg-slate-100 rounded-lg transition-colors"
                          title="Edit Product"
                        >
                          <Edit size={15} />
                        </Link>
                        <button
                          onClick={() => setDeleteConfirmId(p.id)}
                          className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Product"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-200">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle size={24} />
            </div>
            <h3 className="text-base font-bold text-[#0F2A5C] text-center mb-1">
              उत्पाद हटाएं? (Delete Product)
            </h3>
            <p className="text-xs text-slate-500 text-center mb-6 leading-relaxed">
              क्या आप सुनिश्चित हैं? यह क्रिया वापस नहीं ली जा सकती और Cloudinary की छवियां भी हटा दी जाएंगी।
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2.5 border border-slate-200 text-slate-700 font-semibold text-xs rounded-xl hover:bg-slate-50"
              >
                रद्द करें (Cancel)
              </button>
              <button
                type="button"
                disabled={deletingId !== null}
                onClick={() => handleDelete(deleteConfirmId)}
                className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl transition-colors disabled:opacity-50"
              >
                {deletingId ? "हटाया जा रहा है..." : "हटाएं (Delete)"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
