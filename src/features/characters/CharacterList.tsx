import type { Person } from "@/types/swapi";
import { Box, Text } from "@/components/primitives";
import Link from "next/link";
import styles from "./CharacterList.module.scss";

export interface CharacterListProps {
  people: Person[];
}

function extractIdFromUrl(url: string): string {
  const match = url.match(/\/people\/(\d+)\//);
  return match ? match[1] : "";
}

export function CharacterList({ people }: CharacterListProps) {
  return (
    <div className={styles.grid}>
      {people.map((person) => {
        const id = extractIdFromUrl(person.url);
        return (
          <Link
            key={person.url}
            href={`/characters/${id}`}
            className={styles.card}
          >
            <Box className={styles.imageWrapper}>
              <div className={styles.imagePlaceholder}>
                <Text variant="h3" color="muted" align="center">
                  {person.name.charAt(0)}
                </Text>
              </div>
            </Box>
            <Box className={styles.cardContent}>
              <Text variant="body" weight="medium" align="center">
                {person.name}
              </Text>
            </Box>
          </Link>
        );
      })}
    </div>
  );
}
