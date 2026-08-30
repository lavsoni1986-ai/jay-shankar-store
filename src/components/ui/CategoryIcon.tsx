import React from "react";

export interface CategoryTheme {
  primaryColor: string;
  bgPastel: string;
  badgeBg: string;
  badgeText: string;
}

export const CATEGORY_THEMES: Record<string, CategoryTheme> = {
  hosiery: {
    primaryColor: "#3B82F6",
    bgPastel: "#DBEAFE",
    badgeBg: "#EFF6FF",
    badgeText: "#1D4ED8",
  },
  "kolkata-readymade": {
    primaryColor: "#8B5CF6",
    bgPastel: "#EDE9FE",
    badgeBg: "#F5F3FF",
    badgeText: "#6D28D9",
  },
  umbrella: {
    primaryColor: "#F97316",
    bgPastel: "#FFEDD5",
    badgeBg: "#FFF7ED",
    badgeText: "#C2410C",
  },
  panni: {
    primaryColor: "#10B981",
    bgPastel: "#D1FAE5",
    badgeBg: "#ECFDF5",
    badgeText: "#047857",
  },
  "zeel-raincoat": {
    primaryColor: "#0EA5E9",
    bgPastel: "#E0F2FE",
    badgeBg: "#F0F9FF",
    badgeText: "#0369A1",
  },
  newar: {
    primaryColor: "#14B8A6",
    bgPastel: "#CCFBF1",
    badgeBg: "#F0FDFA",
    badgeText: "#0F766E",
  },
  tripal: {
    primaryColor: "#F59E0B",
    bgPastel: "#FEF3C7",
    badgeBg: "#FFFBEB",
    badgeText: "#B45309",
  },
  jhola: {
    primaryColor: "#EC4899",
    bgPastel: "#FCE7F3",
    badgeBg: "#FDF2F8",
    badgeText: "#BE185D",
  },
  // Additional categories
  saree: {
    primaryColor: "#E11D48",
    bgPastel: "#FFE4E6",
    badgeBg: "#FFF1F2",
    badgeText: "#BE123C",
  },
  "ladies-suit": {
    primaryColor: "#D946EF",
    bgPastel: "#FAE8FF",
    badgeBg: "#FDF4FF",
    badgeText: "#A21CAF",
  },
  jeans: {
    primaryColor: "#4F46E5",
    bgPastel: "#EEF2FF",
    badgeBg: "#EEF2FF",
    badgeText: "#4338CA",
  },
  shirt: {
    primaryColor: "#2563EB",
    bgPastel: "#DBEAFE",
    badgeBg: "#EFF6FF",
    badgeText: "#1D4ED8",
  },
  raincoat: {
    primaryColor: "#0EA5E9",
    bgPastel: "#E0F2FE",
    badgeBg: "#F0F9FF",
    badgeText: "#0369A1",
  },
  blanket: {
    primaryColor: "#7C3AED",
    bgPastel: "#F3E8FF",
    badgeBg: "#FAF5FF",
    badgeText: "#6D28D9",
  },
  undergarments: {
    primaryColor: "#EF4444",
    bgPastel: "#FEE2E2",
    badgeBg: "#FEF2F2",
    badgeText: "#B91C1C",
  },
  "readymade-garments": {
    primaryColor: "#059669",
    bgPastel: "#D1FAE5",
    badgeBg: "#ECFDF5",
    badgeText: "#047857",
  },
  "winter-wear": {
    primaryColor: "#0284C7",
    bgPastel: "#E0F2FE",
    badgeBg: "#F0F9FF",
    badgeText: "#0369A1",
  },
  "other-wholesale": {
    primaryColor: "#64748B",
    bgPastel: "#F1F5F9",
    badgeBg: "#F8FAFC",
    badgeText: "#334155",
  },
};

