"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import {
  Upload,
  X,
  ArrowLeft,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Image as ImageIcon,
} from "lucide-react";

export interface UploadedImage {
  id?: string;
  url: string;
  publicId: string;
  alt?: string | null;
  sortOrder?: number;
}

interface ImageUploaderProps {
  images: UploadedImage[];
  onChange: (images: UploadedImage[]) => void;
  maxImages?: number;
}

export function ImageUploader({
  images,
  onChange,
  maxImages = 8,
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [replaceIndex, setReplaceIndex] = useState<number | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setError(null);
    setSuccessMsg(null);

    const validFiles: File[] = [];
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/avif"];
    const maxSizeBytes = 10 * 1024 * 1024; // 10MB

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (!allowedTypes.includes(file.type.toLowerCase())) {
        setError(`"${file.name}" समर्थित प्रारूप नहीं है। केवल JPG, PNG, WebP, AVIF चुनें।`);
        return;
      }

      if (file.size > maxSizeBytes) {
        setError(`"${file.name}" बहुत बड़ी है (अधिकतम 10MB)।`);
        return;
      }

      validFiles.push(file);
    }

    if (replaceIndex === null && images.length + validFiles.length > maxImages) {
      setError(`अधिकतम ${maxImages} छवियां जोड़ी जा सकती हैं।`);
      return;
    }

    setUploading(true);

    try {
      const newUploaded: UploadedImage[] = [];

      for (let i = 0; i < validFiles.length; i++) {
        const file = validFiles[i];
        setUploadProgress(`अपलोड हो रहा है (${i + 1}/${validFiles.length}): ${file.name}...`);

        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(data.error || "अपलोड विफल रहा");
        }

        newUploaded.push({
          url: data.url,
          publicId: data.publicId,
          alt: file.name.replace(/\.[^/.]+$/, ""),
          sortOrder: images.length + i,
        });
      }

      if (replaceIndex !== null) {
        // Replacing a specific image
        const indexToReplace = replaceIndex;
        setReplaceIndex(null);
        const updated = [...images];
        if (newUploaded[0]) {
          updated[indexToReplace] = newUploaded[0];
          onChange(updated);
          setSuccessMsg("छवि सफलतापूर्वक बदल दी गई (Image replaced)");
        }
      } else {
        // Adding new images
        const updated = [...images, ...newUploaded].map((img, idx) => ({
          ...img,
          sortOrder: idx,
        }));
        onChange(updated);
        setSuccessMsg(`${newUploaded.length} छवि/छवियां जोड़ी गईं (Images uploaded)`);
      }
    } catch (err: unknown) {
      console.error("Upload error", err);
      const msg = err instanceof Error ? err.message : "अपलोड के दौरान त्रुटि हुई";
      setError(msg);
    } finally {
      setUploading(false);
      setUploadProgress(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleRemove = (index: number) => {
    const updated = images.filter((_, i) => i !== index).map((img, i) => ({
      ...img,
      sortOrder: i,
    }));
    onChange(updated);
  };

  const handleMove = (index: number, direction: "left" | "right") => {
    const targetIndex = direction === "left" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= images.length) return;

    const updated = [...images];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    onChange(
      updated.map((img, i) => ({
        ...img,
        sortOrder: i,
      }))
    );
  };

  const triggerReplace = (index: number) => {
    setReplaceIndex(index);
    fileInputRef.current?.click();
  };

  const triggerNewUpload = () => {
    setReplaceIndex(null);
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => handleFiles(e.target.files)}
        multiple={replaceIndex === null}
        accept="image/jpeg,image/png,image/webp,image/avif"
        className="hidden"
      />

      {/* Error Alert */}
      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">
          <AlertCircle size={16} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Success Alert */}
      {successMsg && (
        <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs rounded-xl">
          <CheckCircle2 size={16} className="shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Image Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((img, index) => (
            <div
              key={img.publicId || img.url || index}
              className="relative group bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs flex flex-col"
            >
              {/* Primary Badge */}
              {index === 0 && (
                <span className="absolute top-2 left-2 z-10 text-[10px] font-bold px-2 py-0.5 bg-[#0F2A5C] text-white rounded-md uppercase tracking-wider shadow-xs">
                  मुख्य (Primary)
                </span>
              )}

              {/* Image Preview */}
              <div className="relative h-36 w-full bg-slate-100 flex items-center justify-center overflow-hidden">
                {img.url ? (
                  <Image
                    src={img.url}
                    alt={img.alt || `Product image ${index + 1}`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-contain p-1"
                    unoptimized
                  />
                ) : (
                  <ImageIcon size={32} className="text-slate-300" />
                )}
              </div>

              {/* Action Controls */}
              <div className="p-2 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-1 text-xs">
                {/* Reorder Left */}
                <button
                  type="button"
                  onClick={() => handleMove(index, "left")}
                  disabled={index === 0}
                  className="p-1.5 text-slate-500 hover:text-[#0F2A5C] disabled:opacity-30 rounded-lg hover:bg-slate-200 transition-colors"
                  title="Move Left"
                  aria-label="Move image left"
                >
                  <ArrowLeft size={14} />
                </button>

                {/* Replace Button */}
                <button
                  type="button"
                  onClick={() => triggerReplace(index)}
                  className="px-2 py-1 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-medium rounded-lg text-[11px] transition-colors"
                >
                  बदलें
                </button>

                {/* Delete Button */}
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete image"
                  aria-label="Delete image"
                >
                  <X size={15} />
                </button>

                {/* Reorder Right */}
                <button
                  type="button"
                  onClick={() => handleMove(index, "right")}
                  disabled={index === images.length - 1}
                  className="p-1.5 text-slate-500 hover:text-[#0F2A5C] disabled:opacity-30 rounded-lg hover:bg-slate-200 transition-colors"
                  title="Move Right"
                  aria-label="Move image right"
                >
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Zone Button */}
      {images.length < maxImages && (
        <div
          onClick={triggerNewUpload}
          className={`border-2 border-dashed border-slate-300 hover:border-[#0EA5E9] bg-[#F8FAFC] hover:bg-[#F0F9FF] rounded-2xl p-6 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-3 ${
            uploading ? "opacity-60 pointer-events-none" : ""
          }`}
        >
          {uploading ? (
            <>
              <Loader2 size={28} className="animate-spin text-[#0EA5E9]" />
              <p className="text-xs font-semibold text-[#0F2A5C]">
                {uploadProgress || "छवि अपलोड हो रही है..."}
              </p>
            </>
          ) : (
            <>
              <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-center text-[#0EA5E9]">
                <Upload size={22} />
              </div>
              <div>
                <p className="text-sm font-bold text-[#0F2A5C] mb-0.5">
                  + उत्पाद की छवि अपलोड करें (Upload Image)
                </p>
                <p className="text-xs text-slate-500">
                  JPG, PNG, WebP या AVIF (अधिकतम 10MB) • {images.length}/{maxImages} छवियां
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
