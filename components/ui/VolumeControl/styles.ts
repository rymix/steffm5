import styled from "styled-components";

export const StyledVolumeControl = styled.div`
  margin-bottom: 20px;
  max-width: 250px;
`;

export const StyledVolumeControlContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const StyledVolumeControlLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 8px;
`;

export const StyledVolumeIcon = styled.span`
  font-size: 18px;
  cursor: pointer;
  user-select: none;
  padding: 4px;
  border-radius: 4px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

export const StyledVolumeControlSlider = styled.input`
  flex: 1;
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
