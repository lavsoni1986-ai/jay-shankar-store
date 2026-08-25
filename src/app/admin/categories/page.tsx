"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, AlertCircle, Loader2, X, Check } from "lucide-react";
import { slugify } from "@/lib/utils";

interface CategoryItem {
  id: string;
  name: string;
  nameHindi: string;
  slug: string;
  description: string;
  icon: string;
  isCore: boolean;
  color: string;
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(null);

  const [name, setName] = useState("");
  const [nameHindi, setNameHindi] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [isCore, setIsCore] = useState(false);
  const [icon, setIcon] = useState("Package");
  const [color, setColor] = useState("bg-blue-50");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refetch = () => {
    fetch("/api/admin/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data.categories || []))
      .catch((e) => console.error("Fetch categories error", e));
  };

  useEffect(() => {
    let active = true;
    fetch("/api/admin/categories")
      .then((res) => res.json())
      .then((data) => {
        if (active) {
          setCategories(data.categories || []);
          setLoading(false);
        }
      })
      .catch((e) => {
        console.error("Fetch categories error", e);
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const openAddModal = () => {
    setEditingCategory(null);
    setName("");
    setNameHindi("");
    setSlug("");
    setDescription("");
    setIsCore(false);
    setIcon("Package");
    setColor("bg-blue-50");
    setError(null);
    setModalOpen(true);
  };

  const openEditModal = (cat: CategoryItem) => {
    setEditingCategory(cat);
    setName(cat.name);
    setNameHindi(cat.nameHindi);
    setSlug(cat.slug);
    setDescription(cat.description);
    setIsCore(cat.isCore);
    setIcon(cat.icon || "Package");
    setColor(cat.color || "bg-blue-50");
    setError(null);
    setModalOpen(true);
  };

  const handleNameChange = (val: string) => {
    setName(val);
    if (!editingCategory) {
      setSlug(slugify(val));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      name: name.trim(),
      nameHindi: nameHindi.trim(),
      slug: slug.trim().toLowerCase(),
      description: description.trim(),
      isCore,
      icon,
      color,
    };

    try {
      const method = editingCategory ? "PUT" : "POST";
      const body = editingCategory ? { id: editingCategory.id, ...payload } : payload;

      const res = await fetch("/api/admin/categories", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "सहेजने में त्रुटि (Failed to save category)");
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
    if (!confirm("क्या आप वाकई इस श्रेणी को हटाना चाहते हैं? (Delete this category?)")) return;

    try {
      const res = await fetch(`/api/admin/categories?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setCategories((prev) => prev.filter((c) => c.id !== id));
      } else {
        alert("हटाने में त्रुटि हुई");
      }
    } catch (e) {
      console.error("Delete category error", e);
      alert("हटाने में त्रुटि हुई");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#0F2A5C]">
            श्रेणी प्रबंधन (Category Management)
          </h1>
          <p className="text-xs text-slate-500">
            थोक श्रेणियों और कोर सेगमेंट्स का प्रबंधन करें ({categories.length} श्रेणियाँ)
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0F2A5C] hover:bg-[#0EA5E9] text-white text-xs font-bold rounded-xl transition-colors shadow-xs cursor-pointer"
        >
          <Plus size={16} />
          + नई श्रेणी जोड़ें (Add Category)
        </button>
      </div>

      {/* Categories Table */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-400">
            <Loader2 size={32} className="animate-spin text-[#0EA5E9]" />
            <p className="text-xs">श्रेणियाँ लोड हो रही हैं...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                  <th className="py-3.5 px-4">नाम (Name)</th>
                  <th className="py-3.5 px-4">हिंदी नाम (Hindi)</th>
                  <th className="py-3.5 px-4">Slug</th>
                  <th className="py-3.5 px-4">प्रकार (Type)</th>
                  <th className="py-3.5 px-4">विवरण (Description)</th>
                  <th className="py-3.5 px-4 text-right">कार्य (Actions)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {categories.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-[#0F2A5C]">{c.name}</td>
                    <td className="py-3.5 px-4 font-semibold text-slate-700">{c.nameHindi}</td>
                    <td className="py-3.5 px-4 font-mono text-slate-400 text-[11px]">/{c.slug}</td>
                    <td className="py-3.5 px-4">
                      {c.isCore ? (
                        <span className="px-2 py-0.5 bg-[#0F2A5C] text-white rounded-md text-[10px] font-bold">
                          Core Wholesale
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md text-[10px]">
                          Additional
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 max-w-xs truncate">{c.description}</td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(c)}
                          className="p-1.5 text-[#0F2A5C] hover:text-[#0EA5E9] hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <Edit size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(c.id)}
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
          <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="text-base font-bold text-[#0F2A5C]">
                {editingCategory ? "श्रेणी संपादित करें (Edit Category)" : "नई श्रेणी जोड़ें (Add Category)"}
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
                <label className="block font-bold text-slate-700 mb-1">अंग्रेज़ी नाम (English Name) *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g. Umbrella"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0EA5E9] focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">हिंदी नाम (Hindi Name) *</label>
                <input
                  type="text"
                  required
                  value={nameHindi}
                  onChange={(e) => setNameHindi(e.target.value)}
                  placeholder="e.g. छाता"
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
                  placeholder="e.g. umbrella"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0EA5E9] focus:bg-white font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">विवरण (Description) *</label>
                <textarea
                  required
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="श्रेणी का विवरण दर्ज करें..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0EA5E9] focus:bg-white"
                />
              </div>

              <label className="flex items-center gap-2.5 p-3 bg-slate-50 hover:bg-slate-100 rounded-xl cursor-pointer border border-slate-200">
                <input
                  type="checkbox"
                  checked={isCore}
                  onChange={(e) => setIsCore(e.target.checked)}
                  className="w-4 h-4 text-[#0EA5E9] rounded"
                />
                <div>
                  <span className="font-bold text-[#0F2A5C] block">कोर थोक सेगमेंट (Core Wholesale Segment)</span>
                  <span className="text-[10px] text-slate-500">होमपेज पर प्राथमिकता के साथ दिखाया जाएगा।</span>
                </div>
              </label>

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
                  {editingCategory ? "अपडेट करें" : "सहेजें"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
