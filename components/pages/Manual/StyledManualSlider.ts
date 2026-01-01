import styled from "styled-components";

interface StyledManualSliderProps {
  $lineColor?: string;
  orientation?: "vertical" | "horizontal";
  value?: number;
  min?: number;
  max?: number;
}

export const StyledManualSliderWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  font-size: 14px;
  text-transform: uppercase;
  height: 100px;
  width: 54px;
`;

export const StyledManualSlider = styled.div<StyledManualSliderProps>`
  position: relative;
  width: 8px;
  height: 80px;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 4px;

  &::before {
    content: "";
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 28.8px;
    height: 100%;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      ${(props) => props.$lineColor || "rgba(0, 0, 0, 0.5)"} 2%,
      transparent 3%,
      transparent 15%,
      ${(props) => props.$lineColor || "rgba(0, 0, 0, 0.5)"} 17%,
      transparent 18%,
      transparent 31%,
      ${(props) => props.$lineColor || "rgba(0, 0, 0, 0.5)"} 33%,
      transparent 34%,
      transparent 48%,
      ${(props) => props.$lineColor || "rgba(0, 0, 0, 0.5)"} 51%,
      transparent 52%,
      transparent 65%,
      ${(props) => props.$lineColor || "rgba(0, 0, 0, 0.5)"} 67%,
      transparent 68%,
      transparent 81%,
      ${(props) => props.$lineColor || "rgba(0, 0, 0, 0.5)"} 83%,
      transparent 84%,
      transparent 96%,
      ${(props) => props.$lineColor || "rgba(0, 0, 0, 0.5)"} 99%,
      transparent 100%
    );
    z-index: -1;
  }

  &::after {
    content: "";
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translateX(-50%);
    width: 30px;
    height: 15px;
    background: rgba(0, 0, 0, 0.8);
    border-radius: 2px;
    border: 2px solid rgba(0, 0, 0, 0.6);
  }
`;
