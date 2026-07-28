export type SpacingKey = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16;

export function spacingVar(key?: SpacingKey): string | undefined {
  return key !== undefined ? `var(--spacing-${key})` : undefined;
}
