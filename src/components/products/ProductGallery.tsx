"use client";

import { useState } from "react";
import Image from "next/image";
import { Package, ZoomIn, X, ChevronLeft, ChevronRight } from "lucide-react";
import { getOptimizedImageUrl } from "@/lib/image-utils";

interface ProductGalleryProps {
  images: string[];
  productName: string;
  categoryName?: string;
}

export function ProductGallery({
  images,
  productName,
  categoryName,
}: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const cleanImages = (images || []).filter(
    (img): img is string => Boolean(img && typeof img === "string" && img.trim().length > 0)
  );

  const currentImage = cleanImages[selectedIndex] || null;
  const hasMultipleImages = cleanImages.length > 1;

  const nextImage = () => {
    if (!hasMultipleImages) return;
    setSelectedIndex((prev) => (prev + 1) % cleanImages.length);
  };

  const prevImage = () => {
    if (!hasMultipleImages) return;
    setSelectedIndex((prev) => (prev - 1 + cleanImages.length) % cleanImages.length);
  };

  return (
    <>
      <div className="bg-white border border-[#E3DED6] rounded-3xl overflow-hidden p-3 sm:p-5 shadow-2xs flex flex-col gap-3.5">
        {/* Main Product Image Frame */}
        <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#FDFBF7] border border-[#EAE4DC] flex items-center justify-center group">
          {currentImage ? (
            <>
              <Image
                src={getOptimizedImageUrl(currentImage, { width: 900, height: 900 })}
                alt={`${productName} — मुख्य दृश्य ${hasMultipleImages ? `(${selectedIndex + 1}/${cleanImages.length})` : ""}`}
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                className="object-contain p-4 sm:p-6 transition-transform duration-300 group-hover:scale-105"
                unoptimized
              />

              {/* Zoom Action Button */}
              <button
                type="button"
                onClick={() => setIsLightboxOpen(true)}
                className="absolute top-3 right-3 p-2 rounded-xl bg-white/90 hover:bg-white text-[#242426] border border-[#E3DED6] shadow-xs opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all duration-200 cursor-pointer"
                aria-label="छवि ज़ूम करें (Inspect full image)"
                title="ज़ूम करें"
              >
                <ZoomIn size={16} className="text-[#B77B50]" aria-hidden="true" />
              </button>

              {/* Prev / Next controls on main image when multiple images */}
              {hasMultipleImages && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white text-[#242426] border border-[#E3DED6] shadow-xs opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    aria-label="पिछली छवि"
                  >
                    <ChevronLeft size={16} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white text-[#242426] border border-[#E3DED6] shadow-xs opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    aria-label="अगली छवि"
                  >
                    <ChevronRight size={16} aria-hidden="true" />
                  </button>
                </>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center p-6 text-center select-none">
              <div className="w-14 h-14 rounded-2xl bg-[#F3EFE8] border border-[#D8C9B7] flex items-center justify-center mb-2.5 shadow-2xs">
                <Package size={28} className="text-[#B77B50]" aria-hidden="true" />
              </div>
              <p className="text-sm font-semibold text-[#242426] font-display max-w-[80%]">
                {productName}
              </p>
              {categoryName && (
                <span className="text-xs text-[#686469] mt-0.5">
                  {categoryName}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Thumbnails Navigation (Rendered ONLY if more than 1 image exists) */}
        {hasMultipleImages && (
          <div
            className="flex items-center gap-2.5 overflow-x-auto pb-1 pt-0.5"
            role="tablist"
            aria-label="उत्पाद छवियाँ"
          >
            {cleanImages.map((imgUrl, index) => {
              const isActive = index === selectedIndex;
              return (
                <button
                  key={imgUrl + index}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`${productName} दृश्य ${index + 1}`}
                  onClick={() => setSelectedIndex(index)}
                  className={`relative w-16 h-16 sm:w-18 sm:h-18 rounded-xl overflow-hidden shrink-0 bg-[#FDFBF7] transition-all cursor-pointer border-2 ${
                    isActive
                      ? "border-[#B77B50] shadow-xs scale-102 ring-2 ring-[#B77B50]/20"
                      : "border-[#E3DED6] hover:border-[#D8C9B7] opacity-80 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={getOptimizedImageUrl(imgUrl, { width: 140, height: 140 })}
                    alt={`${productName} thumbnail ${index + 1}`}
                    fill
                    sizes="72px"
                    className="object-contain p-1"
                    unoptimized
                  />
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Lightbox / Zoom Modal */}
      {isLightboxOpen && currentImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`${productName} विस्तृत दृश्य`}
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#242426] transition-colors cursor-pointer z-10"
            aria-label="ज़ूम विंडो बंद करें"
          >
            <X size={22} aria-hidden="true" />
          </button>

          {/* Prev button */}
          {hasMultipleImages && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#242426] transition-colors cursor-pointer"
              aria-label="पिछली छवि देखें"
            >
              <ChevronLeft size={24} aria-hidden="true" />
            </button>
          )}

          {/* Full Image Container */}
          <div
            className="relative max-w-4xl max-h-[85vh] w-full h-[75vh] flex items-center justify-center p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={getOptimizedImageUrl(currentImage, { width: 1400, height: 1400 })}
              alt={`${productName} विस्तृत दृश्य`}
              fill
              sizes="90vw"
              className="object-contain"
              unoptimized
            />
          </div>

          {/* Next button */}
          {hasMultipleImages && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#242426] transition-colors cursor-pointer"
              aria-label="अगली छवि देखें"
            >
              <ChevronRight size={24} aria-hidden="true" />
            </button>
          )}

          {/* Caption */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 px-4 py-1.5 rounded-full text-white text-xs font-medium text-center">
            {productName} {hasMultipleImages && `(${selectedIndex + 1}/${cleanImages.length})`}
          </div>
        </div>
      )}
    </>
  );
}