export function getCategoryTheme(slug: string): CategoryTheme {
  const normalized = (slug || "").toLowerCase().trim();
  if (CATEGORY_THEMES[normalized]) {
    return CATEGORY_THEMES[normalized];
  }
  // Fallbacks by partial slug match
  if (normalized.includes("hosiery") || normalized.includes("undergarment")) {
    return CATEGORY_THEMES["hosiery"];
  }
  if (normalized.includes("kolkata") || normalized.includes("readymade")) {
    return CATEGORY_THEMES["kolkata-readymade"];
  }
  if (normalized.includes("umbrella")) {
    return CATEGORY_THEMES["umbrella"];
  }
  if (normalized.includes("panni") || normalized.includes("plastic")) {
    return CATEGORY_THEMES["panni"];
  }
  if (normalized.includes("raincoat")) {
    return CATEGORY_THEMES["zeel-raincoat"];
  }
  if (normalized.includes("newar")) {
    return CATEGORY_THEMES["newar"];
  }
  if (normalized.includes("tripal") || normalized.includes("tarpaulin")) {
    return CATEGORY_THEMES["tripal"];
  }
  if (normalized.includes("jhola") || normalized.includes("bag")) {
    return CATEGORY_THEMES["jhola"];
  }
  return {
    primaryColor: "#0EA5E9",
    bgPastel: "#E0F2FE",
    badgeBg: "#F0F9FF",
    badgeText: "#0369A1",
  };
}

interface CategoryIconProps {
  slug: string;
  size?: number;
  className?: string;
}

