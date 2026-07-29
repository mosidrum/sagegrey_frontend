const HASH_COLORS = [
  "var(--color-avatar-1, #FF6B6B)",
  "var(--color-avatar-2, #4ECDC4)",
  "var(--color-avatar-3, #45B7D1)",
  "var(--color-avatar-4, #FFA07A)",
  "var(--color-avatar-5, #98D8C8)",
  "var(--color-avatar-6, #F7DC6F)",
  "var(--color-avatar-7, #BB8FCE)",
  "var(--color-avatar-8, #85C1E2)",
];

/**
 * Deterministically maps a string to one of the avatar palette colors.
 */
export function getAvatarColor(seed: string): string {
  const hash = seed.split("").reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);

  return HASH_COLORS[Math.abs(hash) % HASH_COLORS.length];
}
