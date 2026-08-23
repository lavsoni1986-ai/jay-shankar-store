import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, MessageCircle, Package, Star, Users } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { coreCategories } from "@/data/categories";
import { brands } from "@/data/brands";
import { getGeneralEnquiryUrl } from "@/lib/whatsapp";
import { StickyWhatsApp } from "@/components/ui/StickyWhatsApp";

export const metadata: Metadata = {
  title: "हमारे बारे में | Jay Shankar Readymade Store",
  description:
    "Jay Shankar Readymade Store के बारे में जानें — शहडोल, MP का थोक रेडीमेड और होजरी व्यापार। हमारे उत्पाद, ब्रांड और थोक सेवाओं के बारे में।",
  alternates: {
    canonical: `${siteConfig.url}/about`,
  },
};

export default function AboutPage() {
  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* Header */}
      <div className="bg-[#0F2A5C] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-xs text-white/50">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-white/80" aria-current="page">About</li>
            </ol>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
            हमारे बारे में
          </h1>
          <p className="text-white/60 text-sm">
            Jay Shankar Readymade Store — Shahdol, Madhya Pradesh
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Business Introduction */}
        <section className="mb-10">
          <div className="bg-white border border-slate-100 rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-[#0F2A5C] mb-4">
              Jay Shankar Readymade Store
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              <strong className="text-[#0F2A5C]">Jay Shankar Readymade Store</strong> शहडोल, मध्यप्रदेश में स्थित एक थोक रेडीमेड और होजरी व्यापार है।
              हम डीलरों, खुदरा विक्रेताओं और व्यापारियों को थोक मूल्य पर विविध उत्पाद उपलब्ध कराते हैं।
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              हमारा प्राथमिक व्यवसाय <strong>B2B थोक व्यापार</strong> है। हम Hosiery, Kolkata Readymade, Umbrella, Rainwear, Newar, Tripal, Jhola, Panni सहित अनेक श्रेणियों में थोक आपूर्ति करते हैं।
            </p>
            <p className="text-slate-600 leading-relaxed">
              हमारे पास Lux, Essdee, Zeel Rainwear, Sharmeelee, Pooja Ragenee, Arman जैसे प्रमुख ब्रांडों के उत्पाद उपलब्ध हैं।
            </p>
          </div>
        </section>

        {/* What We Offer */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-[#0F2A5C] mb-5">
            हम क्या उपलब्ध कराते हैं
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                icon: Package,
                title: "विस्तृत उत्पाद श्रृंखला",
                desc: "होजरी, रेडीमेड, रेनवेयर, छाता, नेवार, त्रिपाल, झोला और अधिक।",
              },
              {
                icon: Star,
                title: "प्रमुख ब्रांड",
                desc: "Lux, Essdee, Zeel Rainwear, Sharmeelee, Pooja Ragenee, Arman।",
              },
              {
                icon: Users,
                title: "थोक व्यापार",
                desc: "डीलरों, खुदरा विक्रेताओं और व्यापारियों के लिए थोक मूल्य पर आपूर्ति।",
              },
              {
                icon: MessageCircle,
                title: "WhatsApp ऑर्डर",
                desc: "सरल और तेज़ WhatsApp के माध्यम से थोक ऑर्डर और पूछताछ।",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex gap-4 p-5 bg-white border border-slate-100 rounded-xl"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#F0F9FF] flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-[#0EA5E9]" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#0F2A5C] mb-1 text-hindi">{item.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed text-hindi">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Core Categories List */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-[#0F2A5C] mb-4">
            मुख्य थोक श्रेणियाँ
          </h2>
          <div className="flex flex-wrap gap-2">
            {coreCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="text-sm px-3 py-1.5 bg-white border border-slate-200 text-[#0F2A5C] rounded-lg hover:border-[#0EA5E9] hover:text-[#0EA5E9] transition-colors font-medium text-hindi"
              >
                {cat.nameHindi}
              </Link>
            ))}
          </div>
        </section>

        {/* Brands List */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-[#0F2A5C] mb-4">
            हमारे प्रमुख ब्रांड
          </h2>
          <div className="flex flex-wrap gap-3">
            {brands.map((brand) => (
              <Link
                key={brand.slug}
                href={`/brands/${brand.slug}`}
                className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-xl hover:border-slate-300 transition-colors"
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0"
                  style={{ backgroundColor: brand.accentColor }}
                  aria-hidden="true"
                >
                  {brand.logoPlaceholder}
                </div>
                <span className="text-sm font-semibold text-[#0F2A5C]">{brand.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Location */}
        <section className="mb-10">
          <div className="bg-white border border-slate-100 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-[#0F2A5C] mb-4">हमारा स्थान</h2>
            <div className="flex items-start gap-3">
              <MapPin size={18} className="text-[#0EA5E9] mt-0.5 shrink-0" aria-hidden="true" />
              <address className="not-italic">
                <p className="font-bold text-[#0F2A5C]">{siteConfig.name}</p>
                <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                  {siteConfig.address.full}
                </p>
              </address>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="bg-[#0F2A5C] rounded-2xl p-6 sm:p-8 text-center">
          <h2 className="text-xl font-bold text-white mb-2 text-hindi">
            थोक ऑर्डर या पूछताछ के लिए WhatsApp करें
          </h2>
          <p className="text-white/60 text-sm mb-5">
            {siteConfig.contact.contactPerson} — {siteConfig.contact.whatsappDisplay}
          </p>
          <a
            href={getGeneralEnquiryUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-sm rounded-xl transition-colors"
            aria-label="WhatsApp पर थोक पूछताछ करें"
          >
            <MessageCircle size={18} aria-hidden="true" />
            WhatsApp पर संपर्क करें
          </a>
        </div>
      </div>

      <StickyWhatsApp />
    </div>
  );
}
