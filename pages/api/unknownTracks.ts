// pages/api/unknownTracks.js

import { db, initializeDb } from "db";
import type { Mix, Track, UnknownTrack } from "db/types";

export default async function handler(_req: any, res: any): Promise<void> {
  await initializeDb();

  const unknownTracks: UnknownTrack[] = [];
  const searchString = "unknown";
  db.data?.mixes.forEach((mix: Mix) => {
    mix.tracks.forEach((track: Track) => {
      if (
        track.artistName.toLowerCase().includes(searchString) ||
        track.trackName.toLowerCase().includes(searchString) ||
        track.publisher.toLowerCase().includes(searchString)
      ) {
        unknownTracks.push({
          ...track,
          mixcloudKey: mix.mixcloudKey,
          mixName: mix.name,
          mixCoverArt: mix.coverArtSmall,
        });
      }
    });
  });

  res.status(200).json(unknownTracks);
}
