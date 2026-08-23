// ============================================================
// Cloudinary Image Upload API Route — Jay Shankar Readymade Store
// Server-Side Protected, Validated Multi-Format Upload
// ============================================================

import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedAdmin } from "@/lib/auth";
import {
  uploadImageToCloudinary,
  ALLOWED_MIME_TYPES,
  MAX_FILE_SIZE_BYTES,
  isCloudinaryConfigured,
} from "@/lib/cloudinary";

export async function POST(request: NextRequest) {
  try {
    // 1. Independent Server-Side Auth Check
    const admin = await getAuthenticatedAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Parse Multipart Form Data
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // 3. File Size Validation (<= 10MB)
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        { error: "फ़ाइल का आकार 10MB से कम होना चाहिए (File size exceeds 10MB limit)" },
        { status: 400 }
      );
    }

    // 4. MIME Type Validation
    if (!ALLOWED_MIME_TYPES.includes(file.type.toLowerCase())) {
      return NextResponse.json(
        {
          error:
            "केवल JPG, PNG, WebP, या AVIF छवियां समर्थित हैं (Only JPG, PNG, WebP, and AVIF formats supported)",
        },
        { status: 400 }
      );
    }

    // 5. Check Cloudinary Configuration
    if (!isCloudinaryConfigured()) {
      return NextResponse.json(
        {
          error:
            "Cloudinary credentials are not configured. Please add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET to your environment.",
        },
        { status: 500 }
      );
    }

    // 6. Convert to Buffer & Upload to Cloudinary
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await uploadImageToCloudinary(buffer, file.name);

    return NextResponse.json({
      success: true,
      url: result.url,
      publicId: result.publicId,
      width: result.width,
      height: result.height,
      format: result.format,
    });
  } catch (error: unknown) {
    console.error("[CLOUDINARY_UPLOAD_ERROR]", error);
    const message = error instanceof Error ? error.message : "Upload failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
