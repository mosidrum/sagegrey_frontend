import type { ElementType, ReactNode } from "react";
import { cx } from "../internal/cx";
import styles from "./Text.module.scss";

export type TextVariant = "display" | "h1" | "h2" | "h3" | "body" | "bodySm" | "caption";
export type TextColor = "primary" | "muted" | "accent" | "secondaryAccent" | "danger" | "inherit";
export type TextWeight = "regular" | "medium" | "semibold" | "bold";
export type TextAlign = "left" | "center" | "right";

export interface TextProps {
  as?: ElementType;
  variant?: TextVariant;
  color?: TextColor;
  weight?: TextWeight;
  align?: TextAlign;
  className?: string;
  children?: ReactNode;
}

const defaultElementByVariant: Record<TextVariant, ElementType> = {
  display: "h1",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  body: "p",
  bodySm: "p",
  caption: "span",
};

export function Text({
  as,
  variant = "body",
  color = "inherit",
  weight,
  align,
  className,
  children,
}: TextProps) {
  const Component = as ?? defaultElementByVariant[variant];

  return (
    <Component
      className={cx(
        styles[variant],
        styles[`color-${color}`],
        weight && styles[`weight-${weight}`],
        align && styles[`align-${align}`],
        className,
      )}
    >
      {children}
    </Component>
  );
}
