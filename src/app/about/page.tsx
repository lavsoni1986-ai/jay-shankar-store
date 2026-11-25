import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, MessageCircle, Package, Star, Store, Phone, CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { getCategories } from "@/lib/db/categories";
import { getBrands } from "@/lib/db/brands";
import { getGeneralEnquiryUrl } from "@/lib/whatsapp";
import { StickyWhatsApp } from "@/components/ui/StickyWhatsApp";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "हमारे बारे में | Jay Shankar Readymade Store — Shahdol (M.P.)",
  description:
    "Jay Shankar Readymade Store के बारे में जानें — शहडोल, MP का थोक रेडीमेड और होजरी व्यापार। हमारे उत्पाद, ब्रांड और थोक सेवाओं के बारे में।",
  alternates: {
    canonical: `${siteConfig.url}/about`,
  },
};

export default async function AboutPage() {
  const [allCategories, allBrands] = await Promise.all([
    getCategories(),
    getBrands(),
  ]);

  const coreCats = allCategories.filter((c) => c.isCore);
  const generalWhatsAppUrl = getGeneralEnquiryUrl();

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
                About
              </li>
            </ol>
          </nav>

          {/* Kicker badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#39383B] border border-[#B77B50]/40 text-[#D4A37F] text-xs font-bold tracking-widest uppercase mb-4">
            <Store size={13} className="text-[#B77B50]" aria-hidden="true" />
            <span>व्यापारिक परिचय &bull; MERCHANT PROFILE</span>
          </div>

          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight font-display text-hindi mb-3">
              जय शंकर रेडीमेड स्टोर्स
            </h1>
            <p className="text-sm sm:text-base text-[#D8C9B7] leading-relaxed text-hindi font-sans">
              शहडोल (मध्यप्रदेश) में स्थित थोक रेडीमेड गारमेंट्स, होजरी एवं मौसमी वस्त्रों का प्रतिष्ठित व्यावसायिक प्रतिष्ठान। विंध्य क्षेत्र के खुदरा व्यापारियों व कपड़ा दुकानों के लिए विश्वसनीय थोक आपूर्ति।
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Merchant Introduction Narrative */}
        <section className="bg-white border border-[#E3DED6] rounded-2xl p-6 sm:p-10 mb-10 shadow-2xs">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#B77B50]">
              प्रतिष्ठान परिचय &bull; About The Store
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#242426] font-display text-hindi mb-5">
            शहडोल में थोक वस्त्र एवं रेडीमेड व्यापार
          </h2>

          <div className="space-y-4 text-sm sm:text-base text-[#686469] leading-relaxed text-hindi font-sans">
            <p>
              <strong className="text-[#242426]">Jay Shankar Readymade Store</strong> शहडोल, मध्यप्रदेश में स्थित एक थोक रेडीमेड और होजरी व्यापारिक प्रतिष्ठान है। हम क्षेत्रीय खुदरा दुकानदारों, व्यापारियों और कपड़ा विक्रेताओं को व्यापारिक दरों पर उच्च गुणवत्ता वाले परिधान एवं उपयोगी वस्त्र उपलब्ध कराते हैं।
            </p>
            <p>
              हमारा मुख्य ध्यान <strong>B2B थोक व्यापार</strong> पर है। हमारी विस्तृत उत्पाद श्रृंखला में Hosiery, Kolkata Readymade Garments, Umbrella, Rainwear, Newar, Tripal, Jhola एवं Panni जैसी दैनिक व मौसमी मांग की श्रेणियाँ शामिल हैं।
            </p>
            <p>
              हमारे पास Lux, Essdee, Zeel Rainwear, Sharmeelee, Pooja Ragenee, Arman जैसे प्रमुख व लोकप्रिय ब्रांड्स के उत्पाद उपलब्ध हैं, जिन्हें खुदरा व्यापारी आसानी से अपनी दुकानों पर रख सकते हैं।
            </p>
          </div>

          {/* Core Values Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-8 pt-6 border-t border-[#E3DED6]">
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#242426] font-semibold">
              <CheckCircle2 size={16} className="text-[#B77B50] shrink-0" />
              <span>पारदर्शी थोक व्यापार</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#242426] font-semibold">
              <CheckCircle2 size={16} className="text-[#B77B50] shrink-0" />
              <span>शहडोल स्थानीय प्रतिष्ठान</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#242426] font-semibold">
              <CheckCircle2 size={16} className="text-[#B77B50] shrink-0" />
              <span>सीधा WhatsApp संवाद</span>
            </div>
          </div>
        </section>

        {/* What We Offer / Key Wholesale Features */}
        <section className="mb-10" aria-labelledby="offerings-heading">
          <div className="mb-6">
            <h2 id="offerings-heading" className="text-xl sm:text-2xl font-bold text-[#242426] font-display text-hindi">
              व्यापारिक विशेषताएं एवं सेवाएँ
            </h2>
            <p className="text-xs sm:text-sm text-[#686469] text-hindi mt-1">
              व्यापारियों और खुदरा दुकानों के लिए तैयार की गई थोक सुविधाएँ
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {[
              {
                icon: Package,
                title: "विस्तृत थोक श्रृंखला",
                desc: "होजरी, रेडीमेड, रेनवेयर, छाता, नेवार, त्रिपाल, झोला और दैनिक मांग की कई श्रेणियाँ एक ही स्थान पर।",
              },
              {
                icon: Star,
                title: "प्रमुख ब्रांड्स का संग्रह",
                desc: "Lux, Essdee, Zeel Rainwear, Sharmeelee, Pooja Ragenee, Arman जैसे प्रतिष्ठित ब्रांड्स की उपलब्धता।",
              },
              {
                icon: Store,
                title: "थोक पार्सल आपूर्ति",
                desc: "खुदरा विक्रेताओं और ग्रामीण-शहरी दुकानदारों के लिए पार्सल डिस्पैच व थोक ऑर्डर की सरल व्यवस्था।",
              },
              {
                icon: MessageCircle,
                title: "सीधी डिजिटल पूछताछ",
                desc: "WhatsApp के माध्यम से सीधे उत्कर्ष सोनी से ताज़ा थोक भाव, डिज़ाइन और उपलब्धता की जानकारी।",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex gap-4 p-5 sm:p-6 bg-white border border-[#E3DED6] rounded-2xl shadow-2xs hover:border-[#B77B50]/60 transition-colors"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#F3EFE8] border border-[#D8C9B7] flex items-center justify-center shrink-0">
                    <Icon size={20} className="text-[#B77B50]" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-[#242426] mb-1 text-hindi">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#686469] leading-relaxed text-hindi font-sans">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Wholesale Product Categories Chips */}
        <section className="bg-white border border-[#E3DED6] rounded-2xl p-6 sm:p-8 mb-10 shadow-2xs" aria-labelledby="cats-heading">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 id="cats-heading" className="text-lg sm:text-xl font-bold text-[#242426] font-display text-hindi">
                मुख्य थोक श्रेणियाँ
              </h2>
              <p className="text-xs text-[#686469] text-hindi mt-0.5">
                हमारे नियमित थोक व्यापार में उपलब्ध प्राथमिक खंड
              </p>
            </div>
            <Link
              href="/categories"
              className="text-xs font-bold text-[#B77B50] hover:text-[#242426] underline transition-colors"
            >
              सभी श्रेणियाँ &rarr;
            </Link>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {coreCats.map((cat) => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className="px-3.5 py-1.5 bg-[#F3EFE8] border border-[#D8C9B7] hover:border-[#B77B50] rounded-xl text-xs sm:text-sm font-semibold text-[#242426] hover:text-[#B77B50] transition-colors text-hindi"
              >
                {cat.nameHindi} ({cat.name})
              </Link>
            ))}
          </div>
        </section>

        {/* Brands Availability Chips */}
        <section className="bg-white border border-[#E3DED6] rounded-2xl p-6 sm:p-8 mb-10 shadow-2xs" aria-labelledby="brands-heading">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 id="brands-heading" className="text-lg sm:text-xl font-bold text-[#242426] font-display text-hindi">
                उपलब्ध प्रमुख ब्रांड्स
              </h2>
              <p className="text-xs text-[#686469] text-hindi mt-0.5">
                थोक कैटलॉग में उपलब्ध ब्रांड्स
              </p>
            </div>
            <Link
              href="/brands"
              className="text-xs font-bold text-[#B77B50] hover:text-[#242426] underline transition-colors"
            >
              सभी ब्रांड &rarr;
            </Link>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {allBrands.map((brand) => (
              <Link
                key={brand.slug}
                href={`/brands/${brand.slug}`}
                className="px-3.5 py-1.5 bg-[#F3EFE8] border border-[#D8C9B7] hover:border-[#B77B50] rounded-xl text-xs sm:text-sm font-semibold text-[#242426] hover:text-[#B77B50] transition-colors"
              >
                {brand.name}
              </Link>
            ))}
          </div>
        </section>

        {/* Verified Physical Location */}
        <section className="bg-white border border-[#E3DED6] rounded-2xl p-6 sm:p-8 mb-10 shadow-2xs">
          <div className="flex items-center gap-2.5 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#B77B50]">
              दुकान का पता &bull; Store Location
            </span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-[#242426] font-display text-hindi mb-4">
            हमारा स्थानीय पता
          </h2>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#F3EFE8] border border-[#D8C9B7] flex items-center justify-center shrink-0 mt-1">
              <MapPin size={20} className="text-[#B77B50]" aria-hidden="true" />
            </div>
            <div>
              <p className="text-base font-bold text-[#242426]">{siteConfig.name}</p>
              <address className="not-italic text-sm text-[#686469] mt-1 leading-relaxed text-hindi font-sans">
                {siteConfig.address.full}
              </address>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#B77B50] hover:text-[#242426] underline transition-colors"
                >
                  <span>संपर्क एवं दिशा-निर्देश देखें &rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Wholesale CTA Banner */}
        <section className="bg-[#242426] border border-[#39383B] rounded-2xl p-6 sm:p-10 text-center relative overflow-hidden shadow-md">
          <div 
            className="absolute -top-24 right-0 w-80 h-80 bg-[#B77B50]/15 rounded-full blur-3xl pointer-events-none" 
            aria-hidden="true" 
          />

          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 text-hindi font-display">
            थोक ऑर्डर या व्यापारिक पूछताछ के लिए संपर्क करें
          </h2>
          <p className="text-xs sm:text-sm text-[#D8C9B7] mb-6 max-w-xl mx-auto text-hindi font-sans">
            संपर्क व्यक्ति: {siteConfig.contact.contactPerson} &bull; दूरभाष/WhatsApp: {siteConfig.contact.whatsappDisplay}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={generalWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold text-sm sm:text-base rounded-xl transition-all shadow-md active:scale-[0.98]"
              aria-label="WhatsApp पर थोक पूछताछ करें"
            >
              <MessageCircle size={18} className="fill-current" aria-hidden="true" />
              <span>WhatsApp पर संपर्क करें</span>
            </a>

            <a
              href={`tel:+91${siteConfig.contact.whatsapp}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#39383B] hover:bg-[#47454A] border border-[#504E53] text-[#F3EFE8] font-bold text-sm rounded-xl transition-colors"
              aria-label={`सीधा कॉल करें: ${siteConfig.contact.whatsappDisplay}`}
            >
              <Phone size={16} className="text-[#D4A37F]" aria-hidden="true" />
              <span>कॉल करें ({siteConfig.contact.whatsappDisplay})</span>
            </a>
          </div>
        </section>
      </main>

      <StickyWhatsApp />
    </div>
  );
}
