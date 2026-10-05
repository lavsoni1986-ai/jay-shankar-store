import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { CoreCategories } from "@/components/home/CoreCategories";
import { BrandDealerships } from "@/components/home/BrandDealerships";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { WhyJayShankar } from "@/components/home/WhyJayShankar";
import { WhatsAppCTA } from "@/components/home/WhatsAppCTA";
import { LocationSection } from "@/components/home/LocationSection";
import { StickyWhatsApp } from "@/components/ui/StickyWhatsApp";
import { siteConfig } from "@/data/siteConfig";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Jay Shankar Readymade Store | थोक रेडीमेड और होजरी — शहडोल",
  description:
    "Jay Shankar Readymade Store — शहडोल, MP का थोक रेडीमेड और होजरी व्यापार। Hosiery, Kolkata Readymade, Umbrella, Raincoat, Newar, Tripal, Jhola। WhatsApp: 7000766562",
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    url: siteConfig.url,
    title: "Jay Shankar Readymade Store | थोक रेडीमेड और होजरी — शहडोल",
    description:
      "शहडोल, MP का थोक रेडीमेड और होजरी व्यापार। Lux, Essdee, Zeel Rainwear सहित 6 ब्रांड।",
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProducts />
      <CoreCategories />
      <BrandDealerships />
      <WhyJayShankar />
      <WhatsAppCTA />
      <LocationSection />
      <StickyWhatsApp />
    </>
  );
}
