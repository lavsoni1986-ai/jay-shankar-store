import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Phone, MessageCircle, ExternalLink, User } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { getGeneralEnquiryUrl, getBulkEnquiryUrl } from "@/lib/whatsapp";
import { getGoogleMapsUrl } from "@/lib/utils";
import { StickyWhatsApp } from "@/components/ui/StickyWhatsApp";

export const metadata: Metadata = {
  title: "संपर्क करें | Jay Shankar Readymade Store",
  description:
    "Jay Shankar Readymade Store से संपर्क करें — Itwani Mohalli, Ward No. 10, Shahdol (MP) 484001। WhatsApp: +91 7000766562 (Utkarsh)।",
  alternates: {
    canonical: `${siteConfig.url}/contact`,
  },
};

export default function ContactPage() {
  const mapsUrl = getGoogleMapsUrl(siteConfig.address.full);
  const generalWhatsApp = getGeneralEnquiryUrl();
  const bulkWhatsApp = getBulkEnquiryUrl();

  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* Header */}
      <div className="bg-[#0F2A5C] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-xs text-white/50">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-white/80" aria-current="page">Contact</li>
            </ol>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
            संपर्क करें
          </h1>
          <p className="text-white/60 text-sm">
            थोक पूछताछ, ऑर्डर या जानकारी के लिए हमसे संपर्क करें
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-5">
            {/* Business Card */}
            <div className="bg-white border border-slate-100 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-[#0F2A5C] mb-5">
                {siteConfig.name}
              </h2>

              {/* Address */}
              <div className="flex items-start gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-[#F0F9FF] flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-[#0EA5E9]" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-1">
                    पता
                  </p>
                  <address className="not-italic text-sm text-slate-700 leading-relaxed">
                    {siteConfig.address.street},<br />
                    {siteConfig.address.city} ({siteConfig.address.state}) {siteConfig.address.pincode}
                  </address>
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-2 text-xs text-[#0EA5E9] hover:text-[#0284C7] font-medium transition-colors"
                    aria-label="Google Maps पर देखें"
                  >
                    <ExternalLink size={12} aria-hidden="true" />
                    Google Maps पर देखें
                  </a>
                </div>
              </div>

              {/* Contact Person */}
              <div className="flex items-start gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-[#F0F9FF] flex items-center justify-center shrink-0">
                  <User size={18} className="text-[#0EA5E9]" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-1">
                    संपर्क व्यक्ति
                  </p>
                  <p className="text-sm font-semibold text-[#0F2A5C]">
                    {siteConfig.contact.contactPerson}
                  </p>
                </div>
              </div>

              {/* WhatsApp / Phone */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F0FFF4] flex items-center justify-center shrink-0">
                  <Phone size={18} className="text-[#25D366]" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold mb-1">
                    WhatsApp / Call
                  </p>
                  <a
                    href={`tel:+91${siteConfig.contact.whatsapp}`}
                    className="text-base font-bold text-[#0F2A5C] hover:text-[#0EA5E9] transition-colors"
                    aria-label={`Call ${siteConfig.contact.whatsappDisplay}`}
                  >
                    {siteConfig.contact.whatsappDisplay}
                  </a>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <a
                href={generalWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full py-4 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-sm rounded-2xl transition-colors shadow-md"
                aria-label="WhatsApp पर थोक पूछताछ करें"
              >
                <MessageCircle size={20} aria-hidden="true" />
                WhatsApp पर थोक पूछताछ करें
              </a>
              <a
                href={bulkWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full py-4 bg-white border border-[#0F2A5C] text-[#0F2A5C] hover:bg-[#0F2A5C] hover:text-white font-semibold text-sm rounded-2xl transition-colors"
                aria-label="WhatsApp पर थोक ऑर्डर करें"
              >
                थोक ऑर्डर WhatsApp करें
              </a>
              <a
                href={`tel:+91${siteConfig.contact.whatsapp}`}
                className="flex items-center justify-center gap-3 w-full py-4 bg-white border border-slate-200 text-slate-700 hover:border-slate-300 font-semibold text-sm rounded-2xl transition-colors"
                aria-label={`Call ${siteConfig.contact.whatsappDisplay}`}
              >
                <Phone size={16} aria-hidden="true" />
                कॉल करें — {siteConfig.contact.whatsappDisplay}
              </a>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full py-4 bg-white border border-slate-200 text-slate-700 hover:border-slate-300 font-semibold text-sm rounded-2xl transition-colors"
                aria-label="Google Maps पर दिशा-निर्देश"
              >
                <ExternalLink size={16} aria-hidden="true" />
                Google Maps — दिशा-निर्देश
              </a>
            </div>
          </div>

          {/* Location Visual */}
          <div>
            <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden h-full flex flex-col">
              {/* Map placeholder */}
              <div
                className="flex-1 min-h-64 bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center relative"
                aria-hidden="true"
              >
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(15,42,92,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(15,42,92,0.3) 1px, transparent 1px)",
                    backgroundSize: "30px 30px",
                  }}
                />
                <div className="relative z-10 text-center p-6">
                  <div className="w-14 h-14 rounded-full bg-[#0F2A5C] flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <MapPin size={26} className="text-white" />
                  </div>
                  <p className="text-base font-bold text-[#0F2A5C] mb-1">
                    Jay Shankar Readymade Store
                  </p>
                  <p className="text-sm text-slate-500 mb-1">
                    Itwani Mohalli, Behind Aganwadi
                  </p>
                  <p className="text-sm text-slate-500">
                    Ward No. 10, Shahdol (MP) 484001
                  </p>
                </div>
              </div>

              <div className="p-5">
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-[#0F2A5C] hover:bg-[#0EA5E9] text-white text-sm font-bold rounded-xl transition-colors"
                  aria-label="Google Maps पर दुकान ढूंढें"
                >
                  <ExternalLink size={15} aria-hidden="true" />
                  Google Maps पर ढूंढें
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* WhatsApp message templates */}
        <div className="mt-10 bg-white border border-slate-100 rounded-2xl p-6">
          <h2 className="text-base font-bold text-[#0F2A5C] mb-4">
            WhatsApp पर कैसे पूछताछ करें?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                label: "थोक भाव पूछना",
                template: "नमस्ते, मुझे थोक भाव की जानकारी चाहिए।",
              },
              {
                label: "उत्पाद उपलब्धता",
                template: "नमस्ते, क्या [उत्पाद] उपलब्ध है? थोक भाव बताएं।",
              },
            ].map((t) => (
              <div key={t.label} className="p-4 bg-[#F8FAFC] rounded-xl border border-slate-100">
                <p className="text-xs font-bold text-[#0F2A5C] mb-2">{t.label}</p>
                <p className="text-xs text-slate-500 italic leading-relaxed text-hindi">
                  &ldquo;{t.template}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <StickyWhatsApp />
    </div>
  );
}
