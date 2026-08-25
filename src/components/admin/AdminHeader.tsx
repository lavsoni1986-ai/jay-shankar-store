"use client";

import { Menu, Plus, User } from "lucide-react";
import Link from "next/link";

interface AdminHeaderProps {
  onMenuClick: () => void;
  title?: string;
}

export function AdminHeader({ onMenuClick, title = "Admin CMS" }: AdminHeaderProps) {
  return (
    <header className="h-16 shrink-0 bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 flex items-center justify-between z-10 shadow-xs">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 text-slate-600 hover:text-[#0F2A5C] hover:bg-slate-100 rounded-lg transition-colors"
          aria-label="Open navigation drawer"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-base sm:text-lg font-bold text-[#0F2A5C] truncate">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/admin/products/new"
          className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 bg-[#0F2A5C] hover:bg-[#0EA5E9] text-white text-xs font-semibold rounded-xl transition-colors shadow-xs"
        >
          <Plus size={15} aria-hidden="true" />
          नया उत्पाद जोड़ें
        </Link>
        <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-[#F0F9FF] border border-[#BAE6FD] flex items-center justify-center text-[#0284C7]">
            <User size={16} />
          </div>
          <span className="hidden md:inline-block text-xs font-semibold text-slate-700">
            Admin
          </span>
        </div>
      </div>
    </header>
  );
}
