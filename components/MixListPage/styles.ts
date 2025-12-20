import styled from "styled-components";

interface ThemeProps {
  $themeMode: "light" | "dark";
}

export const StyledMixListPage = styled.div<ThemeProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: ${(props) =>
    props.$themeMode === "dark" ? "#1a1a1a" : "#f5f5f5"};
  padding: 20px;
  max-height: 70vh;
  overflow-y: auto;

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

export const StyledMixListPageHeader = styled.div<ThemeProps>`
  margin-bottom: 16px;
  flex-shrink: 0;

  h2 {
    margin: 0 0 8px 0;
    color: ${(props) => (props.$themeMode === "dark" ? "#e8e8e8" : "#2a2a2a")};
    font-size: 1.25rem;
    font-weight: 600;
  }

  p {
    margin: 0;
    color: ${(props) => (props.$themeMode === "dark" ? "#a8a8a8" : "#5a5a5a")};
    font-size: 0.875rem;
  }
`;

export const StyledMixListPageFilters = styled.div<ThemeProps>`
  position: sticky;
  top: -20px;
  z-index: 10;
  background: ${(props) =>
    props.$themeMode === "dark" ? "#1a1a1a" : "#f5f5f5"};
  border-bottom: 2px solid
    ${(props) => (props.$themeMode === "dark" ? "#3a3a3a" : "#d0d0d0")};
  margin-bottom: 16px;
  padding-bottom: 12px;
  flex-shrink: 0;
`;

export const StyledMixListPageContent = styled.div`
  display: flex;
  flex-direction: column;
`;
