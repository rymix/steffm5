import type { NextApiRequest, NextApiResponse } from "next";

import { db, initializeDb } from "db";
import { Mix } from "db/types";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  await initializeDb();

  const { count } = req.query;
  const limit = Number.isNaN(Number(count)) ? 5 : Number(count);

  const mixes: Mix[] = db.data?.mixes || [];

  // Convert uploadedDate to a sortable datetime format and sort by uploadedDate in descending order
  const sortedMixes = mixes.sort((a, b) => {
    const dateA = new Date(a.uploadedDate).getTime();
    const dateB = new Date(b.uploadedDate).getTime();
    return dateB - dateA;
  });

  // Get the 5 most recent mixes
  const recentMixes = sortedMixes.slice(0, Number(limit));

  res.status(200).json(recentMixes);
};

export default handler;
