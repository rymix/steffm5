import JupiterHandle from "public/svg/slider-handle3.png";
import styled from "styled-components";

import { StyledJupiterSliderProps } from "components/Jupiter/Slider/types";

import { Slider } from "@mui/material";

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

export const StyledManualSlider = styled(Slider)<StyledJupiterSliderProps>`
  cursor: default;

  & .MuiSlider-thumb {
    width: 30px;
    height: 15px;
    border-radius: 1px;
    background: url(${JupiterHandle.src}) no-repeat center center;
    background-size: cover;
    z-index: 2;

    &:hover {
      box-shadow: none;
    }
  }

  & .MuiSlider-thumb.Mui-focusVisible,
  & .MuiSlider-thumb:hover,
  & .MuiSlider-thumb.Mui-active,
  & .MuiSlider-thumb:active,
  & .MuiSlider-thumb:focus-visible {
    box-shadow: none !important;
  }

  & .MuiSlider-track {
    display: none;
    width: 8px;
    background-color: black;
    position: relative;
    z-index: 1;
  }

  & .MuiSlider-rail {
    width: 8px;
    background-color: black;
    opacity: 1;
    position: relative;
    z-index: 1;

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
        ${(props) => props.$lineColor || "black"} 2%,
        transparent 3%,
        transparent 15%,
        ${(props) => props.$lineColor || "black"} 17%,
        transparent 18%,
        transparent 31%,
        ${(props) => props.$lineColor || "black"} 33%,
        transparent 34%,
        transparent 48%,
        ${(props) => props.$lineColor || "black"} 51%,
        transparent 52%,
        transparent 65%,
        ${(props) => props.$lineColor || "black"} 67%,
        transparent 68%,
        transparent 81%,
        ${(props) => props.$lineColor || "black"} 83%,
        transparent 84%,
        transparent 96%,
        ${(props) => props.$lineColor || "black"} 99%,
        transparent 100%
      );
      z-index: -1;
      mix-blend-mode: multiply;
    }
  }
`;
