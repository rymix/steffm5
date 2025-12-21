import styled from "styled-components";

interface StyledManualScreenWrapperProps {
  $displayLength: number;
}

interface StyledManualScreenProps {
  $displayLength: number;
}

export const StyledManualScreenWrapper = styled.div<StyledManualScreenWrapperProps>`
  background: #f5f5f5;
  border: 3px solid rgba(0, 0, 0, 0.8);
  border-radius: 8px;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: fit-content;
`;

export const StyledManualScreen = styled.div<StyledManualScreenProps>`
  font-family: "DSEG14Classic", monospace;
  font-size: 28px;
  font-weight: normal;
  color: rgba(0, 0, 0, 0.8);
  letter-spacing: 1.2px;
  white-space: nowrap;
  position: relative;

  &::before {
    content: "${(props) => "8".repeat(props.$displayLength)}";
    display: block;
    opacity: 0.08;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
`;

export const StyledManualProgress = styled.div<StyledManualScreenProps>`
  font-family: "DSEG14Classic", monospace;
  font-size: 28px;
  font-weight: normal;
  color: rgba(0, 0, 0, 0.8);
  letter-spacing: 1.2px;
  white-space: nowrap;
  position: relative;

  &::before {
    content: "${(props) => "=".repeat(props.$displayLength)}";
    display: block;
    opacity: 0.08;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
`;
