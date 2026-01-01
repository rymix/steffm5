import type { MixProgressStatus } from "contexts/mixcloud/types";

export type StyledMixListItemProps = {
  $isCurrent: boolean;
  $isExpanded?: boolean;
};

export type StyledMixListProgressBarProps = {
  $progress: number; // 0-100
};

export type StyledMixListStatusDotProps = {
  $status: MixProgressStatus;
};
