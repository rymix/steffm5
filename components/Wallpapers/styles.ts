import styled from "styled-components";

interface ThemeProps {
  $themeMode: "light" | "dark";
}

export const StyledWallpapersContainer = styled.div`
  width: 100%;
`;

export const StyledMonitorDisplay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  overflow: hidden;
`;

export const StyledControlsContainer = styled.div<ThemeProps>`
  padding: 20px;
  border-top: 1px solid
    ${(props) => (props.$themeMode === "dark" ? "#404040" : "#ddd")};
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const StyledNavigationButtons = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const StyledButton = styled.button<ThemeProps>`
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 6px;
  border: 2px solid
    ${(props) => (props.$themeMode === "dark" ? "#404040" : "#c0c0c0")};
  background: ${(props) =>
    props.$themeMode === "dark" ? "#2a2a2a" : "#e8e8e8"};
  color: ${(props) => (props.$themeMode === "dark" ? "#e8e8e8" : "#2a2a2a")};
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);

  &:hover {
    background: ${(props) =>
      props.$themeMode === "dark" ? "#3a3a3a" : "#b8b8b8"};
    border-color: ${(props) =>
      props.$themeMode === "dark" ? "#505050" : "#989898"};
    transform: scale(1.02);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const StyledSelectContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const StyledLabel = styled.label<ThemeProps>`
  margin-right: 10px;
  font-weight: bold;
  color: ${(props) => (props.$themeMode === "dark" ? "#e8e8e8" : "#2a2a2a")};
`;

export const StyledSelect = styled.select<ThemeProps>`
  padding: 8px 12px;
  font-size: 14px;
  border-radius: 4px;
  border: 1px solid
    ${(props) => (props.$themeMode === "dark" ? "#404040" : "#ccc")};
  background: ${(props) => (props.$themeMode === "dark" ? "#2a2a2a" : "#fff")};
  color: ${(props) => (props.$themeMode === "dark" ? "#e8e8e8" : "#2a2a2a")};
  min-width: 200px;

  option {
    background: ${(props) =>
      props.$themeMode === "dark" ? "#2a2a2a" : "#fff"};
    color: ${(props) => (props.$themeMode === "dark" ? "#e8e8e8" : "#2a2a2a")};
  }
`;

export const StyledLoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 455px;
`;

export const StyledLoadingText = styled.span<ThemeProps>`
  color: ${(props) => (props.$themeMode === "dark" ? "#a8a8a8" : "#666")};
`;
