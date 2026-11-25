import { MessageCircle, Phone, ArrowUpRight } from "lucide-react";
import { getGeneralEnquiryUrl, getBulkEnquiryUrl, WHATSAPP_CONTACT_NAME, WHATSAPP_DISPLAY_NUMBER } from "@/lib/whatsapp";
import { siteConfig } from "@/data/siteConfig";

export function WhatsAppCTA() {
  return (
    <section
      className="relative py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-[#242426] via-[#212123] to-[#1A1A1B] text-white overflow-hidden border-t border-b border-[#B77B50]/25"
      aria-labelledby="whatsapp-cta-heading"
    >
      {/* Background accents */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(183,123,80,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(183,123,80,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#B77B50]/5 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* WhatsApp Icon Circle */}
        <div
          className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-[#25D366] mb-6 shadow-xl shadow-[#25D366]/20 ring-4 ring-white/10"
          aria-hidden="true"
        >
          <MessageCircle size={36} className="text-white" />
        </div>

        {/* Heading */}
        <p className="text-xs sm:text-sm font-bold text-[#D4A37F] uppercase tracking-widest mb-2">
          DIRECT WHOLESALE DESK
        </p>
        <h2
          id="whatsapp-cta-heading"
          className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-3 leading-tight text-hindi font-display"
        >
          थोक ऑर्डर या मूल्य सूची के लिए
          <br />
          <span className="text-[#25D366]">सीधे WhatsApp पर संपर्क करें</span>
        </h2>

        {/* Contact info */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#39383B] border border-white/15 mb-3 shadow-2xs">
          <span className="text-xs sm:text-sm text-[#D8C9B7]">
            संपर्क सूत्र: <strong className="text-white">{WHATSAPP_CONTACT_NAME}</strong>
          </span>
          <span className="text-white/40">&bull;</span>
          <span className="text-xs sm:text-sm font-bold text-white tracking-wide">
            {WHATSAPP_DISPLAY_NUMBER}
          </span>
        </div>

        <p className="text-[#D8C9B7] text-xs sm:text-sm mb-8 max-w-xl mx-auto text-hindi leading-relaxed">
          न्यूनतम ऑर्डर मात्रा (MOQ), थोक दरें, नए डिज़ाइन और माल की डिलीवरी से संबंधित संपूर्ण जानकारी के लिए सीधे चैट करें।
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <a
            href={getGeneralEnquiryUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-sm sm:text-base rounded-xl transition-all shadow-xl shadow-[#25D366]/20 active:scale-[0.98]"
            aria-label="WhatsApp पर थोक पूछताछ करें"
          >
            <MessageCircle size={22} aria-hidden="true" />
            <span>WhatsApp पर थोक पूछताछ</span>
          </a>
          <a
            href={`tel:+91${siteConfig.contact.whatsapp}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-[#39383B] hover:bg-[#48464B] border border-[#B77B50]/40 hover:border-[#B77B50] text-white font-semibold text-sm sm:text-base rounded-xl transition-all"
            aria-label={`Call ${siteConfig.contact.whatsappDisplay}`}
          >
            <Phone size={18} aria-hidden="true" />
            <span>कॉल करें ({siteConfig.contact.whatsappDisplay})</span>
          </a>
        </div>

        {/* Quick category enquiry chips */}
        <div className="mt-10 pt-8 border-t border-white/10">
          <p className="text-xs text-[#D8C9B7] mb-3 uppercase tracking-wider font-semibold">
            त्वरित थोक पूछताछ:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            {[
              { label: "होजरी एवं इनरवियर", cat: "Hosiery" },
              { label: "कोलकाता रेडीमेड", cat: "Kolkata Readymade" },
              { label: "छाता थोक", cat: "Umbrella" },
              { label: "रेनकोट थोक", cat: "Raincoat" },
              { label: "नेवार एवं त्रिपाल", cat: "Tripal" },
            ].map(({ label, cat }) => (
              <a
                key={cat}
                href={getBulkEnquiryUrl(cat)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs px-3.5 py-1.5 bg-[#39383B]/80 hover:bg-[#48464B] border border-white/15 hover:border-[#B77B50] text-[#D8C9B7] rounded-lg transition-colors text-hindi"
              >
                <span>{label}</span>
                <ArrowUpRight size={12} className="text-[#D4A37F]" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
