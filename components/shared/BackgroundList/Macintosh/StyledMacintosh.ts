import styled from "styled-components";

import { StyledMacintoshProps } from "components/shared/BackgroundList/Macintosh/types";

export const StyledMacintosh = styled.div<StyledMacintoshProps>`
  display: block;
  width: 340px;
  height: 455px;
  margin: 0 auto;
  position: relative;
  box-shadow: 0 80px 60px -60px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  transform: scale(0.88);

  ${(props) =>
    props.$scale &&
    props.$scale.x !== 1 &&
    `
      transform: scale(${props.$scale.x * 0.88}) translateX(-${
        (1 - props.$scale.x) * 120
      }px) translateY(-${(1 - props.$scale.x) * 240}px);
    `}
`;

export const StyledMonitor = styled.div`
  z-index: 2;
  display: block;
  width: 100%;
  height: 410px;
  border-radius: 15px;
  background-color: rgba(221, 219, 194, 1);
  position: absolute;
  background-image: linear-gradient(
    rgba(221, 219, 194, 1),
    rgba(223, 218, 196, 1)
  );
  background-image: conic-gradient(
    rgba(221, 219, 194, 1) 0 10.5%,
    rgba(236, 236, 213, 1) 11% 11.5%,
    rgba(206, 205, 174, 1) 12% 38%,
    rgba(200, 196, 167, 1) 39% 61.5%,
    rgba(199, 195, 166, 1) 62% 88%,
    rgba(223, 218, 196, 1) 88.5% 89%,
    rgba(221, 219, 194, 1) 89.25%
  );
  box-shadow: 0 60px 20px -20px rgba(142, 137, 97, 0.5);
`;

export const StyledMonitorInner = styled.div`
  display: block;
  width: 320px;
  height: 360px;
  background-image: linear-gradient(
    rgba(202, 198, 169, 1),
    rgba(207, 206, 176, 1)
  );
  margin: auto;
  position: absolute;
  top: 22px;
  left: 0;
  right: 0;
  border-radius: 5px;
`;

export const StyledScreenCutout = styled.div`
  display: block;
  width: 280px;
  height: 225px;
  background-color: rgba(221, 219, 194, 1);
  margin: auto;
  position: absolute;
  left: 0;
  right: 0;
  top: 20px;
  border-radius: 5px;
  background-image: linear-gradient(
    rgba(147, 143, 106, 1),
    rgba(224, 223, 195, 1)
  );
  background-image: conic-gradient(
    rgba(147, 143, 106, 1) 12.5%,
    rgba(181, 178, 147, 1) 15.5% 33%,
    rgba(224, 223, 195, 1) 34% 65.5%,
    rgba(194, 193, 162, 1) 66.5% 83.5%,
    rgba(147, 143, 106, 1) 86.5%
  );
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
  left: 22px;
  bottom: 22px;
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

export const StyledOpening = styled.div`
  display: block;
  width: 155px;
  height: 15px;
  background-image: linear-gradient(
    rgba(190, 187, 156, 1),
    rgba(202, 200, 167, 1) 74.5% 75.5%
  );
  background-image: conic-gradient(
    rgba(190, 187, 156, 1) 0% 23.5%,
    rgba(199, 194, 162, 1) 24.5% 25%,
    rgba(220, 216, 189, 1) 26% 73.5%,
    rgba(202, 200, 167, 1) 74.5% 75.5%,
    rgba(190, 187, 156, 1) 76.5%
  );
  position: absolute;
  bottom: 55px;
  right: 21px;
  border-radius: 4px;
`;

export const StyledOpeningInner = styled.div`
  display: block;
  width: 126px;
  height: 8px;
  background-color: rgba(24, 25, 20, 1);
  border-radius: 2px;
  margin: auto;
  position: absolute;
  left: 0;
  right: 0;
  top: 3.5px;
`;

export const StyledFoot = styled.div`
  display: block;
  width: 100%;
  height: 85px;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 1;
  border-radius: 7px;
  background-image: linear-gradient(
    rgba(187, 180, 151, 1),
    rgba(193, 190, 159, 1)
  );
  box-shadow:
    14px 0 3px -7px rgba(204, 202, 177, 1) inset,
    -14px 0 3px -7px rgba(206, 205, 177, 1) inset,
    0 32px 3px -7px rgba(193, 190, 159, 1) inset,
    0 -6px 3px -4px rgba(174, 170, 135, 1) inset;
`;

export const StyledInset = styled.div`
  display: inline;
  width: 16px;
  height: 16px;
  background-color: rgba(195, 190, 160, 1);
  position: absolute;
  bottom: 20px;
  left: 35px;
  border-radius: 2px;
  box-shadow:
    0 0 2px rgba(201, 195, 163, 1) inset,
    0 0 2px 1px rgba(188, 182, 148, 1);
`;

export const StyledCableContainer = styled.div`
  display: block;
  width: 60px;
  height: 30px;
  background-color: rgba(195, 190, 160, 1);
  position: absolute;
  right: 30px;
  bottom: 15px;
  border-radius: 3px;
  box-shadow:
    0 2px 1px -1px rgba(208, 203, 174, 1) inset,
    4px 0 1px -1px rgba(186, 180, 146, 1) inset,
    -5px 0 2px -2px rgba(168, 162, 129, 1) inset,
    0 -4px 2px -3px rgba(173, 168, 139, 1) inset;
`;

export const StyledCableHole = styled.div`
  display: block;
  width: 18px;
  height: 20px;
  background-color: rgba(132, 133, 128, 1);
  position: absolute;
  top: 5px;
  right: 7px;
  border-radius: 3px;
  box-shadow:
    0 -4px 0.5px -0.5px rgba(25, 25, 25, 0.2) inset,
    -2px 0 0.5px -0.5px rgba(25, 25, 25, 0.2) inset,
    2px 0 0.5px -0.5px rgba(25, 25, 25, 0.2) inset;
  background-image:
    linear-gradient(
      rgba(132, 133, 128, 1) 20%,
      transparent 20% 80%,
      rgba(132, 133, 128, 1) 80%
    ),
    linear-gradient(
      90deg,
      transparent 30%,
      rgba(24, 25, 20, 1) 30% 70%,
      transparent 70%
    );
`;
