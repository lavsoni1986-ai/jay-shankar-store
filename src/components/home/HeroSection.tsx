"use client";

import Link from "next/link";
import { MessageCircle, BookOpen, ArrowRight } from "lucide-react";
import { getGeneralEnquiryUrl } from "@/lib/whatsapp";

export function HeroSection() {
  return (
    <section
      className="relative bg-[#0F2A5C] overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, #0EA5E9 0%, transparent 50%), radial-gradient(circle at 80% 20%, #38BDF8 0%, transparent 40%)",
          }}
        />
      </div>
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="max-w-3xl">
          {/* Tagline chip */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 border border-white/20 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" aria-hidden="true" />
            <span className="text-xs font-semibold text-white/80 tracking-wide uppercase">
              Wholesale • B2B • Shahdol, MP
            </span>
          </div>

          {/* Hindi headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4 text-hindi">
            शहडोल में थोक रेडीमेड और होजरी का{" "}
            <span className="text-[#38BDF8]">भरोसेमंद नाम</span>
          </h1>

          {/* English business name */}
          <p className="text-lg sm:text-xl font-semibold text-white/80 mb-3 tracking-wide">
            Jay Shankar Readymade Store
          </p>

          {/* Category pills */}
          <p className="text-sm sm:text-base text-white/60 mb-8 leading-relaxed">
            Hosiery&nbsp;•&nbsp;Kolkata Readymade&nbsp;•&nbsp;Rainwear&nbsp;•&nbsp;Umbrella&nbsp;•&nbsp;Newar&nbsp;•&nbsp;Tripal&nbsp;•&nbsp;Jhola&nbsp;&amp;&nbsp;More
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={getGeneralEnquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-sm rounded-xl transition-colors shadow-lg"
              aria-label="WhatsApp पर थोक पूछताछ करें"
            >
              <MessageCircle size={18} aria-hidden="true" />
              थोक पूछताछ के लिए WhatsApp करें
            </a>
            <Link
              href="/products"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold text-sm rounded-xl transition-colors"
            >
              <BookOpen size={16} aria-hidden="true" />
              कैटलॉग देखें
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-8 pt-8 border-t border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#25D366]" aria-hidden="true" />
              <span className="text-xs text-white/60">6 प्रमुख ब्रांड</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#25D366]" aria-hidden="true" />
              <span className="text-xs text-white/60">8 थोक श्रेणियाँ</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#25D366]" aria-hidden="true" />
              <span className="text-xs text-white/60">WhatsApp ऑर्डर</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#25D366]" aria-hidden="true" />
              <span className="text-xs text-white/60">शहडोल, MP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-[#F8FAFC]" style={{ clipPath: "ellipse(55% 100% at 50% 100%)" }} aria-hidden="true" />
    </section>
  );
}
