import Link from "next/link";
import { Search, Home, Package } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        {/* 404 */}
        <div className="text-8xl font-black text-[#0F2A5C]/10 mb-2 select-none" aria-hidden="true">
          404
        </div>

        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl bg-[#F0F9FF] border border-[#BAE6FD] flex items-center justify-center mx-auto mb-6">
          <Search size={28} className="text-[#0EA5E9]" aria-hidden="true" />
        </div>

        <h1 className="text-2xl font-bold text-[#0F2A5C] mb-2">
          पेज नहीं मिला
        </h1>
        <p className="text-slate-500 text-sm mb-8 leading-relaxed">
          आप जिस पेज को खोज रहे हैं वह उपलब्ध नहीं है या हटा दिया गया है।
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0F2A5C] hover:bg-[#0EA5E9] text-white text-sm font-bold rounded-xl transition-colors"
          >
            <Home size={16} aria-hidden="true" />
            होम पेज पर जाएं
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 border border-slate-200 hover:border-[#0EA5E9] text-slate-700 hover:text-[#0F2A5C] text-sm font-semibold rounded-xl transition-colors"
          >
            <Package size={16} aria-hidden="true" />
            उत्पाद देखें
          </Link>
        </div>
      </div>
    </div>
  );
}
