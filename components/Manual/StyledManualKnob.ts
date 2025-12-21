import styled, { css } from "styled-components";

interface StyledManualOuterKnobProps {
  $margin?: number;
}

interface StyledManualInnerKnobProps {
  $deg: number;
  $snap?: number;
}

export const StyledManualKnobWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 180px;
  height: 180px;
`;

export const StyledManualOuterKnobWrapper = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

interface StyledManualKnobMarkerWithAngleProps {
  $angle: number;
}

export const StyledManualKnobMarker = styled.div.attrs<StyledManualKnobMarkerWithAngleProps>(
  ({ $angle }) => ({
    style: {
      transform: `translate(-50%, -50%) rotate(${$angle}deg) translate(0, -62px) rotate(${-$angle}deg)`,
    },
  }),
)<StyledManualKnobMarkerWithAngleProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 48px;
  text-align: center;
  font-size: 10px;
  font-weight: bold;
  color: #2a2a2a;
  text-transform: uppercase;
  letter-spacing: 0.4px;
`;

export const StyledManualOuterKnob = styled.div.attrs<StyledManualOuterKnobProps>(
  () => ({}),
)<StyledManualOuterKnobProps>`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 3px solid rgba(0, 0, 0, 0.8);
  background: #f5f5f5;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledManualInnerKnob = styled.div.attrs<StyledManualInnerKnobProps>(
  ({ $deg }) => ({
    style: {
      transform: `rotate(${$deg}deg)`,
    },
  }),
)<StyledManualInnerKnobProps>`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  position: relative;
  ${({ $snap }) =>
    $snap &&
    css`
      transition: transform 0.15s ease-in-out;
    `}
`;

export const StyledManualGrip = styled.div`
  position: absolute;
  width: 8px;
  height: 20px;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 3px;
  background: rgba(0, 0, 0, 0.8);
`;

export const StyledManualKnobLabel = styled.div`
  font-family: "Helvetica Neue", "Arial", sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: #2a2a2a;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  text-align: center;
  margin-top: 8px;
  height: 14px;
  line-height: 14px;
`;

interface StyledManualDialTickProps {
  $angle: number;
}

export const StyledManualDialTick = styled.div.attrs<StyledManualDialTickProps>(
  ({ $angle }) => ({
    style: {
      transform: `translateX(-50%) translateY(-44px) rotate(${$angle}deg)`,
    },
  }),
)<StyledManualDialTickProps>`
  position: absolute;
  width: 3px;
  height: 12px;
  background: rgba(0, 0, 0, 0.8);
  top: 64px;
  left: 50%;
  transform-origin: center 60px;
  border-radius: 0.5px;
`;
