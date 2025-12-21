import styled from "styled-components";

interface ThemeProps {
  $themeMode: "light" | "dark";
}

export const StyledContact = styled.div<ThemeProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  text-align: center;

  p {
    font-size: 1.2em;
    margin: 10px 0;
  }

  a {
    color: ${(props) => (props.$themeMode === "dark" ? "#c8c8c8" : "#3a3a3a")};
    text-decoration: none;
    font-weight: 600;
    transition: color 0.3s;

    &:hover {
      color: ${(props) =>
        props.$themeMode === "dark" ? "#ffffff" : "#000000"};
    }
  }
`;
