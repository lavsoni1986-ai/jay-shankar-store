import { MapPin, ExternalLink, Phone, MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { getGoogleMapsUrl } from "@/lib/utils";
import { getGeneralEnquiryUrl } from "@/lib/whatsapp";

export function LocationSection() {
  const mapsUrl = getGoogleMapsUrl(siteConfig.address.full);

  return (
    <section
      className="py-16 lg:py-20 bg-[#F8FAFC]"
      aria-labelledby="location-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Text Content */}
          <div>
            <p className="text-sm font-semibold text-[#0EA5E9] uppercase tracking-widest mb-2">
              हमारा स्थान
            </p>
            <h2
              id="location-heading"
              className="text-2xl sm:text-3xl font-bold text-[#0F2A5C] mb-4 leading-tight"
            >
              हमें ढूंढें — शहडोल
            </h2>
            <div className="w-12 h-1 rounded-full bg-[#0EA5E9] mb-6" aria-hidden="true" />

            {/* Address */}
            <div className="flex items-start gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-[#0F2A5C] flex items-center justify-center shrink-0 mt-0.5">
                <MapPin size={18} className="text-white" aria-hidden="true" />
              </div>
              <div>
                <p className="text-base font-bold text-[#0F2A5C] mb-1">
                  {siteConfig.name}
                </p>
                <address className="not-italic text-sm text-slate-600 leading-relaxed">
                  {siteConfig.address.street},<br />
                  {siteConfig.address.city}, {siteConfig.address.state} {siteConfig.address.pincode}
                </address>
              </div>
            </div>

            {/* Contact */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-[#25D366] flex items-center justify-center shrink-0">
                <Phone size={16} className="text-white" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-0.5">
                  {siteConfig.contact.contactPerson} — WhatsApp / Call
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

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#0F2A5C] hover:bg-[#0EA5E9] text-white text-sm font-semibold rounded-xl transition-colors"
                aria-label="Google Maps पर दिशा-निर्देश देखें"
              >
                <ExternalLink size={16} aria-hidden="true" />
                Google Maps पर देखें
              </a>
              <a
                href={getGeneralEnquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#25D366] hover:bg-[#128C7E] text-white text-sm font-semibold rounded-xl transition-colors"
                aria-label="WhatsApp पर संपर्क करें"
              >
                <MessageCircle size={16} aria-hidden="true" />
                WhatsApp पर संपर्क करें
              </a>
            </div>
          </div>

          {/* Map placeholder / info card */}
          <div className="relative">
            <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(15,42,92,0.08)]">
              {/* Map visual placeholder */}
              <div
                className="h-56 bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center relative"
                aria-hidden="true"
              >
                <div className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: "linear-gradient(rgba(15,42,92,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(15,42,92,0.3) 1px, transparent 1px)",
                    backgroundSize: "30px 30px",
                  }}
                />
                <div className="relative z-10 text-center">
                  <div className="w-12 h-12 rounded-full bg-[#0F2A5C] flex items-center justify-center mx-auto mb-2 shadow-lg">
                    <MapPin size={22} className="text-white" />
                  </div>
                  <p className="text-sm font-semibold text-[#0F2A5C]">Jay Shankar Readymade Store</p>
                  <p className="text-xs text-slate-500">Shahdol, Madhya Pradesh</p>
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-sm font-bold text-[#0F2A5C] mb-1">
                  Itwani Mohalli, Behind Aganwadi
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  Ward No. 10, Shahdol (MP) 484001
                </p>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-semibold text-[#0EA5E9] hover:text-[#0284C7] transition-colors"
                  aria-label="Get Directions on Google Maps"
                >
                  <ExternalLink size={14} aria-hidden="true" />
                  दिशा-निर्देश प्राप्त करें (Google Maps)
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
