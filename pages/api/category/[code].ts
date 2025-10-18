// pages/api/category/[code].ts

import { db, initializeDb } from "db";

export default async function handler(req: any, res: any): Promise<void> {
  await initializeDb();

  const { code } = req.query;

  const category = db.data?.categories.find((c) => c.code === code);

  if (category) {
    res.status(200).json(category.name);
  } else {
    res.status(404).json("Category not found");
  }
}
