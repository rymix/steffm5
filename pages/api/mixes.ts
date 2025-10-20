import type { NextApiRequest, NextApiResponse } from "next";

import { db, initializeDb } from "db";
import type { Mix } from "db/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  await initializeDb();

  const { category, name, notes, tags, date } = req.query;

  let filteredMixes: Mix[] = db.data?.mixes || [];

  if (typeof category === "string") {
    filteredMixes = filteredMixes.filter((mix) => mix.category === category);
  }

  if (typeof name === "string") {
    filteredMixes = filteredMixes.filter((mix) =>
      mix.name.toLowerCase().includes(name.toLowerCase()),
    );
  }

  if (typeof notes === "string") {
    filteredMixes = filteredMixes.filter(
      (mix) =>
        mix.notes && mix.notes.toLowerCase().includes(notes.toLowerCase()),
    );
  }

  if (typeof tags === "string") {
    filteredMixes = filteredMixes.filter((mix) =>
      mix.tags.some((tag) => tag.toLowerCase().includes(tags.toLowerCase())),
    );
  }

  if (typeof date === "string") {
    const dateParts = date.split("-");
    const filterYear = Number.parseInt(dateParts[0], 10);
    const filterMonth = Number.parseInt(dateParts[1], 10);

    filteredMixes = filteredMixes.filter((mix) => {
      const releaseDate = /^\d{2}/.test(mix.releaseDate)
        ? new Date(mix.releaseDate)
        : new Date(`01 ${mix.releaseDate}`);

      return (
        releaseDate.getFullYear() === filterYear &&
        releaseDate.getMonth() === filterMonth
      );
    });
  }

  filteredMixes = filteredMixes.sort((a, b) => a.listOrder - b.listOrder);
  res.status(200).json(filteredMixes);
}
