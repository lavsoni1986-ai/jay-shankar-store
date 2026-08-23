"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, ArrowLeft, Save, AlertCircle } from "lucide-react";
import { ImageUploader, UploadedImage } from "./ImageUploader";
import { slugify } from "@/lib/utils";

interface CategoryOption {
  id: string;
  name: string;
  nameHindi: string;
}

interface BrandOption {
  id: string;
  name: string;
}

interface ProductFormProps {
  initialData?: {
    id?: string;
    name: string;
    slug: string;
    description: string;
    shortDescription: string;
    categoryId: string;
    brandId?: string | null;
    tags: string[];
    isWholesale: boolean;
    isFeatured: boolean;
    isPublished: boolean;
    enquiryAvailable: boolean;
    images?: UploadedImage[];
  };
  categories: CategoryOption[];
  brands: BrandOption[];
  isEditing?: boolean;
}

export function ProductForm({
  initialData,
  categories,
  brands,
  isEditing = false,
}: ProductFormProps) {
  const router = useRouter();

  const [name, setName] = useState(initialData?.name || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [autoSlug, setAutoSlug] = useState(!isEditing);
  const [shortDescription, setShortDescription] = useState(initialData?.shortDescription || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [categoryId, setCategoryId] = useState(initialData?.categoryId || (categories[0]?.id ?? ""));
  const [brandId, setBrandId] = useState<string>(initialData?.brandId || "");
  const [tagsInput, setTagsInput] = useState(initialData?.tags?.join(", ") || "");
  const [isWholesale, setIsWholesale] = useState(initialData?.isWholesale ?? true);
  const [isFeatured, setIsFeatured] = useState(initialData?.isFeatured ?? false);
  const [isPublished, setIsPublished] = useState(initialData?.isPublished ?? true);
  const [enquiryAvailable, setEnquiryAvailable] = useState(initialData?.enquiryAvailable ?? true);
  const [images, setImages] = useState<UploadedImage[]>(initialData?.images || []);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleNameChange = (val: string) => {
    setName(val);
    if (autoSlug) {
      setSlug(slugify(val));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("उत्पाद का नाम आवश्यक है (Product name required)");
      return;
    }
    if (!slug.trim()) {
      setError("Slug आवश्यक है (Product slug required)");
      return;
    }
    if (!categoryId) {
      setError("कृपया एक श्रेणी चुनें (Category required)");
      return;
    }
    if (!description.trim()) {
      setError("उत्पाद विवरण आवश्यक है (Description required)");
      return;
    }

    setSaving(true);

    const tags = tagsInput
      .split(",")
      .map((t) => t.trim().toLowerCase())
      .filter((t) => t.length > 0);

    const payload = {
      name: name.trim(),
      slug: slug.trim().toLowerCase(),
      shortDescription: shortDescription.trim() || name.trim(),
      description: description.trim(),
      categoryId,
      brandId: brandId || null,
      tags,
      isWholesale,
      isFeatured,
      isPublished,
      enquiryAvailable,
      isDemo: false,
      images: images.map((img, idx) => ({
        url: img.url,
        publicId: img.publicId,
        alt: img.alt || name.trim(),
        sortOrder: idx,
      })),
    };

    try {
      const endpoint = isEditing && initialData?.id
        ? `/api/admin/products/${initialData.id}`
        : "/api/admin/products";

      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "उत्पाद सहेजने में विफल रहा (Failed to save product)");
      }

      router.push("/admin/products");
      router.refresh();
    } catch (err: unknown) {
      console.error("Save product error", err);
      const msg = err instanceof Error ? err.message : "त्रुटि हुई";
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl">
      {/* Error Alert */}
      {error && (
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-2xl">
          <AlertCircle size={18} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Main Info Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <h2 className="text-base font-bold text-[#0F2A5C] border-b border-slate-100 pb-3">
          1. प्राथमिक जानकारी (Basic Information)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
              उत्पाद का नाम (Product Name) *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="e.g. Cotton Vest (Baniyan)"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-[#0EA5E9] focus:bg-white transition-colors"
            />
          </div>

          {/* Slug */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                URL Slug *
              </label>
              <label className="text-[11px] text-slate-500 flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoSlug}
                  onChange={(e) => setAutoSlug(e.target.checked)}
                  className="rounded text-[#0EA5E9]"
                />
                Auto-generate
              </label>
            </div>
            <input
              type="text"
              required
              value={slug}
              onChange={(e) => {
                setAutoSlug(false);
                setSlug(e.target.value);
              }}
              placeholder="e.g. cotton-vest-baniyan"
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-[#0EA5E9] focus:bg-white transition-colors font-mono"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
              श्रेणी (Category) *
            </label>
            <select
              required
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-[#0EA5E9] focus:bg-white transition-colors"
            >
              <option value="">-- श्रेणी चुनें --</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nameHindi} ({c.name})
                </option>
              ))}
            </select>
          </div>

          {/* Brand */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
              ब्रांड (Brand)
            </label>
            <select
              value={brandId}
              onChange={(e) => setBrandId(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-[#0EA5E9] focus:bg-white transition-colors"
            >
              <option value="">-- कोई ब्रांड नहीं (No brand / Generic) --</option>
              {brands.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Short Description */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
            संक्षिप्त विवरण (Short Description)
          </label>
          <input
            type="text"
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            placeholder="1-2 पंक्ति का विवरण (e.g. Premium quality cotton innerwear — wholesale rates)"
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-[#0EA5E9] focus:bg-white transition-colors"
          />
        </div>

        {/* Full Description */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
            विस्तृत विवरण (Full Description) *
          </label>
          <textarea
            required
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="उत्पाद की विशेषताएं, आकार (sizes), थोक उपलब्धता, आदि दर्ज करें..."
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-[#0EA5E9] focus:bg-white transition-colors"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
            खोज टैग (Tags — comma separated)
          </label>
          <input
            type="text"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            placeholder="e.g. baniyan, vest, cotton, wholesale, innerwear"
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:border-[#0EA5E9] focus:bg-white transition-colors"
          />
        </div>
      </div>

      {/* Product Images Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-base font-bold text-[#0F2A5C]">
            2. उत्पाद छवियां (Product Images via Cloudinary)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            वास्तविक उत्पाद तस्वीरें अपलोड करें। पहली छवि मुख्य (Primary) मानी जाएगी।
          </p>
        </div>

        <ImageUploader images={images} onChange={setImages} maxImages={8} />
      </div>

      {/* Visibility & Settings Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-[#0F2A5C] border-b border-slate-100 pb-3">
          3. स्थिति एवं दृश्यता (Status & Visibility)
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {/* Published Toggle */}
          <label className="flex items-start gap-3 p-4 bg-slate-50 hover:bg-slate-100 rounded-2xl cursor-pointer border border-slate-200 transition-colors">
            <input
              type="checkbox"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              className="mt-0.5 w-4 h-4 text-[#0EA5E9] rounded"
            />
            <div>
              <span className="text-xs font-bold text-[#0F2A5C] block">
                वेबसाइट पर प्रकाशित करें (Published)
              </span>
              <span className="text-[11px] text-slate-500 leading-tight block">
                यदि बंद है, तो यह केवल एडमिन में दिखेगा (Draft mode).
              </span>
            </div>
          </label>

          {/* Featured Toggle */}
          <label className="flex items-start gap-3 p-4 bg-slate-50 hover:bg-slate-100 rounded-2xl cursor-pointer border border-slate-200 transition-colors">
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="mt-0.5 w-4 h-4 text-[#0EA5E9] rounded"
            />
            <div>
              <span className="text-xs font-bold text-[#0F2A5C] block">
                होमपेज पर फ़ीचर्ड करें (Featured on Home)
              </span>
              <span className="text-[11px] text-slate-500 leading-tight block">
                होमपेज के &ldquo;उत्पाद कैटलॉग झलक&rdquo; में दिखाएं।
              </span>
            </div>
          </label>

          {/* Wholesale Toggle */}
          <label className="flex items-start gap-3 p-4 bg-slate-50 hover:bg-slate-100 rounded-2xl cursor-pointer border border-slate-200 transition-colors">
            <input
              type="checkbox"
              checked={isWholesale}
              onChange={(e) => setIsWholesale(e.target.checked)}
              className="mt-0.5 w-4 h-4 text-[#0EA5E9] rounded"
            />
            <div>
              <span className="text-xs font-bold text-[#0F2A5C] block">
                थोक उत्पाद बैज (Wholesale Badge)
              </span>
              <span className="text-[11px] text-slate-500 leading-tight block">
                कार्ड पर &ldquo;Wholesale&rdquo; का बैज दिखाएं।
              </span>
            </div>
          </label>

          {/* Enquiry Toggle */}
          <label className="flex items-start gap-3 p-4 bg-slate-50 hover:bg-slate-100 rounded-2xl cursor-pointer border border-slate-200 transition-colors">
            <input
              type="checkbox"
              checked={enquiryAvailable}
              onChange={(e) => setEnquiryAvailable(e.target.checked)}
              className="mt-0.5 w-4 h-4 text-[#0EA5E9] rounded"
            />
            <div>
              <span className="text-xs font-bold text-[#0F2A5C] block">
                WhatsApp पूछताछ सक्षम (WhatsApp Enquiry Enabled)
              </span>
              <span className="text-[11px] text-slate-500 leading-tight block">
                कार्ड पर WhatsApp थोक पूछताछ बटन सक्रिय रखें।
              </span>
            </div>
          </label>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-200">
        <Link
          href="/admin/products"
          className="inline-flex items-center gap-2 px-5 py-3 border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold rounded-xl transition-colors"
        >
          <ArrowLeft size={16} />
          रद्द करें (Cancel)
        </Link>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#0F2A5C] hover:bg-[#0EA5E9] text-white text-xs font-bold rounded-xl transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
        >
          {saving ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              सहेजा जा रहा है... (Saving)
            </>
          ) : (
            <>
              <Save size={16} />
              {isEditing ? "उत्पाद अपडेट करें (Update Product)" : "उत्पाद सहेजें (Save Product)"}
            </>
          )}
        </button>
      </div>
    </form>
  );
}
