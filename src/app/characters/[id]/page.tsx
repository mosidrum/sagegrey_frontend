import {
  getPersonById,
  getFilmsByUrls,
  getVehiclesByUrls,
  getStarshipsByUrls,
} from "@/lib/api/swapi";
import { Avatar, Box, Stack, Text, Flex, Button } from "@/components/primitives";
import { FavoriteButton } from "@/features/characters/FavoriteButton";
import { getAvatarColor } from "@/lib/utils/colorHash";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import styles from "./page.module.scss";

interface CharacterPageProps {
  params: Promise<{ id: string }>;
}

export default async function CharacterPage({ params }: CharacterPageProps) {
  const { id } = await params;

  let person;
  let films;
  let vehicles;
  let starships;

  try {
    person = await getPersonById(id);
    films = person.films.length > 0 ? await getFilmsByUrls(person.films) : [];
    vehicles = person.vehicles.length > 0 ? await getVehiclesByUrls(person.vehicles) : [];
    starships = person.starships.length > 0 ? await getStarshipsByUrls(person.starships) : [];
  } catch (error) {
    console.error("Error fetching character:", error);
    notFound();
  }

  return (
    <div className={styles.page}>
      <Stack gap={6}>
        <Box>
          <Link href="/">
            <Button variant="primary" icon={ArrowLeft} iconPosition="left">
              Back to All Characters
            </Button>
          </Link>
        </Box>

        <Flex className={styles.header} gap={6}>
          <Box className={styles.avatarContainer}>
            <Avatar name={person.name} size="2xl" />
          </Box>

          <Stack gap={4} className={styles.headerContent}>
            <Box>
              <Text variant="display" weight="bold" as="h1">
                {person.name}
              </Text>
            </Box>

            <FavoriteButton characterId={id} characterName={person.name} />

            <Stack gap={3}>
              <DetailRow label="Birth Year" value={person.birth_year} />
              <DetailRow label="Gender" value={person.gender} />
              <DetailRow label="Height" value={`${person.height} cm`} />
              <DetailRow label="Mass" value={`${person.mass} kg`} />
              <DetailRow label="Hair Color" value={person.hair_color} />
              <DetailRow label="Skin Color" value={person.skin_color} />
              <DetailRow label="Eye Color" value={person.eye_color} />
            </Stack>
          </Stack>
        </Flex>

        {/* Films section */}
        {films.length > 0 && (
          <Box>
            <Text variant="h2" weight="bold" as="h2">
              Films
            </Text>
            <Box className={styles.filmsGrid}>
              {films.map((film) => (
                <Box key={film.url} className={styles.filmCard}>
                  <Box
                    className={styles.filmPoster}
                    style={{ background: getAvatarColor(film.title) }}
                  >
                    <Text variant="h3" weight="bold">
                      {film.title.charAt(0)}
                    </Text>
                  </Box>
                  <Text variant="bodySm" weight="semibold">
                    {film.title}
                  </Text>
                  <Text variant="caption" color="muted">
                    Episode {film.episode_id}
                  </Text>
                </Box>
              ))}
            </Box>
          </Box>
        )}

        {/* Vehicles section */}
        {vehicles.length > 0 && (
          <Box>
            <Text variant="h2" weight="bold" as="h2">
              Vehicles
            </Text>
            <Flex gap={2} className={styles.chipRow}>
              {vehicles.map((vehicle) => (
                <span key={vehicle.url} className={styles.chip}>
                  {vehicle.name}
                </span>
              ))}
            </Flex>
          </Box>
        )}

        {/* Starships section */}
        {starships.length > 0 && (
          <Box>
            <Text variant="h2" weight="bold" as="h2">
              Starships
            </Text>
            <Flex gap={2} className={styles.chipRow}>
              {starships.map((starship) => (
                <span key={starship.url} className={styles.chip}>
                  {starship.name}
                </span>
              ))}
            </Flex>
          </Box>
        )}
      </Stack>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <Flex justify="between" className={styles.detailRow}>
      <Text variant="body" color="muted">
        {label}
      </Text>
      <Text variant="body" weight="medium" className={styles.detailValue}>
        {value}
      </Text>
    </Flex>
  );
}
