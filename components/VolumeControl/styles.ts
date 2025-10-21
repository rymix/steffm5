import styled from "styled-components";

export const StyledMixcloudPlayerVolumeControl = styled.div`
  margin-bottom: 20px;
`;

export const StyledMixcloudPlayerVolumeControlLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 8px;
`;

export const StyledMixcloudPlayerVolumeControlSlider = styled.input`
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: #f0f0f0;
  outline: none;
  opacity: 0.7;
  transition: opacity 0.2s;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }

  &::-webkit-slider-thumb {
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #2196f3;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transition: background 0.2s;

    &:hover {
      background: #1976d2;
    }
  }

  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #2196f3;
    cursor: pointer;
    border: none;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transition: background 0.2s;

    &:hover {
      background: #1976d2;
    }
  }
`;
