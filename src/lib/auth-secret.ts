// ============================================================
// JWT Secret Key Resolver — Jay Shankar Readymade Store
// Edge-compatible, zero-dependency secret validator.
// ============================================================

export const MIN_SECRET_LENGTH = 32;

/**
 * Resolves the JWT secret key as Uint8Array for jose HS256 signing and verification.
 * Fails closed (returns null) if AUTH_SECRET is not defined, not a string, or
 * fewer than 32 characters in length.
 *
 * Never falls back to hardcoded default secrets.
 */
export function getJwtSecretKey(): Uint8Array | null {
  const secret = process.env.AUTH_SECRET;

  if (!secret || typeof secret !== "string") {
    return null;
  }

  const trimmed = secret.trim();
  if (trimmed.length < MIN_SECRET_LENGTH) {
    return null;
  }

  return new TextEncoder().encode(trimmed);
}
