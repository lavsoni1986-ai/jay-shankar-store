// ============================================================
// Jay Shankar Readymade Store — Type Definitions
// ============================================================

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string; // category slug
  brand?: string;   // brand slug (optional)
  description: string;
  shortDescription: string;
  images: string[];
  tags: string[];
  isWholesale: boolean;
  isFeatured: boolean;
  enquiryAvailable: boolean;
  isDemo: boolean; // true = sample data, replace with real catalogue
}

export interface Category {
  id: string;
  name: string;
  nameHindi: string;
  slug: string;
  description: string;
  icon: string; // lucide icon name
  isCore: boolean; // true = primary wholesale segment
  productCount?: number;
  color: string; // tailwind bg color token
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  description: string;
  categories: string[]; // category slugs this brand covers
  logoPlaceholder: string; // initials / short abbrev for text card
  logoUrl?: string; // official brand logo URL
  accentColor: string; // hex accent for card styling
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface WhatsAppMessage {
  number: string;
  message: string;
}
