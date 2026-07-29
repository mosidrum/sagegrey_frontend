import styles from "./Avatar.module.scss";
import { cx } from "../internal/cx";

export interface AvatarProps {
  name: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

/**
 * Get initials from a name (up to 2 characters)
 */
function getInitials(name: string): string {
  const words = name.trim().split(/\s+/);
  
  if (words.length === 1) {
    // Single word: take first 2 characters
    return words[0].slice(0, 2).toUpperCase();
  }
  
  // Multiple words: take first letter of first 2 words
  return words
    .slice(0, 2)
    .map(word => word[0])
    .join("")
    .toUpperCase();
}

/**
 * Generate a consistent color based on the name
 */
function getAvatarColor(name: string): string {
  const colors = [
    "var(--color-avatar-1, #FF6B6B)",
    "var(--color-avatar-2, #4ECDC4)",
    "var(--color-avatar-3, #45B7D1)",
    "var(--color-avatar-4, #FFA07A)",
    "var(--color-avatar-5, #98D8C8)",
    "var(--color-avatar-6, #F7DC6F)",
    "var(--color-avatar-7, #BB8FCE)",
    "var(--color-avatar-8, #85C1E2)",
  ];
  
  // Generate a consistent hash from the name
  const hash = name.split("").reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  
  return colors[Math.abs(hash) % colors.length];
}

export function Avatar({ name, size = "md", className }: AvatarProps) {
  const initials = getInitials(name);
  const backgroundColor = getAvatarColor(name);
  
  return (
    <div
      className={cx(styles.avatar, styles[size], className)}
      style={{ backgroundColor }}
      aria-label={name}
    >
      <span className={styles.initials}>{initials}</span>
    </div>
  );
}
