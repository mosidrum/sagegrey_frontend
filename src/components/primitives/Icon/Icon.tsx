import type { LucideIcon } from "lucide-react";
import { cx } from "../internal/cx";
import styles from "./Icon.module.scss";

export type IconSize = "sm" | "md" | "lg" | "xl";
export type IconColor = "primary" | "muted" | "accent" | "danger" | "inherit";

export interface IconProps {
  icon: LucideIcon;
  size?: IconSize;
  color?: IconColor;
  "aria-label"?: string;
  className?: string;
}

export function Icon({
  icon: IconComponent,
  size = "md",
  color = "inherit",
  "aria-label": ariaLabel,
  className,
}: IconProps) {
  return (
    <IconComponent
      className={cx(styles[size], styles[`color-${color}`], className)}
      aria-hidden={ariaLabel ? undefined : true}
      aria-label={ariaLabel}
    />
  );
}
