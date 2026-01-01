import styled from "styled-components";

import { StyledScreenProps } from "components/BackgroundList/types";

const screen = {
  width: 238,
  height: 170,
};

export const StyledScreen = styled.div<StyledScreenProps>`
  display: block;
  width: ${screen.width}px;
  height: ${screen.height}px;
  background-color: rgba(79, 85, 85, 1);
  background-image: ${(props) =>
    props.$background
      ? `url(/${props.$background.backgroundCategoryObject?.folder}/${props.$background.fileName})`
      : "radial-gradient(rgba(82, 91, 90, 1), rgba(80, 88, 90, 1))"};
  background-size: ${(props) => {
    if (props.$background?.tileType === "stretch") return "100% auto";
    if (props.$background?.tileType === "tile") {
      return `${props.$background.width / 3}px ${
        props.$background.height / 3
      }px`;
    }
    return "25%";
  }};
  background-repeat: ${(props) =>
    props.$background?.tileType === "tile" ? "repeat" : "repeat"};
  background-position: center;
  border-radius: 2px;
  margin: 30px auto 0 auto;
  position: absolute;
  top: 10px;
  left: 0;
  overflow: visible;
  right: 0;
  box-shadow: 0 0 20px 10px rgba(43, 48, 48, 0.6) inset;
`;

export const StyledScreenBanner = styled.div`
  background: white;
  border-radius: 0 0 2px 2px;
  padding: 6px;
  position: absolute;
  bottom: 0;
  left: 0;
  min-height: 30px;
  width: 100%;
  opacity: 0.7;
  text-align: center;
  text-transform: uppercase;
`;

export const StyledScreenShadow = styled.div`
  display: block;
  width: ${screen.width}px;
  height: ${screen.height}px;
  border-radius: 2px;
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  overflow: visible;
  right: 0;
  box-shadow: inset 0 0 4px 4px rgba(0, 0, 0, 0.42);

  &::after {
    content: "";
    background: linear-gradient(
      119.8deg,
      rgba(131, 134, 140, 0.1) 0%,
      rgba(131, 134, 140, 0.1) 40%,
      rgba(255, 255, 255, 0.12) 60%,
      rgba(41, 45, 54, 0.1) 69.96%
    );
    border-radius: 2px;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
`;
