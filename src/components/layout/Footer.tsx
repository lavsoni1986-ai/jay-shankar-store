"use client";

import Image from "next/image";
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
      className="bg-[#1C1C1E] text-white border-t border-[#B77B50]/20"
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand Column */}
        <div className="lg:col-span-1">
          <Link
            href="/"
            className="inline-flex items-center gap-3 mb-4 group"
            aria-label="Jay Shankar Readymade Store — Home"
          >
            <Image
              src="/images/jay-shankar-js-logo.png"
              alt="Jay Shankar Readymade Store Logo"
              width={990}
              height={1024}
              className="h-12 w-auto object-contain transition-transform group-hover:scale-105 duration-200"
            />
            <div>
              <h2 className="text-xl font-bold text-white leading-tight group-hover:text-[#D4A37F] transition-colors font-display">
                Jay Shankar
              </h2>
              <p className="text-xs font-semibold text-[#B77B50] uppercase tracking-wider">
                Readymade Store
              </p>
            </div>
          </Link>
          <p className="text-sm text-[#D8C9B7] leading-relaxed mb-5 text-hindi">
            शहडोल, MP में थोक रेडीमेड और होजरी व्यापार का प्रतिष्ठित नाम।
            Hosiery, Kolkata Readymade, Rainwear, Umbrella और अधिक।
          </p>
          <a
            href={getGeneralEnquiryUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#25D366] hover:bg-[#128C7E] text-white text-sm font-semibold rounded-xl transition-all shadow-md active:scale-95"
            aria-label="WhatsApp पर थोक पूछताछ करें"
          >
            <MessageCircle size={16} aria-hidden="true" />
            <span>थोक पूछताछ करें</span>
          </a>
        </div>

        {/* Core Categories */}
        <div>
          <h3 className="text-xs font-bold text-[#B77B50] uppercase tracking-widest mb-4">
            मुख्य श्रेणियाँ
          </h3>
          <ul className="space-y-2.5" role="list">
            {coreCategories.map((cat) => (
              <li key={cat.slug}>
                <Link
                  href={`/categories/${cat.slug}`}
                  className="text-sm text-[#D8C9B7] hover:text-white transition-colors text-hindi"
                >
                  {cat.nameHindi}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Brands */}
        <div>
          <h3 className="text-xs font-bold text-[#B77B50] uppercase tracking-widest mb-4">
            हमारे प्रमुख ब्रांड
          </h3>
          <ul className="space-y-2.5" role="list">
            {brands.map((brand) => (
              <li key={brand.slug}>
                <Link
                  href={`/brands/${brand.slug}`}
                  className="text-sm text-[#D8C9B7] hover:text-white transition-colors"
                >
                  {brand.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <h3 className="text-xs font-bold text-[#B77B50] uppercase tracking-widest mb-3">
              त्वरित लिंक
            </h3>
            <ul className="space-y-2" role="list">
              <li>
                <Link href="/products" className="text-sm text-[#D8C9B7] hover:text-white transition-colors">
                  कैटलॉग देखें
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-[#D8C9B7] hover:text-white transition-colors">
                  हमारे बारे में
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-[#D8C9B7] hover:text-white transition-colors">
                  संपर्क करें
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-[#D8C9B7] hover:text-white transition-colors">
                  गोपनीयता नीति
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xs font-bold text-[#B77B50] uppercase tracking-widest mb-4">
            संपर्क
          </h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin
                size={16}
                className="text-[#B77B50] mt-0.5 shrink-0"
                aria-hidden="true"
              />
              <div>
                <p className="text-sm text-[#D8C9B7] leading-relaxed">
                  {siteConfig.address.street},
                </p>
                <p className="text-sm text-[#D8C9B7]">
                  {siteConfig.address.city} ({siteConfig.address.state.substring(0, 2).toUpperCase()}) {siteConfig.address.pincode}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone
                size={16}
                className="text-[#B77B50] shrink-0"
                aria-hidden="true"
              />
              <div>
                <p className="text-xs text-[#686469] mb-0.5">
                  {siteConfig.contact.contactPerson} (WhatsApp)
                </p>
                <a
                  href={`tel:+91${siteConfig.contact.whatsapp}`}
                  className="text-sm font-semibold text-white hover:text-[#D4A37F] transition-colors"
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
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left">
            <p className="text-xs text-[#686469]">
              © {currentYear} {siteConfig.name}. All rights reserved.
            </p>
            <span className="hidden sm:inline text-white/20" aria-hidden="true">&bull;</span>
            <Link
              href="/privacy"
              className="text-xs text-[#686469] hover:text-[#D8C9B7] transition-colors underline underline-offset-2"
            >
              Privacy Policy (गोपनीयता नीति)
            </Link>
          </div>
          <p className="text-xs text-[#686469] text-center sm:text-right">
            Wholesale Readymade & Hosiery — Shahdol, Madhya Pradesh 484001
          </p>
        </div>
        {/* Developer Attribution */}
        <div className="border-t border-white/5 py-3.5 bg-black/20 text-center">
          <p className="text-xs font-medium text-[#D8C9B7]/80">
            Designed & Developed by <span className="text-white font-semibold">BharatOS</span>
          </p>
          <p className="text-[11px] text-[#686469] tracking-wide mt-0.5">
            AI • Web • Digital Solutions
          </p>
        </div>
      </div>
    </footer>
  );
}
