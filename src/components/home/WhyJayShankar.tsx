import { MessageSquare, Package, Star, MapPin, Smartphone } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";

const reasons = [
  {
    icon: Package,
    title: "विस्तृत उत्पाद श्रृंखला",
    titleEn: "Wide Product Range",
    description:
      "होजरी से लेकर रेनवेयर, कोलकाता रेडीमेड से त्रिपाल तक — एक ही स्थान पर थोक आपूर्ति।",
  },
  {
    icon: Star,
    title: "प्रमुख ब्रांड उपलब्ध",
    titleEn: "Multiple Brands",
    description:
      "Lux, Essdee, Zeel Rainwear, Sharmeelee, Pooja Ragenee, Arman — 6 प्रमुख ब्रांड।",
  },
  {
    icon: MessageSquare,
    title: "WhatsApp ऑर्डर",
    titleEn: "Easy WhatsApp Ordering",
    description:
      "सीधे WhatsApp पर थोक ऑर्डर और पूछताछ — आसान, तेज़ और सुविधाजनक।",
  },
  {
    icon: MapPin,
    title: "स्थानीय व्यापार",
    titleEn: "Local Shahdol Business",
    description:
      "शहडोल, MP में स्थित — स्थानीय डीलरों और व्यापारियों के लिए सुलभ थोक सप्लायर।",
  },
  {
    icon: Smartphone,
    title: "थोक केंद्रित",
    titleEn: "Wholesale Focused",
    description:
      "हमारा प्राथमिक व्यवसाय थोक व्यापार है — डीलर, रिटेलर और व्यापारियों के लिए।",
  },
];

export function WhyJayShankar() {
  return (
    <section
      className="py-16 lg:py-20 bg-[#F8FAFC]"
      aria-labelledby="why-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Jay Shankar क्यों?"
          titleHindi="Why Choose Us"
          subtitle="हमारे थोक व्यवसाय की खासियतें — जो हमें शहडोल में विश्वसनीय बनाती हैं।"
          id="why-heading"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <div
                key={reason.titleEn}
                className="flex flex-col items-start p-5 bg-[#F8FAFC] rounded-2xl border border-slate-100 hover:border-[#0EA5E9] hover:shadow-[0_4px_16px_rgba(14,165,233,0.08)] transition-all duration-200 group"
              >
                <div className="w-11 h-11 rounded-xl bg-[#0F2A5C] flex items-center justify-center mb-4 group-hover:bg-[#0EA5E9] transition-colors">
                  <Icon size={20} className="text-white" aria-hidden="true" />
                </div>
                <h3 className="text-sm font-bold text-[#0F2A5C] mb-1 leading-snug text-hindi">
                  {reason.title}
                </h3>
                <p className="text-xs text-[#0EA5E9] font-medium mb-2">
                  {reason.titleEn}
                </p>
                <p className="text-xs text-slate-500 leading-relaxed text-hindi">
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
