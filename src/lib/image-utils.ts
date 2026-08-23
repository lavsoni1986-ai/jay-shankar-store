// ============================================================
// Client-Safe Image Transformation Utilities — Jay Shankar Readymade Store
// Pure URL manipulation with ZERO Node.js / fs dependencies
// ============================================================

/**
 * Generate an optimized Cloudinary delivery URL with automatic format and compression.
 * Completely safe for Client and Server components.
 */
export function getOptimizedImageUrl(
  url: string,
  options?: { width?: number; height?: number; crop?: string }
): string {
  if (!url || typeof url !== "string") return "";

  // If it's a Cloudinary URL, inject standard delivery transformations
  if (url.includes("res.cloudinary.com") && url.includes("/upload/")) {
    const parts = url.split("/upload/");
    if (parts.length === 2) {
      const transforms: string[] = ["f_auto", "q_auto"];
      if (options?.width) transforms.push(`w_${options.width}`);
      if (options?.height) transforms.push(`h_${options.height}`);
      if (options?.crop) transforms.push(`c_${options.crop}`);
      return `${parts[0]}/upload/${transforms.join(",")}/${parts[1]}`;
    }
  }

  return url;
}
