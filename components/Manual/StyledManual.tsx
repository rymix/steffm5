import React from "react";
import styled from "styled-components";

interface ThemeProps {
  $themeMode: "light" | "dark";
}

export const StyledManual = styled.div<ThemeProps>`
  color: ${(props) => (props.$themeMode === "dark" ? "#e8e8e8" : "#2a2a2a")};
  display: block;
  text-align: left;
  width: 100%;
  padding: 0 30px;

  @media (max-width: 640px) {
    padding: 0;
  }

  a {
    color: ${(props) => (props.$themeMode === "dark" ? "#c8c8c8" : "#3a3a3a")};

    &:hover {
      color: ${(props) =>
        props.$themeMode === "dark" ? "#ffffff" : "#000000"};
    }
  }

  hr {
    border-top: 3px solid
      ${(props) => (props.$themeMode === "dark" ? "#505050" : "#c0c0c0")};
    margin: 30px 0;
  }

  h2 {
    font-size: 36px;
    margin: 0 0 20px 0;
  }

  h3 {
    font-size: 24px;
    margin: 20px 0;
  }

  h4 {
    font-size: 16px;
    margin: 0 0 20px 0;
  }

  p {
    line-height: 1.6;
    margin: 0 0 20px 0;
  }

  ul {
    margin: 20px 0 20px 20px;
  }

  li {
    list-style-type: square;
    margin: 0 0 6px 0;
  }
`;

export const StyledManualTitle = styled.div`
  display: block;
  font-family: "Lexend", sans-serif;
  font-size: 92px;
  font-weight: 700;
  flex-shrink: 0;
`;

export const StyledManualSubTitle = styled.div`
  display: block;
  font-size: 54px;
  flex-shrink: 0;
`;

export const StyledManualFooter = styled.div`
  display: block;
  font-family: "Lexend", sans-serif;
  font-size: 64px;
  font-weight: 700;
  flex-shrink: 0;
  text-align: right;
`;

export const StyledManualSectionTitle = styled.div`
  display: block;
  font-size: 34px;
  flex-shrink: 0;
  margin-top: 40px;
`;

export const StyledWarningIcon = styled.span<ThemeProps>`
  display: inline-block;
  width: 48px;
  height: 48px;

  svg {
    width: 100%;
    height: 100%;

    path,
    line {
      stroke: ${(props) =>
        props.$themeMode === "dark" ? "#e8e8e8" : "#2a2a2a"};
    }

    circle {
      fill: ${(props) => (props.$themeMode === "dark" ? "#e8e8e8" : "#2a2a2a")};
    }
  }
`;

interface CautionIconProps {
  $themeMode?: "light" | "dark";
}

export const CautionIcon: React.FC<CautionIconProps> = ({
  $themeMode = "light",
}) => (
  <StyledWarningIcon $themeMode={$themeMode}>
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M24 4L44 40H4L24 4Z"
        strokeWidth="2.5"
        strokeLinejoin="miter"
        fill="none"
      />
      <line
        x1="24"
        y1="16"
        x2="24"
        y2="28"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="24" cy="34" r="1.5" />
    </svg>
  </StyledWarningIcon>
);

export const StyledIconSection = styled.p`
  align-items: center;
  display: flex;
  font-weight: bold;
  gap: 20px;
`;

export const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  gap: 10px;
  padding: 10px;
`;

export const StyledGridHeader = styled.div`
  font-weight: bold;
  padding: 5px;
  text-align: right;
`;

export const StyledGridDetail = styled.div`
  padding: 5px;
`;

export const StyledControl = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  margin: 10px 0 30px 0;
`;
