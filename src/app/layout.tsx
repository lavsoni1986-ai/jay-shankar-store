import type { Metadata, Viewport } from "next";
import { Tiro_Devanagari_Hindi, Hind, Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BottomNav } from "@/components/layout/BottomNav";
import { GlobalSearchModal } from "@/components/layout/GlobalSearchModal";
import { SearchProvider } from "@/context/SearchContext";
import { PwaRegister } from "@/components/pwa/PwaRegister";
import { siteConfig } from "@/data/siteConfig";

const tiroDevanagariHindi = Tiro_Devanagari_Hindi({
  subsets: ["devanagari", "latin"],
  weight: "400",
  variable: "--font-tiro-hindi",
  display: "swap",
});

const hind = Hind({
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind",
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#242426",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: "Jay Shankar Store",
  title: {
    default: `${siteConfig.name} | थोक रेडीमेड और होजरी — शहडोल`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Jay Shankar Readymade Store — शहडोल, MP का अग्रणी थोक रेडीमेड और होजरी व्यापार केंद्र। Hosiery, Kolkata Readymade, Umbrella, Raincoat, Newar, Tripal, Jhola और अनेक उत्पादों में थोक सप्लाई। WhatsApp: 7000766562",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Jay Shankar",
  },
  formatDetection: {
    telephone: true,
  },
  keywords: [
    "Jay Shankar Readymade Store",
    "Jay Shankar Store Shahdol",
    "Wholesale Readymade Shahdol",
    "Hosiery Wholesale Shahdol",
    "Kolkata Readymade Shahdol",
    "Raincoat Wholesale Shahdol",
    "Umbrella Wholesale Shahdol",
    "Newar Wholesale Shahdol",
    "Tripal Wholesale Shahdol",
    "थोक रेडीमेड शहडोल",
    "होजरी थोक शहडोल",
    "शहडोल थोक बाजार",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "hi_IN",
    alternateLocale: "en_IN",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | थोक रेडीमेड और होजरी — शहडोल`,
    description:
      "शहडोल का अग्रणी थोक रेडीमेड और होजरी व्यापार। Hosiery, Kolkata Readymade, Rainwear, Umbrella और अधिक।",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | थोक रेडीमेड और होजरी — शहडोल`,
    description:
      "शहडोल का अग्रणी थोक रेडीमेड और होजरी व्यापार। WhatsApp: 7000766562",
  },
};

// JSON-LD Structured Data
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: siteConfig.name,
  description: siteConfig.descriptionEnglish,
  url: siteConfig.url,
  logo: `${siteConfig.url}/images/jay-shankar-js-logo.png`,
  image: `${siteConfig.url}/images/jay-shankar-full-logo.png`,
  telephone: `+91${siteConfig.contact.whatsapp}`,
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address.street,
    addressLocality: siteConfig.address.city,
    addressRegion: siteConfig.address.state,
    postalCode: siteConfig.address.pincode,
    addressCountry: "IN",
  },
  areaServed: {
    "@type": "State",
    name: "Madhya Pradesh",
  },
  priceRange: "थोक / Wholesale",
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.url,
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteConfig.url}/products?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="hi"
      className={`${dmSans.variable} ${hind.variable} ${cormorantGaramond.variable} ${tiroDevanagariHindi.variable} h-full`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <SearchProvider>
          <PwaRegister />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <BottomNav />
          <GlobalSearchModal />
        </SearchProvider>
      </body>
    </html>
  );
}
