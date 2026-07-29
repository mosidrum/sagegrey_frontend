"use client";

import { Avatar, Box, Text } from "@/components/primitives";
import { useFavorites } from "@/features/favorites/useFavorites";
import { Star } from "lucide-react";
import Link from "next/link";
import styles from "./CharacterList.module.scss";

export interface CharacterListItem {
  id?: string;
  url?: string;
  name: string;
}

export interface CharacterListProps {
  people: CharacterListItem[];
}

function extractIdFromUrl(url: string): string {
  const match = url.match(/\/people\/(\d+)\//);
  return match ? match[1] : "";
}

export function CharacterList({ people }: CharacterListProps) {
  const { isFavorite } = useFavorites();

  return (
    <div className={styles.grid}>
      {people.map((person) => {
        const id = person.id ?? extractIdFromUrl(person.url ?? "");
        const favorited = isFavorite(id);

        return (
          <Link
            key={person.url ?? id}
            href={`/characters/${id}`}
            className={styles.card}
          >
            <Box className={styles.avatarWrapper}>
              <Avatar name={person.name} size="xl" />
            </Box>
            <Box className={styles.cardContent}>
              <Text variant="body" weight="medium" align="center">
                {favorited && (
                  <Star
                    size={16}
                    fill="currentColor"
                    style={{ 
                      display: "inline", 
                      marginRight: "6px", 
                      verticalAlign: "middle",
                      color: "#fbbf24"
                    }}
                  />
                )}
                {person.name}
              </Text>
            </Box>
          </Link>
        );
      })}
    </div>
  );
}
