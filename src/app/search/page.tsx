import { searchPeople } from "@/lib/api/swapi";
import { Box, Stack, Text } from "@/components/primitives";
import { CharacterList } from "@/features/characters/CharacterList";
import { Pagination } from "@/features/characters/Pagination";
import styles from "./page.module.scss";

interface SearchPageProps {
  searchParams?: Promise<{ q?: string; page?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const q = params?.q?.trim() ?? "";
  const currentPage = Number(params?.page) || 1;

  if (!q) {
    return (
      <div className={styles.page}>
        <Stack gap={4}>
          <Text variant="h1" weight="bold">
            Search Results
          </Text>
          <Text variant="body" color="muted">
            Enter a search term to find characters.
          </Text>
        </Stack>
      </div>
    );
  }

  let data;
  let error = null;

  try {
    data = await searchPeople(q, currentPage);
  } catch (e) {
    console.error("Failed to search characters:", e);
    error = e instanceof Error ? e.message : "Failed to load search results";
  }

  if (error || !data) {
    return (
      <div className={styles.page}>
        <Stack gap={4}>
          <Text variant="h1" weight="bold">
            Search Results
          </Text>
          <Text variant="body" color="danger">
            {error || "Failed to load search results"}
          </Text>
        </Stack>
      </div>
    );
  }

  const totalPages = Math.max(1, Math.ceil(data.count / 10));

  return (
    <div className={styles.page}>
      <Stack gap={6}>
        <Box>
          <Text variant="h1" weight="bold">
            Search Results
          </Text>
          <Text variant="body" color="muted">
            Showing results for &quot;{q}&quot;
          </Text>
        </Box>

        {data.results.length === 0 ? (
          <Text variant="body" color="muted">
            No characters found.
          </Text>
        ) : (
          <>
            <CharacterList people={data.results} />
            <Text variant="bodySm" color="muted">
              {data.count} result{data.count !== 1 ? "s" : ""} found
            </Text>
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                basePath="/search"
                query={{ q }}
              />
            )}
          </>
        )}
      </Stack>
    </div>
  );
}
