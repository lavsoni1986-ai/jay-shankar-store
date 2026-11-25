"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Package, Layers, Search, MessageCircle } from "lucide-react";
import { useSearchModal } from "@/context/SearchContext";
import { getGeneralEnquiryUrl } from "@/lib/whatsapp";

export function BottomNav() {
  const pathname = usePathname();
  const { openSearch } = useSearchModal();

  // Hide on admin routes
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const isHome = pathname === "/";
  const isProducts = pathname?.startsWith("/products");
  const isCategories = pathname?.startsWith("/categories");

  return (
    <>
      {/* Bottom spacer to prevent content from being covered by the fixed navigation on mobile */}
      <div
        className="h-[calc(3.75rem+env(safe-area-inset-bottom,0px))] lg:hidden shrink-0 pointer-events-none"
        aria-hidden="true"
      />

      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E3DED6] shadow-[0_-4px_20px_rgba(36,36,38,0.06)]"
        style={{
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}
        role="navigation"
        aria-label="Mobile Bottom Navigation"
      >
        <div className="flex items-center justify-around h-15 max-w-lg mx-auto px-2">
          {/* Home */}
          <Link
            href="/"
            className={`flex flex-col items-center justify-center flex-1 h-full py-1 transition-colors relative group ${
              isHome ? "text-[#242426] font-bold" : "text-[#686469] hover:text-[#242426]"
            }`}
            aria-label="होम (Home)"
            aria-current={isHome ? "page" : undefined}
          >
            <div className="relative">
              <Home size={20} className={isHome ? "stroke-[2.5]" : "stroke-[1.8]"} />
              {isHome && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#B77B50]" />
              )}
            </div>
            <span className="text-[10px] mt-1 font-medium tracking-tight">होम</span>
          </Link>

          {/* Catalog / Products */}
          <Link
            href="/products"
            className={`flex flex-col items-center justify-center flex-1 h-full py-1 transition-colors relative group ${
              isProducts ? "text-[#242426] font-bold" : "text-[#686469] hover:text-[#242426]"
            }`}
            aria-label="कैटलॉग (Products)"
            aria-current={isProducts ? "page" : undefined}
          >
            <div className="relative">
              <Package size={20} className={isProducts ? "stroke-[2.5]" : "stroke-[1.8]"} />
              {isProducts && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#B77B50]" />
              )}
            </div>
            <span className="text-[10px] mt-1 font-medium tracking-tight">कैटलॉग</span>
          </Link>

          {/* Search Trigger */}
          <button
            type="button"
            onClick={openSearch}
            className="flex flex-col items-center justify-center flex-1 h-full py-1 text-[#686469] hover:text-[#242426] transition-colors group cursor-pointer"
            aria-label="खोजें (Search)"
          >
            <div className="w-8 h-8 rounded-full bg-[#F3EFE8] group-hover:bg-[#EAE4DC] flex items-center justify-center text-[#242426] transition-colors">
              <Search size={17} className="stroke-[2]" />
            </div>
            <span className="text-[10px] mt-0.5 font-medium tracking-tight">खोजें</span>
          </button>

          {/* Categories */}
          <Link
            href="/categories"
            className={`flex flex-col items-center justify-center flex-1 h-full py-1 transition-colors relative group ${
              isCategories ? "text-[#242426] font-bold" : "text-[#686469] hover:text-[#242426]"
            }`}
            aria-label="श्रेणियाँ (Categories)"
            aria-current={isCategories ? "page" : undefined}
          >
            <div className="relative">
              <Layers size={20} className={isCategories ? "stroke-[2.5]" : "stroke-[1.8]"} />
              {isCategories && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#B77B50]" />
              )}
            </div>
            <span className="text-[10px] mt-1 font-medium tracking-tight">श्रेणियाँ</span>
          </Link>

          {/* WhatsApp Wholesale CTA */}
          <a
            href={getGeneralEnquiryUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center flex-1 h-full py-1 text-[#25D366] hover:text-[#128C7E] transition-colors group"
            aria-label="WhatsApp थोक पूछताछ"
          >
            <div className="w-7 h-7 rounded-full bg-[#25D366] group-hover:bg-[#128C7E] flex items-center justify-center text-white shadow-xs transition-transform group-hover:scale-105">
              <MessageCircle size={16} className="fill-current" />
            </div>
            <span className="text-[10px] mt-0.5 font-bold tracking-tight text-[#128C7E]">
              WhatsApp
            </span>
          </a>
        </div>
      </nav>
    </>
  );
}
