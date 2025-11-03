import type { BackgroundCategory } from "db/types";

/**
 * Find a background category by its code
 */
export const getBackgroundCategoryObject = (
  code: string,
  backgroundCategories: BackgroundCategory[],
): BackgroundCategory | undefined => {
  return backgroundCategories.find((category) => category.code === code);
};

export const mcKeyFormatter = (mixcloudKey: string) => {
  return `/rymixxx/${mixcloudKey}/`;
};

/**
 * Convert duration string (HH:MM:SS) to human readable format
 * e.g. "02:30:45" -> "2 hours, 30 minutes, 45 seconds"
 */
export const convertTimeToHumanReadable = (duration: string): string => {
  const parts = duration.split(":").map(Number);
  if (parts.length !== 3) return duration;

  const [hours, minutes, seconds] = parts;
  const parts_readable = [];

  if (hours > 0) {
    parts_readable.push(`${hours} hour${hours !== 1 ? "s" : ""}`);
  }
  if (minutes > 0) {
    parts_readable.push(`${minutes} minute${minutes !== 1 ? "s" : ""}`);
  }
  if (seconds > 0) {
    parts_readable.push(`${seconds} second${seconds !== 1 ? "s" : ""}`);
  }

  if (parts_readable.length === 0) return "0 seconds";
  if (parts_readable.length === 1) return parts_readable[0];
  if (parts_readable.length === 2) return parts_readable.join(" and ");

  return (
    parts_readable.slice(0, -1).join(", ") +
    ", and " +
    parts_readable[parts_readable.length - 1]
  );
};
