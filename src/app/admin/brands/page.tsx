"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, AlertCircle, Loader2, X, Check } from "lucide-react";
import { slugify } from "@/lib/utils";

interface BrandItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  logoPlaceholder: string;
  logoUrl?: string;
  accentColor: string;
}

export default function AdminBrandsPage() {
  const [brands, setBrands] = useState<BrandItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<BrandItem | null>(null);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [logoPlaceholder, setLogoPlaceholder] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [accentColor, setAccentColor] = useState("#0F2A5C");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refetch = () => {
    fetch("/api/admin/brands")
      .then((res) => res.json())
      .then((data) => setBrands(data.brands || []))
      .catch((e) => console.error("Fetch brands error", e));
  };

  useEffect(() => {
    let active = true;
    fetch("/api/admin/brands")
      .then((res) => res.json())
      .then((data) => {
        if (active) {
          setBrands(data.brands || []);
          setLoading(false);
        }
      })
      .catch((e) => {
        console.error("Fetch brands error", e);
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const openAddModal = () => {
    setEditingBrand(null);
    setName("");
    setSlug("");
    setDescription("");
    setLogoPlaceholder("");
    setLogoUrl("");
    setAccentColor("#0F2A5C");
    setError(null);
    setModalOpen(true);
  };

  const openEditModal = (b: BrandItem) => {
    setEditingBrand(b);
    setName(b.name);
    setSlug(b.slug);
    setDescription(b.description);
    setLogoPlaceholder(b.logoPlaceholder);
    setLogoUrl(b.logoUrl || "");
    setAccentColor(b.accentColor || "#0F2A5C");
    setError(null);
    setModalOpen(true);
  };

  const handleNameChange = (val: string) => {
    setName(val);
    if (!editingBrand) {
      setSlug(slugify(val));
      setLogoPlaceholder(val.slice(0, 3).toUpperCase());
    }
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingLogo(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Logo upload failed");
      setLogoUrl(data.url);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploadingLogo(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      name: name.trim(),
      slug: slug.trim().toLowerCase(),
      description: description.trim(),
      logoPlaceholder: logoPlaceholder.trim().toUpperCase() || name.trim().slice(0, 3).toUpperCase(),
      logoUrl: logoUrl.trim() || undefined,
      accentColor,
    };

    try {
      const method = editingBrand ? "PUT" : "POST";
      const body = editingBrand ? { id: editingBrand.id, ...payload } : payload;

      const res = await fetch("/api/admin/brands", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "सहेजने में त्रुटि (Failed to save brand)");
      }

      setModalOpen(false);
      refetch();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "त्रुटि हुई";
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("क्या आप वाकई इस ब्रांड को हटाना चाहते हैं? (Delete this brand?)")) return;

    try {
      const res = await fetch(`/api/admin/brands?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setBrands((prev) => prev.filter((b) => b.id !== id));
      } else {
        alert("हटाने में त्रुटि हुई");
      }
    } catch (e) {
      console.error("Delete brand error", e);
      alert("हटाने में त्रुटि हुई");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#0F2A5C]">
            ब्रांड प्रबंधन (Brand Management)
          </h1>
          <p className="text-xs text-slate-500">
            सत्यापित ब्रांड और उनके विवरण का प्रबंधन करें ({brands.length} ब्रांड्स)
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0F2A5C] hover:bg-[#0EA5E9] text-white text-xs font-bold rounded-xl transition-colors shadow-xs cursor-pointer"
        >
          <Plus size={16} />
          + नया ब्रांड जोड़ें (Add Brand)
        </button>
      </div>

      {/* Brands Grid */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-400">
            <Loader2 size={32} className="animate-spin text-[#0EA5E9]" />
            <p className="text-xs">ब्रांड लोड हो रहे हैं...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                  <th className="py-3.5 px-4">बैज (Logo)</th>
                  <th className="py-3.5 px-4">ब्रांड का नाम (Name)</th>
                  <th className="py-3.5 px-4">Slug</th>
                  <th className="py-3.5 px-4">रंग (Accent Color)</th>
                  <th className="py-3.5 px-4">विवरण (Description)</th>
                  <th className="py-3.5 px-4 text-right">कार्य (Actions)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {brands.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden relative shadow-xs border border-slate-100 bg-white"
                      >
                        {b.logoUrl ? (
                          <img
                            src={b.logoUrl}
                            alt={b.name}
                            className="w-full h-full object-contain p-1"
                          />
                        ) : (
                          <div
                            className="w-full h-full flex items-center justify-center text-white font-bold text-xs"
                            style={{ backgroundColor: b.accentColor }}
                          >
                            {b.logoPlaceholder}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-[#0F2A5C]">{b.name}</td>
                    <td className="py-3.5 px-4 font-mono text-slate-400 text-[11px]">/{b.slug}</td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-slate-300"
                          style={{ backgroundColor: b.accentColor }}
                        />
                        <span className="font-mono text-slate-600 text-[11px]">{b.accentColor}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 max-w-xs truncate">{b.description}</td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(b)}
                          className="p-1.5 text-[#0F2A5C] hover:text-[#0EA5E9] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <Edit size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(b.id)}
                          className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete"
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

      {/* Modal for Add / Edit */}
      {modalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-base font-bold text-[#0F2A5C]">
                {editingBrand ? "ब्रांड संपादित करें (Edit Brand)" : "नया ब्रांड जोड़ें (Add Brand)"}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X size={18} />
              </button>
            </div>

            {error && (
              <div className="mb-4 flex items-center gap-2 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
                <AlertCircle size={15} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">ब्रांड का नाम (Brand Name) *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g. Zeel Rainwear"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0EA5E9] focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">URL Slug *</label>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="e.g. zeel-rainwear"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0EA5E9] focus:bg-white font-mono"
                />
              </div>

              {/* Logo Section */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <label className="block font-bold text-slate-700">आधिकारिक लोगो (Brand Official Logo)</label>
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-xl border border-slate-200 bg-white flex items-center justify-center overflow-hidden shrink-0 shadow-xs">
                    {logoUrl ? (
                      <img src={logoUrl} alt="Logo preview" className="w-full h-full object-contain p-1" />
                    ) : (
                      <div
                        className="w-full h-full flex items-center justify-center text-white font-bold text-sm"
                        style={{ backgroundColor: accentColor }}
                      >
                        {logoPlaceholder || "LOGO"}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:border-[#0EA5E9] text-slate-700 rounded-xl cursor-pointer text-[11px] font-semibold transition-colors">
                      {uploadingLogo ? (
                        <>
                          <Loader2 size={12} className="animate-spin text-[#0EA5E9]" />
                          अपलोड हो रहा है...
                        </>
                      ) : (
                        <>
                          <Plus size={12} />
                          लोगो अपलोड करें (Upload)
                        </>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        disabled={uploadingLogo}
                        onChange={handleLogoUpload}
                        className="hidden"
                      />
                    </label>
                    {logoUrl && (
                      <button
                        type="button"
                        onClick={() => setLogoUrl("")}
                        className="block text-[11px] text-red-500 hover:text-red-700 cursor-pointer"
                      >
                        लोगो हटाएं (Use Initials)
                      </button>
                    )}
                  </div>
                </div>
                <input
                  type="text"
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                  placeholder="https://res.cloudinary.com/... (या सीधा URL दर्ज करें)"
                  className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#0EA5E9] text-[11px] font-mono text-slate-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">लोगो संक्षिप्त अक्षर (Initials Fallback) *</label>
                  <input
                    type="text"
                    required
                    maxLength={5}
                    value={logoPlaceholder}
                    onChange={(e) => setLogoPlaceholder(e.target.value)}
                    placeholder="e.g. ZR"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0EA5E9] focus:bg-white uppercase font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">रंग (Hex Color) *</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="w-9 h-9 p-0 border border-slate-300 rounded-lg cursor-pointer"
                    />
                    <input
                      type="text"
                      value={accentColor}
                      onChange={(e) => setAccentColor(e.target.value)}
                      className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none font-mono text-[11px]"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">विवरण (Description) *</label>
                <textarea
                  required
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="ब्रांड और थोक उपलब्धता का विवरण..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0EA5E9] focus:bg-white"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="flex-1 py-2.5 border border-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 cursor-pointer"
                >
                  रद्द करें
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 py-2.5 bg-[#0F2A5C] hover:bg-[#0EA5E9] text-white font-bold rounded-xl transition-colors disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                >
                  {saving ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
                  {editingBrand ? "अपडेट करें" : "सहेजें"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
