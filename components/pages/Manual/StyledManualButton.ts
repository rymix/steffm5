import styled from "styled-components";

interface ThemeProps {
  $themeMode?: "light" | "dark";
}

export const StyledManualButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
`;

export const StyledManualButton = styled.div<ThemeProps>`
  position: relative;
  width: 60px;
  height: 26px;
  border: 2px solid
    ${(props) =>
      props.$themeMode === "dark" ? "#e8e8e8" : "rgba(0, 0, 0, 0.8)"};
  border-radius: 2px;
  background: ${(props) =>
    props.$themeMode === "dark" ? "#2a2a2a" : "#f5f5f5"};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledManualLed = styled.div<ThemeProps>`
  width: 36px;
  height: 4px;
  background: ${(props) =>
    props.$themeMode === "dark" ? "#e8e8e8" : "rgba(0, 0, 0, 0.8)"};
  border-radius: 1px;
`;

export const StyledManualButtonLabel = styled.div<ThemeProps>`
  font-size: 8px;
  font-weight: bold;
  color: ${(props) => (props.$themeMode === "dark" ? "#e8e8e8" : "#2a2a2a")};
  text-transform: uppercase;
  letter-spacing: 0.3px;
  text-align: center;
`;
