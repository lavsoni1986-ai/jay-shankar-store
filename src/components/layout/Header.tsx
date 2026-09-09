"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, MessageCircle, Download } from "lucide-react";
import { navItems, siteConfig } from "@/data/siteConfig";
import { getGeneralEnquiryUrl } from "@/lib/whatsapp";
import { usePwaInstall } from "@/lib/usePwaInstall";
import { MobileNav } from "./MobileNav";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { canInstall, installApp } = usePwaInstall();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile nav is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white shadow-[0_1px_8px_rgba(15,42,92,0.12)]"
            : "bg-white border-b border-slate-100"
        }`}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2.5 sm:gap-3 group py-1 shrink-0"
              aria-label="Jay Shankar Readymade Store — Home"
            >
              <Image
                src="/images/jay-shankar-js-logo.png"
                alt="Jay Shankar Readymade Store"
                width={990}
                height={1024}
                priority
                className="h-9 sm:h-10 lg:h-11 w-auto object-contain transition-transform group-hover:scale-105 duration-200"
              />
              <div className="flex flex-col leading-tight">
                <span className="text-base sm:text-lg font-bold text-[#0F2A5C] group-hover:text-[#0EA5E9] transition-colors tracking-tight">
                  Jay Shankar
                </span>
                <span className="text-[10px] sm:text-xs font-medium text-[#0EA5E9] tracking-wide uppercase">
                  Readymade Store
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav
              className="hidden lg:flex items-center gap-1"
              role="navigation"
              aria-label="Main navigation"
            >
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-[#0F2A5C] hover:bg-slate-50 rounded-md transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href={getGeneralEnquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-[#25D366] hover:bg-[#128C7E] text-white text-sm font-semibold rounded-lg transition-colors"
                aria-label="WhatsApp पर थोक पूछताछ करें"
              >
                <MessageCircle size={16} aria-hidden="true" />
                <span>थोक पूछताछ</span>
              </a>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 text-[#0F2A5C] hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Menu खोलें"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
            >
              <Menu size={22} aria-hidden="true" />
            </button>
          </div>

          {/* Address bar — desktop only */}
          <div className="hidden lg:flex items-center justify-between h-[30px] border-t border-slate-100 text-xs text-[#64748B]">
            <p>
              📍 {siteConfig.address.full}
            </p>
            <div className="flex items-center gap-4">
              {canInstall && (
                <button
                  onClick={installApp}
                  className="inline-flex items-center gap-1 font-semibold text-[#0F2A5C] hover:text-[#0EA5E9] transition-colors"
                >
                  <Download size={13} aria-hidden="true" />
                  <span>ऐप इंस्टॉल करें</span>
                </button>
              )}
              <p>
                WhatsApp:{" "}
                <a
                  href={`tel:+91${siteConfig.contact.whatsapp}`}
                  className="text-[#0F2A5C] font-medium hover:text-[#0EA5E9] transition-colors"
                >
                  {siteConfig.contact.whatsappDisplay}
                </a>
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <MobileNav
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        id="mobile-nav"
      />

      {/* Header height spacer */}
      <div className="h-[var(--header-height)] shrink-0" aria-hidden="true" />
    </>
  );
}
