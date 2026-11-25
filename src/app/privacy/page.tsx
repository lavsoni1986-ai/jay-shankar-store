import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  Phone,
  MessageCircle,
  MapPin,
  CheckCircle2,
  Smartphone,
  Info,
  Server,
  Layers,
  Database,
} from "lucide-react";
import { siteConfig } from "@/data/siteConfig";
import { getGeneralEnquiryUrl } from "@/lib/whatsapp";
import { StickyWhatsApp } from "@/components/ui/StickyWhatsApp";

export const metadata: Metadata = {
  title: "गोपनीयता नीति | Privacy Policy — Jay Shankar Readymade Store",
  description:
    "Jay Shankar Readymade Store की आधिकारिक गोपनीयता नीति — जानें कि हम आपकी गोपनीयता, डेटा नियंत्रण सीमाओं और व्यापारिक संवाद की सुरक्षा कैसे सुनिश्चित करते हैं।",
  alternates: {
    canonical: `${siteConfig.url}/privacy`,
  },
};

export default function PrivacyPolicyPage() {
  const whatsappUrl = getGeneralEnquiryUrl();

  return (
    <div className="bg-[#F3EFE8] min-h-screen text-[#242426]">
      {/* Editorial Header */}
      <section className="bg-[#242426] text-[#F3EFE8] pt-10 pb-12 sm:pt-14 sm:pb-16 border-b border-[#39383B] relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div
          className="absolute -top-24 right-0 w-96 h-96 bg-[#B77B50]/10 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
                Privacy Policy
              </li>
            </ol>
          </nav>

          {/* Kicker badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#39383B] border border-[#B77B50]/40 text-[#D4A37F] text-xs font-bold tracking-widest uppercase mb-4">
            <ShieldCheck size={14} className="text-[#B77B50]" aria-hidden="true" />
            <span>गोपनीयता एवं डेटा नियंत्रण नीति &bull; PRIVACY &amp; DATA CONTROL POLICY</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white tracking-tight mb-4 text-hindi">
            गोपनीयता नीति (Privacy Policy)
          </h1>
          <p className="text-base sm:text-lg text-[#D8C9B7] leading-relaxed max-w-2xl text-hindi">
            Jay Shankar Readymade Store, Shahdol (MP) आपके विश्वास, व्यापारिक संवाद की गोपनीयता और तथ्यात्मक पारदर्शिता को सर्वोच्च प्राथमिकता देता है।
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-[#D8C9B7]/70">
            <span>अंतिम अद्यतन (Last Updated): 24 नवंबर 2026</span>
            <span aria-hidden="true">&bull;</span>
            <span>लागू: आधिकारिक वेबसाइट एवं Android TWA एप्लिकेशन</span>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Core Transparency Highlight Card */}
        <div className="bg-white border border-[#E3DED6] rounded-2xl p-6 sm:p-8 shadow-xs mb-10">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#B77B50]/15 flex items-center justify-center shrink-0 text-[#B77B50]">
              <Info size={22} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#242426] mb-2 font-display text-hindi">
                मुख्य बिंदु एवं तथ्यात्मक स्थिति (Core Truths &amp; Highlights)
              </h2>
              <ul className="space-y-2.5 text-sm text-[#4A484C] text-hindi leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-[#B77B50] mt-0.5 shrink-0" />
                  <span>
                    <strong>कोई सार्वजनिक खाता या डेटाबेस नहीं:</strong> कैटलॉग देखने वाले थोक खरीदारों या सामान्य आगंतुकों के लिए वेबसाइट पर कोई पंजीकरण, बैंकिंग डेटा संग्रहण या प्रोफ़ाइल ट्रैकिंग नहीं की जाती।
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-[#B77B50] mt-0.5 shrink-0" />
                  <span>
                    <strong>क्लाइंट-साइड संदेश निर्माण:</strong> हमारा &ldquo;त्वरित संदेश बिल्डर&rdquo; 100% आपके स्वयं के वेब ब्राउज़र में स्थानीय रूप से निष्पादित होता है। कोई ड्राफ्ट या विवरण हमारे वेब सर्वर पर नहीं भेजा जाता।
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-[#B77B50] mt-0.5 shrink-0" />
                  <span>
                    <strong>डेटा नियंत्रण सीमाएँ:</strong> हम केवल उस संवाद और फ़ोन रिकॉर्ड को अपने नियंत्रण में रखते हैं जो हमारे व्यापारिक उपकरण पर प्राप्त होता है। हम ग्राहक के निजी डिवाइस या WhatsApp सर्वर पर स्थित डेटा को नियंत्रित अथवा डिलीट नहीं कर सकते।
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-[#B77B50] mt-0.5 shrink-0" />
                  <span>
                    <strong>शून्य विज्ञापन कुकीज़:</strong> सामान्य वेबसाइट और Android TWA ऐप पर कोई थर्ड-पार्टी विज्ञापन कुकी, ट्रैकिंग पिक्सेल या एनालिटिक्स स्क्रिप्ट स्थापित नहीं है।
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 4-Layer Data Control Classification Card */}
        <div className="bg-white border border-[#E3DED6] rounded-2xl p-6 sm:p-8 shadow-xs mb-10">
          <div className="flex items-center gap-2 mb-3 text-[#B77B50]">
            <Layers size={18} />
            <h2 className="text-lg font-bold text-[#242426] font-display text-hindi">
              डेटा नियंत्रण वर्गीकरण (Four-Tier Data Control Architecture)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#686469] mb-6 text-hindi">
            पारदर्शिता के उद्देश्य से हम स्पष्ट करते हैं कि आपके डिजिटल संपर्क के विभिन्न तत्वों का नियंत्रण किसके अधिकार क्षेत्र में आता है:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-[#F3EFE8]/80 border border-[#E3DED6] space-y-1.5">
              <div className="flex items-center gap-2 text-[#242426] font-bold text-sm">
                <Database size={16} className="text-[#B77B50]" />
                <span>1. दुकान के नियंत्रण में (Store-Controlled)</span>
              </div>
              <p className="text-xs text-[#525055] leading-relaxed text-hindi">
                स्टोर प्रतिनिधि के व्यावसायिक फोन में दर्ज कॉल रिकॉर्ड, दुकान के WhatsApp चैट में प्राप्त संदेश/ऑर्डर विवरण, तथा अधिकृत व्यवस्थापक के एडमिन लॉगिन क्रेडेंशियल्स।
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#F3EFE8]/80 border border-[#E3DED6] space-y-1.5">
              <div className="flex items-center gap-2 text-[#242426] font-bold text-sm">
                <Smartphone size={16} className="text-[#B77B50]" />
                <span>2. ग्राहक के डिवाइस पर (User-Device Controlled)</span>
              </div>
              <p className="text-xs text-[#525055] leading-relaxed text-hindi">
                आपके डिवाइस पर स्थापित ब्राउज़र का सर्विस वर्कर कैश, मैसेज बिल्डर में दर्ज अस्थाई इनपुट, तथा आपके अपने WhatsApp एप्लिकेशन में संग्रहित चैट इतिहास।
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#F3EFE8]/80 border border-[#E3DED6] space-y-1.5">
              <div className="flex items-center gap-2 text-[#242426] font-bold text-sm">
                <MessageCircle size={16} className="text-[#B77B50]" />
                <span>3. WhatsApp / Meta के नियंत्रण में (Meta-Controlled)</span>
              </div>
              <p className="text-xs text-[#525055] leading-relaxed text-hindi">
                WhatsApp खाता प्रोफ़ाइल, नेटवर्क ट्रांसमिशन, तथा Meta प्लेटफॉर्म्स द्वारा WhatsApp की अपनी गोपनीयता नीति एवं सेवा शर्तों के तहत प्रबंधित अवसंरचनात्मक डेटा।
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#F3EFE8]/80 border border-[#E3DED6] space-y-1.5">
              <div className="flex items-center gap-2 text-[#242426] font-bold text-sm">
                <Server size={16} className="text-[#B77B50]" />
                <span>4. होस्टिंग व इंफ्रास्ट्रक्चर (Hosting/Infra Controlled)</span>
              </div>
              <p className="text-xs text-[#525055] leading-relaxed text-hindi">
                Vercel द्वारा DDoS सुरक्षा और HTTP अनुरोध निष्पादन हेतु क्षणिक सर्वर लॉग (IP, User-Agent), तथा Cloudinary CDN द्वारा छवियों की सुरक्षित कैशिंग।
              </p>
            </div>
          </div>
        </div>

        {/* Policy Sections */}
        <div className="bg-white border border-[#E3DED6] rounded-2xl p-6 sm:p-10 shadow-xs space-y-10">
          {/* Section 1: Introduction */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-[#B77B50]">
              <span className="text-xs font-bold uppercase tracking-widest">01. परिचय</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#242426] font-display text-hindi">
              1. परिचय एवं कार्यक्षेत्र (Introduction &amp; Scope)
            </h2>
            <p className="text-sm sm:text-base text-[#4A484C] leading-relaxed text-hindi">
              यह गोपनीयता नीति Jay Shankar Readymade Store (&ldquo;दुकान&rdquo;, &ldquo;हम&rdquo;, अथवा &ldquo;हमारा&rdquo;), स्थित शहडोल, मध्य प्रदेश द्वारा संचालित डिजिटल कैटलॉग वेबसाइट (<span className="font-mono text-xs text-[#242426] bg-[#F3EFE8] px-1.5 py-0.5 rounded">https://jay-shankar-store.vercel.app/</span>) एवं आधिकारिक Android Trusted Web Activity (TWA) पैकेज (<span className="font-mono text-xs text-[#242426] bg-[#F3EFE8] px-1.5 py-0.5 rounded">com.bharatos.jayshankarstore</span>) पर लागू होती है।
            </p>
            <p className="text-sm sm:text-base text-[#4A484C] leading-relaxed text-hindi">
              हमारा मंच एक B2B थोक रेडीमेड और होजरी प्रदर्शन कैटलॉग है। इसका उद्देश्य केवल खुदरा व्यापारियों और थोक खरीदारों को उत्पाद श्रेणियों, ब्रांडों और थोक पूछताछ के लिए प्रामाणिक जानकारी व संपर्क सूत्र प्रदान करना है।
            </p>
          </section>

          <hr className="border-[#E3DED6]" />

          {/* Section 2: Information We Collect */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-[#B77B50]">
              <span className="text-xs font-bold uppercase tracking-widest">02. डेटा संग्रहण की वास्तविकता</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#242426] font-display text-hindi">
              2. हम क्या जानकारी एकत्र करते हैं (Information We Collect)
            </h2>
            <div className="space-y-3 text-sm sm:text-base text-[#4A484C] leading-relaxed text-hindi">
              <p>
                <strong>(क) सार्वजनिक ब्राउज़िंग (Public Browsing):</strong> जब आप हमारे उत्पाद, श्रेणियाँ या ब्रांड्स देखते हैं, तो हम आपसे कोई नाम, ईमेल पता, मोबाइल नंबर, भुगतान जानकारी या खाता पंजीकरण नहीं मांगते। आप बिना किसी व्यक्तिगत खाते के पूरी तरह स्वतंत्र रूप से कैटलॉग देख सकते हैं।
              </p>
              <p>
                <strong>(ख) स्वचालित तकनीकी सर्वर लॉग (Technical Server Logs):</strong> हमारी वेबसाइट Vercel के प्रबंधित सर्वरलेस नेटवर्क पर होस्ट की गई है। Vercel नेटवर्क सुरक्षा, DDoS रोकथाम और सेवा की उपलब्धता सुनिश्चित करने हेतु मानक तकनीकी अनुरोध जानकारी (जैसे अनुरोधित URL, HTTP विधि, प्रतिक्रिया कोड, क्लाइंट IP पता और ब्राउज़र यूजर-एजेंट स्ट्रिंग) को अपने बुनियादी ढांचे में अल्पकालिक रूप से लॉग कर सकता है। स्टोर इस लॉग डेटा का उपयोग किसी व्यक्ति की पहचान करने या व्यक्तिगत ट्रैकिंग हेतु नहीं करता।
              </p>
              <p>
                <strong>(ग) प्रशासनिक डेटा (Administrative Data Only):</strong> केवल अधिकृत स्टोर व्यवस्थापक के लिए एडमिन पोर्टल में लॉगिन हेतु ईमेल व पासवर्ड हैश डेटाबेस में सुरक्षित रखा जाता है। सामान्य ग्राहकों या थोक खरीदारों के लिए कोई ऑनलाइन डेटाबेस खाता नहीं बनाया जाता।
              </p>
            </div>
          </section>

          <hr className="border-[#E3DED6]" />

          {/* Section 3: WhatsApp & Phone Interactions */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-[#B77B50]">
              <span className="text-xs font-bold uppercase tracking-widest">03. संचार एवं संवाद</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#242426] font-display text-hindi">
              3. WhatsApp एवं फ़ोन द्वारा संवाद (WhatsApp &amp; Phone Communications)
            </h2>
            <div className="space-y-3 text-sm sm:text-base text-[#4A484C] leading-relaxed text-hindi">
              <p>
                <strong>त्वरित संदेश बिल्डर (WhatsApp Message Builder):</strong> हमारी वेबसाइट के संपर्क पृष्ठ पर उपलब्ध &ldquo;त्वरित संदेश बिल्डर&rdquo; टूल विशुद्ध रूप से आपके डिवाइस के वेब ब्राउज़र में स्थानीय रूप से निष्पादित होता है। इसमें आपके द्वारा दर्ज किया गया नाम, दुकान का नाम, शहर या पूछताछ विषय हमारे किसी वेब सर्वर पर प्रेषित या डेटाबेस में संग्रहीत नहीं किया जाता।
              </p>
              <p>
                <strong>WhatsApp चैट संक्रमण:</strong> जब आप &ldquo;WhatsApp पर थोक संदेश भेजें&rdquo; या किसी उत्पाद पर WhatsApp बटन दबाते हैं, तो आप सीधे आधिकारिक WhatsApp एप्लिकेशन या WhatsApp Web (Meta Platforms, Inc. द्वारा संचालित) पर जाते हैं। जैसे ही आप WhatsApp पर जाते हैं, आपकी बातचीत WhatsApp की एंड-टू-एंड एन्क्रिप्शन तथा Meta की गोपनीयता नीति व सेवा शर्तों के अधीन आ जाती है।
              </p>
              <p>
                <strong>दूरभाष (Direct Phone Calls):</strong> जब आप हमारे संपर्क नंबर (<span className="font-semibold text-[#242426]">+91 70007 66562</span>) पर कॉल करते हैं, तो आपका फ़ोन नंबर और मौखिक बातचीत सामान्य टेलीफोन कॉल के रूप में सीधे हमारे साथ होती है।
              </p>
            </div>
          </section>

          <hr className="border-[#E3DED6]" />

          {/* Section 4: How We Use Information */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-[#B77B50]">
              <span className="text-xs font-bold uppercase tracking-widest">04. जानकारी का उपयोग</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#242426] font-display text-hindi">
              4. जानकारी का उपयोग (How We Use Information)
            </h2>
            <p className="text-sm sm:text-base text-[#4A484C] leading-relaxed text-hindi">
              यदि आप WhatsApp अथवा फ़ोन के माध्यम से स्वेच्छा से हमसे संपर्क करते हैं, तो आपकी संपर्क जानकारी का उपयोग केवल निम्नलिखित B2B थोक व्यापारिक उद्देश्यों के लिए किया जाता है:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-[#4A484C] text-hindi leading-relaxed">
              <li>आपके थोक पूछताछ, भाव सूची (Rate List) और उत्पाद उपलब्धता का उत्तर देना।</li>
              <li>पार्सल डिस्पैच, ट्रांसपोर्ट बिल्टी और ऑर्डर समन्वय की जानकारी साझा करना।</li>
              <li>व्यापारिक संबंध और नियमित ग्राहक सहायता प्रदान करना।</li>
            </ul>
            <p className="text-sm sm:text-base text-[#4A484C] font-semibold text-hindi mt-2">
              हम आपकी संपर्क जानकारी को किसी भी टेलीमार्केटर, विज्ञापन एजेंसी, डेटा ब्रोकर या बाहरी तीसरे पक्ष को न तो बेचते हैं, न ही किराए पर देते हैं।
            </p>
          </section>

          <hr className="border-[#E3DED6]" />

          {/* Section 5: Third-Party Services */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-[#B77B50]">
              <span className="text-xs font-bold uppercase tracking-widest">05. तृतीय-पक्ष सेवाएँ</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#242426] font-display text-hindi">
              5. तृतीय-पक्ष तकनीकी सेवाएँ (Third-Party Technical Services)
            </h2>
            <p className="text-sm sm:text-base text-[#4A484C] leading-relaxed text-hindi">
              हमारी वेबसाइट और मोबाइल ऐप पर सीमित आवश्यक तृतीय-पक्ष अवसंरचनात्मक सेवाओं का उपयोग किया जाता है:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
              <div className="p-4 rounded-xl bg-[#F3EFE8]/70 border border-[#E3DED6]">
                <h3 className="font-bold text-sm text-[#242426] mb-1">WhatsApp (Meta Platforms, Inc.)</h3>
                <p className="text-xs text-[#686469] leading-relaxed">
                  थोक खरीदारों के साथ सीधे सुरक्षित चैट, भाव सूची और ऑर्डर समन्वय हेतु। यह संवाद Meta की गोपनीयता नीति के अधीन है।
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[#F3EFE8]/70 border border-[#E3DED6]">
                <h3 className="font-bold text-sm text-[#242426] mb-1">Cloudinary Inc.</h3>
                <p className="text-xs text-[#686469] leading-relaxed">
                  उत्पाद और ब्रांड कैटलॉग की छवियों को तीव्र, संपीड़ित और अनुकूलित रूप में प्रदर्शित करने हेतु इमेज सीडीएन।
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[#F3EFE8]/70 border border-[#E3DED6]">
                <h3 className="font-bold text-sm text-[#242426] mb-1">Vercel Inc.</h3>
                <p className="text-xs text-[#686469] leading-relaxed">
                  वेबसाइट इंफ्रास्ट्रक्चर, सर्वरलेस होस्टिंग, एज रूटिंग और स्वचालित एसएसएल प्रमाणपत्र प्रबंधन प्रदान करने के लिए।
                </p>
              </div>
              <div className="p-4 rounded-xl bg-[#F3EFE8]/70 border border-[#E3DED6]">
                <h3 className="font-bold text-sm text-[#242426] mb-1">Google Maps (Alphabet Inc.)</h3>
                <p className="text-xs text-[#686469] leading-relaxed">
                  शहडोल स्थित हमारी दुकान तक दिशा-निर्देश (Navigation) प्रदान करने हेतु बाहरी वेब लिंक के रूप में।
                </p>
              </div>
            </div>
          </section>

          <hr className="border-[#E3DED6]" />

          {/* Section 6: Cookies and Local Storage */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-[#B77B50]">
              <span className="text-xs font-bold uppercase tracking-widest">06. कुकीज़ एवं स्टोरेज</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#242426] font-display text-hindi">
              6. कुकीज़ एवं लोकल स्टोरेज की स्थिति (Cookies and Local Storage)
            </h2>
            <div className="space-y-3 text-sm sm:text-base text-[#4A484C] leading-relaxed text-hindi">
              <p>
                <strong>सार्वजनिक वेबसाइट आगंतुक:</strong> आम आगंतुकों के लिए हमारी वेबसाइट किसी भी प्रकार की ट्रैकिंग कुकी, विज्ञापन कुकी या तीसरे पक्ष की एनालिटिक्स कुकीज़ का उपयोग नहीं करती है।
              </p>
              <p>
                <strong>प्रशासनिक सत्र कुकी (Admin Session Cookie Only):</strong> केवल अधिकृत व्यवस्थापक जब एडमिन डैशबोर्ड पर लॉगिन करते हैं, तो सत्र प्रमाणीकरण के लिए एक सुरक्षित कुकी (<span className="font-mono text-xs text-[#242426] bg-[#F3EFE8] px-1.5 py-0.5 rounded">js_admin_session</span>) का उपयोग किया जाता है। यह कुकी <span className="font-mono text-xs">HttpOnly</span>, <span className="font-mono text-xs">Secure</span> और <span className="font-mono text-xs">SameSite=Lax</span> सुरक्षा मानकों के साथ सीमित समय के लिए सेट होती है।
              </p>
              <p>
                <strong>लोकल स्टोरेज एवं सर्विस वर्कर:</strong> वेबसाइट किसी भी ग्राहक का डेटा ब्राउज़र के <span className="font-mono text-xs">localStorage</span> या <span className="font-mono text-xs">sessionStorage</span> में स्टोर नहीं करती। हमारा सर्विस वर्कर (<span className="font-mono text-xs text-[#242426] bg-[#F3EFE8] px-1.5 py-0.5 rounded">sw.js</span>) केवल स्थिर संपत्तियों (HTML, CSS, लोगो और आइकॉन) को त्वरित लोडिंग और ऑफ़लाइन लचीलेपन हेतु ब्राउज़र के कैश स्टोरेज में रखता है।
              </p>
            </div>
          </section>

          <hr className="border-[#E3DED6]" />

          {/* Section 7: Data Security */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-[#B77B50]">
              <span className="text-xs font-bold uppercase tracking-widest">07. सुरक्षा अवसंरचना</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#242426] font-display text-hindi">
              7. सुरक्षा अवसंरचना (Security Infrastructure)
            </h2>
            <p className="text-sm sm:text-base text-[#4A484C] leading-relaxed text-hindi">
              हम डेटा सुरक्षा के लिए व्यावहारिक और आधुनिक उद्योग-मानक तकनीकी सुरक्षा उपाय लागू करते हैं:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-[#4A484C] text-hindi leading-relaxed">
              <li>उत्पादन परिवेश में हमारी वेबसाइट Vercel के प्रबंधित HTTPS इन्फ्रास्ट्रक्चर के माध्यम से सुरक्षित है, जो मानक Transport Layer Security (TLS) और HSTS हेडर प्रदान करता है।</li>
              <li>Android एप्लिकेशन में केवल Trusted Web Activity आर्किटेक्चर का उपयोग किया गया है, जिसमें कोई आक्रामक हार्डवेयर अनुमतियाँ (जैसे कैमरा, स्थान, संपर्क, माइक्रोफ़ोन या कॉल लॉग) नहीं मांगी जातीं।</li>
              <li>चूँकि वेबसाइट पर कोई सार्वजनिक ग्राहक डेटाबेस नहीं रखा जाता, इसलिए ऑनलाइन डेटा उल्लंघन या लीक का जोखिम न्यूनतम है।</li>
            </ul>
          </section>

          <hr className="border-[#E3DED6]" />

          {/* Section 8: Data Retention */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-[#B77B50]">
              <span className="text-xs font-bold uppercase tracking-widest">08. प्रतिधारण सीमाएँ</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#242426] font-display text-hindi">
              8. डेटा संरक्षण एवं प्रतिधारण (Data Retention &amp; Limitations)
            </h2>
            <div className="space-y-3 text-sm sm:text-base text-[#4A484C] leading-relaxed text-hindi">
              <p>
                <strong>वेबसाइट रिकॉर्ड:</strong> चूँकि हमारी वेबसाइट पर कोई सार्वजनिक उपयोगकर्ता डेटाबेस रिकॉर्ड नहीं बनता, इसलिए वेबसाइट पर कोई व्यक्तिगत डेटा स्थायी रूप से संगृहीत नहीं रहता।
              </p>
              <p>
                <strong>व्यापारिक संवाद रिकॉर्ड:</strong> यदि आपने WhatsApp या फ़ोन के माध्यम से संपर्क किया है, तो व्यावसायिक पत्राचार, ऑर्डर इतिहास और पार्सल डिस्पैच विवरण हमारे व्यावसायिक उपकरणों पर सामान्य थोक व्यापारिक लेन-देन और लेखांकन आवश्यकताओं के अनुसार सुरक्षित रखा जाता है।
              </p>
            </div>
          </section>

          <hr className="border-[#E3DED6]" />

          {/* Section 9: User Rights and Boundaries */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-[#B77B50]">
              <span className="text-xs font-bold uppercase tracking-widest">09. उपयोगकर्ता अधिकार एवं नियंत्रण सीमा</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#242426] font-display text-hindi">
              9. उपयोगकर्ता अधिकार एवं विलोपन सीमा (User Rights &amp; Deletion Boundaries)
            </h2>
            <div className="space-y-3 text-sm sm:text-base text-[#4A484C] leading-relaxed text-hindi">
              <p>
                एक व्यापारी या ग्राहक के रूप में आपके निम्नलिखित अधिकार सुरक्षित हैं:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-[#4A484C] text-hindi leading-relaxed">
                <li>
                  <strong>दुकान के रिकॉर्ड से विलोपन का अनुरोध:</strong> आप किसी भी समय हमसे संपर्क कर अपने फ़ोन नंबर या बातचीत को <em>दुकान के व्यावसायिक फ़ोन/WhatsApp संपर्क सूची</em> से हटाने का अनुरोध कर सकते हैं।
                </li>
                <li>
                  <strong>महत्वपूर्ण स्पष्टीकरण (Important Deletion Boundary):</strong> हमारी दुकान ग्राहक के अपने मोबाइल फ़ोन या ग्राहक के व्यक्तिगत WhatsApp खाते से किसी भी चैट, संदेश या बैकअप को डिलीट करने की क्षमता या अधिकार नहीं रखती। ग्राहक अपने डिवाइस पर स्थित डेटा को स्वयं नियंत्रित व डिलीट कर सकते हैं।
                </li>
                <li>
                  <strong>वैकल्पिक संपर्क:</strong> आप WhatsApp का उपयोग न करने का चयन कर सकते हैं और सीधे टेलीफोन कॉल अथवा शहडोल स्थित दुकान पर व्यक्तिगत रूप से आकर व्यापार कर सकते हैं।
                </li>
                <li>
                  <strong>लोकल कैश निष्कासन:</strong> आप अपने ब्राउज़र या मोबाइल सेटिंग्स से किसी भी समय वेबसाइट का कैश और कुकीज़ साफ़ कर सकते हैं।
                </li>
              </ul>
            </div>
          </section>

          <hr className="border-[#E3DED6]" />

          {/* Section 10: Changes to Policy */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-[#B77B50]">
              <span className="text-xs font-bold uppercase tracking-widest">10. संशोधन</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#242426] font-display text-hindi">
              10. इस नीति में संशोधन (Changes to This Policy)
            </h2>
            <p className="text-sm sm:text-base text-[#4A484C] leading-relaxed text-hindi">
              हम व्यापारिक आवश्यकताओं, कानूनी विनियमों या तकनीकी परिवर्तनों के अनुरूप इस नीति को समय-समय पर अद्यतित कर सकते हैं। किसी भी संशोधन की स्थिति में अद्यतित नीति इस पृष्ठ पर नई &ldquo;अंतिम अद्यतन&rdquo; तिथि के साथ प्रकाशित की जाएगी।
            </p>
          </section>

          <hr className="border-[#E3DED6]" />

          {/* Section 11: Contact Information */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-[#B77B50]">
              <span className="text-xs font-bold uppercase tracking-widest">11. संपर्क विवरण</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#242426] font-display text-hindi">
              11. संपर्क विवरण (Verified Business Contact)
            </h2>
            <p className="text-sm sm:text-base text-[#4A484C] leading-relaxed text-hindi">
              यदि इस गोपनीयता नीति या हमारे डेटा व्यवहार के संबंध में आपका कोई प्रश्न या अनुरोध है, तो कृपया निम्नलिखित आधिकारिक पते व नंबर पर संपर्क करें:
            </p>

            <div className="mt-4 p-5 sm:p-6 rounded-2xl bg-[#F3EFE8] border border-[#E3DED6] space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-[#B77B50] mt-0.5 shrink-0" aria-hidden="true" />
                <div>
                  <h3 className="text-sm font-bold text-[#242426]">Jay Shankar Readymade Store</h3>
                  <p className="text-xs sm:text-sm text-[#4A484C] leading-relaxed mt-0.5">
                    Itwani Mohalla, Behind Anganwadi, Ward No. 10,<br />
                    Shahdol, Madhya Pradesh 484001, India.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Smartphone size={18} className="text-[#B77B50] shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-xs text-[#686469]">संपर्क सूत्र (Contact Person):</p>
                  <p className="text-sm font-bold text-[#242426]">Utkarsh Soni</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-[#E3DED6]">
                <a
                  href={`tel:+917000766562`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-[#E3DED6] text-[#242426] text-xs sm:text-sm font-semibold rounded-xl border border-[#E3DED6] transition-colors"
                >
                  <Phone size={14} className="text-[#B77B50]" />
                  <span>+91 70007 66562</span>
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#25D366] hover:bg-[#128C7E] text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors shadow-2xs"
                >
                  <MessageCircle size={14} className="fill-current" />
                  <span>WhatsApp पर संपर्क करें</span>
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Floating Sticky WhatsApp Pill */}
      <StickyWhatsApp />
    </div>
  );
}
