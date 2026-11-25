import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Phone, MessageCircle, ExternalLink, User, Clock, Compass, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { getCategories } from "@/lib/db/categories";
import { getGeneralEnquiryUrl, getBulkEnquiryUrl } from "@/lib/whatsapp";
import { getGoogleMapsUrl } from "@/lib/utils";
import { StickyWhatsApp } from "@/components/ui/StickyWhatsApp";
import { WhatsAppMessageBuilder } from "@/components/contact/WhatsAppMessageBuilder";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "संपर्क एवं थोक पूछताछ | Jay Shankar Readymade Store — Shahdol",
  description:
    "Jay Shankar Readymade Store से संपर्क करें — Itwani Mohalli, Ward No. 10, Shahdol (MP) 484001। WhatsApp: +91 7000766562 (Utkarsh Soni)। थोक ऑर्डर एवं पार्सल पूछताछ।",
  alternates: {
    canonical: `${siteConfig.url}/contact`,
  },
};

export default async function ContactPage() {
  const allCategories = await getCategories();
  const mapsUrl = getGoogleMapsUrl(siteConfig.address.full);
  const generalWhatsApp = getGeneralEnquiryUrl();
  const bulkWhatsApp = getBulkEnquiryUrl();

  return (
    <div className="bg-[#F3EFE8] min-h-screen text-[#242426]">
      {/* Editorial Header */}
      <section className="bg-[#242426] text-[#F3EFE8] pt-10 pb-12 sm:pt-14 sm:pb-16 border-b border-[#39383B] relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div 
          className="absolute -top-24 right-0 w-96 h-96 bg-[#B77B50]/10 rounded-full blur-3xl pointer-events-none" 
          aria-hidden="true" 
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-xs text-[#D8C9B7]/70">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-[#D4A37F] font-semibold" aria-current="page">
                Contact
              </li>
            </ol>
          </nav>

          {/* Kicker badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#39383B] border border-[#B77B50]/40 text-[#D4A37F] text-xs font-bold tracking-widest uppercase mb-4">
            <Compass size={13} className="text-[#B77B50]" aria-hidden="true" />
            <span>व्यापारिक संवाद &bull; WHOLESALE INQUIRY DESK</span>
          </div>

          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight font-display text-hindi mb-3">
              संपर्क एवं थोक पूछताछ
            </h1>
            <p className="text-sm sm:text-base text-[#D8C9B7] leading-relaxed text-hindi font-sans">
              शहडोल एवं आसपास के जिलों के व्यापारियों के लिए त्वरित संपर्क सूत्र। थोक भाव, नई कैटलॉग सूची, पार्सल डिस्पैच और दुकान पर प्रत्यक्ष आगमन के लिए हमसे सीधा संवाद करें।
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Business Card & Store Location (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Merchant Identity Card */}
            <div className="bg-white border border-[#E3DED6] rounded-2xl p-6 sm:p-7 shadow-2xs">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck size={16} className="text-[#B77B50]" aria-hidden="true" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#B77B50]">
                  सत्यापित व्यावसायिक विवरण &bull; Verified Details
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-[#242426] font-display text-hindi mb-6">
                {siteConfig.name}
              </h2>

              {/* Contact Person */}
              <div className="flex items-start gap-3.5 mb-5 pb-5 border-b border-[#E3DED6]">
                <div className="w-10 h-10 rounded-xl bg-[#F3EFE8] border border-[#D8C9B7] flex items-center justify-center shrink-0 mt-0.5">
                  <User size={18} className="text-[#B77B50]" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-[#686469] uppercase tracking-wider mb-1">
                    संपर्क व्यक्ति (Contact Person)
                  </p>
                  <p className="text-sm sm:text-base font-bold text-[#242426]">
                    उत्कर्ष सोनी ({siteConfig.contact.contactPerson} Soni)
                  </p>
                  <p className="text-xs text-[#686469] text-hindi mt-0.5">
                    थोक व्यापार एवं ऑर्डर समन्वयक
                  </p>
                </div>
              </div>

              {/* Direct Phone / WhatsApp */}
              <div className="flex items-start gap-3.5 mb-5 pb-5 border-b border-[#E3DED6]">
                <div className="w-10 h-10 rounded-xl bg-[#F3EFE8] border border-[#D8C9B7] flex items-center justify-center shrink-0 mt-0.5">
                  <Phone size={18} className="text-[#B77B50]" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-[#686469] uppercase tracking-wider mb-1">
                    दूरभाष / WhatsApp नंबर
                  </p>
                  <a
                    href={`tel:+91${siteConfig.contact.whatsapp}`}
                    className="text-base sm:text-lg font-bold text-[#242426] hover:text-[#B77B50] transition-colors"
                  >
                    {siteConfig.contact.whatsappDisplay}
                  </a>
                  <p className="text-xs text-[#686469] text-hindi mt-0.5">
                    कॉल एवं WhatsApp दोनों उपलब्ध
                  </p>
                </div>
              </div>

              {/* Physical Address */}
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#F3EFE8] border border-[#D8C9B7] flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={18} className="text-[#B77B50]" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-[#686469] uppercase tracking-wider mb-1">
                    दुकान का पता (Store Address)
                  </p>
                  <address className="not-italic text-xs sm:text-sm text-[#242426] font-medium leading-relaxed font-sans">
                    {siteConfig.address.street},<br />
                    {siteConfig.address.city} ({siteConfig.address.state}) — {siteConfig.address.pincode}
                  </address>
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-2.5 text-xs text-[#B77B50] hover:text-[#242426] font-bold underline transition-colors"
                    aria-label="Google Maps पर दुकान का स्थान देखें"
                  >
                    <ExternalLink size={13} aria-hidden="true" />
                    <span>Google Maps पर दिशा-निर्देश देखें</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="space-y-3">
              <a
                href={generalWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full py-4 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-sm sm:text-base rounded-xl transition-all shadow-md active:scale-[0.98]"
                aria-label="WhatsApp पर सामान्य थोक पूछताछ करें"
              >
                <MessageCircle size={20} className="fill-current" aria-hidden="true" />
                <span>WhatsApp पर थोक पूछताछ करें</span>
              </a>

              <a
                href={bulkWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 w-full py-3.5 bg-white border border-[#242426] text-[#242426] hover:bg-[#242426] hover:text-white font-bold text-sm rounded-xl transition-all shadow-2xs active:scale-[0.98]"
                aria-label="थोक पार्सल ऑर्डर के लिए WhatsApp करें"
              >
                <span>बल्क पार्सल ऑर्डर के लिए WhatsApp करें &rarr;</span>
              </a>

              <a
                href={`tel:+91${siteConfig.contact.whatsapp}`}
                className="flex items-center justify-center gap-2 w-full py-3.5 bg-white border border-[#E3DED6] hover:border-[#B77B50] text-[#242426] font-semibold text-sm rounded-xl transition-colors shadow-2xs active:scale-[0.98]"
                aria-label={`सीधा कॉल करें: ${siteConfig.contact.whatsappDisplay}`}
              >
                <Phone size={16} className="text-[#B77B50]" aria-hidden="true" />
                <span>सीधा कॉल करें ({siteConfig.contact.whatsappDisplay})</span>
              </a>
            </div>

            {/* Store Visit & Timings Guidance */}
            <div className="bg-white border border-[#E3DED6] rounded-2xl p-6 shadow-2xs">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#F3EFE8] border border-[#D8C9B7] flex items-center justify-center shrink-0 mt-0.5">
                  <Clock size={18} className="text-[#B77B50]" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#242426] text-hindi mb-1">
                    व्यापारिक समय एवं प्रत्यक्ष दुकान आगमन
                  </h3>
                  <p className="text-xs text-[#686469] leading-relaxed text-hindi font-sans">
                    सोमवार से शनिवार: सुबह 10:00 बजे से रात्रि 8:30 बजे तक।<br />
                    थोक माल चयन एवं प्रत्यक्ष निरीक्षण हेतु दुकान आगमन से पूर्व WhatsApp पर समय निर्धारित कर सकते हैं।
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive WhatsApp Message Builder (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <WhatsAppMessageBuilder categories={allCategories} />

            {/* Wholesale Trade Advisory Box */}
            <div className="bg-white border border-[#E3DED6] rounded-2xl p-6 sm:p-7 shadow-2xs">
              <h3 className="text-sm sm:text-base font-bold text-[#242426] font-display text-hindi mb-3">
                व्यापारियों के लिए उपयोगी जानकारी
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs text-[#686469] leading-relaxed text-hindi">
                <div className="p-3.5 bg-[#FAF8F5] border border-[#E3DED6] rounded-xl">
                  <p className="font-bold text-[#242426] mb-1">📦 पार्सल डिस्पैच</p>
                  <p>शहडोल, अनूपपुर, उमरिया, डिंडोरी एवं आसपास के क्षेत्रों के लिए पार्सल व्यवस्था उपलब्ध।</p>
                </div>
                <div className="p-3.5 bg-[#FAF8F5] border border-[#E3DED6] rounded-xl">
                  <p className="font-bold text-[#242426] mb-1">🏷️ ताज़ा थोक दरें</p>
                  <p>सीज़न और निर्माण लागत के अनुसार दरों में संशोधन होता है, ताज़ा कोटेशन सीधे WhatsApp पर प्राप्त करें।</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <StickyWhatsApp />
    </div>
  );
}
