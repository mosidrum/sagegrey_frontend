"use client";

import { useFavorites } from "@/features/favorites/useFavorites";
import { Box, Button, Flex, Text } from "@/components/primitives";
import { Star, X } from "lucide-react";
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
        <Flex align="center" gap={2}>
          <Star size={18} />
          <Text variant="body" weight="bold">
            Favorites
          </Text>
        </Flex>
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
    </aside>
  );
}
