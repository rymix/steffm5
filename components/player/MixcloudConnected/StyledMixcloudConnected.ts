import styled from "styled-components";

import type { StyledMixcloudConnectedProps } from "components/player/MixcloudConnected/types";

export const StyledMixcloudConnectedWrapper = styled.div``;

export const StyledMixcloudConnected = styled.div<StyledMixcloudConnectedProps>`
  width: 10px;
  height: 10px;
  margin: 0 1px 0 0;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.2);
  outline: 2.5px solid rgba(16, 11, 7, 0.8);

  position: relative;
  top: 4px;
  transition:
    background-color 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;

  /* Connected state: green, disconnected: grey */
  background: ${(props) =>
    props.$connected ? "rgba(97, 187, 105, 1)" : "rgba(111, 111, 111, 1)"};

  /* Add glow effect when connected */
  ${(props) =>
    props.$connected &&
    `
    box-shadow: 0 0 6px 2px rgba(78, 169, 85, 0.6);
  `}

  /* Light highlight effect */
  &::before {
    content: "";
    position: absolute;
    top: 1px;
    left: 1px;
    width: 4px;
    height: 4px;
    background-color: ${(props) =>
      props.$connected
        ? "rgba(255, 255, 255, 0.6)"
        : "rgba(255, 255, 255, 0.3)"};
    border-radius: 50%;
  }
`;
