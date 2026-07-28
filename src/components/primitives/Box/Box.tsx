import type { CSSProperties, ElementType, ReactNode } from "react";
import { cx } from "../internal/cx";
import { spacingVar, type SpacingKey } from "../internal/tokens";
import styles from "./Box.module.scss";

export interface BoxProps {
  as?: ElementType;
  padding?: SpacingKey;
  paddingX?: SpacingKey;
  paddingY?: SpacingKey;
  margin?: SpacingKey;
  background?: "background" | "surface" | "transparent";
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

export function Box({
  as: Component = "div",
  padding,
  paddingX,
  paddingY,
  margin,
  background,
  className,
  style,
  children,
}: BoxProps) {
  const computedStyle: CSSProperties = {
    padding: spacingVar(padding),
    paddingLeft: spacingVar(paddingX),
    paddingRight: spacingVar(paddingX),
    paddingTop: spacingVar(paddingY),
    paddingBottom: spacingVar(paddingY),
    margin: spacingVar(margin),
    backgroundColor:
      background && background !== "transparent" ? `var(--color-${background})` : undefined,
    ...style,
  };

  return (
    <Component className={cx(styles.box, className)} style={computedStyle}>
      {children}
    </Component>
  );
}
