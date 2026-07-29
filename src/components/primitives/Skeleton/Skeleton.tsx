import { cx } from "../internal/cx";
import styles from "./Skeleton.module.scss";

export type SkeletonRadius = "sm" | "md" | "lg" | "full";

export interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  radius?: SkeletonRadius;
  className?: string;
}

export function Skeleton({ width, height, radius = "md", className }: SkeletonProps) {
  return (
    <div
      className={cx(styles.skeleton, styles[radius], className)}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
}
