import styled from "styled-components";

import type { StyledMixcloudPlayerMixListItemProps } from "./types";

export const StyledMixcloudPlayerMixList = styled.div`
  ul {
    list-style: none;
    padding: 0;
  }
`;

export const StyledMixcloudPlayerMixListItem = styled.li<StyledMixcloudPlayerMixListItemProps>`
  padding: 10px;
  margin: 5px 0;
  background-color: ${(props) => (props.$isCurrent ? "#e0e0e0" : "#f5f5f5")};
  cursor: pointer;
  border-radius: 4px;
`;
