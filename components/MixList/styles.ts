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
  margin: 8px 0;
  background-color: ${(props) => (props.$isCurrent ? "#d8d8d8" : "#e8e8e8")};
  border: 1px solid ${(props) => (props.$isCurrent ? "#b0b0b0" : "#c0c0c0")};
  border-radius: 6px;
  position: relative;
  overflow: hidden;
  transition: all 0.2s ease;

  ${(props) =>
    props.$isExpanded &&
    `
    background-color: ${props.$isCurrent ? "#d0d0d0" : "#e0e0e0"};
    border-color: ${props.$isCurrent ? "#a0a0a0" : "#b0b0b0"};
  `}

  &:hover {
    border-color: ${(props) => (props.$isCurrent ? "#9a9a9a" : "#a8a8a8")};
  }
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
  gap: 10px;
`;

export const StyledMixListStatusDot = styled.div<StyledMixListStatusDotProps>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${(props) => {
    switch (props.$status) {
      case "unplayed":
        return "#4a8fc4"; // Blue
      case "in_progress":
        return "#e89542"; // Orange
      case "complete":
        return "#4a9f4a"; // Green (matching accent)
      default:
        return "#888888"; // Gray
    }
  }};
  flex-shrink: 0;
  border: 2px solid
    ${(props) => {
      switch (props.$status) {
        case "unplayed":
          return "#3a7fb4";
        case "in_progress":
          return "#d88532";
        case "complete":
          return "#3a8f3a";
        default:
          return "#787878";
      }
    }};
`;

export const StyledMixListProgressBarContainer = styled.div`
  width: 100%;
  height: 5px;
  background-color: #c0c0c0;
  border-radius: 3px;
  overflow: hidden;
`;

export const StyledMixListProgressBar = styled.div<StyledMixListProgressBarProps>`
  height: 100%;
  background-color: #4a9f4a;
  border-radius: 3px;
  width: ${(props) => props.$progress}%;
  transition: width 0.3s ease;
`;

export const StyledHoverControls = styled.div`
  display: flex;
  gap: 6px;
  opacity: 0;
  transition: opacity 0.2s ease;
`;

export const StyledMixHeader = styled.div`
  padding: 12px;
  cursor: pointer;

  /* Show control buttons on hover */
  &:hover ${StyledHoverControls} {
    opacity: 1;
  }
`;

export const StyledExpandButton = styled.button`
  background: #d0d0d0;
  border: 1px solid #b0b0b0;
  cursor: pointer;
  font-size: 11px;
  padding: 5px 10px;
  border-radius: 4px;
  color: #3a3a3a;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background-color: #c0c0c0;
    border-color: #a0a0a0;
    color: #2a2a2a;
  }
`;

export const StyledMixDetails = styled.div`
  padding: 0 12px 16px 12px;
  background-color: #d8d8d8;
  border-top: 1px solid #b0b0b0;
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
  margin: 8px 0;
  font-size: 13px;
  display: flex;
  gap: 10px;

  strong {
    min-width: 90px;
    color: #2a2a2a;
    font-weight: 600;
  }

  span {
    color: #4a4a4a;
  }
`;

export const StyledLoadTracksButton = styled.button`
  background-color: #4a9f4a;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #3a8f3a;
  }

  &:active {
    background-color: #2a7f2a;
  }
`;

export const StyledTrackList = styled.div`
  margin-top: 12px;
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid #b0b0b0;
  border-radius: 4px;
  padding: 10px;
  background-color: #f5f5f5;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #e0e0e0;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #b0b0b0;
    border-radius: 4px;

    &:hover {
      background: #909090;
    }
  }
`;

export const StyledTrackItem = styled.div`
  padding: 8px 0;
  border-bottom: 1px solid #d0d0d0;
  font-size: 13px;
  color: #3a3a3a;

  &:last-child {
    border-bottom: none;
  }
`;

export const StyledMixTitle = styled.div`
  font-weight: 600;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 6px;
  color: #2a2a2a;
`;

export const StyledPlayingIcon = styled.span`
  font-size: 16px;
  color: #4a9f4a;
`;

export const StyledMixMetadata = styled.div`
  font-size: 12px;
  color: #5a5a5a;
  margin-top: 4px;
`;

export const StyledControlsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const StyledControlButton = styled.button<{
  $variant?: "play" | "resume" | "restart" | "pause";
}>`
  font-size: 11px;
  font-weight: 500;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: white;
  transition: background-color 0.2s ease;
  background-color: ${(props) => {
    switch (props.$variant) {
      case "play":
        return "#4a9f4a";
      case "resume":
        return "#e89542";
      case "restart":
        return "#4a8fc4";
      case "pause":
        return "#d64444";
      default:
        return "#888888";
    }
  }};

  &:hover {
    background-color: ${(props) => {
      switch (props.$variant) {
        case "play":
          return "#3a8f3a";
        case "resume":
          return "#d88532";
        case "restart":
          return "#3a7fb4";
        case "pause":
          return "#c63434";
        default:
          return "#787878";
      }
    }};
  }
`;

export const StyledCurrentMixStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const StyledPausedText = styled.span`
  font-size: 12px;
  color: #5a5a5a;
`;

export const StyledLoadingText = styled.span`
  font-size: 12px;
  color: #4a8fc4;
  font-weight: 500;
`;

export const StyledToggleIcon = styled.span`
  font-size: 18px;
  cursor: pointer;
  user-select: none;
  min-width: 22px;
  text-align: center;
  color: #5a5a5a;
  transition: color 0.2s ease;

  &:hover {
    color: #2a2a2a;
  }
`;
