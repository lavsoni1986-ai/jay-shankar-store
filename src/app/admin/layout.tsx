"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  // If on login page, render full screen without sidebar/header
  if (pathname === "/admin/login") {
    return <div className="min-h-[calc(100vh-var(--header-height))] bg-[#081A3E]">{children}</div>;
  }

  const getPageTitle = () => {
    if (pathname === "/admin") return "डैशबोर्ड (Dashboard)";
    if (pathname === "/admin/products") return "उत्पाद प्रबंधन (Product Catalogue)";
    if (pathname === "/admin/products/new") return "नया उत्पाद जोड़ें (Add Product)";
    if (pathname.startsWith("/admin/products/") && pathname.endsWith("/edit"))
      return "उत्पाद संपादित करें (Edit Product)";
    if (pathname === "/admin/categories") return "श्रेणी प्रबंधन (Categories)";
    if (pathname === "/admin/brands") return "ब्रांड प्रबंधन (Brands)";
    if (pathname === "/admin/media") return "मीडिया लाइब्रेरी (Media Library)";
    return "Admin CMS";
  };

  return (
    <div className="flex h-[calc(100vh-var(--header-height))] bg-[#F8FAFC] overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <AdminHeader onMenuClick={() => setSidebarOpen(true)} title={getPageTitle()} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
