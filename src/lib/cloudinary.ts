// ============================================================
// Cloudinary Media Storage — Jay Shankar Readymade Store
// Server-Side SDK Control & Safe Asset Operations
// ============================================================

import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

// Configure Cloudinary server-side
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export const CLOUDINARY_FOLDER = "jay-shankar-store/products";
export const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
];
export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB

/**
 * Check whether Cloudinary credentials are configured
 */
export function isCloudinaryConfigured(): boolean {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
  );
}

export interface UploadResult {
  url: string;
  publicId: string;
  width?: number;
  height?: number;
  format?: string;
}

/**
 * Upload an image buffer to Cloudinary with strict validation and controlled folder
 */
export async function uploadImageToCloudinary(
  buffer: Buffer,
  filename: string
): Promise<UploadResult> {
  if (!isCloudinaryConfigured()) {
    throw new Error(
      "Cloudinary credentials are not configured. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in your environment."
    );
  }

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: CLOUDINARY_FOLDER,
        resource_type: "image",
        transformation: [
          { quality: "auto", fetch_format: "auto" },
        ],
        public_id: filename.replace(/\.[^/.]+$/, "").replace(/[^\w-]/g, "_") + "_" + Date.now(),
      },
      (error, result?: UploadApiResponse) => {
        if (error || !result) {
          return reject(error || new Error("Failed to upload image to Cloudinary"));
        }
        resolve({
          url: result.secure_url,
          publicId: result.public_id,
          width: result.width,
          height: result.height,
          format: result.format,
        });
      }
    );

    uploadStream.end(buffer);
  });
}

/**
 * Safely delete an image asset from Cloudinary.
 * Guards against deleting assets outside the project's folder.
 */
export async function deleteImageFromCloudinary(publicId: string): Promise<boolean> {
  if (!isCloudinaryConfigured()) {
    console.warn("[CLOUDINARY] Cannot delete image: Cloudinary is not configured");
    return false;
  }

  // Security guard: Ensure publicId belongs to our project folder
  if (!publicId.startsWith("jay-shankar-store/")) {
    console.warn(`[CLOUDINARY] Security Block: Attempted to delete asset '${publicId}' outside 'jay-shankar-store/'`);
    return false;
  }

  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
    });
    return result.result === "ok" || result.result === "not found";
  } catch (error) {
    console.error("[CLOUDINARY] Error deleting image asset:", error);
    return false;
  }
}

/**
 * Generate an optimized Cloudinary delivery URL with automatic format and compression
 */
export function getOptimizedImageUrl(
  urlOrPublicId: string,
  options?: { width?: number; height?: number; crop?: string }
): string {
  if (!urlOrPublicId) return "";

  // If it's already a full Cloudinary URL, inject transformations
  if (urlOrPublicId.includes("res.cloudinary.com")) {
    const parts = urlOrPublicId.split("/upload/");
    if (parts.length === 2) {
      const transforms: string[] = ["f_auto", "q_auto"];
      if (options?.width) transforms.push(`w_${options.width}`);
      if (options?.height) transforms.push(`h_${options.height}`);
      if (options?.crop) transforms.push(`c_${options.crop}`);
      return `${parts[0]}/upload/${transforms.join(",")}/${parts[1]}`;
    }
    return urlOrPublicId;
  }

  // If it's just a public_id
  if (isCloudinaryConfigured()) {
    return cloudinary.url(urlOrPublicId, {
      secure: true,
      fetch_format: "auto",
      quality: "auto",
      width: options?.width,
      height: options?.height,
      crop: options?.crop,
    });
  }

  return urlOrPublicId;
}
