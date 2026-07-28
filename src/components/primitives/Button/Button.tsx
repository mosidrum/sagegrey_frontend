import type { LucideIcon } from "lucide-react";
import type { MouseEventHandler, ReactNode } from "react";
import { cx } from "../internal/cx";
import { Icon } from "../Icon/Icon";
import styles from "./Button.module.scss";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "icon";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  danger?: boolean;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit";
  "aria-label"?: string;
  className?: string;
  children?: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  danger = false,
  disabled,
  onClick,
  type = "button",
  "aria-label": ariaLabel,
  className,
  children,
}: ButtonProps) {
  const iconElement = icon ? <Icon icon={icon} size={size} color="inherit" /> : null;

  return (
    <button
      type={type}
      className={cx(
        styles.button,
        styles[variant],
        styles[size],
        danger && styles.danger,
        className,
      )}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {iconElement && iconPosition === "left" ? iconElement : null}
      {children}
      {iconElement && iconPosition === "right" ? iconElement : null}
    </button>
  );
}
