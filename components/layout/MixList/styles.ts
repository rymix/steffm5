import styled from "styled-components";

import type {
  StyledMixListItemProps,
  StyledMixListProgressBarProps,
  StyledMixListStatusDotProps,
} from "./types";

interface ThemeProps {
  $themeMode: "light" | "dark";
}

export const StyledMixList = styled.div<ThemeProps>`
  color: ${(props) => (props.$themeMode === "dark" ? "#e8e8e8" : "#2a2a2a")};

  h4 {
    color: ${(props) => (props.$themeMode === "dark" ? "#c8c8c8" : "#3a3a3a")};
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
`;

interface StyledMixListItemAllProps
  extends StyledMixListItemProps,
    ThemeProps {}

export const StyledMixListItem = styled.li<StyledMixListItemAllProps>`
  margin: 8px 0;
  background-color: ${(props) => {
    if (props.$themeMode === "dark") {
      return props.$isCurrent ? "#3a3a3a" : "#2a2a2a";
    }
    return props.$isCurrent ? "#d8d8d8" : "#e8e8e8";
  }};
  border: 1px solid
    ${(props) => {
      if (props.$themeMode === "dark") {
        return props.$isCurrent ? "#505050" : "#404040";
      }
      return props.$isCurrent ? "#b0b0b0" : "#c0c0c0";
    }};
  border-radius: 6px;
  position: relative;
  overflow: hidden;
  transition: all 0.2s ease;

  ${(props) =>
    props.$isExpanded &&
    `
    background-color: ${
      props.$themeMode === "dark"
        ? props.$isCurrent
          ? "#424242"
          : "#343434"
        : props.$isCurrent
          ? "#d0d0d0"
          : "#e0e0e0"
    };
    border-color: ${
      props.$themeMode === "dark"
        ? props.$isCurrent
          ? "#585858"
          : "#4a4a4a"
        : props.$isCurrent
          ? "#a0a0a0"
          : "#b0b0b0"
    };
  `}

  &:hover {
    border-color: ${(props) => {
      if (props.$themeMode === "dark") {
        return props.$isCurrent ? "#606060" : "#505050";
      }
      return props.$isCurrent ? "#9a9a9a" : "#a8a8a8";
    }};
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

interface StyledMixListStatusDotAllProps
  extends StyledMixListStatusDotProps,
    ThemeProps {}

export const StyledMixListStatusDot = styled.div<StyledMixListStatusDotAllProps>`
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
        return props.$themeMode === "dark" ? "#707070" : "#888888"; // Gray
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
          return props.$themeMode === "dark" ? "#606060" : "#787878";
      }
    }};
`;

export const StyledMixListProgressBarContainer = styled.div<ThemeProps>`
  width: 100%;
  height: 5px;
  background-color: ${(props) =>
    props.$themeMode === "dark" ? "#505050" : "#c0c0c0"};
  border-radius: 3px;
  overflow: hidden;
`;

interface StyledMixListProgressBarAllProps
  extends StyledMixListProgressBarProps,
    ThemeProps {}

export const StyledMixListProgressBar = styled.div<StyledMixListProgressBarAllProps>`
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

export const StyledExpandButton = styled.button<ThemeProps>`
  background: ${(props) =>
    props.$themeMode === "dark" ? "#3a3a3a" : "#d0d0d0"};
  border: 1px solid
    ${(props) => (props.$themeMode === "dark" ? "#505050" : "#b0b0b0")};
  cursor: pointer;
  font-size: 11px;
  padding: 5px 10px;
  border-radius: 4px;
  color: ${(props) => (props.$themeMode === "dark" ? "#c8c8c8" : "#3a3a3a")};
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) =>
      props.$themeMode === "dark" ? "#424242" : "#c0c0c0"};
    border-color: ${(props) =>
      props.$themeMode === "dark" ? "#585858" : "#a0a0a0"};
    color: ${(props) => (props.$themeMode === "dark" ? "#d8d8d8" : "#2a2a2a")};
  }
`;

