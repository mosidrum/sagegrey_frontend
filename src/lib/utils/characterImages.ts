/**
 * Character image mapping using Star Wars Visual Guide
 * https://starwars-visualguide.com/
 */

const IMAGE_BASE_URL = "https://starwars-visualguide.com/assets/img";

export function getCharacterImageUrl(id: string): string {
  return `${IMAGE_BASE_URL}/characters/${id}.jpg`;
}

export function getFilmImageUrl(id: string): string {
  return `${IMAGE_BASE_URL}/films/${id}.jpg`;
}

/**
 * Fallback image handler for characters that don't have images
 */
export function handleImageError(
  e: React.SyntheticEvent<HTMLImageElement>
): void {
  const target = e.currentTarget;
  target.style.display = "none";
  
  // Show fallback
  const parent = target.parentElement;
  if (parent) {
    const fallback = parent.querySelector("[data-fallback]");
    if (fallback instanceof HTMLElement) {
      fallback.style.display = "flex";
    }
  }
}
