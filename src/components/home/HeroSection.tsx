"use client";

import Link from "next/link";
import Image from "next/image";
import { MessageCircle, BookOpen, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import { getGeneralEnquiryUrl } from "@/lib/whatsapp";
import { getOptimizedImageUrl } from "@/lib/image-utils";

const HERO_SHOWCASE = [
  {
    name: "कोलकाता कुर्ती",
    nameEn: "Kolkata Kurti",
    category: "कोलकाता रेडीमेड",
    image: "https://res.cloudinary.com/dbz0kkwaj/image/upload/v1787660898/jay-shankar-store/products/kurti_1787660898382.jpg",
    slug: "kolkata-readymade",
  },
  {
    name: "लक्स वेस्‍ट / बनियान",
    nameEn: "Lux Cozi Vest",
    category: "होजरी एवं इनरवियर",
    image: "https://res.cloudinary.com/dbz0kkwaj/image/upload/v1787640173/jay-shankar-store/products/baniyan_1787640173662.jpg",
    slug: "hosiery",
  },
  {
    name: "ज़ील रेनकोट",
    nameEn: "Zeel Raincoat",
    category: "वाटरप्रूफ रेनवेयर",
    image: "https://res.cloudinary.com/dbz0kkwaj/image/upload/v1788092248/jay-shankar-store/products/zeel_raincoat_1788092248724.jpg",
    slug: "zeel-raincoat",
  },
  {
    name: "फोल्डिंग छाता",
    nameEn: "Folding Umbrella",
    category: "छाता थोक संग्रह",
    image: "https://res.cloudinary.com/dbz0kkwaj/image/upload/v1787662186/jay-shankar-store/products/foldable-umbrella-087_1787662186352.jpg",
    slug: "umbrella",
  },
];

export function HeroSection() {
  return (
    <section
      className="relative bg-gradient-to-b from-[#1C1C1E] via-[#242426] to-[#1F1F21] text-white overflow-hidden border-b border-[#B77B50]/25"
      aria-label="Hero section"
    >
      {/* Subtle luxury editorial background elements */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(183,123,80,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(183,123,80,0.5) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>
      <div
        className="absolute -top-32 -left-32 w-96 h-96 bg-[#B77B50]/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#39383B]/40 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Brand message & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Wholesale Editorial Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#39383B]/80 border border-[#B77B50]/40 backdrop-blur-xs mb-5 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" aria-hidden="true" />
              <span className="text-[11px] sm:text-xs font-semibold tracking-wider text-[#F3EFE8] uppercase">
                WHOLESALE &bull; B2B &bull; SHAHDOL, MP
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.18] tracking-tight mb-4 text-hindi font-display">
              शहडोल में थोक रेडीमेड और होजरी का{" "}
              <span className="text-[#D4A37F] block sm:inline">विश्वसनीय प्रतिष्ठान</span>
            </h1>

            {/* Store Name & Heritage */}
            <div className="flex items-center gap-2.5 mb-3">
              <div className="h-4 w-1 bg-[#B77B50] rounded-full" aria-hidden="true" />
              <p className="text-base sm:text-lg font-bold text-[#D8C9B7] tracking-wider uppercase font-sans">
                Jay Shankar Readymade Store
              </p>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-base text-[#D8C9B7] mb-6 leading-relaxed max-w-2xl text-hindi">
              वस्त्र व्यापारियों, खुदरा दुकानों और डीलरों के लिए कोलकाता रेडीमेड, प्रीमियम होजरी, 
              रेनवेयर, छाता, नेवार, त्रिपाल और झोला की सम्पूर्ण थोक आपूर्ति। सर्वोत्तम थोक भाव व सीधी बातचीत।
            </p>

            {/* CTA Buttons */}
            <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-3 mb-8">
              <a
                href={getGeneralEnquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-sm sm:text-base rounded-xl transition-all duration-200 shadow-lg shadow-[#25D366]/20 active:scale-[0.98]"
                aria-label="WhatsApp पर थोक पूछताछ करें"
              >
                <MessageCircle size={20} aria-hidden="true" />
                <span>थोक पूछताछ — WhatsApp</span>
              </a>
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#39383B] hover:bg-[#48464B] border border-[#B77B50]/40 hover:border-[#B77B50] text-[#F3EFE8] font-semibold text-sm sm:text-base rounded-xl transition-all duration-200"
              >
                <BookOpen size={18} aria-hidden="true" />
                <span>कैटलॉग देखें</span>
                <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>

            {/* Trust Indicators Strip */}
            <div className="w-full pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#B77B50] shrink-0" aria-hidden="true" />
                <span className="text-xs text-[#D8C9B7] font-medium">6 प्रमुख ब्रांड</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-[#B77B50] shrink-0" aria-hidden="true" />
                <span className="text-xs text-[#D8C9B7] font-medium">8 थोक श्रेणियाँ</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-[#25D366] shrink-0" aria-hidden="true" />
                <span className="text-xs text-[#D8C9B7] font-medium">थोक भाव आपूर्ति</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-[#25D366] shrink-0" aria-hidden="true" />
                <span className="text-xs text-[#D8C9B7] font-medium">शहडोल (म.प्र.)</span>
              </div>
            </div>
          </div>

          {/* Right Column: Curated Real Products Showcase */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl bg-[#2B2A2D] border border-[#B77B50]/30 p-4 sm:p-5 shadow-2xl backdrop-blur-md">
              {/* Header Badge */}
              <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#B77B50]" aria-hidden="true" />
                  <span className="text-xs font-bold text-[#D4A37F] uppercase tracking-wider">
                    कैटलॉग झलक &bull; Real Stock
                  </span>
                </div>
                <span className="text-[11px] font-semibold text-[#D8C9B7] bg-[#39383B] px-2 py-0.5 rounded-md border border-white/5">
                  Wholesale B2B
                </span>
              </div>

              {/* 2x2 Showcase Grid with Real Cloudinary Photos */}
              <div className="grid grid-cols-2 gap-3">
                {HERO_SHOWCASE.map((item) => (
                  <Link
                    key={item.nameEn}
                    href={`/categories/${item.slug}`}
                    className="group relative flex flex-col bg-white rounded-2xl p-2.5 border border-[#D8C9B7]/50 hover:border-[#B77B50] transition-all duration-200 shadow-xs"
                    aria-label={`${item.name} — श्रेणी देखें`}
                  >
                    <div className="relative aspect-square w-full rounded-xl bg-[#FDFBF7] overflow-hidden mb-2 border border-[#E3DED6] flex items-center justify-center p-2">
                      <Image
                        src={getOptimizedImageUrl(item.image, { width: 280, height: 280 })}
                        alt={item.name}
                        fill
                        sizes="(max-width: 640px) 130px, 160px"
                        className="object-contain p-1 group-hover:scale-105 transition-transform duration-200"
                        unoptimized
                      />
                      <span className="absolute top-1.5 right-1.5 text-[9px] font-bold text-[#242426] bg-[#F3EFE8] border border-[#D8C9B7] px-1.5 py-0.5 rounded shadow-2xs">
                        थोक
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-[#242426] truncate group-hover:text-[#B77B50] text-hindi">
                        {item.name}
                      </p>
                      <p className="text-[10px] text-[#B77B50] font-medium truncate mt-0.5">
                        {item.category}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Bottom Note */}
              <div className="mt-3.5 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-[#D8C9B7]">
                <span className="text-hindi">रेडीमेड • होजरी • मौसमी संग्रह</span>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-1 font-semibold text-[#D4A37F] hover:underline"
                >
                  पूरा संग्रह
                  <ArrowRight size={12} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
