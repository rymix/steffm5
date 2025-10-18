// pages/api/randomMix/[[...category]].ts

import type { NextApiRequest, NextApiResponse } from "next";

import { db, initializeDb } from "db";
import type { Mix } from "db/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  await initializeDb();

  const { category } = req.query;
  const categoryParam = Array.isArray(category) ? category[0] : category;

  // Nullify the category if it is 'all'
  const effectiveCategory = categoryParam === "all" ? null : categoryParam;

  const filteredMixes = effectiveCategory
    ? db.data?.mixes.filter((mix: Mix) => mix.category === effectiveCategory)
    : db.data?.mixes;

  if (!filteredMixes || filteredMixes.length === 0) {
    res.status(404).json({ message: "No mixes found" });
    return;
  }

  const randomIndex = Math.floor(Math.random() * filteredMixes.length);
  const randomMix = filteredMixes[randomIndex];

  res.status(200).json({ mcKey: randomMix.mixcloudKey });
}
