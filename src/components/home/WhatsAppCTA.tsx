import { MessageCircle, Phone } from "lucide-react";
import { getGeneralEnquiryUrl, getBulkEnquiryUrl, WHATSAPP_CONTACT_NAME, WHATSAPP_DISPLAY_NUMBER } from "@/lib/whatsapp";
import { siteConfig } from "@/data/siteConfig";

export function WhatsAppCTA() {
  return (
    <section
      className="py-16 lg:py-20 bg-[#0F2A5C] relative overflow-hidden"
      aria-labelledby="whatsapp-cta-heading"
    >
      {/* Background accent */}
      <div
        className="absolute inset-0 opacity-10"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 10% 50%, #0EA5E9 0%, transparent 50%), radial-gradient(circle at 90% 50%, #25D366 0%, transparent 40%)",
        }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#25D366] mb-6 shadow-lg" aria-hidden="true">
          <MessageCircle size={32} className="text-white" />
        </div>

        {/* Heading */}
        <h2
          id="whatsapp-cta-heading"
          className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight text-hindi"
        >
          थोक ऑर्डर या पूछताछ के लिए
          <br />
          <span className="text-[#25D366]">सीधे WhatsApp करें</span>
        </h2>

        {/* Contact person */}
        <p className="text-white/70 text-base mb-2">
          {WHATSAPP_CONTACT_NAME} —{" "}
          <span className="font-bold text-white">{WHATSAPP_DISPLAY_NUMBER}</span>
        </p>
        <p className="text-white/50 text-sm mb-8 text-hindi">
          थोक भाव, उपलब्ध डिज़ाइन, MOQ और डिलीवरी की जानकारी के लिए WhatsApp करें
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={getGeneralEnquiryUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-base rounded-2xl transition-colors shadow-xl"
            aria-label="WhatsApp पर थोक पूछताछ करें"
          >
            <MessageCircle size={22} aria-hidden="true" />
            WhatsApp पर थोक पूछताछ करें
          </a>
          <a
            href={`tel:+91${siteConfig.contact.whatsapp}`}
            className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold text-base rounded-2xl transition-colors"
            aria-label={`Call ${siteConfig.contact.whatsappDisplay}`}
          >
            <Phone size={20} aria-hidden="true" />
            कॉल करें
          </a>
        </div>

        {/* Quick enquiry links */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {[
            { label: "होजरी थोक", cat: "Hosiery" },
            { label: "कोलकाता रेडीमेड", cat: "Kolkata Readymade" },
            { label: "छाता थोक", cat: "Umbrella" },
            { label: "रेनकोट थोक", cat: "Raincoat" },
          ].map(({ label, cat }) => (
            <a
              key={cat}
              href={getBulkEnquiryUrl(cat)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white/80 rounded-full transition-colors text-hindi"
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
