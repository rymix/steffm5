// pages/api/mix/[mixcloudKey].js

import { db, initializeDb } from "db";

export default async function handler(req: any, res: any): Promise<void> {
  await initializeDb();

  const { mixcloudKey } = req.query;

  if (mixcloudKey) {
    const mix = db.data?.mixes.find((m) => m.mixcloudKey === mixcloudKey);
    if (mix) {
      const categoryDetail = db.data?.categories.find(
        (c) => c.code.toString() === mix.category.toString(),
      );
      const mixWithCategoryAndTracks = {
        ...mix,
        category: categoryDetail || mix.category,
        tracks: mix.tracks,
      };
      res.status(200).json(mixWithCategoryAndTracks);
    } else {
      res.status(404).json({ message: "Mix not found" });
    }
  } else {
    res.status(400).json({ message: "Mixcloud key is required" });
  }
}
