import { Skeleton } from "@/components/primitives";
import styles from "./CharacterList.module.scss";

export interface CharacterListSkeletonProps {
  count?: number;
}

export function CharacterListSkeleton({ count = 10 }: CharacterListSkeletonProps) {
  return (
    <div className={styles.grid} aria-busy="true" aria-label="Loading characters">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={styles.card}>
          <div className={styles.avatarWrapper}>
            <Skeleton width="60%" height="60%" radius="full" />
          </div>
          <div className={styles.cardContent}>
            <Skeleton height={16} />
          </div>
        </div>
      ))}
    </div>
  );
}
