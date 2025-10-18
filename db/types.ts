export type Track = {
  artistName: string;
  coverArtDate: string;
  coverArtLarge: string;
  coverArtSmall: string;
  localCoverArtLarge: string;
  localCoverArtSmall: string;
  publisher: string;
  remixArtistName?: string;
  sectionNumber: number;
  startTime: string;
  trackName: string;
};

export type Category = {
  index: number;
  code: string;
  name: string;
  shortName: string;
  x: number;
  y: number;
};

export type Mix = {
  category: Category["code"];
  coverArtDate: string;
  coverArtLarge: string;
  coverArtSmall: string;
  duration: string;
  fileName: string;
  listOrder: number;
  mixcloudKey: string;
  name: string;
  notes?: string;
  releaseDate: string;
  uploadedDate: string;
  shortName: string;
  tags: string[];
  tracks: Track[];
};

export type BackgroundCategory = {
  code: string;
  name: string;
  folder: string;
  type: string;
  order: number;
};

export type Background = {
  backgroundCategory: Category["code"];
  name: string;
  fileName: string;
  tileType: string;
  width: number;
  height: number;
};

export type BackgroundExtended = Background & {
  backgroundCategoryObject: BackgroundCategory;
};

export type Database = {
  backgroundCategories: BackgroundCategory[];
  backgrounds: Background[];
  categories: Category[];
  mixes: Mix[];
};

export type UnknownTrack = Track & {
  mixcloudKey: string;
  mixName: string;
  mixCoverArt: string;
};
