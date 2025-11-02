import styled from "styled-components";

import type {
  StyledMixListItemProps,
  StyledMixListProgressBarProps,
  StyledMixListStatusDotProps,
} from "./types";

export const StyledMixList = styled.div`
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
`;

export const StyledMixListItem = styled.li<StyledMixListItemProps>`
  margin: 5px 0;
  background-color: ${(props) => (props.$isCurrent ? "#e0e0e0" : "#f5f5f5")};
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  transition: all 0.2s ease;

  ${(props) =>
    props.$isExpanded &&
    `
    background-color: ${props.$isCurrent ? "#d5d5d5" : "#ebebeb"};
  `}
`;

export const StyledMixListItemContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
`;

export const StyledMixListItemInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const StyledMixListStatusDot = styled.div<StyledMixListStatusDotProps>`
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

export const StyledMixListProgressBarContainer = styled.div`
  width: 100%;
  height: 4px;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  overflow: hidden;
`;

export const StyledMixListProgressBar = styled.div<StyledMixListProgressBarProps>`
  height: 100%;
  background-color: #2196f3;
  border-radius: 2px;
  width: ${(props) => props.$progress}%;
  transition: width 0.3s ease;
`;

export const StyledHoverControls = styled.div`
  display: flex;
  gap: 4px;
  opacity: 0;
  transition: opacity 0.2s ease;
`;

export const StyledMixHeader = styled.div`
  padding: 10px;
  cursor: pointer;

  /* Show control buttons on hover */
  &:hover ${StyledHoverControls} {
    opacity: 1;
  }
`;

export const StyledExpandButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 12px;
  padding: 4px 6px;
  border-radius: 3px;
  color: #666;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    color: #333;
  }
`;

export const StyledMixDetails = styled.div`
  padding: 0 10px 15px 10px;
  background-color: rgba(0, 0, 0, 0.02);
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  animation: slideDown 0.2s ease;

  @keyframes slideDown {
    from {
      opacity: 0;
      max-height: 0;
    }

    to {
      opacity: 1;
      max-height: 500px;
    }
  }
`;

export const StyledDetailRow = styled.div`
  margin: 6px 0;
  font-size: 12px;
  display: flex;
  gap: 8px;

  strong {
    min-width: 80px;
    color: #333;
  }
`;

export const StyledLoadTracksButton = styled.button`
  background-color: #2196f3;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #1976d2;
  }
`;

export const StyledTrackList = styled.div`
  margin-top: 12px;
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 8px;
  background-color: white;
`;

export const StyledTrackItem = styled.div`
  padding: 6px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);

  &:last-child {
    border-bottom: none;
  }
`;

export const StyledMixTitle = styled.div`
  font-weight: bold;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const StyledPlayingIcon = styled.span`
  font-size: 16px;
`;

export const StyledMixMetadata = styled.div`
  font-size: 12px;
  color: #666;
  margin-top: 2px;
`;

export const StyledControlsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const StyledControlButton = styled.button<{
  $variant?: "play" | "resume" | "restart" | "pause";
}>`
  font-size: 12px;
  padding: 2px 6px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  color: white;
  background-color: ${(props) => {
    switch (props.$variant) {
      case "play":
        return "#4caf50";
      case "resume":
        return "#ff9800";
      case "restart":
        return "#2196f3";
      case "pause":
        return "#f44336";
      default:
        return "#666";
    }
  }};
`;

export const StyledCurrentMixStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const StyledPausedText = styled.span`
  font-size: 12px;
  color: #666;
`;

export const StyledLoadingText = styled.span`
  font-size: 12px;
  color: #007bff;
  font-weight: 500;
`;

export const StyledToggleIcon = styled.span`
  font-size: 16px;
  cursor: pointer;
  user-select: none;
  min-width: 20px;
  text-align: center;
`;
