// ============================================================
// WhatsApp Utility — Jay Shankar Readymade Store
// Primary number: +91 7000766562
// ============================================================

const WHATSAPP_NUMBER = "917000766562";
const BUSINESS_NAME = "Jay Shankar Readymade Store";

function buildWhatsAppUrl(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

/**
 * WhatsApp URL for a specific product enquiry
 */
export function getProductEnquiryUrl(productName: string): string {
  const message =
    `नमस्ते, मुझे ${BUSINESS_NAME} के "${productName}" के थोक भाव और उपलब्धता की जानकारी चाहिए।`;
  return buildWhatsAppUrl(message);
}

/**
 * WhatsApp URL for a category-level bulk enquiry
 */
export function getCategoryEnquiryUrl(categoryName: string): string {
  const message =
    `नमस्ते, मुझे ${categoryName} के थोक उत्पादों की जानकारी चाहिए। कृपया उपलब्ध डिज़ाइन, थोक भाव और MOQ बताएं।`;
  return buildWhatsAppUrl(message);
}

/**
 * WhatsApp URL for a bulk order enquiry
 */
export function getBulkEnquiryUrl(category?: string): string {
  const item = category ? `[${category}]` : "उत्पादों";
  const message =
    `नमस्ते, मुझे ${BUSINESS_NAME} से ${item} की थोक खरीदारी के लिए जानकारी चाहिए। कृपया थोक भाव, उपलब्ध डिज़ाइन और MOQ की जानकारी दें।`;
  return buildWhatsAppUrl(message);
}

/**
 * WhatsApp URL for a general business enquiry
 */
export function getGeneralEnquiryUrl(): string {
  const message =
    `नमस्ते, मुझे ${BUSINESS_NAME} से थोक खरीदारी के संबंध में जानकारी चाहिए।`;
  return buildWhatsAppUrl(message);
}

/**
 * WhatsApp URL for a brand-specific enquiry
 */
export function getBrandEnquiryUrl(brandName: string): string {
  const message =
    `नमस्ते, मुझे ${BUSINESS_NAME} पर उपलब्ध ${brandName} ब्रांड के थोक उत्पादों की जानकारी चाहिए।`;
  return buildWhatsAppUrl(message);
}

export const WHATSAPP_DISPLAY_NUMBER = "+91 7000766562";
export const WHATSAPP_CONTACT_NAME = "Utkarsh";
