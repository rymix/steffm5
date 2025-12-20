import styled from "styled-components";

interface ThemeProps {
  $themeMode: "light" | "dark";
}

export const StyledFilterStatus = styled.div<ThemeProps>`
  padding: 16px;
  background-color: ${(props) =>
    props.$themeMode === "dark" ? "#2a2a2a" : "#e8e8e8"};
  border: 1px solid
    ${(props) => (props.$themeMode === "dark" ? "#404040" : "#c0c0c0")};
  border-radius: 6px;
  margin-bottom: 16px;
  border-left: 4px solid #4a9f4a;

  h4 {
    margin: 0 0 12px 0;
    color: ${(props) => (props.$themeMode === "dark" ? "#c8c8c8" : "#3a3a3a")};
    font-size: 14px;
    font-weight: 600;
  }
`;

export const StyledFilterStatusItem = styled.div<ThemeProps>`
  display: inline-block;
  margin: 3px 8px 3px 0;
  padding: 6px 12px;
  background-color: #4a9f4a;
  color: white;
  border-radius: 14px;
  font-size: 12px;
  font-weight: 500;

  strong {
    text-transform: capitalize;
  }
`;
