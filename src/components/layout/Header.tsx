"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, MessageCircle, Download, Search } from "lucide-react";
import { navItems, siteConfig } from "@/data/siteConfig";
import { getGeneralEnquiryUrl } from "@/lib/whatsapp";
import { usePwaInstall } from "@/lib/usePwaInstall";
import { useSearchModal } from "@/context/SearchContext";
import { MobileNav } from "./MobileNav";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { canInstall, installApp } = usePwaInstall();
  const { openSearch } = useSearchModal();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
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

  // Hide the store header on admin routes
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-[0_4px_20px_rgba(36,36,38,0.06)] border-b border-[#E3DED6]"
            : "bg-white border-b border-[#E3DED6]"
        }`}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 xl:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18 gap-2 xl:gap-3">
            {/* Brand Logo & Title */}
            <Link
              href="/"
              className="flex items-center gap-2 xl:gap-3 group py-1 shrink-0"
              aria-label="Jay Shankar Readymade Store — Home"
            >
              <div className="relative">
                <Image
                  src="/images/jay-shankar-js-logo.png"
                  alt="Jay Shankar Readymade Store"
                  width={990}
                  height={1024}
                  priority
                  className="h-9 sm:h-10 lg:h-10 xl:h-11 w-auto object-contain transition-transform group-hover:scale-105 duration-200"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <div className="flex items-center gap-1.5">
                  <span className="text-base xl:text-lg font-bold text-[#242426] group-hover:text-[#B77B50] transition-colors tracking-tight font-display">
                    Jay Shankar
                  </span>
                  <span className="hidden sm:inline-block text-[9px] font-bold px-1.5 py-0.5 bg-[#F3EFE8] text-[#B77B50] border border-[#D8C9B7] rounded uppercase tracking-wider">
                    Wholesale
                  </span>
                </div>
                <span className="text-[10px] xl:text-xs font-semibold text-[#686469] tracking-wider uppercase">
                  Readymade Store • Shahdol
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav
              className="hidden lg:flex items-center gap-0.5 xl:gap-1 shrink-0"
              role="navigation"
              aria-label="Main navigation"
            >
              {navItems.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname?.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-2 xl:px-3 py-1.5 text-xs xl:text-sm font-semibold rounded-lg transition-colors relative ${
                      isActive
                        ? "text-[#242426] bg-[#F3EFE8] font-bold"
                        : "text-[#686469] hover:text-[#242426] hover:bg-[#F3EFE8]/70"
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-2 right-2 xl:left-3 xl:right-3 h-0.5 bg-[#B77B50] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Right Actions: Search + WhatsApp CTA */}
            <div className="hidden lg:flex items-center gap-2 xl:gap-3 shrink-0">
              {/* Global Search Trigger Pill */}
              <button
                type="button"
                onClick={openSearch}
                className="flex items-center gap-1.5 xl:gap-2 px-2.5 xl:px-3 py-1.5 xl:py-2 bg-[#F3EFE8] hover:bg-[#EAE4DC] border border-[#E3DED6] rounded-xl text-xs text-[#686469] hover:text-[#242426] transition-all cursor-pointer w-32 xl:w-52 shadow-2xs group shrink-0"
                aria-label="उत्पाद या ब्रांड खोजें (Ctrl+K)"
              >
                <Search size={14} className="text-[#242426]/60 group-hover:text-[#B77B50] shrink-0 transition-colors" />
                <span className="truncate">उत्पाद खोजें...</span>
                <kbd className="ml-auto hidden xl:inline-flex items-center text-[10px] font-mono px-1.5 py-0.5 bg-white border border-[#D8C9B7] rounded text-[#686469] shadow-2xs">
                  Ctrl K
                </kbd>
              </button>

              {/* WhatsApp Enquiry Button */}
              <a
                href={getGeneralEnquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 xl:gap-2 px-3 xl:px-4 py-1.5 xl:py-2 bg-[#25D366] hover:bg-[#128C7E] text-white text-xs font-bold rounded-xl transition-all shadow-xs hover:shadow-sm active:scale-[0.98] shrink-0 whitespace-nowrap"
                aria-label="WhatsApp पर थोक पूछताछ करें"
              >
                <MessageCircle size={15} aria-hidden="true" className="shrink-0" />
                <span>थोक पूछताछ</span>
              </a>
            </div>

            {/* Mobile Actions: Search Icon + Hamburger */}
            <div className="lg:hidden flex items-center gap-1">
              <button
                type="button"
                onClick={openSearch}
                className="p-2 text-[#242426] hover:bg-[#F3EFE8] rounded-xl transition-colors cursor-pointer"
                aria-label="उत्पाद खोजें (Search)"
              >
                <Search size={21} aria-hidden="true" />
              </button>
              <button
                onClick={() => setMobileOpen(true)}
                className="p-2 text-[#242426] hover:bg-[#F3EFE8] rounded-xl transition-colors cursor-pointer"
                aria-label="Menu खोलें"
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav"
              >
                <Menu size={22} aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Desktop Top Address & Info Bar (Smoothly collapses when scrolled) */}
          <div
            className={`hidden lg:flex items-center justify-between border-t border-[#E3DED6] text-xs text-[#686469] transition-all duration-200 overflow-hidden ${
              scrolled ? "h-0 opacity-0 border-transparent py-0" : "h-[32px] opacity-100 py-1"
            }`}
          >
            <p className="flex items-center gap-1.5 truncate">
              <span>📍</span>
              <span className="font-medium text-[#686469]">{siteConfig.address.full}</span>
            </p>
            <div className="flex items-center gap-4 shrink-0">
              {canInstall && (
                <button
                  onClick={installApp}
                  className="inline-flex items-center gap-1 font-semibold text-[#242426] hover:text-[#B77B50] transition-colors cursor-pointer"
                >
                  <Download size={13} aria-hidden="true" />
                  <span>ऐप इंस्टॉल करें</span>
                </button>
              )}
              <p>
                WhatsApp / Call:{" "}
                <a
                  href={`tel:+91${siteConfig.contact.whatsapp}`}
                  className="text-[#242426] font-bold hover:text-[#B77B50] transition-colors"
                >
                  {siteConfig.contact.whatsappDisplay}
                </a>
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <MobileNav
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        id="mobile-nav"
      />

      {/* Header Height Spacer to prevent layout shift */}
      <div
        className={`shrink-0 transition-all duration-200 ${
          scrolled ? "h-16 lg:h-18" : "h-16 lg:h-[6.375rem]"
        }`}
        aria-hidden="true"
      />
    </>
  );
}
