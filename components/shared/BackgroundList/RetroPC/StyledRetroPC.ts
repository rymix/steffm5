import styled from "styled-components";

import { StyledMonitorWrapperProps } from "components/shared/BackgroundList/RetroPC/types";

const monitorWidth = 320;

export const StyledMonitorWrapper = styled.div<StyledMonitorWrapperProps>`
  display: flex;
  margin: 0;
  justify-content: center;
  height: 455px;
  align-items: center;

  ${(props) =>
    props.$scale &&
    props.$scale.x !== 1 &&
    `
      transform: scale(${props.$scale.x}) translateY(-${
        (1 - props.$scale.x) * 240
      }px);
    `}
`;

export const StyledMonitor = styled.div`
  width: ${monitorWidth}px;
  height: ${monitorWidth * 0.774}px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    121.79deg,
    rgba(231, 223, 208, 1) 0%,
    rgba(220, 209, 187, 1) 3.75%
  );
  border-radius: 3px 3px 0 0;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    width: ${monitorWidth * 0.742}px;
    height: ${monitorWidth * 0.531}px;
    background: linear-gradient(
      119.8deg,
      rgba(131, 134, 140, 0.1) 0%,
      rgba(41, 45, 54, 0.1) 69.96%
    );
    box-shadow: inset 0 0 4px 4px rgba(0, 0, 0, 0.42);
    border-radius: 2px;
  }

  &::before {
    content: "";
    position: absolute;
    width: ${monitorWidth * 0.806}px;
    height: ${monitorWidth * 0.581}px;
    background: rgba(220, 209, 187, 1);
    box-shadow:
      inset 0 267px 4px -8px rgba(0, 0, 0, 0.25),
      inset 0 0 10px 6px rgba(162, 158, 150, 1);
    filter: blur(0.9px);
  }
`;

export const StyledMonitorPanel = styled.div`
  position: absolute;
  top: 100%;
  width: 100%;
  height: 24px;
  background: rgba(220, 209, 187, 1);
  box-shadow:
    0 10px 22px rgba(0, 0, 0, 0.25),
    inset 0 4px 2px -2px rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: center;
  align-items: center;

  &::before {
    content: "";
    position: absolute;
    width: 50%;
    height: 100%;
    background: rgba(220, 209, 187, 1);
    box-shadow: inset 0 0 1px rgba(0, 0, 0, 1);
  }
`;

export const StyledMonitorStand = styled.div`
  width: 60%;
  height: 30px;
  position: absolute;
  bottom: -54px;
  left: 50%;
  transform: translateX(-50%);

  &::before {
    content: "";
    position: absolute;
    left: 50%;
    width: 50%;
    height: 100%;
    background: rgba(220, 209, 187, 1);
    border-radius: 0 0 60px 60px;
    box-shadow: inset 0 0 13px rgba(0, 0, 0, 0.2);
    transform: translateX(-50%);
  }

  &::after {
    content: "";
    position: absolute;
    border-radius: 2px;
    width: 100%;
    height: 10px;
    top: 100%;
    left: 0;
    background: rgba(220, 209, 187, 1);
    box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.2);
    transform: translateY(-6px);
  }
`;

export const StyledLogo = styled.div`
  display: block;
  width: 22px;
  height: 22px;
  background-image: radial-gradient(
    rgba(201, 198, 181, 1),
    rgba(203, 201, 186, 1)
  );
  border-radius: 2px;
  position: absolute;
  left: 18px;
  bottom: 2px;
  padding-left: 3.5px;
  box-shadow: 0 0 2px 0 rgba(151, 145, 129, 1) inset;
`;

export const StyledLogoText = styled.p`
  text-align: center;
  margin-top: -2px;
`;

export const StyledBadge = styled.img`
  display: block;
  position: absolute;
  width: 16px;
  height: 16px;
  top: 3px;
`;
