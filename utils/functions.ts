import type { BackgroundCategory } from "db/types";

/**
 * Find a background category by its code
 */
export const getBackgroundCategoryObject = (
  code: string,
  backgroundCategories: BackgroundCategory[],
): BackgroundCategory | undefined => {
  return backgroundCategories.find((category) => category.code === code);
};

export const mcKeyFormatter = (mixcloudKey: string) => {
  return `/rymixxx/${mixcloudKey}/`;
};
