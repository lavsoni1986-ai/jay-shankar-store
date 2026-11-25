"use client";

import { useState } from "react";
import { MessageCircle, Send, Sparkles, Copy, Check } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";

interface WhatsAppMessageBuilderProps {
  categories?: { name: string; nameHindi: string; slug: string }[];
}

export function WhatsAppMessageBuilder({ categories = [] }: WhatsAppMessageBuilderProps) {
  const [buyerName, setBuyerName] = useState("");
  const [shopName, setShopName] = useState("");
  const [city, setCity] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    categories.length > 0 ? categories[0].nameHindi : "थोक रेडीमेड एवं होजरी"
  );
  const [inquiryType, setInquiryType] = useState("ताज़ा थोक भाव एवं कैटलॉग");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [copied, setCopied] = useState(false);

  // Construct message text
  const greeting = "नमस्ते उत्कर्ष जी (Jay Shankar Readymade Store, Shahdol),";
  const identityLine = buyerName
    ? `मैं ${buyerName}${shopName ? ` (${shopName})` : ""}${city ? `, ${city}` : ""} से संपर्क कर रहा हूँ।`
    : `मैं ${shopName ? `${shopName}` : "एक खुदरा व्यापारी"}${city ? `, ${city}` : ""} से संपर्क कर रहा हूँ।`;

  const requestLine = `मुझे आपके "${selectedCategory}" संग्रह के थोक व्यापार के संबंध में पूछताछ करनी है।`;
  const typeLine = `पूछताछ का विषय: ${inquiryType}`;
  const notesLine = additionalNotes.trim() ? `विवरण: ${additionalNotes.trim()}` : "";
  const closingLine = "कृपया ताज़ा थोक भाव सूची, उपलब्ध डिज़ाइन और पार्सल डिस्पैच की जानकारी साझा करें। धन्यवाद।";

  const fullMessage = [greeting, identityLine, requestLine, typeLine, notesLine, closingLine]
    .filter(Boolean)
    .join("\n\n");

  const whatsappUrl = `https://wa.me/91${siteConfig.contact.whatsapp}?text=${encodeURIComponent(fullMessage)}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="bg-white border border-[#E3DED6] rounded-2xl p-6 sm:p-8 shadow-2xs">
      <div className="flex items-center gap-2 mb-2">
        <Sparkles size={16} className="text-[#B77B50]" aria-hidden="true" />
        <span className="text-xs font-bold uppercase tracking-wider text-[#B77B50]">
          त्वरित संदेश बिल्डर &bull; Instant Inquiry Builder
        </span>
      </div>
      <h2 className="text-xl sm:text-2xl font-bold text-[#242426] font-display text-hindi mb-2">
        सीधे WhatsApp पर कस्टमाइज़्ड थोक पूछताछ करें
      </h2>
      <p className="text-xs sm:text-sm text-[#686469] mb-6 text-hindi font-sans">
        अपनी दुकान और जरूरत के अनुसार विवरण चुनें। आपका संदेश स्वतः तैयार होगा और सीधे उत्कर्ष सोनी के WhatsApp पर भेजा जाएगा।
      </p>

      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        {/* Name and Shop Name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="wb-buyer-name" className="block text-xs font-bold text-[#242426] mb-1.5 text-hindi">
              आपका नाम (Buyer Name)
            </label>
            <input
              id="wb-buyer-name"
              type="text"
              value={buyerName}
              onChange={(e) => setBuyerName(e.target.value)}
              placeholder="उदा. रमेश कुमार"
              className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E3DED6] focus:border-[#B77B50] rounded-xl text-xs sm:text-sm text-[#242426] placeholder:text-[#A09B95] outline-none transition-colors"
            />
          </div>

          <div>
            <label htmlFor="wb-shop-name" className="block text-xs font-bold text-[#242426] mb-1.5 text-hindi">
              दुकान / फर्म का नाम (Shop / Firm)
            </label>
            <input
              id="wb-shop-name"
              type="text"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              placeholder="उदा. रमेश वस्त्र भंडार"
              className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E3DED6] focus:border-[#B77B50] rounded-xl text-xs sm:text-sm text-[#242426] placeholder:text-[#A09B95] outline-none transition-colors"
            />
          </div>
        </div>

        {/* City and Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="wb-city" className="block text-xs font-bold text-[#242426] mb-1.5 text-hindi">
              आपका शहर / कस्बा (City / District)
            </label>
            <input
              id="wb-city"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="उदा. अनूपपुर / शहडोल / उमरिया"
              className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E3DED6] focus:border-[#B77B50] rounded-xl text-xs sm:text-sm text-[#242426] placeholder:text-[#A09B95] outline-none transition-colors"
            />
          </div>

          <div>
            <label htmlFor="wb-category" className="block text-xs font-bold text-[#242426] mb-1.5 text-hindi">
              रुचि की थोक श्रेणी (Category)
            </label>
            <select
              id="wb-category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E3DED6] focus:border-[#B77B50] rounded-xl text-xs sm:text-sm text-[#242426] outline-none transition-colors cursor-pointer"
            >
              {categories.length > 0 ? (
                categories.map((c) => (
                  <option key={c.slug} value={c.nameHindi}>
                    {c.nameHindi} ({c.name})
                  </option>
                ))
              ) : (
                <>
                  <option value="Hosiery (होज़री)">Hosiery (होज़री)</option>
                  <option value="Kolkata Readymade">Kolkata Readymade (कोलकाता रेडीमेड)</option>
                  <option value="Rainwear & Umbrella">Rainwear & Umbrella (रेनवेयर व छाता)</option>
                  <option value="Saree & Dress Material">Saree & Dress Material</option>
                  <option value="Newar & Tripal">Newar & Tripal (नेवार व त्रिपाल)</option>
                </>
              )}
            </select>
          </div>
        </div>

        {/* Inquiry Type */}
        <div>
          <label htmlFor="wb-inquiry-type" className="block text-xs font-bold text-[#242426] mb-1.5 text-hindi">
            पूछताछ का मुख्य विषय (Inquiry Purpose)
          </label>
          <select
            id="wb-inquiry-type"
            value={inquiryType}
            onChange={(e) => setInquiryType(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E3DED6] focus:border-[#B77B50] rounded-xl text-xs sm:text-sm text-[#242426] outline-none transition-colors cursor-pointer"
          >
            <option value="ताज़ा थोक भाव एवं कैटलॉग">ताज़ा थोक भाव सूची एवं डिजिटल कैटलॉग</option>
            <option value="नया थोक पार्सल ऑर्डर">नया थोक पार्सल ऑर्डर बुकिंग</option>
            <option value="न्यूनतम ऑर्डर मात्रा (MOQ) एवं डिलीवरी">न्यूनतम पार्सल मात्रा (MOQ) एवं डिस्पैच पूछताछ</option>
            <option value="दुकान पर प्रत्यक्ष मुलाकात व निरीक्षण">दुकान पर प्रत्यक्ष मुलाकात व माल निरीक्षण</option>
          </select>
        </div>

        {/* Additional Notes */}
        <div>
          <label htmlFor="wb-notes" className="block text-xs font-bold text-[#242426] mb-1.5 text-hindi">
            अतिरिक्त विवरण या आवश्यक साइज़ / मात्रा (Optional Notes)
          </label>
          <textarea
            id="wb-notes"
            rows={2}
            value={additionalNotes}
            onChange={(e) => setAdditionalNotes(e.target.value)}
            placeholder="उदा. 2 पार्सल होजरी माल चाहिए, डिलीवरी समय बताएं..."
            className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#E3DED6] focus:border-[#B77B50] rounded-xl text-xs sm:text-sm text-[#242426] placeholder:text-[#A09B95] outline-none transition-colors resize-none font-sans"
          />
        </div>

        {/* Live Preview Box */}
        <div className="mt-5 pt-4 border-t border-[#E3DED6]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-[#686469] uppercase tracking-wider">
              संदेश पूर्वावलोकन &bull; Message Preview
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#B77B50] hover:text-[#242426] transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check size={12} className="text-emerald-600" />
                  <span className="text-emerald-600">कॉपी हुआ</span>
                </>
              ) : (
                <>
                  <Copy size={12} />
                  <span>टेक्स्ट कॉपी करें</span>
                </>
              )}
            </button>
          </div>

          <div className="p-3.5 bg-[#FAF8F5] border border-[#E3DED6] rounded-xl text-xs text-[#39383B] leading-relaxed font-sans whitespace-pre-line max-h-40 overflow-y-auto">
            {fullMessage}
          </div>
        </div>

        {/* Primary Action Button */}
        <div className="pt-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-sm sm:text-base rounded-xl transition-all shadow-md active:scale-[0.98]"
            aria-label="यह संदेश WhatsApp पर भेजें"
          >
            <MessageCircle size={18} className="fill-current" aria-hidden="true" />
            <span>WhatsApp पर थोक संदेश भेजें</span>
            <Send size={15} aria-hidden="true" />
          </a>
          <p className="text-[11px] text-center text-[#686469] mt-2 text-hindi">
            क्लिक करते ही आधिकारिक WhatsApp चैट खुलेगी &bull; कोई फॉर्म डेटा स्टोर नहीं किया जाता
          </p>
        </div>
      </form>
    </div>
  );
}
