// pages/api/tags.js

import { db, initializeDb } from "db";
import type { Mix } from "db/types";

export default async function handler(_req: any, res: any): Promise<void> {
  await initializeDb();

  const tags = new Set<string>();
  db.data?.mixes.forEach((mix: Mix) => {
    mix.tags.forEach((tag) => tags.add(tag));
  });

  const sortedTags = [...tags].sort((a, b) => a.localeCompare(b));

  res.status(200).json(sortedTags);
}
