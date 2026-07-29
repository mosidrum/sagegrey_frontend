"use client";

import { useFavorites } from "@/features/favorites/useFavorites";
import { Box, Stack, Text } from "@/components/primitives";
import { CharacterList } from "@/features/characters/CharacterList";

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  return (
    <Stack gap={6}>
      <Box>
        <Text variant="h1" weight="bold">
          Favorites
        </Text>
        <Text variant="body" color="muted">
          Your favorited Star Wars characters.
        </Text>
      </Box>

      {favorites.length === 0 ? (
        <Text variant="body" color="muted">
          No favorites yet.
        </Text>
      ) : (
        <CharacterList people={favorites} />
      )}
    </Stack>
  );
}
