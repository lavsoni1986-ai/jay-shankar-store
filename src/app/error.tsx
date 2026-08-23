"use client";

import Link from "next/link";
import { AlertTriangle, Home } from "lucide-react";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-6">
          <AlertTriangle size={28} className="text-red-400" aria-hidden="true" />
        </div>
        <h1 className="text-2xl font-bold text-[#0F2A5C] mb-2">
          कुछ गलत हो गया
        </h1>
        <p className="text-slate-500 text-sm mb-6 leading-relaxed">
          पेज लोड करने में समस्या हुई। कृपया पुनः प्रयास करें।
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={reset}
            className="px-5 py-2.5 bg-[#0F2A5C] hover:bg-[#0EA5E9] text-white text-sm font-semibold rounded-xl transition-colors"
          >
            पुनः प्रयास करें
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-slate-200 hover:border-[#0EA5E9] text-slate-700 text-sm font-semibold rounded-xl transition-colors"
          >
            <Home size={15} aria-hidden="true" />
            होम पेज
          </Link>
        </div>
      </div>
    </div>
  );
}
