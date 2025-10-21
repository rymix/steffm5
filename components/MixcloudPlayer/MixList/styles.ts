import styled from "styled-components";

import type {
  StyledMixcloudPlayerMixListItemProps,
  StyledMixcloudPlayerMixListProgressBarProps,
  StyledMixcloudPlayerMixListStatusDotProps,
} from "./types";

export const StyledMixcloudPlayerMixList = styled.div`
  ul {
    list-style: none;
    padding: 0;
  }
`;

export const StyledMixcloudPlayerMixListItem = styled.li<StyledMixcloudPlayerMixListItemProps>`
  padding: 10px;
  margin: 5px 0;
  background-color: ${(props) => (props.$isCurrent ? "#e0e0e0" : "#f5f5f5")};
  cursor: pointer;
  border-radius: 4px;
  position: relative;
`;

export const StyledMixcloudPlayerMixListItemContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
`;

export const StyledMixcloudPlayerMixListItemInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const StyledMixcloudPlayerMixListStatusDot = styled.div<StyledMixcloudPlayerMixListStatusDotProps>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${(props) => {
    switch (props.$status) {
      case "unplayed":
        return "#2196f3"; // Blue
      case "in_progress":
        return "#ff9800"; // Orange
      case "complete":
        return "#4caf50"; // Green
      default:
        return "#9e9e9e"; // Gray
    }
  }};
  flex-shrink: 0;
`;

export const StyledMixcloudPlayerMixListProgressBarContainer = styled.div`
  width: 100%;
  height: 4px;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  overflow: hidden;
`;

export const StyledMixcloudPlayerMixListProgressBar = styled.div<StyledMixcloudPlayerMixListProgressBarProps>`
  height: 100%;
  background-color: #2196f3;
  border-radius: 2px;
  width: ${(props) => props.$progress}%;
  transition: width 0.3s ease;
`;
