import styled from "styled-components";

import {
  StyledJupiterScreenProps,
  StyledJupiterScreenWrapperProps,
} from "components/Jupiter/Screen/types";

export const StyledManualScreenWrapper = styled.div<StyledJupiterScreenWrapperProps>`
  align-items: center;
  background: transparent;
  border: 4px solid #333;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  font-family: "dseg14";
  font-size: 40px;
  font-weight: bold;
  height: 90px;
  justify-content: flex-end;
  width: ${(props) => props.$displayLength * 35}px;
`;

export const StyledManualScreen = styled.div<StyledJupiterScreenProps>`
  color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: flex-end;
  position: relative;

  &::before {
    content: "${(props) => "~".repeat(props.$displayLength)}";
    display: block;
    opacity: 0.1;
    position: absolute;
    text-shadow: none;
  }
`;
