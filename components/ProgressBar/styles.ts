import styled from "styled-components";

export const StyledMixcloudPlayerProgressBar = styled.div`
  margin-bottom: 20px;
`;

export const StyledMixcloudPlayerProgressBarLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #333;
  margin-bottom: 8px;
`;

export const StyledMixcloudPlayerProgressBarTrack = styled.div`
  width: 100%;
  height: 6px;
  background-color: #f0f0f0;
  border-radius: 3px;
  overflow: hidden;
  margin-top: 4px;
  cursor: pointer;

  &:hover {
    height: 8px;
    background-color: #e0e0e0;
  }
`;

export const StyledMixcloudPlayerProgressBarFill = styled.div<{
  $progress: number;
}>`
  height: 100%;
  background-color: #2196f3;
  border-radius: 3px;
  transition: width 0.5s ease;
  width: ${({ $progress }) => $progress}%;
`;
