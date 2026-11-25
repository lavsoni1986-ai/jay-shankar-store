"use client";

import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchBar({ value, onChange, placeholder, className = "" }: SearchBarProps) {
  return (
    <div className={`relative ${className}`} role="search">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
        <Search size={16} className="text-[#686469] transition-colors" aria-hidden="true" />
      </div>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "उत्पाद या ब्रांड खोजें… (Search catalogue)"}
        className="w-full pl-10 pr-10 py-2.5 sm:py-3 bg-white border border-[#E3DED6] rounded-xl text-sm text-[#242426] placeholder-[#686469] shadow-2xs focus:outline-none focus:border-[#B77B50] focus:ring-2 focus:ring-[#B77B50]/20 transition-all"
        aria-label="कैटलॉग में उत्पाद खोजें"
        autoComplete="off"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#686469] hover:text-[#242426] transition-colors cursor-pointer"
          aria-label="खोज साफ़ करें"
          title="साफ़ करें"
        >
          <div className="w-5 h-5 rounded-full bg-[#F3EFE8] flex items-center justify-center hover:bg-[#EAE4DC] transition-colors">
            <X size={12} aria-hidden="true" />
          </div>
        </button>
      )}
    </div>
  );
}
