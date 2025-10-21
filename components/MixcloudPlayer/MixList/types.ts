import type { MixProgressStatus } from "contexts/mixcloud/types";

export type MixcloudPlayerMixListProps = Record<string, never>;

export type StyledMixcloudPlayerMixListItemProps = {
  $isCurrent: boolean;
};

export type StyledMixcloudPlayerMixListProgressBarProps = {
  $progress: number; // 0-100
};

export type StyledMixcloudPlayerMixListStatusDotProps = {
  $status: MixProgressStatus;
};