export function CategoryIcon({ slug, size = 42, className = "" }: CategoryIconProps) {
  const normalized = (slug || "").toLowerCase().trim();
  const theme = getCategoryTheme(normalized);
  const color = theme.primaryColor;

  switch (normalized) {
    // 1. HOSIERY — Socks / Vest Duo
    case "hosiery":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Back Sock */}
          <path
            d="M26 6C26 4.89543 26.8954 4 28 4H37C38.1046 4 39 4.89543 39 6V21.5C39 22.8 39.5 24 40.5 24.9L44.2 28.3C46.5 30.4 46.4 34.2 44 36.3L40.8 39.1C38.6 41 35.2 40.8 33.2 38.6L27.2 32C26.4 31.1 26 30 26 28.8V6Z"
            fill={color}
            fillOpacity="0.45"
          />
          <rect x="26" y="4" width="13" height="4" rx="2" fill={color} fillOpacity="0.8" />
          
          {/* Main Front Sock */}
          <path
            d="M10 10C10 8.89543 10.8954 8 12 8H21C22.1046 8 23 8.89543 23 10V25.2C23 26.5 23.6 27.7 24.6 28.6L29.3 32.8C31.8 35.1 31.6 39.1 28.9 41.1C26.5 42.9 23 42.6 21 40.3L11.5 29.5C10.5 28.4 10 27 10 25.5V10Z"
            fill={color}
          />
          {/* Sock Ribbed Top Cuff */}
          <rect x="10" y="8" width="13" height="4" rx="1.5" fill="#1D4ED8" />
          {/* Heel detail */}
          <path
            d="M10 23.5C10 27.5 13 30.5 16 30.5V23.5H10Z"
            fill="#60A5FA"
            fillOpacity="0.8"
          />
          {/* Toe detail */}
          <path
            d="M24 36.5C26 38.5 28.5 40 28.9 41.1C26.5 42.9 23 42.6 21 40.3L20 39.2L24 36.5Z"
            fill="#93C5FD"
          />
          {/* Stripe Details */}
          <line x1="12" y1="14" x2="21" y2="14" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.9" />
          <line x1="12" y1="17" x2="21" y2="17" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.9" />
        </svg>
      );

    // 2. KOLKATA READYMADE — Collared Button-Down Shirt
    case "kolkata-readymade":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Shirt Body */}
          <path
            d="M14 13L6 18L10 27L14 25V42C14 43.1 14.9 44 16 44H32C33.1 44 34 43.1 34 42V25L38 27L42 18L34 13L31 16C29 18 25 19 24 19C23 19 19 18 17 16L14 13Z"
            fill={color}
          />
          {/* Sleeves Fold Accent */}
          <path d="M6 18L10 27L14 25L11 19L6 18Z" fill="#7C3AED" />
          <path d="M42 18L38 27L34 25L37 19L42 18Z" fill="#7C3AED" />
          {/* Collar Wings */}
          <path d="M14 13L20 18L24 10L18 7L14 13Z" fill="#A78BFA" />
          <path d="M34 13L28 18L24 10L30 7L34 13Z" fill="#C4B5FD" />
          {/* Placket */}
          <rect x="22.5" y="10" width="3" height="34" rx="1.5" fill="#6D28D9" />
          {/* Buttons */}
          <circle cx="24" cy="22" r="1.5" fill="white" />
          <circle cx="24" cy="29" r="1.5" fill="white" />
          <circle cx="24" cy="36" r="1.5" fill="white" />
          {/* Pocket */}
          <path d="M28 23H32V28C32 29.1 31.1 30 30 30C28.9 30 28 29.1 28 28V23Z" fill="#7C3AED" />
        </svg>
      );

    // 3. UMBRELLA — Opened Umbrella with curved handle
    case "umbrella":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Canopy Left Panel */}
          <path
            d="M24 8C17 8 9 13.5 6 22C10.5 24 14.5 22.5 17 21C19.5 24 22 24.5 24 24.5V8Z"
            fill={color}
          />
          {/* Canopy Right Panel */}
          <path
            d="M24 8C31 8 39 13.5 42 22C37.5 24 33.5 22.5 31 21C28.5 24 26 24.5 24 24.5V8Z"
            fill="#FB923C"
          />
          {/* Canopy Center Highlights */}
          <path
            d="M24 8C20.5 8 18 14 17 21C20.5 23.5 23 24 24 24C25 24 27.5 23.5 31 21C30 14 27.5 8 24 8Z"
            fill="#FDBA74"
            fillOpacity="0.4"
          />
          {/* Top Tip */}
          <rect x="22.5" y="4" width="3" height="5" rx="1.5" fill="#C2410C" />
          {/* Shaft */}
          <path d="M24 24V38" stroke="#9A3412" strokeWidth="2.5" strokeLinecap="round" />
          {/* Hook Handle */}
          <path
            d="M24 38C24 41 21.5 43.5 18.5 43.5C15.5 43.5 13.5 41.5 13.5 39"
            stroke="#9A3412"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Handle knob */}
          <circle cx="13.5" cy="38.5" r="2" fill="#EA580C" />
        </svg>
      );

    // 4. PANNI — Plastic Carry Bag
    case "panni":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Bag Body */}
          <path
            d="M11 16C11 14.8954 11.8954 14 13 14H35C36.1046 14 37 14.8954 37 16L39.5 40C39.5 42.2 37.7 44 35.5 44H12.5C10.3 44 8.5 42.2 8.5 40L11 16Z"
            fill={color}
          />
          {/* Top Fold / Flap */}
          <path
            d="M11 16C11 14.9 11.9 14 13 14H35C36.1 14 37 14.9 37 16V19H11V16Z"
            fill="#059669"
          />
          {/* Side Sheen / Gradient Highlight */}
          <path
            d="M11 16L13.5 42H18L14 16H11Z"
            fill="#34D399"
            fillOpacity="0.4"
          />
          {/* Die-Cut Oval Handle */}
          <rect
            x="18"
            y="20"
            width="12"
            height="5"
            rx="2.5"
            fill="white"
          />
          {/* Gusset Fold Line */}
          <path
            d="M24 29V43"
            stroke="#047857"
            strokeWidth="1.5"
            strokeDasharray="2 2"
            strokeLinecap="round"
          />
        </svg>
      );

    // 5. ZEEL RAINCOAT — Waterproof Hooded Rain Jacket
    case "zeel-raincoat":
    case "raincoat":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Rain Hood Background */}
          <path
            d="M17 14C17 9 20 5 24 5C28 5 31 9 31 14V17H17V14Z"
            fill="#0284C7"
          />
          {/* Hood Inner */}
          <path
            d="M19 14C19 10.5 21 8 24 8C27 8 29 10.5 29 14V17H19V14Z"
            fill="#38BDF8"
            fillOpacity="0.3"
          />
          {/* Raincoat Body & Sleeves */}
          <path
            d="M14 16L6 23L10 30L14 27V43C14 43.6 14.4 44 15 44H33C33.6 44 34 43.6 34 43V27L38 30L42 23L34 16H14Z"
            fill={color}
          />
          {/* Hood Cords */}
          <path d="M21 16V22" stroke="#BAE6FD" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M27 16V22" stroke="#BAE6FD" strokeWidth="1.5" strokeLinecap="round" />
          {/* Waterproof Zipper Placket */}
          <line x1="24" y1="16" x2="24" y2="44" stroke="#0369A1" strokeWidth="2.5" />
          {/* Left / Right Storm Flap Pockets */}
          <rect x="16" y="32" width="6" height="5" rx="1" fill="#0284C7" />
          <rect x="26" y="32" width="6" height="5" rx="1" fill="#0284C7" />
          {/* Raindrops accents */}
          <path d="M38 7C38 8 36.5 10 36.5 10C36.5 10 35 8 35 7C35 6 35.7 5.5 36.5 5.5C37.3 5.5 38 6 38 7Z" fill="#38BDF8" />
          <path d="M12 9C12 10 10.5 12 10.5 12C10.5 12 9 10 9 9C9 8 9.7 7.5 10.5 7.5C11.3 7.5 12 8 12 9Z" fill="#38BDF8" />
        </svg>
      );

    // 6. NEWAR — Knitted Sweater / Innerwear Vest
    case "newar":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Vest / Knitwear Body */}
          <path
            d="M16 6C16 8 17.5 9 19 9H29C30.5 9 32 8 32 6H38C38 12 36 18 34 22V42C34 43.1 33.1 44 32 44H16C14.9 44 14 43.1 14 42V22C12 18 10 12 10 6H16Z"
            fill={color}
          />
          {/* Deep Neckline Ribbing */}
          <path
            d="M16 6C16 11 19.5 14 24 14C28.5 14 32 11 32 6"
            stroke="#0D9488"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Armhole Trims */}
          <path d="M10 6C10 12 12.5 17.5 14 22" stroke="#0D9488" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M38 6C38 12 35.5 17.5 34 22" stroke="#0D9488" strokeWidth="2.5" strokeLinecap="round" />
          {/* Knit / Rib Lines */}
          <line x1="20" y1="20" x2="20" y2="40" stroke="#5EEAD4" strokeWidth="1.5" strokeDasharray="3 2" strokeLinecap="round" />
          <line x1="24" y1="18" x2="24" y2="40" stroke="#CCFBF1" strokeWidth="1.5" strokeDasharray="3 2" strokeLinecap="round" />
          <line x1="28" y1="20" x2="28" y2="40" stroke="#5EEAD4" strokeWidth="1.5" strokeDasharray="3 2" strokeLinecap="round" />
          {/* Bottom Hem */}
          <rect x="14" y="41" width="20" height="3" rx="1" fill="#0F766E" />
        </svg>
      );

    // 7. TRIPAL — Coiled Tarpaulin Roll / Heavy Sheet
    case "tripal":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Tarpaulin Flat Extended Base Sheet */}
          <path
            d="M18 36L40 24C41 23.5 42 24.2 42 25.4V34.5C42 35.4 41.5 36.2 40.7 36.6L20 44C17.5 45 15 43.5 15 40.8V37.5L18 36Z"
            fill="#D97706"
          />
          {/* Unfurling Layer */}
          <path
            d="M14 18C14 11.4 19.4 6 26 6C32.6 6 38 11.4 38 18C38 24.6 32.6 30 26 30H10C6.7 30 4 27.3 4 24C4 20.7 6.7 18 10 18H26C29.3 18 32 20.7 32 24C32 27.3 29.3 30 26 30H14"
            fill={color}
          />
          {/* Outer Roll Highlight */}
          <path
            d="M14 18C14 11.4 19.4 6 26 6C32.6 6 38 11.4 38 18C38 24.6 32.6 30 26 30H20"
            fill="#FBBF24"
            fillOpacity="0.3"
          />
          {/* Coil Inner Spiral */}
          <path
            d="M26 10C21.6 10 18 13.6 18 18C18 22.4 21.6 26 26 26C30.4 26 34 22.4 34 18C34 13.6 30.4 10 26 10Z"
            fill="#D97706"
          />
          <circle cx="26" cy="18" r="4.5" fill="#FEF3C7" />
          <circle cx="26" cy="18" r="2" fill="#B45309" />
          {/* Heavy Duty Eyelets/Grommets */}
          <circle cx="38" cy="31" r="1.5" fill="white" />
          <circle cx="28" cy="38" r="1.5" fill="white" />
        </svg>
      );

    // 8. JHOLA — Reusable Cloth Shopping / Tote Bag
    case "jhola":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Jhola Cloth Handles */}
          <path
            d="M18 17V10C18 6.7 20.7 4 24 4C27.3 4 30 6.7 30 10V17"
            stroke="#DB2777"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Bag Body */}
          <path
            d="M10 17C10 15.9 10.9 15 12 15H36C37.1 15 38 15.9 38 17L39.5 40C39.7 42.2 38 44 35.8 44H12.2C10 44 8.3 42.2 8.5 40L10 17Z"
            fill={color}
          />
          {/* Bag Side Accent / Light Sheen */}
          <path
            d="M10 17L12 43H16L13 17H10Z"
            fill="#F472B6"
            fillOpacity="0.5"
          />
          {/* Traditional Print / Smiling Stars Decorative Pattern */}
          <circle cx="19" cy="27" r="2.2" fill="white" />
          <circle cx="29" cy="27" r="2.2" fill="white" />
          <path
            d="M20 33C21.2 35 26.8 35 28 33"
            stroke="white"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          {/* Top Border Reinforcement */}
          <path d="M10 17H38" stroke="#BE185D" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    // 9. SAREE — Traditional Indian Saree / Silk Drape
    case "saree":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          <path
            d="M12 8C12 6.9 12.9 6 14 6H34C35.1 6 36 6.9 36 8V38C36 41.3 33.3 44 30 44H18C14.7 44 12 41.3 12 38V8Z"
            fill={color}
          />
          {/* Gold Pallu Pleats */}
          <path d="M12 12L36 24V18L12 6V12Z" fill="#FDA4AF" />
          <path d="M12 22L36 34V28L12 16V22Z" fill="#F43F5E" />
          <path d="M12 32L36 44V38L12 26V32Z" fill="#BE123C" />
          {/* Zari Gold Border */}
          <rect x="12" y="6" width="4" height="38" fill="#FBBF24" />
        </svg>
      );

    // 10. LADIES SUIT — Designer Kurti / Salwar Suit
    case "ladies-suit":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          <path
            d="M16 8L8 15L12 20L15 18V44H33V18L36 20L40 15L32 8C30 11 26 12 24 12C22 12 18 11 16 8Z"
            fill={color}
          />
          <path d="M18 8C20 12 28 12 30 8" stroke="#FDF4FF" strokeWidth="2" strokeLinecap="round" />
          <path d="M24 12V30" stroke="#A21CAF" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 2" />
          {/* Dupatta drape */}
          <path
            d="M12 6C15 12 16 26 12 38"
            stroke="#E879F9"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>
      );

    // 11. JEANS — Denim Jeans
    case "jeans":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Jeans Shape */}
          <path
            d="M12 8C12 6.9 12.9 6 14 6H34C35.1 6 36 6.9 36 8L35 42C35 43.1 34.1 44 33 44H26C25.2 44 24.5 43.5 24.2 42.7L24 23L23.8 42.7C23.5 43.5 22.8 44 22 44H15C13.9 44 13 43.1 13 42L12 8Z"
            fill={color}
          />
          {/* Waistband */}
          <rect x="12" y="6" width="24" height="6" fill="#3730A3" />
          {/* Button & Fly */}
          <circle cx="24" cy="9" r="1.5" fill="#FBBF24" />
          <line x1="24" y1="12" x2="24" y2="20" stroke="#312E81" strokeWidth="2" />
          {/* Pockets */}
          <path d="M14 12C18 12 19 16 19 18" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" />
          <path d="M34 12C30 12 29 16 29 18" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    // 12. SHIRT — Casual & Formal Shirts
    case "shirt":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          <path
            d="M15 11L7 16L11 25L15 23V43C15 43.6 15.4 44 16 44H32C32.6 44 33 43.6 33 43V23L37 25L41 16L33 11L30 14C28 16 25 17 24 17C23 17 20 16 18 14L15 11Z"
            fill={color}
          />
          <path d="M15 11L20 16L24 9L19 6L15 11Z" fill="#93C5FD" />
          <path d="M33 11L28 16L24 9L29 6L33 11Z" fill="#BFDBFE" />
          <line x1="24" y1="9" x2="24" y2="44" stroke="#1D4ED8" strokeWidth="2" />
          <circle cx="24" cy="20" r="1.2" fill="white" />
          <circle cx="24" cy="28" r="1.2" fill="white" />
          <circle cx="24" cy="36" r="1.2" fill="white" />
        </svg>
      );

    // 13. BLANKET — Folded Winter Quilt
    case "blanket":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          <rect x="8" y="28" width="32" height="14" rx="4" fill={color} />
          <rect x="10" y="18" width="28" height="12" rx="4" fill="#A78BFA" />
          <rect x="12" y="8" width="24" height="12" rx="4" fill="#C4B5FD" />
          <line x1="8" y1="35" x2="40" y2="35" stroke="#5B21B6" strokeWidth="2" strokeDasharray="3 2" />
        </svg>
      );

    // 14. UNDERGARMENTS — Men's Innerwear Vest
    case "undergarments":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          <path
            d="M16 6C16 8 18 10 20 10H28C30 10 32 8 32 6H38C38 13 36 20 34 24V42C34 43.1 33.1 44 32 44H16C14.9 44 14 43.1 14 42V24C12 20 10 13 10 6H16Z"
            fill={color}
          />
          <path d="M16 6C16 12 20 16 24 16C28 16 32 12 32 6" stroke="#B91C1C" strokeWidth="3" strokeLinecap="round" />
          <line x1="24" y1="20" x2="24" y2="38" stroke="white" strokeWidth="1.5" strokeDasharray="2 2" strokeOpacity="0.8" />
        </svg>
      );

    // 15. READYMADE GARMENTS — Clothes Hanger with Outfit
    case "readymade-garments":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          {/* Hook */}
          <path
            d="M24 12C24 9.8 25.8 8 28 8C29.7 8 31 9.3 31 11C31 12.7 29.5 14 28 15L24 18"
            stroke="#047857"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Hanger Bar */}
          <path d="M8 24L24 18L40 24L8 24Z" fill="#A7F3D0" stroke="#047857" strokeWidth="2" />
          {/* Garment */}
          <path
            d="M12 24L16 42H32L36 24H12Z"
            fill={color}
          />
          <line x1="24" y1="24" x2="24" y2="42" stroke="#047857" strokeWidth="2" strokeDasharray="3 2" />
        </svg>
      );

    // 16. WINTER WEAR — Winter Jacket
    case "winter-wear":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          <path
            d="M14 12L6 20L10 28L14 26V43C14 43.6 14.4 44 15 44H33C33.6 44 34 43.6 34 43V26L38 28L42 20L34 12L30 16C28 18 25 19 24 19C23 19 20 18 18 16L14 12Z"
            fill={color}
          />
          {/* Puffer Quilting Lines */}
          <line x1="14" y1="22" x2="34" y2="22" stroke="#0369A1" strokeWidth="2" strokeLinecap="round" />
          <line x1="14" y1="29" x2="34" y2="29" stroke="#0369A1" strokeWidth="2" strokeLinecap="round" />
          <line x1="14" y1="36" x2="34" y2="36" stroke="#0369A1" strokeWidth="2" strokeLinecap="round" />
          <line x1="24" y1="16" x2="24" y2="44" stroke="#BAE6FD" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    // 17. OTHER WHOLESALE / DEFAULT
    default:
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={className}
          aria-hidden="true"
        >
          <rect x="8" y="10" width="32" height="30" rx="6" fill={color} />
          <rect x="14" y="16" width="9" height="9" rx="2" fill="#E2E8F0" />
          <rect x="25" y="16" width="9" height="9" rx="2" fill="#94A3B8" />
          <rect x="14" y="27" width="9" height="9" rx="2" fill="#94A3B8" />
          <rect x="25" y="27" width="9" height="9" rx="2" fill="#E2E8F0" />
        </svg>
      );
  }
}
