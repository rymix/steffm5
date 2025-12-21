import styled from "styled-components";

import {
  StyledJupiterButtonProps,
  StyledJupiterLedProps,
} from "components/Jupiter/Button/types";

export const StyledManualButton = styled.button<StyledJupiterButtonProps>`
  background: transparent;
  background: linear-gradient(
    180deg,
    transparent 0%,
    transparent 30%,
    rgba(0, 0, 0, 0.7) 31%,
    rgba(0, 0, 0, 0.7) 35%,
    transparent 36%,
    transparent 100%
  );
  border: 3px solid rgba(0, 0, 0, 0.7);
  border-radius: 5px;
  box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.7);
  height: 72px;
  width: 42px;
  overflow: hidden;
  position: relative;
  transition:
    background-color 0.1s ease-in-out,
    box-shadow 0.1s ease-in-out,
    transform 0.1s ease-in-out;
`;

export const StyledManualLed = styled.div<StyledJupiterLedProps>`
  background: transparent;
  border: 3px solid rgba(0, 0, 0, 0.7);
  border-radius: 50%;
  height: 12px;
  left: 12px;
  position: absolute;
  top: 4px;
  width: 12px;
`;
