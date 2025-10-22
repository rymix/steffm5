import type { MixProgressStatus } from "contexts/mixcloud/types";

export type MixcloudPlayerMixListProps = Record<string, never>;

export type StyledMixListItemProps = {
  $isCurrent: boolean;
};

export type StyledMixListProgressBarProps = {
  $progress: number; // 0-100
};

export type StyledMixListStatusDotProps = {
  $status: MixProgressStatus;
};
