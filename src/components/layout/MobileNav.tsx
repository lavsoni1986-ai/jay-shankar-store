"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, MessageCircle, Phone, MapPin, Download, Search } from "lucide-react";
import { navItems, siteConfig } from "@/data/siteConfig";
import { getGeneralEnquiryUrl } from "@/lib/whatsapp";
import { usePwaInstall } from "@/lib/usePwaInstall";
import { useSearchModal } from "@/context/SearchContext";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  id: string;
}

export function MobileNav({ isOpen, onClose, id }: MobileNavProps) {
  const pathname = usePathname();
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const { canInstall, installApp } = usePwaInstall();
  const { openSearch } = useSearchModal();

  const handleInstallClick = async () => {
    const installed = await installApp();
    if (installed) {
      onClose();
    }
  };

  const handleSearchClick = () => {
    onClose();
    openSearch();
  };

  useEffect(() => {
    if (isOpen) {
      firstLinkRef.current?.focus();
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-xs transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-in Drawer */}
      <nav
        id={id}
        className={`fixed top-0 right-0 bottom-0 z-[70] w-[310px] max-w-[85vw] bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}
        role="navigation"
        aria-label="Mobile navigation"
        aria-hidden={!isOpen}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#E3DED6]">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-2.5 group"
            aria-label="Jay Shankar Readymade Store — Home"
          >
            <Image
              src="/images/jay-shankar-js-logo.png"
              alt="Jay Shankar Readymade Store"
              width={990}
              height={1024}
              className="h-10 w-auto object-contain"
            />
            <div className="flex flex-col leading-tight">
              <span className="text-base font-bold text-[#242426] group-hover:text-[#B77B50] transition-colors font-display">
                Jay Shankar
              </span>
              <span className="text-[10px] font-semibold text-[#B77B50] uppercase tracking-wider">
                Readymade Store
              </span>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="p-2 text-[#686469] hover:text-[#242426] hover:bg-[#F3EFE8] rounded-lg transition-colors cursor-pointer"
            aria-label="Menu बंद करें"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        {/* Search Trigger Button inside Drawer */}
        <div className="px-4 pt-4 pb-1">
          <button
            type="button"
            onClick={handleSearchClick}
            className="flex items-center gap-2.5 w-full px-3.5 py-2.5 bg-[#F3EFE8] hover:bg-[#EAE4DC] border border-[#E3DED6] rounded-xl text-xs text-[#686469] transition-colors cursor-pointer"
          >
            <Search size={16} className="text-[#242426]" />
            <span className="font-medium">उत्पाद या श्रेणी खोजें...</span>
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto py-3">
          <ul className="space-y-1 px-3" role="list">
            {navItems.map((item, i) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    ref={i === 0 ? firstLinkRef : undefined}
                    onClick={onClose}
                    className={`flex items-center justify-between px-4 py-2.5 text-sm font-semibold rounded-xl transition-colors ${
                      isActive
                        ? "text-[#242426] bg-[#F3EFE8] font-bold border-l-3 border-[#B77B50]"
                        : "text-[#242426] hover:text-[#B77B50] hover:bg-[#F3EFE8]/70"
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="text-[10px] font-bold text-[#B77B50] bg-[#F3EFE8] border border-[#D8C9B7] px-2 py-0.5 rounded">
                        Active
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Contact Details */}
          <div className="mt-5 mx-3 p-4 bg-[#F8F5F0] rounded-2xl border border-[#E3DED6]">
            <p className="text-[11px] font-bold text-[#242426] uppercase tracking-wider mb-2.5">
              शहडोल व्यापार केंद्र (Contact)
            </p>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2.5">
                <MapPin size={15} className="text-[#B77B50] mt-0.5 shrink-0" aria-hidden="true" />
                <p className="text-xs text-[#686469] leading-relaxed">
                  {siteConfig.address.full}
                </p>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={15} className="text-[#B77B50] shrink-0" aria-hidden="true" />
                <a
                  href={`tel:+91${siteConfig.contact.whatsapp}`}
                  className="text-xs font-bold text-[#242426]"
                >
                  {siteConfig.contact.whatsappDisplay}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Drawer Footer Actions */}
        <div className="px-4 py-3 border-t border-[#E3DED6] space-y-2">
          {/* PWA Install Button */}
          {canInstall && (
            <button
              onClick={handleInstallClick}
              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-[#242426] hover:bg-[#39383B] text-white text-xs font-bold rounded-xl shadow-xs transition-all active:scale-[0.98] cursor-pointer border border-[#B77B50]/30"
              aria-label="📱 ऐप इंस्टॉल करें (Install App)"
            >
              <Download size={16} aria-hidden="true" />
              <span>📱 ऐप इंस्टॉल करें (Install App)</span>
            </button>
          )}

          {/* Direct WhatsApp CTA */}
          <a
            href={getGeneralEnquiryUrl()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#25D366] hover:bg-[#128C7E] text-white text-xs font-bold rounded-xl transition-all shadow-xs active:scale-[0.98]"
            aria-label="WhatsApp पर थोक पूछताछ करें"
          >
            <MessageCircle size={17} aria-hidden="true" />
            <span>थोक पूछताछ — WhatsApp करें</span>
          </a>
          <p className="text-center text-[11px] text-[#686469] pt-1">
            {siteConfig.contact.contactPerson} • {siteConfig.contact.whatsappDisplay}
          </p>
        </div>
      </nav>
    </>
  );
}
