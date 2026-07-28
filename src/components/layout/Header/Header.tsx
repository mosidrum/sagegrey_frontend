"use client";

import { useDebounce } from "@/hooks/useDebounce";
import { useSearchHistory } from "@/features/search/useSearchHistory";
import { Box, Flex, Text } from "@/components/primitives";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { type ChangeEvent, type KeyboardEvent, useEffect, useRef, useState } from "react";
import styles from "./Header.module.scss";

export function Header() {
  const router = useRouter();
  const { history, addTerm } = useSearchHistory();
  const [searchValue, setSearchValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const debouncedSearch = useDebounce(searchValue, 300);
  const inputRef = useRef<HTMLInputElement>(null);

  // Derive dropdown visibility (no need for state)
  const showDropdown = isFocused && !searchValue && history.length > 0;

  // Navigate to search results when debounced value changes
  useEffect(() => {
    if (debouncedSearch.trim()) {
      addTerm(debouncedSearch);
      router.push(`/search?q=${encodeURIComponent(debouncedSearch)}`);
    }
  }, [debouncedSearch, router, addTerm]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    // Delay to allow click on dropdown items
    setTimeout(() => {
      setIsFocused(false);
    }, 200);
  };

  const handleHistoryItemClick = (term: string) => {
    setSearchValue(term);
    inputRef.current?.focus();
  };

  const handleClear = () => {
    setSearchValue("");
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setSearchValue("");
      inputRef.current?.blur();
    }
  };

  return (
    <header className={styles.header}>
      <Flex align="center" justify="between" className={styles.container}>
        <Text
          as="h1"
          variant="h2"
          weight="bold"
          className={styles.logo}
        >
          SWAPI Explorer
        </Text>

        <div className={styles.searchWrapper}>
          <div className={styles.searchInputWrapper}>
            <Search className={styles.searchIcon} size={18} />
            <input
              ref={inputRef}
              type="search"
              placeholder="Search characters..."
              value={searchValue}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              className={styles.searchInput}
              aria-label="Search Star Wars characters"
            />
            {searchValue && (
              <button
                onClick={handleClear}
                className={styles.clearButton}
                aria-label="Clear search"
                type="button"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {showDropdown && (
            <Box className={styles.dropdown}>
              <Text variant="caption" color="muted" className={styles.dropdownHeader}>
                Recent searches
              </Text>
              <ul className={styles.dropdownList}>
                {history.map((term, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleHistoryItemClick(term)}
                      className={styles.dropdownItem}
                      type="button"
                    >
                      <Search size={14} />
                      <Text variant="bodySm">{term}</Text>
                    </button>
                  </li>
                ))}
              </ul>
            </Box>
          )}
        </div>
      </Flex>
    </header>
  );
}
