import styled from "styled-components";

export const StyledManualButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
`;

export const StyledManualButton = styled.div`
  position: relative;
  width: 60px;
  height: 26px;
  border: 2px solid rgba(0, 0, 0, 0.8);
  border-radius: 2px;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledManualLed = styled.div`
  width: 36px;
  height: 4px;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 1px;
`;

export const StyledManualButtonLabel = styled.div`
  font-size: 8px;
  font-weight: bold;
  color: #2a2a2a;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  text-align: center;
`;
