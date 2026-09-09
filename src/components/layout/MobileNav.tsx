"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { X, MessageCircle, Phone, MapPin, Download } from "lucide-react";
import { navItems, siteConfig } from "@/data/siteConfig";
import { getGeneralEnquiryUrl } from "@/lib/whatsapp";
import { usePwaInstall } from "@/lib/usePwaInstall";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  id: string;
}

export function MobileNav({ isOpen, onClose, id }: MobileNavProps) {
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const { canInstall, installApp } = usePwaInstall();

  const handleInstallClick = async () => {
    const installed = await installApp();
    if (installed) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      // Focus the close button or first link for accessibility
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
        className={`fixed inset-0 z-[60] bg-black/50 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Slide-in Drawer */}
      <nav
        id={id}
        className={`fixed top-0 right-0 bottom-0 z-[70] w-[300px] max-w-[85vw] bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="navigation"
        aria-label="Mobile navigation"
        aria-hidden={!isOpen}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
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
              <span className="text-base font-bold text-[#0F2A5C] group-hover:text-[#0EA5E9] transition-colors">
                Jay Shankar
              </span>
              <span className="text-xs font-medium text-[#0EA5E9] uppercase tracking-wide">
                Readymade Store
              </span>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="p-2 text-slate-500 hover:text-[#0F2A5C] hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Menu बंद करें"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-0.5 px-3" role="list">
            {navItems.map((item, i) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  ref={i === 0 ? firstLinkRef : undefined}
                  onClick={onClose}
                  className="flex items-center px-4 py-3 text-sm font-medium text-slate-700 hover:text-[#0F2A5C] hover:bg-slate-50 rounded-lg transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Contact Info */}
          <div className="mt-6 mx-3 p-4 bg-slate-50 rounded-xl">
            <p className="text-xs font-semibold text-[#0F2A5C] uppercase tracking-wide mb-3">
              संपर्क
            </p>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <MapPin size={14} className="text-[#0EA5E9] mt-0.5 shrink-0" aria-hidden="true" />
                <p className="text-xs text-slate-600 leading-relaxed">
                  {siteConfig.address.full}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-[#0EA5E9] shrink-0" aria-hidden="true" />
                <a
                  href={`tel:+91${siteConfig.contact.whatsapp}`}
                  className="text-xs font-semibold text-[#0F2A5C]"
                >
                  {siteConfig.contact.whatsappDisplay}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Actions Container */}
        <div className="px-4 py-4 border-t border-slate-100 space-y-2.5">
          {/* PWA Install Button (rendered only when browser is eligible and not yet installed) */}
          {canInstall && (
            <button
              onClick={handleInstallClick}
              className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#0F2A5C] hover:bg-[#081A3E] text-white text-sm font-bold rounded-xl shadow-sm transition-all active:scale-[0.98]"
              aria-label="📱 ऐप इंस्टॉल करें (Install App)"
            >
              <Download size={18} aria-hidden="true" />
              <span>📱 ऐप इंस्टॉल करें (Install App)</span>
            </button>
          )}

          {/* WhatsApp CTA */}
          <a
            href={getGeneralEnquiryUrl()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#25D366] hover:bg-[#128C7E] text-white text-sm font-bold rounded-xl transition-colors"
            aria-label="WhatsApp पर थोक पूछताछ करें"
          >
            <MessageCircle size={18} aria-hidden="true" />
            थोक पूछताछ — WhatsApp करें
          </a>
          <p className="text-center text-xs text-slate-500 mt-2">
            {siteConfig.contact.contactPerson} • {siteConfig.contact.whatsappDisplay}
          </p>
        </div>
      </nav>
    </>
  );
}
