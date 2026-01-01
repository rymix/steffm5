import styled from "styled-components";

interface ThemeProps {
  $themeMode: "light" | "dark";
}

export const StyledStatisticsContainer = styled.div<ThemeProps>`
  padding: 30px;
  max-height: 70vh;
  overflow-y: auto;
  background: ${(props) =>
    props.$themeMode === "dark" ? "#1a1a1a" : "#f5f5f5"};

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${(props) =>
      props.$themeMode === "dark" ? "#2a2a2a" : "#e0e0e0"};
  }

  &::-webkit-scrollbar-thumb {
    background: ${(props) =>
      props.$themeMode === "dark" ? "#404040" : "#b0b0b0"};
    border-radius: 4px;

    &:hover {
      background: ${(props) =>
        props.$themeMode === "dark" ? "#505050" : "#909090"};
    }
  }
`;

export const StyledStatisticsTitle = styled.h2<ThemeProps>`
  margin: 0 0 24px 0;
  font-size: 24px;
  font-weight: 600;
  color: ${(props) => (props.$themeMode === "dark" ? "#e8e8e8" : "#2a2a2a")};
  border-bottom: 2px solid
    ${(props) => (props.$themeMode === "dark" ? "#3a3a3a" : "#d0d0d0")};
  padding-bottom: 12px;
`;

export const StyledStatisticsSection = styled.div`
  margin-bottom: 32px;
`;

export const StyledStatisticsSubTitle = styled.h3<ThemeProps>`
  margin: 0 0 16px 0;
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => (props.$themeMode === "dark" ? "#e8e8e8" : "#3a3a3a")};
  padding-bottom: 8px;
  border-bottom: 2px solid
    ${(props) => (props.$themeMode === "dark" ? "#3a3a3a" : "#d0d0d0")};
`;

export const StyledSummaryList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 20px;
`;

export const StyledStatisticsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const StyledStatisticsListItem = styled.div<ThemeProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: ${(props) =>
    props.$themeMode === "dark" ? "#2a2a2a" : "#e8e8e8"};
  border: 1px solid
    ${(props) => (props.$themeMode === "dark" ? "#404040" : "#c0c0c0")};
  border-radius: 6px;
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) =>
      props.$themeMode === "dark" ? "#3a3a3a" : "#d8d8d8"};
    border-color: ${(props) =>
      props.$themeMode === "dark" ? "#505050" : "#a0a0a0"};
  }
`;

export const StyledStatisticsLabel = styled.span<ThemeProps>`
  font-size: 14px;
  color: ${(props) => (props.$themeMode === "dark" ? "#c8c8c8" : "#4a4a4a")};
  font-weight: 500;
  flex: 1;
`;

export const StyledStatisticsValue = styled.span<ThemeProps>`
  font-size: 14px;
  color: ${(props) => (props.$themeMode === "dark" ? "#e8e8e8" : "#2a2a2a")};
  font-weight: 600;
  margin-left: 8px;
  font-family: "DSEG14Classic", monospace;
  letter-spacing: 0.5px;
`;

export const StyledDurationValue = styled(StyledStatisticsValue)`
  font-size: 12px;
  line-height: 1.6;
`;

export const StyledShowHideBlock = styled.button<ThemeProps>`
  background: ${(props) =>
    props.$themeMode === "dark" ? "#2a2a2a" : "#e0e0e0"};
  color: ${(props) => (props.$themeMode === "dark" ? "#c8c8c8" : "#4a4a4a")};
  border: 1px solid
    ${(props) => (props.$themeMode === "dark" ? "#404040" : "#c0c0c0")};
  border-radius: 6px;
  padding: 10px 16px;
  margin-top: 12px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) =>
      props.$themeMode === "dark" ? "#3a3a3a" : "#d0d0d0"};
    border-color: ${(props) =>
      props.$themeMode === "dark" ? "#505050" : "#a0a0a0"};
    color: ${(props) => (props.$themeMode === "dark" ? "#ffffff" : "#2a2a2a")};
  }

  &:active {
    background: ${(props) =>
      props.$themeMode === "dark" ? "#404040" : "#c0c0c0"};
  }
`;

export const StyledArrowDropDown = styled.span`
  font-size: 12px;

  &::after {
    content: "▼";
  }
`;

export const StyledArrowDropUp = styled.span`
  font-size: 12px;

  &::after {
    content: "▲";
  }
`;

export const StyledLoadingSpinner = styled.div<ThemeProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  font-size: 16px;
  color: ${(props) => (props.$themeMode === "dark" ? "#a8a8a8" : "#6a6a6a")};
`;

export const StyledErrorMessage = styled.div<ThemeProps>`
  background: ${(props) =>
    props.$themeMode === "dark" ? "#3a1a1a" : "#ffe5e5"};
  color: ${(props) => (props.$themeMode === "dark" ? "#ff6b6b" : "#c62828")};
  border: 1px solid
    ${(props) => (props.$themeMode === "dark" ? "#4a2a2a" : "#ffcccc")};
  border-radius: 6px;
  padding: 12px;
  margin: 20px;
  text-align: center;
`;
