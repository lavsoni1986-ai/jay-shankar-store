import { MessageSquare, Package, Star, MapPin, Building2 } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

const reasons = [
  {
    icon: Package,
    title: "विस्तृत उत्पाद श्रृंखला",
    titleEn: "Wide Wholesale Range",
    description:
      "होजरी से लेकर कोलकाता रेडीमेड, रेनवेयर, छाता, नेवार एवं त्रिपाल — संपूर्ण थोक सामग्री एक ही छत के नीचे।",
  },
  {
    icon: Star,
    title: "प्रमुख ब्रांड्स का विश्वास",
    titleEn: "Top Leading Brands",
    description:
      "Lux, Essdee, Zeel Rainwear, Sharmeelee, Pooja Ragenee, Arman — प्रतिष्ठित ब्रांड्स की मूल गुणवत्ता।",
  },
  {
    icon: MessageSquare,
    title: "त्वरित WhatsApp पूछताछ",
    titleEn: "Direct WhatsApp Orders",
    description:
      "सीधे मोबाइल से थोक भाव, डिज़ाइन एवं न्यूनतम ऑर्डर (MOQ) की स्पष्ट जानकारी — त्वरित प्रतिक्रिया।",
  },
  {
    icon: MapPin,
    title: "शहडोल का स्थानीय व्यापार",
    titleEn: "Local Shahdol Presence",
    description:
      "इटवारी मोहल्ला, शहडोल (म.प्र.) में स्थित — स्थानीय डीलरों और दुकानों के लिए प्रत्यक्ष और सुगम संपर्क।",
  },
  {
    icon: Building2,
    title: "100% थोक केंद्रित नीति",
    titleEn: "Wholesale & B2B Focus",
    description:
      "हमारा प्राथमिक उद्देश्य खुदरा व्यापारियों व थोक खरीदारों को सर्वोत्तम प्रतिस्पर्धी मूल्य प्रदान करना है।",
  },
];

export function WhyJayShankar() {
  return (
    <section
      className="py-14 sm:py-16 lg:py-20 bg-[#F3EFE8] border-t border-b border-[#E3DED6]"
      aria-labelledby="why-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          titleHindi="व्यापारिक विश्वास"
          title="Jay Shankar Store ही क्यों?"
          subtitle="शहडोल और आसपास के क्षेत्रों के वस्त्र व्यापारियों के लिए एक विश्वसनीय थोक सप्लायर की 5 प्रमुख पहचान।"
          id="why-heading"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5">
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <div
                key={reason.titleEn}
                className="flex flex-col items-start p-5 sm:p-6 bg-white rounded-2xl border border-[#D8C9B7]/70 hover:border-[#B77B50] hover:shadow-[0_8px_24px_rgba(36,36,38,0.06)] transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#242426] flex items-center justify-center mb-4 group-hover:bg-[#B77B50] transition-colors duration-200 shadow-xs">
                  <Icon size={22} className="text-white transition-colors" aria-hidden="true" />
                </div>
                <p className="text-[11px] font-bold text-[#B77B50] uppercase tracking-wider mb-1">
                  {reason.titleEn}
                </p>
                <h3 className="text-base font-bold text-[#242426] mb-2 leading-snug text-hindi group-hover:text-[#B77B50] transition-colors">
                  {reason.title}
                </h3>
                <p className="text-xs sm:text-[13px] text-[#686469] leading-relaxed text-hindi">
                  {reason.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
