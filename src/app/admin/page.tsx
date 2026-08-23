import Link from "next/link";
import {
  Package,
  CheckCircle2,
  FileEdit,
  Star,
  FolderTree,
  Tags,
  PlusCircle,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { prisma, isDatabaseConfigured } from "@/lib/prisma";
import { products as staticProducts } from "@/data/products";
import { categories as staticCategories } from "@/data/categories";
import { brands as staticBrands } from "@/data/brands";
import { Prisma } from "@/generated/prisma";

export const dynamic = "force-dynamic";

type RecentProductDb = Prisma.ProductGetPayload<{
  include: { category: true; brand: true; images: { take: 1 } };
}>;

interface DashboardRecentProduct {
  id: string;
  name: string;
  slug: string;
  categoryName: string;
  brandName: string;
  isPublished: boolean;
  isFeatured: boolean;
  imageCount: number;
  createdAt: Date;
}

interface DashboardStats {
  totalProducts: number;
  publishedProducts: number;
  draftProducts: number;
  featuredProducts: number;
  totalCategories: number;
  coreCategories: number;
  totalBrands: number;
  recentProducts: DashboardRecentProduct[];
  isLiveDb: boolean;
}

async function getDashboardStats(): Promise<DashboardStats> {
  if (isDatabaseConfigured()) {
    try {
      const [
        totalProducts,
        publishedProducts,
        draftProducts,
        featuredProducts,
        totalCategories,
        coreCategories,
        totalBrands,
        recentProducts,
      ] = await Promise.all([
        prisma.product.count(),
        prisma.product.count({ where: { isPublished: true } }),
        prisma.product.count({ where: { isPublished: false } }),
        prisma.product.count({ where: { isFeatured: true } }),
        prisma.category.count(),
        prisma.category.count({ where: { isCore: true } }),
        prisma.brand.count(),
        prisma.product.findMany({
          orderBy: { createdAt: "desc" },
          take: 5,
          include: { category: true, brand: true, images: { take: 1 } },
        }),
      ]);

      return {
        totalProducts,
        publishedProducts,
        draftProducts,
        featuredProducts,
        totalCategories,
        coreCategories,
        totalBrands,
        recentProducts: (recentProducts as RecentProductDb[]).map((p: RecentProductDb): DashboardRecentProduct => ({
          id: p.id,
          name: p.name,
          slug: p.slug,
          categoryName: p.category.nameHindi || p.category.name,
          brandName: p.brand?.name || "Generic",
          isPublished: p.isPublished,
          isFeatured: p.isFeatured,
          imageCount: p.images.length,
          createdAt: p.createdAt,
        })),
        isLiveDb: true,
      };
    } catch (e) {
      console.error("[DASHBOARD_STATS_ERROR]", e);
    }
  }

  // Development static fallback metrics
  return {
    totalProducts: staticProducts.length,
    publishedProducts: staticProducts.length,
    draftProducts: 0,
    featuredProducts: staticProducts.filter((p) => p.isFeatured).length,
    totalCategories: staticCategories.length,
    coreCategories: staticCategories.filter((c) => c.isCore).length,
    totalBrands: staticBrands.length,
    recentProducts: staticProducts.slice(0, 5).map((p): DashboardRecentProduct => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      categoryName: p.category,
      brandName: p.brand || "Generic",
      isPublished: true,
      isFeatured: p.isFeatured,
      imageCount: 0,
      createdAt: new Date(),
    })),
    isLiveDb: false,
  };
}

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-[#0F2A5C] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-md">
        <div className="relative z-10 max-w-2xl">
          <span className="text-[11px] font-bold px-2.5 py-1 bg-white/10 text-[#38BDF8] rounded-full uppercase tracking-wider mb-3 inline-block">
            {stats.isLiveDb ? "PostgreSQL Database Active" : "Development Mode"}
          </span>
          <h1 className="text-xl sm:text-2xl font-bold mb-2">
            नमस्ते, व्यवस्थापक (Welcome to Admin CMS)
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            यहाँ से आप Jay Shankar Readymade Store के उत्पादों, श्रेणियों, ब्रांडों और Cloudinary छवियों का प्रबंधन कर सकते हैं।
          </p>
        </div>

        {/* Quick Add CTA */}
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#25D366] hover:bg-[#128C7E] text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
          >
            <PlusCircle size={15} />
            + नया उत्पाद जोड़ें (Add Product)
          </Link>
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl transition-colors border border-white/20"
          >
            <ExternalLink size={14} />
            लाइव वेबसाइट (Public Site)
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Total Products */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
            <Package size={18} />
          </div>
          <p className="text-2xl font-black text-[#0F2A5C]">{stats.totalProducts}</p>
          <p className="text-xs text-slate-500 font-medium">कुल उत्पाद (Total)</p>
        </div>

        {/* Published */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
            <CheckCircle2 size={18} />
          </div>
          <p className="text-2xl font-black text-[#0F2A5C]">{stats.publishedProducts}</p>
          <p className="text-xs text-slate-500 font-medium">प्रकाशित (Live)</p>
        </div>

        {/* Drafts */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
          <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
            <FileEdit size={18} />
          </div>
          <p className="text-2xl font-black text-[#0F2A5C]">{stats.draftProducts}</p>
          <p className="text-xs text-slate-500 font-medium">ड्राफ्ट (Drafts)</p>
        </div>

        {/* Featured */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
          <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
            <Star size={18} />
          </div>
          <p className="text-2xl font-black text-[#0F2A5C]">{stats.featuredProducts}</p>
          <p className="text-xs text-slate-500 font-medium">फ़ीचर्ड (Featured)</p>
        </div>

        {/* Categories */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
          <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mb-3">
            <FolderTree size={18} />
          </div>
          <p className="text-2xl font-black text-[#0F2A5C]">{stats.totalCategories}</p>
          <p className="text-xs text-slate-500 font-medium">{stats.coreCategories} Core श्रेणियाँ</p>
        </div>

        {/* Brands */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
          <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-3">
            <Tags size={18} />
          </div>
          <p className="text-2xl font-black text-[#0F2A5C]">{stats.totalBrands}</p>
          <p className="text-xs text-slate-500 font-medium">सत्यापित ब्रांड्स</p>
        </div>
      </div>

      {/* Recent Products Table Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-[#0F2A5C]">हाल के उत्पाद (Recent Products)</h2>
            <p className="text-xs text-slate-500">हाल ही में जोड़े या अपडेट किए गए उत्पाद</p>
          </div>
          <Link
            href="/admin/products"
            className="text-xs font-bold text-[#0EA5E9] hover:text-[#0284C7] flex items-center gap-1.5 transition-colors"
          >
            सभी उत्पाद देखें (View All)
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase tracking-wider">
                <th className="pb-3 px-2">उत्पाद का नाम (Name)</th>
                <th className="pb-3 px-2">श्रेणी (Category)</th>
                <th className="pb-3 px-2">ब्रांड (Brand)</th>
                <th className="pb-3 px-2">स्थिति (Status)</th>
                <th className="pb-3 px-2 text-right">कार्य (Action)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {stats.recentProducts.map((p: DashboardRecentProduct) => (
                <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3.5 px-2 font-bold text-[#0F2A5C]">
                    <Link href={`/admin/products/${p.id}/edit`} className="hover:text-[#0EA5E9]">
                      {p.name}
                    </Link>
                  </td>
                  <td className="py-3.5 px-2 text-slate-600">{p.categoryName}</td>
                  <td className="py-3.5 px-2 text-slate-600">{p.brandName}</td>
                  <td className="py-3.5 px-2">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        p.isPublished
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {p.isPublished ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="py-3.5 px-2 text-right">
                    <Link
                      href={`/admin/products/${p.id}/edit`}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-[#0F2A5C] hover:text-white rounded-lg text-[11px] font-semibold transition-colors inline-block"
                    >
                      संपादित करें (Edit)
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
