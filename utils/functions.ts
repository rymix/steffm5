import type { BackgroundCategory } from "db/types";

/**
 * Find a background category by its code
 */
export function getBackgroundCategoryObject(
  code: string,
  backgroundCategories: BackgroundCategory[],
): BackgroundCategory | undefined {
  return backgroundCategories.find((category) => category.code === code);
}
