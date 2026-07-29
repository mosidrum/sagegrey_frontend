import { Box, Stack, Text } from "@/components/primitives";
import { CharacterListSkeleton } from "@/features/characters/CharacterListSkeleton";
import styles from "./page.module.scss";

export default function Loading() {
  return (
    <div className={styles.page}>
      <Stack gap={6}>
        <Box>
          <Text variant="h1" weight="bold">
            Search Results
          </Text>
        </Box>

        <CharacterListSkeleton />
      </Stack>
    </div>
  );
}
