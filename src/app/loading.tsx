import { Box, Stack, Text } from "@/components/primitives";
import { CharacterListSkeleton } from "@/features/characters/CharacterListSkeleton";

export default function Loading() {
  return (
    <Stack gap={6}>
      <Box>
        <Text variant="h1" weight="bold">
          All Characters
        </Text>
        <Text variant="body" color="muted">
          Browse all characters from the Star Wars universe.
        </Text>
      </Box>

      <CharacterListSkeleton />
    </Stack>
  );
}
