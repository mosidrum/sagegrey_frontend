"use client";

import type { ReactNode } from "react";
import { createContext, useEffect, useState } from "react";

export interface FavoriteCharacter {
  id: string;
  name: string;
}

export interface FavoritesContextValue {
  favorites: FavoriteCharacter[];
  addFavorite: (character: FavoriteCharacter) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

export const FavoritesContext = createContext<
  FavoritesContextValue | undefined
>(undefined);

const STORAGE_KEY = "swapi:favorites";

/**
 * SSR-safe localStorage access
 */
function loadFavoritesFromStorage(): FavoriteCharacter[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return [];
    }
    return JSON.parse(stored) as FavoriteCharacter[];
  } catch {
    return [];
  }
}

function saveFavoritesToStorage(favorites: FavoriteCharacter[]): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  } catch {
    // Ignore storage errors (quota exceeded, etc.)
  }
}

export interface FavoritesProviderProps {
  children: ReactNode;
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  // Lazy initialization: only runs once on mount, SSR-safe
  const [favorites, setFavorites] = useState<FavoriteCharacter[]>(
    loadFavoritesFromStorage,
  );

  // Persist to localStorage whenever favorites change
  useEffect(() => {
    saveFavoritesToStorage(favorites);
  }, [favorites]);

  const addFavorite = (character: FavoriteCharacter) => {
    setFavorites((prev) => {
      // Avoid duplicates
      if (prev.some((fav) => fav.id === character.id)) {
        return prev;
      }
      return [...prev, character];
    });
  };

  const removeFavorite = (id: string) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== id));
  };

  const isFavorite = (id: string): boolean => {
    return favorites.some((fav) => fav.id === id);
  };

  const value: FavoritesContextValue = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}
