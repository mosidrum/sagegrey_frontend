import type { CSSProperties, ElementType, ReactNode } from "react";
import { cx } from "../internal/cx";
import { spacingVar, type SpacingKey } from "../internal/tokens";
import styles from "./Flex.module.scss";

export type FlexDirection = "row" | "column" | "row-reverse" | "column-reverse";
export type FlexAlign = "start" | "center" | "end" | "stretch" | "baseline";
export type FlexJustify = "start" | "center" | "end" | "between" | "around" | "evenly";

export interface FlexProps {
  as?: ElementType;
  direction?: FlexDirection;
  align?: FlexAlign;
  justify?: FlexJustify;
  gap?: SpacingKey;
  wrap?: boolean | "reverse";
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

const alignMap: Record<FlexAlign, CSSProperties["alignItems"]> = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  stretch: "stretch",
  baseline: "baseline",
};

const justifyMap: Record<FlexJustify, CSSProperties["justifyContent"]> = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  between: "space-between",
  around: "space-around",
  evenly: "space-evenly",
};

function resolveWrap(wrap: FlexProps["wrap"]): CSSProperties["flexWrap"] {
  if (wrap === "reverse") return "wrap-reverse";
  if (wrap === true) return "wrap";
  if (wrap === false) return "nowrap";
  return undefined;
}

export function Flex({
  as: Component = "div",
  direction,
  align,
  justify,
  gap,
  wrap,
  className,
  style,
  children,
}: FlexProps) {
  const computedStyle: CSSProperties = {
    flexDirection: direction,
    alignItems: align ? alignMap[align] : undefined,
    justifyContent: justify ? justifyMap[justify] : undefined,
    gap: spacingVar(gap),
    flexWrap: resolveWrap(wrap),
    ...style,
  };

  return (
    <Component className={cx(styles.flex, className)} style={computedStyle}>
      {children}
    </Component>
  );
}
