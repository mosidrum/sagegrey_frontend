import styles from "./Avatar.module.scss";
import { cx } from "../internal/cx";
import { getAvatarColor } from "@/lib/utils/colorHash";

export interface AvatarProps {
  name: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  shape?: "circle" | "square";
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

export function Avatar({ name, size = "md", shape = "square", className }: AvatarProps) {
  const initials = getInitials(name);
  const backgroundColor = getAvatarColor(name);

  return (
    <div
      className={cx(styles.avatar, styles[`size-${size}`], styles[shape], className)}
      style={{ backgroundColor }}
      aria-label={name}
    >
      <span className={styles.initials}>{initials}</span>
    </div>
  );
}
