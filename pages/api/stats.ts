// pages/api/stats.ts

import type { NextApiRequest, NextApiResponse } from "next";

import { db, initializeDb } from "db";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  await initializeDb();

  const mixes = db.data?.mixes || [];
  const mixCount = mixes.length;
  const trackCount = mixes.reduce((acc, mix) => acc + mix.tracks.length, 0);

  const totalDurationInSeconds = mixes.reduce((acc, mix) => {
    const durationParts = mix.duration.split(":").map(Number);
    if (durationParts.length === 3) {
      const [hours, minutes, seconds] = durationParts;
      if (
        !Number.isNaN(hours) &&
        !Number.isNaN(minutes) &&
        !Number.isNaN(seconds)
      ) {
        return acc + hours * 3600 + minutes * 60 + seconds;
      }
    }
    return acc;
  }, 0);

  const hours = Math.floor(totalDurationInSeconds / 3600);
  const minutes = Math.floor((totalDurationInSeconds % 3600) / 60);
  const seconds = totalDurationInSeconds % 60;
  const totalDuration = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  const categories = db.data?.categories || [];
  console.log("categories", categories);
  const categoryMixCounts = categories.map((category) => ({
    category: category.name,
    count: mixes.filter((mix) => mix.category === category.code).length,
  }));

  const tracks = mixes.flatMap((mix) => mix.tracks);
  const artistTrackCounts: { [key: string]: number } = tracks.reduce(
    (acc, track) => {
      acc[track.artistName] = (acc[track.artistName] || 0) + 1;
      return acc;
    },
    {} as { [key: string]: number },
  );

  const tagCounts = mixes
    .flatMap((mix) => mix.tags)
    .reduce((acc: { [key: string]: number }, tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
      return acc;
    }, {});

  const top10TagCounts = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([tag, count]) => ({ tag, count }));

  const allTagCounts = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([tag, count]) => ({ tag, count }));

  const remixArtistTrackCounts: { [key: string]: number } = tracks.reduce(
    (acc, track) => {
      if (track.remixArtistName) {
        acc[track.remixArtistName] = (acc[track.remixArtistName] || 0) + 1;
      }
      return acc;
    },
    {} as { [key: string]: number },
  );

  const publisherCounts: { [key: string]: number } = tracks.reduce(
    (acc, track) => {
      if (track.publisher) {
        acc[track.publisher] = (acc[track.publisher] || 0) + 1;
      }
      return acc;
    },
    {} as { [key: string]: number },
  );

  const top10ArtistTrackCounts = Object.entries(artistTrackCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([artistName, count]) => ({ artistName, count }));

  const allArtistTrackCounts = Object.entries(artistTrackCounts)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([artistName, count]) => ({ artistName, count }));

  const top10RemixArtistTrackCounts = Object.entries(remixArtistTrackCounts)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 10)
    .map(([remixArtistName, count]) => ({ remixArtistName, count }));

  const allRemixArtistTrackCounts = Object.entries(remixArtistTrackCounts)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([remixArtistName, count]) => ({ remixArtistName, count }));

  const top10PublisherCounts = Object.entries(publisherCounts)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 10)
    .map(([publisher, count]) => ({ publisher, count }));

  const allPublisherCounts = Object.entries(publisherCounts)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .map(([publisher, count]) => ({ publisher, count }));

  const averageMixDurationInSeconds = totalDurationInSeconds / mixCount;
  const averageMixHours = Math.floor(averageMixDurationInSeconds / 3600);
  const averageMixMinutes = Math.floor(
    (averageMixDurationInSeconds % 3600) / 60,
  );
  const averageMixSeconds = Math.floor(averageMixDurationInSeconds % 60);
  const averageMixDuration = `${averageMixHours
    .toString()
    .padStart(2, "0")}:${averageMixMinutes
    .toString()
    .padStart(2, "0")}:${averageMixSeconds.toString().padStart(2, "0")}`;

  res.status(200).json({
    artistTrackCounts: allArtistTrackCounts,
    averageMixDuration,
    categoryMixCounts,
    mixCount,
    publisherCounts: allPublisherCounts,
    remixArtistTrackCounts: allRemixArtistTrackCounts,
    tagCounts: allTagCounts,
    top10ArtistTrackCounts,
    top10PublisherCounts,
    top10RemixArtistTrackCounts,
    top10TagCounts,
    totalDuration,
    trackCount,
  });
};

export default handler;
