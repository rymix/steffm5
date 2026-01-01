import styled from "styled-components";

import {
  createStyledHeader,
  createStyledWindow,
  StyledContent,
  StyledHeaderControls,
  StyledResetButton,
  StyledResizeHandle,
} from "../shared/styles";

// ZXSpectrum-specific window (fixed dimensions for emulator)
export const StyledZXSpectrumWindow = createStyledWindow("640px", "530px");

// ZXSpectrum-specific header (blue-purple gradient)
export const StyledHeader = createStyledHeader("#667eea", "#764ba2", false); // No text shadow

// Re-export shared components
export {
  StyledContent,
  StyledHeaderControls,
  StyledResetButton,
  StyledResizeHandle,
};

// ZXSpectrum-specific volume controls (unique to this window)
export const StyledVolumeControl = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 12px;
  pointer-events: all;
`;

export const StyledMuteButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  padding: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    color: rgba(255, 255, 255, 0.7);
  }

  &:active {
    color: rgba(255, 255, 255, 0.5);
  }
`;

export const StyledVolumeSlider = styled.input`
  width: 80px;
  height: 4px;
  -webkit-appearance: none;
  appearance: none;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
  outline: none;
  cursor: pointer;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 12px;
    height: 12px;
    background: white;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      transform: scale(1.2);
    }
  }

  &::-moz-range-thumb {
    width: 12px;
    height: 12px;
    background: white;
    border-radius: 50%;
    cursor: pointer;
    border: none;
    transition: all 0.2s;

    &:hover {
      transform: scale(1.2);
    }
  }
`;
