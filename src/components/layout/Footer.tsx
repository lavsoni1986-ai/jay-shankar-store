"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { coreCategories } from "@/data/categories";
import { brands } from "@/data/brands";
import { getGeneralEnquiryUrl } from "@/lib/whatsapp";

export function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer
      className="bg-[#081A3E] text-white"
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand Column */}
        <div className="lg:col-span-1">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-white leading-tight">
              Jay Shankar
            </h2>
            <p className="text-sm font-medium text-[#38BDF8] tracking-wide">
              Readymade Store
            </p>
          </div>
          <p className="text-sm text-slate-300 leading-relaxed mb-5">
            शहडोल, MP में थोक रेडीमेड और होजरी व्यापार का भरोसेमंद नाम।
            Hosiery, Kolkata Readymade, Rainwear, Umbrella और अधिक।
          </p>
          <a
            href={getGeneralEnquiryUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#25D366] hover:bg-[#128C7E] text-white text-sm font-semibold rounded-lg transition-colors"
            aria-label="WhatsApp पर थोक पूछताछ करें"
          >
            <MessageCircle size={15} aria-hidden="true" />
            थोक पूछताछ करें
          </a>
        </div>

        {/* Core Categories */}
        <div>
          <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-4">
            मुख्य श्रेणियाँ
          </h3>
          <ul className="space-y-2" role="list">
            {coreCategories.map((cat) => (
              <li key={cat.slug}>
                <Link
                  href={`/categories/${cat.slug}`}
                  className="text-sm text-slate-400 hover:text-[#38BDF8] transition-colors"
                >
                  {cat.nameHindi}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Brands */}
        <div>
          <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-4">
            हमारे प्रमुख ब्रांड
          </h3>
          <ul className="space-y-2" role="list">
            {brands.map((brand) => (
              <li key={brand.slug}>
                <Link
                  href={`/brands/${brand.slug}`}
                  className="text-sm text-slate-400 hover:text-[#38BDF8] transition-colors"
                >
                  {brand.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-5">
            <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-3">
              त्वरित लिंक
            </h3>
            <ul className="space-y-2" role="list">
              <li>
                <Link href="/products" className="text-sm text-slate-400 hover:text-[#38BDF8] transition-colors">
                  कैटलॉग देखें
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-slate-400 hover:text-[#38BDF8] transition-colors">
                  हमारे बारे में
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-slate-400 hover:text-[#38BDF8] transition-colors">
                  संपर्क करें
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-4">
            संपर्क
          </h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin
                size={16}
                className="text-[#38BDF8] mt-0.5 shrink-0"
                aria-hidden="true"
              />
              <div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {siteConfig.address.street},
                </p>
                <p className="text-sm text-slate-300">
                  {siteConfig.address.city} ({siteConfig.address.state.substring(0, 2).toUpperCase()}) {siteConfig.address.pincode}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone
                size={16}
                className="text-[#38BDF8] shrink-0"
                aria-hidden="true"
              />
              <div>
                <p className="text-xs text-slate-500 mb-0.5">
                  {siteConfig.contact.contactPerson} (WhatsApp)
                </p>
                <a
                  href={`tel:+91${siteConfig.contact.whatsapp}`}
                  className="text-sm font-semibold text-white hover:text-[#38BDF8] transition-colors"
                >
                  {siteConfig.contact.whatsappDisplay}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500 text-center sm:text-left">
            © {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-xs text-slate-600 text-center sm:text-right">
            Wholesale Readymade & Hosiery — Shahdol, Madhya Pradesh 484001
          </p>
        </div>
        {/* Developer Attribution */}
        <div className="border-t border-white/5 py-3.5 bg-black/15 text-center">
          <p className="text-xs font-medium text-slate-400">
            Designed & Developed by <span className="text-slate-200 font-semibold">BharatOS</span>
          </p>
          <p className="text-[11px] text-slate-500 tracking-wide mt-0.5">
            AI • Web • Digital Solutions
          </p>
        </div>
      </div>
    </footer>
  );
}