export const StyledMixDetails = styled.div<ThemeProps>`
  padding: 0 12px 16px 12px;
  background-color: ${(props) =>
    props.$themeMode === "dark" ? "#343434" : "#d8d8d8"};
  border-top: 1px solid
    ${(props) => (props.$themeMode === "dark" ? "#4a4a4a" : "#b0b0b0")};
  animation: slide-down 0.2s ease;

  @keyframes slide-down {
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

export const StyledDetailRow = styled.div<ThemeProps>`
  margin: 8px 0;
  font-size: 13px;
  display: flex;
  gap: 10px;
  color: ${(props) => (props.$themeMode === "dark" ? "#c8c8c8" : "#4a4a4a")};

  strong {
    min-width: 90px;
    color: ${(props) => (props.$themeMode === "dark" ? "#d8d8d8" : "#2a2a2a")};
    font-weight: 600;
  }

  span {
    color: ${(props) => (props.$themeMode === "dark" ? "#c8c8c8" : "#4a4a4a")};
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

export const StyledTrackList = styled.div<ThemeProps>`
  margin-top: 12px;
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid
    ${(props) => (props.$themeMode === "dark" ? "#4a4a4a" : "#b0b0b0")};
  border-radius: 4px;
  padding: 10px;
  background-color: ${(props) =>
    props.$themeMode === "dark" ? "#2a2a2a" : "#f5f5f5"};
  color: ${(props) => (props.$themeMode === "dark" ? "#d8d8d8" : "#3a3a3a")};

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${(props) =>
      props.$themeMode === "dark" ? "#1a1a1a" : "#e0e0e0"};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${(props) =>
      props.$themeMode === "dark" ? "#505050" : "#b0b0b0"};
    border-radius: 4px;

    &:hover {
      background: ${(props) =>
        props.$themeMode === "dark" ? "#606060" : "#909090"};
    }
  }
`;

export const StyledTrackItem = styled.div<ThemeProps>`
  padding: 8px 0;
  border-bottom: 1px solid
    ${(props) => (props.$themeMode === "dark" ? "#404040" : "#d0d0d0")};
  font-size: 13px;
  color: ${(props) => (props.$themeMode === "dark" ? "#c8c8c8" : "#3a3a3a")};

  &:last-child {
    border-bottom: none;
  }
`;

export const StyledMixTitle = styled.div<ThemeProps>`
  font-weight: 600;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${(props) => (props.$themeMode === "dark" ? "#d8d8d8" : "#2a2a2a")};
`;

export const StyledPlayingIcon = styled.span`
  font-size: 16px;
  color: #4a9f4a;
`;

export const StyledMixMetadata = styled.div<ThemeProps>`
  font-size: 12px;
  color: ${(props) => (props.$themeMode === "dark" ? "#a8a8a8" : "#5a5a5a")};
  margin-top: 4px;
`;

export const StyledControlsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const StyledControlButton = styled.button<{
  $variant?: "play" | "resume" | "restart" | "pause" | "download";
}>`
  font-size: 11px;
  font-weight: 500;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: white;
  transition: background-color 0.2s ease;
  text-decoration: none;
  display: inline-block;
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
      case "download":
        return "#8b5fbf";
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
        case "download":
          return "#7b4faf";
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

export const StyledPausedText = styled.span<ThemeProps>`
  font-size: 12px;
  color: ${(props) => (props.$themeMode === "dark" ? "#a8a8a8" : "#5a5a5a")};
`;

export const StyledLoadingText = styled.span<ThemeProps>`
  font-size: 12px;
  color: #4a8fc4;
  font-weight: 500;
`;

export const StyledToggleIcon = styled.span<ThemeProps>`
  font-size: 18px;
  cursor: pointer;
  user-select: none;
  min-width: 22px;
  text-align: center;
  color: ${(props) => (props.$themeMode === "dark" ? "#a8a8a8" : "#5a5a5a")};
  transition: color 0.2s ease;

  &:hover {
    color: ${(props) => (props.$themeMode === "dark" ? "#d8d8d8" : "#2a2a2a")};
  }
`;

export const StyledTracksContainer = styled.div`
  margin-top: 12px;
`;

export const StyledTrackListHeader = styled.div`
  font-weight: bold;
  margin-bottom: 8px;
`;

export const StyledTrackName = styled.div`
  font-size: 12px;
  font-weight: bold;
`;

export const StyledTrackArtist = styled.div<ThemeProps>`
  font-size: 11px;
  color: ${(props) => (props.$themeMode === "dark" ? "#a8a8a8" : "#5a5a5a")};
`;

export const StyledTrackLoadingText = styled.div<ThemeProps>`
  font-size: 12px;
  color: ${(props) => (props.$themeMode === "dark" ? "#a8a8a8" : "#5a5a5a")};
`;

export const StyledTrackPlaceholder = styled.div`
  font-size: 12px;
  color: #888888;
  font-style: italic;
`;
