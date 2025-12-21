import styled from "styled-components";

import { StyledMixFilterFormButtonProps } from "./types";

interface ThemeProps {
  $themeMode: "light" | "dark";
}

export const StyledMixFilter = styled.div<ThemeProps>`
  padding: 16px;
  background-color: ${(props) =>
    props.$themeMode === "dark" ? "#2a2a2a" : "#e8e8e8"};
  border: 1px solid
    ${(props) => (props.$themeMode === "dark" ? "#404040" : "#c0c0c0")};
  border-radius: 6px;
  margin-bottom: 16px;
`;

export const StyledMixFilterForm = styled.form`
  width: 100%;
`;

export const StyledMixFilterFormElements = styled.div<ThemeProps>`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 12px;

  select,
  input {
    margin-left: 4px;
    padding: 6px 8px;
    font-size: 13px;
    border: 1px solid
      ${(props) => (props.$themeMode === "dark" ? "#505050" : "#b0b0b0")};
    border-radius: 4px;
    background: ${(props) =>
      props.$themeMode === "dark" ? "#1a1a1a" : "#fafafa"};
    color: ${(props) => (props.$themeMode === "dark" ? "#e8e8e8" : "#2a2a2a")};

    &:focus {
      outline: 2px solid #4a9f4a;
      outline-offset: 1px;
      border-color: #4a9f4a;
    }
  }

  label {
    font-size: 13px;
    font-weight: 500;
    color: ${(props) => (props.$themeMode === "dark" ? "#c8c8c8" : "#3a3a3a")};
  }

  > div {
    display: flex;
    align-items: center;
    min-width: 0;
  }
`;

export const StyledMixFilterFormButtons = styled.div`
  display: flex;
  gap: 8px;
`;

interface StyledMixFilterFormButtonAllProps
  extends StyledMixFilterFormButtonProps,
    ThemeProps {}

export const StyledMixFilterFormButton = styled.button<StyledMixFilterFormButtonAllProps>`
  padding: 8px 16px;
  background-color: #4a9f4a;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  cursor: ${(props) => (props.$isLoadingMixes ? "not-allowed" : "pointer")};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${(props) =>
      props.$isLoadingMixes ? "#4a9f4a" : "#3a8f3a"};
  }

  &:active {
    background-color: #2a7f2a;
  }
`;

export const StyledMixFilterActiveFilters = styled.div`
  margin-top: 15px;
  font-size: 14px;
  color: #4a4a4a;
`;

export const StyledTagContainer = styled.div<ThemeProps>`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
  max-height: 120px;
  overflow-y: auto;
  padding: 4px;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: ${(props) =>
      props.$themeMode === "dark" ? "#2a2a2a" : "#d8d8d8"};
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${(props) =>
      props.$themeMode === "dark" ? "#404040" : "#a8a8a8"};
    border-radius: 3px;

    &:hover {
      background: ${(props) =>
        props.$themeMode === "dark" ? "#505050" : "#888888"};
    }
  }
`;

interface StyledTagLozengeProps extends ThemeProps {
  $isSelected: boolean;
}

export const StyledTagLozenge = styled.button<StyledTagLozengeProps>`
  background-color: ${(props) => {
    if (props.$isSelected) return "#4a9f4a";
    return props.$themeMode === "dark" ? "#3a3a3a" : "#d8d8d8";
  }};
  color: ${(props) => {
    if (props.$isSelected) return "white";
    return props.$themeMode === "dark" ? "#c8c8c8" : "#3a3a3a";
  }};
  border: 1px solid
    ${(props) => {
      if (props.$isSelected) return "#3a8f3a";
      return props.$themeMode === "dark" ? "#505050" : "#b0b0b0";
    }};
  border-radius: 12px;
  padding: 4px 10px;
  font-size: 11px;
  font-weight: 500;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease;
  white-space: nowrap;
  min-width: fit-content;
  height: 24px;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${(props) => {
      if (props.$isSelected) return "#3a8f3a";
      return props.$themeMode === "dark" ? "#4a4a4a" : "#c8c8c8";
    }};
    border-color: ${(props) => {
      if (props.$isSelected) return "#2a7f2a";
      return props.$themeMode === "dark" ? "#606060" : "#9a9a9a";
    }};
  }

  &:focus {
    outline: 2px solid #4a9f4a;
    outline-offset: 1px;
  }
`;

export const StyledFilterTitle = styled.h4<ThemeProps>`
  margin: 0 0 8px 0;
  font-size: 14px;
  color: ${(props) => (props.$themeMode === "dark" ? "#a8a8a8" : "#495057")};
`;

export const StyledTagsFlexContainer = styled.div`
  flex: 1 1 100%;
`;

export const StyledTagsHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const StyledToggleTagsButton = styled.button<ThemeProps>`
  background: none;
  border: 1px solid
    ${(props) => (props.$themeMode === "dark" ? "#404040" : "#ccc")};
  border-radius: 4px;
  padding: 2px 8px;
  font-size: 11px;
  cursor: pointer;
  color: ${(props) => (props.$themeMode === "dark" ? "#c8c8c8" : "inherit")};

  &:hover {
    background: ${(props) =>
      props.$themeMode === "dark" ? "#3a3a3a" : "#f0f0f0"};
  }
`;

export const StyledSelectedTagIndicator = styled.span`
  font-size: 12px;
  color: #4a9f4a;
  font-weight: bold;
`;
