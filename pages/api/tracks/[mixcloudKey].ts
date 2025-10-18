// pages/api/tracks[mixcloudKey].ts

import { db, initializeDb } from "db";

export default async function handler(req: any, res: any): Promise<void> {
  await initializeDb();

  const { mixcloudKey } = req.query;

  if (typeof mixcloudKey !== "string") {
    res.status(400).json({ message: "Invalid mixcloudKey" });
    return;
  }

  const mix = db.data?.mixes.find((m) => m.mixcloudKey === mixcloudKey);

  if (mix) {
    res.status(200).json(mix.tracks);
  } else {
    res.status(404).json({ message: "Mix not found" });
  }
}
