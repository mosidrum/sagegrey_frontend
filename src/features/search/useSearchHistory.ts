import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "swapi:search-history";
const MAX_HISTORY_SIZE = 8;

/**
 * SSR-safe localStorage access for search history
 */
function loadHistoryFromStorage(): string[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return [];
    }
    return JSON.parse(stored) as string[];
  } catch {
    return [];
  }
}

function saveHistoryToStorage(history: string[]): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch {
    // Ignore storage errors
  }
}

export function useSearchHistory() {
  // Lazy initialization: only runs once on mount, SSR-safe
  const [history, setHistory] = useState<string[]>(loadHistoryFromStorage);

  // Persist to localStorage whenever history changes
  useEffect(() => {
    saveHistoryToStorage(history);
  }, [history]);

  const addTerm = useCallback((term: string) => {
    const trimmed = term.trim();
    if (!trimmed) {
      return;
    }

    setHistory((prev) => {
      // Remove any existing occurrence of this term (dedupe)
      const filtered = prev.filter((t) => t !== trimmed);
      // Add the new term to the front (most-recent-first)
      const updated = [trimmed, ...filtered];
      // Cap at MAX_HISTORY_SIZE
      return updated.slice(0, MAX_HISTORY_SIZE);
    });
  }, []);

  const removeTerm = useCallback((term: string) => {
    setHistory((prev) => prev.filter((t) => t !== term));
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  return {
    history,
    addTerm,
    removeTerm,
    clearHistory,
  };
}
