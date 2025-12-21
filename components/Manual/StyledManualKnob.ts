import styled, { css } from "styled-components";

import {
  StyledInnerKnobProps,
  StyledJupiterKnobMarkerProps,
  StyledOuterKnobProps,
} from "components/Jupiter/Knob/types";

export const StyledManualKnobWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  font-size: 14px;
  text-transform: uppercase;
  height: 128px;
  width: 194px;
  padding-top: 20px;
`;

export const StyledManualOuterKnobWrapper = styled.div`
  display: flex;
  position: relative;
`;

export const StyledManualKnobMarker = styled.div<StyledJupiterKnobMarkerProps>`
  color: rgba(0, 0, 0, 0.8);
  position: absolute;
  left: ${({ $x }) => $x}px;
  top: ${({ $y }) => $y}px;
`;

export const StyledManualOuterKnob = styled.div.attrs<StyledOuterKnobProps>(
  ({ $margin }) => ({
    style: {
      margin: `${$margin}px`,
    },
  }),
)<StyledOuterKnobProps>`
  border-radius: 50%;
  border: 4px solid rgba(0, 0, 0, 0.8);
  background: transparent;
  box-shadow: 0 0 0 5px rgba(0, 0, 0, 0.2);
`;

export const StyledManualInnerKnob = styled.div.attrs<StyledInnerKnobProps>(
  ({ $deg }) => ({
    style: {
      transform: `rotate(${$deg}deg)`,
    },
  }),
)<StyledInnerKnobProps>`
  border-radius: 50%;
  ${({ $snap }) =>
    $snap &&
    css`
      transition: transform 0.15s ease-in-out;
    `}
`;

export const StyledManualGrip = styled.div`
  position: absolute;
  width: 6px;
  height: 16px;
  bottom: 2%;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.8);
`;
