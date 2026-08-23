"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Image as ImageIcon,
  Trash2,
  Copy,
  Check,
  ExternalLink,
  Loader2,
  Upload,
} from "lucide-react";
import { ImageUploader, UploadedImage } from "@/components/admin/ImageUploader";

interface MediaItem {
  id: string;
  url: string;
  publicId: string;
  alt: string | null;
  productName: string;
  productSlug: string | null;
  createdAt: string;
}

export default function AdminMediaPage() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [tempUploads, setTempUploads] = useState<UploadedImage[]>([]);

  const refetch = () => {
    fetch("/api/admin/media")
      .then((res) => res.json())
      .then((data) => setMedia(data.images || []))
      .catch((e) => console.error("Fetch media error", e));
  };

  useEffect(() => {
    let active = true;
    fetch("/api/admin/media")
      .then((res) => res.json())
      .then((data) => {
        if (active) {
          setMedia(data.images || []);
          setLoading(false);
        }
      })
      .catch((e) => {
        console.error("Fetch media error", e);
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const handleDelete = async (id: string, publicId: string) => {
    if (!confirm("क्या आप वाकई इस मीडिया फ़ाइल को हटाना चाहते हैं? (Delete this media asset?)")) return;

    try {
      const res = await fetch(`/api/admin/media?id=${id}&publicId=${encodeURIComponent(publicId)}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setMedia((prev) => prev.filter((m) => m.id !== id && m.publicId !== publicId));
      } else {
        alert("हटाने में विफल");
      }
    } catch (e) {
      console.error("Delete media error", e);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#0F2A5C]">
            मीडिया लाइब्रेरी (Cloudinary Media Library)
          </h1>
          <p className="text-xs text-slate-500">
            Jay Shankar Readymade Store के लिए Cloudinary पर अपलोड की गई छवियां ({media.length} छवियां)
          </p>
        </div>
        <button
          onClick={() => setShowUploadModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#0F2A5C] hover:bg-[#0EA5E9] text-white text-xs font-bold rounded-xl transition-colors shadow-xs cursor-pointer"
        >
          <Upload size={16} />
          + मीडिया अपलोड करें (Upload Media)
        </button>
      </div>

      {/* Media Grid */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-400">
            <Loader2 size={32} className="animate-spin text-[#0EA5E9]" />
            <p className="text-xs">मीडिया लोड हो रहा है...</p>
          </div>
        ) : media.length === 0 ? (
          <div className="py-16 text-center text-slate-500">
            <ImageIcon size={36} className="mx-auto mb-2 text-slate-300" />
            <p className="text-sm font-bold text-[#0F2A5C]">कोई मीडिया फ़ाइल नहीं मिली</p>
            <p className="text-xs text-slate-400 mt-1">
              उत्पाद बनाते समय या ऊपर दिए गए बटन से छवियां अपलोड करें।
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {media.map((item) => (
              <div
                key={item.id || item.publicId}
                className="group bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden shadow-xs flex flex-col hover:border-[#0EA5E9] transition-all"
              >
                <div className="relative h-36 bg-white flex items-center justify-center overflow-hidden">
                  <Image
                    src={item.url}
                    alt={item.alt || item.productName}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                    className="object-contain p-1 group-hover:scale-105 transition-transform"
                    unoptimized
                  />
                </div>

                <div className="p-2.5 flex flex-col flex-1 justify-between text-xs bg-white border-t border-slate-100">
                  <div className="mb-2">
                    <p className="font-bold text-[#0F2A5C] truncate text-[11px]">
                      {item.productName}
                    </p>
                    <p className="text-[10px] text-slate-400 font-mono truncate mt-0.5">
                      {item.publicId}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-1 pt-1.5 border-t border-slate-100">
                    <button
                      onClick={() => handleCopy(item.url)}
                      className="p-1 text-slate-500 hover:text-[#0EA5E9] rounded-md transition-colors"
                      title="Copy URL"
                    >
                      {copiedUrl === item.url ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                    </button>

                    {item.productSlug && (
                      <Link
                        href={`/products/${item.productSlug}`}
                        target="_blank"
                        className="p-1 text-slate-500 hover:text-[#0F2A5C] rounded-md transition-colors"
                        title="View Product"
                      >
                        <ExternalLink size={14} />
                      </Link>
                    )}

                    <button
                      onClick={() => handleDelete(item.id, item.publicId)}
                      className="p-1 text-red-500 hover:text-red-700 rounded-md transition-colors"
                      title="Delete Asset"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-slate-200">
            <h3 className="text-base font-bold text-[#0F2A5C] mb-1">
              मीडिया अपलोड करें (Upload Media to Cloudinary)
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              छवियां सीधे Cloudinary पर अपलोड होंगी।
            </p>

            <ImageUploader
              images={tempUploads}
              onChange={(imgs) => {
                setTempUploads(imgs);
                refetch();
              }}
              maxImages={10}
            />

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setShowUploadModal(false);
                  setTempUploads([]);
                  refetch();
                }}
                className="px-5 py-2.5 bg-[#0F2A5C] text-white text-xs font-bold rounded-xl hover:bg-[#0EA5E9] transition-colors"
              >
                पूर्ण (Done)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
