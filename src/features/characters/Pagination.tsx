import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Flex } from "@/components/primitives";
import styles from "./Pagination.module.scss";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
  query?: Record<string, string>;
}

function buildHref(basePath: string, page: number, query?: Record<string, string>): string {
  const params = new URLSearchParams({ ...query, page: String(page) });
  return `${basePath}?${params.toString()}`;
}

function getPageNumbers(current: number, total: number): (number | "ellipsis")[] {
  const pages = new Set<number>([1, total, current - 1, current, current + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  const result: (number | "ellipsis")[] = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) {
      result.push("ellipsis");
    }
    result.push(p);
  });
  return result;
}

export function Pagination({ currentPage, totalPages, basePath, query }: PaginationProps) {
  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <Flex gap={2} align="center" className={styles.pagination}>
      <Link
        href={buildHref(basePath, currentPage - 1, query)}
        aria-disabled={currentPage <= 1}
        className={`${styles.navButton} ${currentPage <= 1 ? styles.disabled : ""}`}
      >
        <ChevronLeft size={16} /> Previous
      </Link>

      {pages.map((page, index) =>
        page === "ellipsis" ? (
          <span key={`ellipsis-${index}`} className={styles.ellipsis}>
            …
          </span>
        ) : (
          <Link
            key={page}
            href={buildHref(basePath, page, query)}
            className={`${styles.pageButton} ${page === currentPage ? styles.active : ""}`}
          >
            {page}
          </Link>
        ),
      )}

      <Link
        href={buildHref(basePath, currentPage + 1, query)}
        aria-disabled={currentPage >= totalPages}
        className={`${styles.navButton} ${currentPage >= totalPages ? styles.disabled : ""}`}
      >
        Next <ChevronRight size={16} />
      </Link>
    </Flex>
  );
}
