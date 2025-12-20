import React, { useEffect, useState } from "react";
import { convertTimeToHumanReadable } from "utils/functions";

import {
  StyledArrowDropDown,
  StyledArrowDropUp,
  StyledDurationValue,
  StyledErrorMessage,
  StyledLoadingSpinner,
  StyledShowHideBlock,
  StyledStatisticsContainer,
  StyledStatisticsLabel,
  StyledStatisticsList,
  StyledStatisticsListItem,
  StyledStatisticsSection,
  StyledStatisticsSubTitle,
  StyledStatisticsTitle,
  StyledStatisticsValue,
  StyledSummaryList,
} from "./styles";
import type {
  ArtistTrackCount,
  CategoryMixCount,
  PublisherCount,
  RemixArtistTrackCount,
  Stats,
  TagCount,
} from "./types";

export const Statistics: React.FC = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showAllTags, setShowAllTags] = useState<boolean>(false);
  const [showAllArtists, setShowAllArtists] = useState<boolean>(false);
  const [showAllRemixArtists, setShowAllRemixArtists] =
    useState<boolean>(false);
  const [showAllPublishers, setShowAllPublishers] = useState<boolean>(false);

  useEffect(() => {
    const fetchStats = async (): Promise<void> => {
      try {
        const response = await fetch("/api/stats");
        if (!response.ok) {
          throw new Error("Failed to fetch stats");
        }
        const data: Stats = await response.json();
        setStats(data);
      } catch (error_) {
        setError((error_ as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <StyledLoadingSpinner>Loading statistics...</StyledLoadingSpinner>;
  }

  if (error) {
    return <StyledErrorMessage>Error: {error}</StyledErrorMessage>;
  }

  if (!stats) {
    return <StyledErrorMessage>No data available</StyledErrorMessage>;
  }

  const renderCategoryMixCounts = (
    categoryMixCounts: CategoryMixCount[],
  ): React.ReactNode[] =>
    categoryMixCounts
      .filter((item) => item.count > 0)
      .map((item) => (
        <StyledStatisticsListItem key={item.category}>
          <StyledStatisticsLabel>{item.category}</StyledStatisticsLabel>
          <StyledStatisticsValue>{item.count}</StyledStatisticsValue>
        </StyledStatisticsListItem>
      ));

  const renderArtistCounts = (
    artistCounts: ArtistTrackCount[],
  ): React.ReactNode[] =>
    artistCounts.map((item) => (
      <StyledStatisticsListItem key={item.artistName}>
        <StyledStatisticsLabel>{item.artistName}</StyledStatisticsLabel>
        <StyledStatisticsValue>{item.count}</StyledStatisticsValue>
      </StyledStatisticsListItem>
    ));

  const renderRemixArtistCounts = (
    remixArtistCounts: RemixArtistTrackCount[],
  ): React.ReactNode[] =>
    remixArtistCounts.map((item) => (
      <StyledStatisticsListItem key={item.remixArtistName}>
        <StyledStatisticsLabel>{item.remixArtistName}</StyledStatisticsLabel>
        <StyledStatisticsValue>{item.count}</StyledStatisticsValue>
      </StyledStatisticsListItem>
    ));

  const renderPublisherCounts = (
    publisherCounts: PublisherCount[],
  ): React.ReactNode[] =>
    publisherCounts.map((item) => (
      <StyledStatisticsListItem key={item.publisher}>
        <StyledStatisticsLabel>{item.publisher}</StyledStatisticsLabel>
        <StyledStatisticsValue>{item.count}</StyledStatisticsValue>
      </StyledStatisticsListItem>
    ));

  const renderTagCounts = (tagCounts: TagCount[]): React.ReactNode[] =>
    tagCounts.map((item) => (
      <StyledStatisticsListItem key={item.tag}>
        <StyledStatisticsLabel>{item.tag}</StyledStatisticsLabel>
        <StyledStatisticsValue>{item.count}</StyledStatisticsValue>
      </StyledStatisticsListItem>
    ));

  return (
    <StyledStatisticsContainer>
      <StyledStatisticsTitle>Overview</StyledStatisticsTitle>

      <StyledStatisticsSection>
        <StyledSummaryList>
          <StyledStatisticsListItem>
            <StyledStatisticsLabel>Mixes</StyledStatisticsLabel>
            <StyledStatisticsValue>{stats.mixCount}</StyledStatisticsValue>
          </StyledStatisticsListItem>
          <StyledStatisticsListItem>
            <StyledStatisticsLabel>Tracks</StyledStatisticsLabel>
            <StyledStatisticsValue>{stats.trackCount}</StyledStatisticsValue>
          </StyledStatisticsListItem>
          <StyledStatisticsListItem>
            <StyledStatisticsLabel>Total Duration</StyledStatisticsLabel>
            <StyledDurationValue>
              {convertTimeToHumanReadable(stats.totalDuration)}
            </StyledDurationValue>
          </StyledStatisticsListItem>
          <StyledStatisticsListItem>
            <StyledStatisticsLabel>Average Mix</StyledStatisticsLabel>
            <StyledDurationValue>
              {convertTimeToHumanReadable(stats.averageMixDuration)}
            </StyledDurationValue>
          </StyledStatisticsListItem>
        </StyledSummaryList>
      </StyledStatisticsSection>

      <StyledStatisticsSection>
        <StyledStatisticsSubTitle>Categories</StyledStatisticsSubTitle>
        <StyledStatisticsList>
          {renderCategoryMixCounts(stats.categoryMixCounts)}
        </StyledStatisticsList>
      </StyledStatisticsSection>

      <StyledStatisticsSection>
        <StyledStatisticsSubTitle>
          {showAllTags ? "All Tags" : "Top 10 Tags"}
        </StyledStatisticsSubTitle>
        <StyledStatisticsList>
          {renderTagCounts(
            showAllTags ? stats.tagCounts : stats.top10TagCounts,
          )}
        </StyledStatisticsList>
        <StyledShowHideBlock onClick={() => setShowAllTags(!showAllTags)}>
          {showAllTags ? (
            <>
              Reduce to top 10 tags <StyledArrowDropUp />
            </>
          ) : (
            <>
              Show all tags <StyledArrowDropDown />
            </>
          )}
        </StyledShowHideBlock>
      </StyledStatisticsSection>

      <StyledStatisticsSection>
        <StyledStatisticsSubTitle>
          {showAllArtists ? "All Artists" : "Top 10 Artists"}
        </StyledStatisticsSubTitle>
        <StyledStatisticsList>
          {renderArtistCounts(
            showAllArtists
              ? stats.artistTrackCounts
              : stats.top10ArtistTrackCounts,
          )}
        </StyledStatisticsList>
        <StyledShowHideBlock onClick={() => setShowAllArtists(!showAllArtists)}>
          {showAllArtists ? (
            <>
              Reduce to top 10 artists <StyledArrowDropUp />
            </>
          ) : (
            <>
              Show all artists <StyledArrowDropDown />
            </>
          )}
        </StyledShowHideBlock>
      </StyledStatisticsSection>

      <StyledStatisticsSection>
        <StyledStatisticsSubTitle>
          {showAllRemixArtists ? "All Remix Artists" : "Top 10 Remix Artists"}
        </StyledStatisticsSubTitle>
        <StyledStatisticsList>
          {renderRemixArtistCounts(
            showAllRemixArtists
              ? stats.remixArtistTrackCounts
              : stats.top10RemixArtistTrackCounts,
          )}
        </StyledStatisticsList>
        <StyledShowHideBlock
          onClick={() => setShowAllRemixArtists(!showAllRemixArtists)}
        >
          {showAllRemixArtists ? (
            <>
              Reduce to top 10 remix artists <StyledArrowDropUp />
            </>
          ) : (
            <>
              Show all remix artists <StyledArrowDropDown />
            </>
          )}
        </StyledShowHideBlock>
      </StyledStatisticsSection>

      <StyledStatisticsSection>
        <StyledStatisticsSubTitle>
          {showAllPublishers ? "All Publishers" : "Top 10 Publishers"}
        </StyledStatisticsSubTitle>
        <StyledStatisticsList>
          {renderPublisherCounts(
            showAllPublishers
              ? stats.publisherCounts
              : stats.top10PublisherCounts,
          )}
        </StyledStatisticsList>
        <StyledShowHideBlock
          onClick={() => setShowAllPublishers(!showAllPublishers)}
        >
          {showAllPublishers ? (
            <>
              Reduce to top 10 publishers <StyledArrowDropUp />
            </>
          ) : (
            <>
              Show all publishers <StyledArrowDropDown />
            </>
          )}
        </StyledShowHideBlock>
      </StyledStatisticsSection>
    </StyledStatisticsContainer>
  );
};

export default Statistics;
