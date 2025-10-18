// pages/api/backgrounds.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { getBackgroundCategoryObject } from "utils/functions";

import { db, initializeDb } from "db";
import type {
  Background,
  BackgroundCategory,
  BackgroundExtended,
} from "db/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  await initializeDb();

  const { backgroundCategory, name, tileType } = req.query;

  let filteredBackgrounds: Background[] = db.data?.backgrounds || [];
  const backgroundCategories: BackgroundCategory[] =
    db.data?.backgroundCategories || [];

  if (typeof backgroundCategory === "string") {
    filteredBackgrounds = filteredBackgrounds.filter(
      (background) => background.backgroundCategory === backgroundCategory,
    );
  }

  if (typeof name === "string") {
    filteredBackgrounds = filteredBackgrounds.filter((background) =>
      background.name.toLowerCase().includes(name.toLowerCase()),
    );
  }

  if (typeof tileType === "string") {
    filteredBackgrounds = filteredBackgrounds.filter(
      (background) =>
        background.tileType &&
        background.tileType.toLowerCase().includes(tileType.toLowerCase()),
    );
  }

  const extendedBackgrounds: BackgroundExtended[] = filteredBackgrounds.map(
    (background) => {
      const backgroundCategoryObject = getBackgroundCategoryObject(
        background.backgroundCategory,
        backgroundCategories,
      );
      if (backgroundCategoryObject) {
        return {
          ...background,
          backgroundCategoryObject,
        };
      }
      return background as BackgroundExtended;
    },
  );

  extendedBackgrounds.sort((a, b) => a.name.localeCompare(b.name));

  res.status(200).json(extendedBackgrounds);
}
