import styled from "styled-components";

import type {
  StyledJupiterProgressLedProps,
  StyledJupiterProgressLedsItemsWrapperProps,
} from "components/Jupiter/ProgressLeds/types";

export const StyledManualProgressLedsWrapper = styled.div``;

export const StyledManualProgressLedsItemsWrapper = styled.div<StyledJupiterProgressLedsItemsWrapperProps>`
  display: flex;
  gap: 10px;
`;

export const StyledManualProgressLed = styled.div<StyledJupiterProgressLedProps>`
  background: ${(props) => (props.$on ? "rgba(0, 0, 0, 0.8)" : "transparent")};
  border: 2px solid rgba(0, 0, 0, 0.8);
  border-radius: 50%;
  height: 10px;
  position: relative;
  transition:
    background-color 0.1s ease-in-out,
    box-shadow 0.1s ease-in-out,
    transform 0.1s ease-in-out;
  width: 10px;
`;

export const StyledManualProgressLedsLabels = styled.div`
  color: rgba(0, 0, 0, 0.8);
  font-size: 12px;
  position: relative;
  width: 100%;
  height: 20px;
  display: flex;
  justify-content: space-between;

  div {
    position: absolute;
    bottom: 0;
    transform: translateX(-50%);
  }

  div:nth-child(1) {
    left: 0%;
  }

  div:nth-child(2) {
    left: 25%;
  }

  div:nth-child(3) {
    left: 50%;
  }

  div:nth-child(4) {
    left: 75%;
  }

  div:nth-child(5) {
    left: 100%;
  }
`;
