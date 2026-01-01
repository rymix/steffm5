import styled from "styled-components";

interface StyledAboutProps {
  $themeMode: "light" | "dark";
}

export const StyledAbout = styled.div<StyledAboutProps>`
  padding: 30px;
  max-height: 70vh;
  overflow-y: auto;
  background: ${(props) =>
    props.$themeMode === "dark" ? "#1a1a1a" : "#f5f5f5"};
  text-align: left;
  color: ${(props) => (props.$themeMode === "dark" ? "#d8d8d8" : "#3a3a3a")};

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

  h2 {
    font-size: 28px;
    font-weight: 600;
    margin: 0 0 12px 0;
    color: ${(props) => (props.$themeMode === "dark" ? "#e8e8e8" : "#2a2a2a")};
    border-bottom: 2px solid
      ${(props) => (props.$themeMode === "dark" ? "#3a3a3a" : "#d0d0d0")};
    padding-bottom: 12px;
  }

  h3 {
    font-size: 20px;
    font-weight: 600;
    margin: 32px 0 16px 0;
    color: ${(props) => (props.$themeMode === "dark" ? "#e8e8e8" : "#2a2a2a")};
    border-bottom: 2px solid
      ${(props) => (props.$themeMode === "dark" ? "#3a3a3a" : "#d0d0d0")};
    padding-bottom: 8px;
  }

  h4 {
    font-size: 14px;
    font-weight: 500;
    margin: 0 0 24px 0;
    color: ${(props) => (props.$themeMode === "dark" ? "#a8a8a8" : "#7a7a7a")};
    font-style: italic;
  }

  p {
    line-height: 1.7;
    margin: 0 0 20px 0;
    color: ${(props) => (props.$themeMode === "dark" ? "#c8c8c8" : "#4a4a4a")};
    font-size: 15px;
  }

  a {
    color: #4a9f4a;
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: #2a7f2a;
      text-decoration: underline;
    }
  }

  ul {
    margin: 0 0 20px 20px;
    padding: 0;
  }

  li {
    list-style-type: disc;
    margin: 0 0 16px 0;
    color: ${(props) => (props.$themeMode === "dark" ? "#c8c8c8" : "#4a4a4a")};
    line-height: 1.6;
  }
`;

export const StyledImage = styled.img`
  width: 100%;
  max-width: 800px;
  height: auto;
  border-radius: 8px;
  margin: 24px 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  border: 1px solid #d0d0d0;
`;
