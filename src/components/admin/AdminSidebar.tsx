"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  FolderTree,
  Tags,
  Image as ImageIcon,
  ExternalLink,
  LogOut,
  X,
} from "lucide-react";

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const navLinks = [
  { href: "/admin", label: "डैशबोर्ड (Dashboard)", icon: LayoutDashboard, exact: true },
  { href: "/admin/products", label: "उत्पाद (Products)", icon: Package },
  { href: "/admin/products/new", label: "नया उत्पाद (Add Product)", icon: PlusCircle },
  { href: "/admin/categories", label: "श्रेणियाँ (Categories)", icon: FolderTree },
  { href: "/admin/brands", label: "ब्रांड (Brands)", icon: Tags },
  { href: "/admin/media", label: "मीडिया (Media Library)", icon: ImageIcon },
];

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch (e) {
      console.error("Logout error", e);
    }
  };

  const content = (
    <div className="flex flex-col h-full bg-[#081A3E] text-white">
      {/* Brand Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
        <Link href="/admin" className="flex flex-col">
          <span className="text-base font-bold text-white tracking-tight">Jay Shankar</span>
          <span className="text-xs font-semibold text-[#0EA5E9] uppercase tracking-wider">
            Admin CMS
          </span>
        </Link>
        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-3">
          प्रबंधन (Management)
        </p>
        <nav className="space-y-1.5" role="navigation" aria-label="Admin sidebar navigation">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = item.exact
              ? pathname === item.href
              : pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? "bg-[#0EA5E9] text-white font-semibold shadow-sm"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={16} className="shrink-0" aria-hidden="true" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* View Public Website */}
        <div className="mt-8 pt-6 border-t border-white/10">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-3">
            सार्वजनिक साइट (Website)
          </p>
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
          >
            <span className="flex items-center gap-3">
              <ExternalLink size={16} aria-hidden="true" />
              लाइव वेबसाइट देखें
            </span>
          </Link>
        </div>
      </div>

      {/* User Footer / Logout */}
      <div className="p-4 border-t border-white/10 bg-[#051129]">
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2.5 w-full py-2.5 px-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold rounded-xl border border-red-500/20 transition-colors"
        >
          <LogOut size={15} aria-hidden="true" />
          लॉग आउट करें (Logout)
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop static sidebar */}
      <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-slate-800 h-full">
        {content}
      </aside>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={onClose} />
          <div className="fixed inset-y-0 left-0 w-72 max-w-[85vw] shadow-2xl z-[60]">
            {content}
          </div>
        </div>
      )}
    </>
  );
}
