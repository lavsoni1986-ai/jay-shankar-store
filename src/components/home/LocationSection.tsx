import { MapPin, ExternalLink, Phone, MessageCircle } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { getGoogleMapsUrl } from "@/lib/utils";
import { getGeneralEnquiryUrl } from "@/lib/whatsapp";

export function LocationSection() {
  const mapsUrl = getGoogleMapsUrl(siteConfig.address.full);

  return (
    <section
      id="location"
      className="py-14 sm:py-16 lg:py-20 bg-white scroll-mt-20 lg:scroll-mt-24"
      aria-labelledby="location-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left Column: Store Details & Actions */}
          <div>
            <p className="text-xs sm:text-sm font-bold text-[#B77B50] uppercase tracking-widest mb-2">
              हमारा स्थान &bull; STORE LOCATION
            </p>
            <h2
              id="location-heading"
              className="text-2xl sm:text-3xl font-bold text-[#242426] mb-3 leading-tight text-hindi font-display scroll-mt-28 lg:scroll-mt-32"
            >
              प्रतिष्ठान पर पधारें — शहडोल (म.प्र.)
            </h2>
            <div className="w-12 h-1 rounded-full bg-[#B77B50] mb-6" aria-hidden="true" />

            <p className="text-sm sm:text-base text-[#686469] mb-6 leading-relaxed text-hindi">
              शहडोल के मुख्य व्यापारिक क्षेत्र में स्थित। यदि आप व्यक्तिगत रूप से आकर वैरायटी देखना चाहते हैं या 
              थोक ऑर्डर देना चाहते हैं, तो हमारे प्रतिष्ठान पर आपका हार्दिक स्वागत है।
            </p>

            {/* Address Box */}
            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#F8F5F0] border border-[#E3DED6] mb-5">
              <div className="w-11 h-11 rounded-xl bg-[#242426] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                <MapPin size={20} className="text-[#B77B50]" aria-hidden="true" />
              </div>
              <div>
                <p className="text-base font-bold text-[#242426] mb-1">
                  {siteConfig.name}
                </p>
                <address className="not-italic text-xs sm:text-sm text-[#686469] leading-relaxed">
                  {siteConfig.address.street},<br />
                  {siteConfig.address.city}, {siteConfig.address.state} — {siteConfig.address.pincode}
                </address>
              </div>
            </div>

            {/* Direct Contact Box */}
            <div className="flex items-center gap-3.5 p-4 rounded-2xl bg-[#F8F5F0] border border-[#E3DED6] mb-8">
              <div className="w-11 h-11 rounded-xl bg-[#25D366] flex items-center justify-center shrink-0 shadow-xs">
                <Phone size={18} className="text-white" aria-hidden="true" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-[#686469] mb-0.5">
                  सीधा संपर्क: <strong className="text-[#242426]">{siteConfig.contact.contactPerson}</strong>
                </p>
                <a
                  href={`tel:+91${siteConfig.contact.whatsapp}`}
                  className="text-base sm:text-lg font-bold text-[#242426] hover:text-[#B77B50] transition-colors"
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
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-[#242426] hover:bg-[#39383B] text-white text-sm font-bold rounded-xl transition-all shadow-md active:scale-[0.98] border border-[#B77B50]/30"
                aria-label="Google Maps पर दिशा-निर्देश देखें"
              >
                <ExternalLink size={16} aria-hidden="true" />
                <span>Google Maps पर रास्ता देखें</span>
              </a>
              <a
                href={getGeneralEnquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-[#F3EFE8] hover:bg-[#EAE4DC] border border-[#D8C9B7] text-[#242426] text-sm font-bold rounded-xl transition-all"
                aria-label="WhatsApp पर संपर्क करें"
              >
                <MessageCircle size={16} className="text-[#25D366]" aria-hidden="true" />
                <span>WhatsApp पर संपर्क</span>
              </a>
            </div>
          </div>

          {/* Right Column: Visual Map Card */}
          <div className="relative">
            <div className="bg-white border border-[#D8C9B7]/80 rounded-3xl overflow-hidden shadow-[0_8px_30px_rgba(36,36,38,0.06)] hover:border-[#B77B50] transition-all duration-300">
              {/* Map visual card header */}
              <div
                className="h-60 bg-gradient-to-br from-[#242426] via-[#333235] to-[#1C1C1E] text-white flex flex-col items-center justify-center relative p-6 text-center"
                aria-hidden="true"
              >
                <div
                  className="absolute inset-0 opacity-[0.05]"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(183,123,80,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(183,123,80,0.6) 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                  }}
                />
                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-[#B77B50] flex items-center justify-center mx-auto mb-3 shadow-lg text-white">
                    <MapPin size={26} />
                  </div>
                  <p className="text-base font-bold text-white tracking-wide font-display">
                    Jay Shankar Readymade Store
                  </p>
                  <p className="text-xs text-[#D8C9B7] mt-1">
                    Shahdol, Madhya Pradesh &bull; 484001
                  </p>
                  <span className="inline-block mt-3 text-[10px] font-bold text-[#D4A37F] bg-white/10 px-2.5 py-1 rounded-full uppercase tracking-widest border border-white/15">
                    थोक वस्त्र प्रतिष्ठान
                  </span>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-5 sm:p-6 bg-white border-t border-[#E3DED6]">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm sm:text-base font-bold text-[#242426]">
                    इटवारी मोहल्ला, आंगनवाड़ी के पीछे
                  </h3>
                  <span className="text-[11px] font-bold text-[#B77B50] bg-[#F8F5F0] px-2 py-0.5 rounded border border-[#D8C9B7]">
                    वार्ड नं. 10
                  </span>
                </div>
                <p className="text-xs text-[#686469] mb-5 leading-relaxed">
                  शहडोल (म.प्र.) 484001 &bull; रेलवे स्टेशन व मुख्य बाजार से सुगम मार्ग
                </p>
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#242426] hover:text-[#B77B50] transition-colors group"
                  aria-label="Get Directions on Google Maps"
                >
                  <span>Google Maps पर लोकेशन खोलें</span>
                  <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#B77B50]" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
