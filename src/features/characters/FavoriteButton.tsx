"use client";

import { useFavorites } from "@/features/favorites/useFavorites";
import { Button } from "@/components/primitives";
import { Star } from "lucide-react";

interface FavoriteButtonProps {
  characterId: string;
  characterName: string;
}

export function FavoriteButton({ characterId, characterName }: FavoriteButtonProps) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const favorited = isFavorite(characterId);

  const handleClick = () => {
    if (favorited) {
      removeFavorite(characterId);
    } else {
      addFavorite({ id: characterId, name: characterName });
    }
  };

  return (
    <Button
      variant={favorited ? "primary" : "secondary"}
      icon={Star}
      iconPosition="left"
      onClick={handleClick}
      aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
    >
      {favorited ? "Remove from Favorites" : "Add to Favorites"}
    </Button>
  );
}
