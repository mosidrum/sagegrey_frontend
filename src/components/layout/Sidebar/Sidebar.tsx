"use client";

import { useFavorites } from "@/features/favorites/useFavorites";
import { Avatar, Box, Button, Text } from "@/components/primitives";
import { X } from "lucide-react";
import Link from "next/link";
import styles from "./Sidebar.module.scss";

export function Sidebar() {
  const { favorites, removeFavorite } = useFavorites();

  const handleRemove = (id: string, e: React.MouseEvent) => {
    e.preventDefault(); // Prevent link navigation
    removeFavorite(id);
  };

  return (
    <aside className={styles.sidebar}>
      <Box className={styles.header}>
        <Text variant="caption" className={styles.favoritesLabel}>
          Favorites
        </Text>
      </Box>

      {favorites.length === 0 ? (
        <Box className={styles.empty}>
          <Text variant="bodySm" color="muted" align="center">
            No favorites yet
          </Text>
        </Box>
      ) : (
        <ul className={styles.list}>
          {favorites.map((character) => (
            <li key={character.id} className={styles.listItem}>
              <Link
                href={`/characters/${character.id}`}
                className={styles.link}
              >
                <Avatar
                  name={character.name}
                  size="sm"
                  shape="circle"
                  className={styles.avatarThumb}
                />
                <Text variant="bodySm" className={styles.name}>
                  {character.name}
                </Text>
                <Button
                  variant="icon"
                  size="sm"
                  icon={X}
                  danger
                  onClick={(e) => handleRemove(character.id, e)}
                  aria-label={`Remove ${character.name} from favorites`}
                  className={styles.removeButton}
                />
              </Link>
            </li>
          ))}
        </ul>
      )}

      <Box className={styles.footer}>
        <Link href="/favorites">
          <Button variant="secondary" className={styles.viewAllButton}>
            View all favorites
          </Button>
        </Link>
      </Box>
    </aside>
  );
}
