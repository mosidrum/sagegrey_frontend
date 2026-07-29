"use client";

import { useDebounce } from "@/hooks/useDebounce";
import { useSearchHistory } from "@/features/search/useSearchHistory";
import { useTheme } from "@/contexts/ThemeContext";
import { Box, Flex, Text } from "@/components/primitives";
import { Clock, Search, X, Moon, Sun, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { type ChangeEvent, type KeyboardEvent, useEffect, useRef, useState } from "react";
import styles from "./Header.module.scss";

export function Header() {
  const router = useRouter();
  const { history, addTerm, removeTerm, clearHistory } = useSearchHistory();
  const { theme, toggleTheme } = useTheme();
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

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setSearchValue("");
      inputRef.current?.blur();
    }
  };

  const handleRemoveTerm = (term: string) => {
    removeTerm(term);
  };

  const handleClearAll = () => {
    clearHistory();
  };

  // Dropdown visibility is driven solely by the input's focus state. Clicks
  // inside the dropdown (history item, remove, clear all) must not blur the
  // input, or the dropdown would close before the click handler's effect
  // is visible. preventDefault on mousedown stops the blur from firing at
  // all, so the dropdown stays open for anything but leaving the input.
  const preventBlur = (e: React.MouseEvent) => {
    e.preventDefault();
  };

  return (
    <header className={styles.header}>
      <Flex align="center" justify="between" className={styles.container}>
        {/* Left: Star Wars Logo */}
        <div className={styles.logoWrapper}>
          <Text
            as="div"
            variant="display"
            weight="bold"
            className={styles.logo}
          >
            STAR
            <br />
            WARS
          </Text>
        </div>

        {/* Center: Search Bar */}
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
            <span className={styles.searchHint}>/</span>
          </div>

          {showDropdown && (
            <Box className={styles.dropdown}>
              <Flex justify="between" align="center" className={styles.dropdownHeader}>
                <Text variant="caption" color="muted">
                  Recent searches
                </Text>
                <button
                  onClick={handleClearAll}
                  onMouseDown={preventBlur}
                  className={styles.clearAllButton}
                  type="button"
                >
                  <Text variant="caption" color="muted">
                    Clear all
                  </Text>
                </button>
              </Flex>
              <ul className={styles.dropdownList}>
                {history.map((term, index) => (
                  <li key={index} className={styles.dropdownItem}>
                    <button
                      onClick={() => handleHistoryItemClick(term)}
                      onMouseDown={preventBlur}
                      className={styles.dropdownItemButton}
                      type="button"
                    >
                      <Flex align="center" gap={2} className={styles.dropdownItemContent}>
                        <Clock size={14} />
                        <Text variant="bodySm">{term}</Text>
                      </Flex>
                    </button>
                    <button
                      onClick={() => handleRemoveTerm(term)}
                      onMouseDown={preventBlur}
                      className={styles.removeButton}
                      aria-label={`Remove ${term}`}
                      type="button"
                    >
                      <X size={14} />
                    </button>
                  </li>
                ))}
              </ul>
            </Box>
          )}
        </div>

        {/* Right: Dark Mode Toggle + Avatar */}
        <Flex align="center" gap={3}>
          <button 
            className={styles.iconButton} 
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            onClick={toggleTheme}
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button className={styles.avatarButton} aria-label="User profile">
            <User size={20} />
          </button>
        </Flex>
      </Flex>
    </header>
  );
}
