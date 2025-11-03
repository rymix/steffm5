export interface CategoryMixCount {
  category: string;
  count: number;
}

export interface ArtistTrackCount {
  artistName: string;
  count: number;
}

export interface RemixArtistTrackCount {
  remixArtistName: string;
  count: number;
}

export interface PublisherCount {
  publisher: string;
  count: number;
}

export interface TagCount {
  tag: string;
  count: number;
}

export interface Stats {
  artistTrackCounts: ArtistTrackCount[];
  averageMixDuration: string;
  categoryMixCounts: CategoryMixCount[];
  mixCount: number;
  publisherCounts: PublisherCount[];
  remixArtistTrackCounts: RemixArtistTrackCount[];
  tagCounts: TagCount[];
  top10ArtistTrackCounts: ArtistTrackCount[];
  top10PublisherCounts: PublisherCount[];
  top10RemixArtistTrackCounts: RemixArtistTrackCount[];
  top10TagCounts: TagCount[];
  totalDuration: string;
  trackCount: number;
}
