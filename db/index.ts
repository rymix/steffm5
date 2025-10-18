import { readFileSync } from "fs";
import { join } from "path";

import type { Database } from "./types";

// Create separate adapters for each JSON file
const backgroundCategoriesFile = join(
  process.cwd(),
  "db/backgroundCategories.json",
);
const backgroundsFile = join(process.cwd(), "db/backgrounds.json");
const categoriesFile = join(process.cwd(), "db/categories.json");
const mixesFile = join(process.cwd(), "db/mixes.json");

const defaultData: Database = {
  backgroundCategories: [],
  backgrounds: [],
  categories: [],
  mixes: [],
};

// Create a composite database that loads data from multiple files
class CompositeDatabase {
  private data: Database = { ...defaultData };

  async read(): Promise<void> {
    try {
      // Load each JSON file and extract the relevant data
      const backgroundCategoriesData = JSON.parse(
        readFileSync(backgroundCategoriesFile, "utf-8"),
      );
      const backgroundsData = JSON.parse(
        readFileSync(backgroundsFile, "utf-8"),
      );
      const categoriesData = JSON.parse(readFileSync(categoriesFile, "utf-8"));
      const mixesData = JSON.parse(readFileSync(mixesFile, "utf-8"));

      this.data = {
        backgroundCategories:
          backgroundCategoriesData.backgroundCategories || [],
        backgrounds: backgroundsData.backgrounds || [],
        categories: categoriesData.categories || [],
        mixes: mixesData.mixes || [],
      };
    } catch (error) {
      console.error("Error loading database files:", error);
      this.data = { ...defaultData };
    }
  }

  get(): Database {
    return this.data;
  }
}

const compositeDb = new CompositeDatabase();

// Create a db object that mimics the Low interface
const db = {
  data: defaultData,
  async read() {
    await compositeDb.read();
    this.data = compositeDb.get();
  },
  write() {
    // Read-only implementation - no writing to separate files
    throw new Error("Writing is not supported for composite database");
  },
};

async function initializeDb(): Promise<void> {
  await db.read();
}

initializeDb();

export { db, initializeDb };
