import type { NextApiRequest, NextApiResponse } from "next";

import { db, initializeDb } from "db";

const handler = async (
  _req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  await initializeDb();

  const categories = db.data?.categories || [];
  res.status(200).json(categories);
};

export default handler;
