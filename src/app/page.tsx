import { getPeople } from "@/lib/api/swapi";
import { Box, Button, Flex, Stack, Text } from "@/components/primitives";
import { CharacterList } from "@/features/characters/CharacterList";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

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
    error = e instanceof Error ? e.message : "Failed to load characters";
  }

  if (error || !data) {
    return (
      <Stack gap={4}>
        <Text variant="h1" weight="bold">
          All Characters
        </Text>
        <Text variant="body" color="danger">
          {error || "Failed to load characters"}
        </Text>
      </Stack>
    );
  }

  const totalPages = Math.ceil(data.count / 10);
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;

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

      <CharacterList people={data.results} />

      <Flex justify="between" align="center">
        {hasPrev ? (
          <Link href={`/?page=${currentPage - 1}`}>
            <Button variant="secondary" icon={ChevronLeft} iconPosition="left">
              Previous
            </Button>
          </Link>
        ) : (
          <Box />
        )}

        <Flex gap={2} align="center">
          <Text variant="bodySm" color="muted">
            Page {currentPage} of {totalPages}
          </Text>
        </Flex>

        {hasNext ? (
          <Link href={`/?page=${currentPage + 1}`}>
            <Button variant="secondary" icon={ChevronRight} iconPosition="right">
              Next
            </Button>
          </Link>
        ) : (
          <Box />
        )}
      </Flex>
    </Stack>
  );
}
