import { getPeople } from "@/lib/api/swapi";
import { Box, Stack, Text } from "@/components/primitives";
import { CharacterList } from "@/features/characters/CharacterList";
import { Pagination } from "@/features/characters/Pagination";

interface HomeProps {
  searchParams?: Promise<{ page?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const currentPage = Number(params?.page) || 1;

  let data;
  let error = null;

  try {
    data = await getPeople(currentPage);
  } catch (e) {
    console.error("Failed to fetch characters:", e);
    error = e instanceof Error ? e.message : "Failed to load characters";
  }

  if (error || !data) {
    return (
      <Stack gap={4}>
        <Text variant="h1" weight="bold">
          All Characters
        </Text>
        <Box>
          <Text variant="body" color="danger">
            {error || "Failed to load characters"}
          </Text>
          <Text variant="bodySm" color="muted">
            Please check your internet connection and try again. If the issue
            persists, the Star Wars API (SWAPI) might be temporarily unavailable.
          </Text>
        </Box>
      </Stack>
    );
  }

  const totalPages = Math.max(1, Math.ceil(data.count / 10));

  return (
    <Stack gap={6} >
      <Box>
        <Text variant="h1" weight="bold">
          All Characters
        </Text>
        <Text variant="body" color="muted">
          Browse all characters from the Star Wars universe.
        </Text>
      </Box>

      <CharacterList people={data.results} />

      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} basePath="/" />
      )}
    </Stack>
  );
}
