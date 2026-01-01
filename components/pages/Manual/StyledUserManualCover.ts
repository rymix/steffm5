import styled from "styled-components";

import { StyledUserManualCoverProps } from "components/pages/Manual/types";

export const StyledUserManualCover = styled.div<StyledUserManualCoverProps>`
  cursor: pointer;
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
  transform: ${(props) => `rotate(${props.$rotation}deg)`};
  transition: transform 0.3s ease;
  text-align: left;
  padding: 1.4em 1em;
  background-color: #f6f4ef;
  background-image: url("textures/rice-paper-2.png"); /* Textured image */
  background-size: cover;
  box-shadow:
    0 1px 1px rgba(0, 0, 0, 0.15),
    0 10px 0 -7px #eee,
    0 10px 1px -4px rgba(0, 0, 0, 0.15),
    0 20px 0 -13px #eee,
    0 20px 1px -9px rgba(0, 0, 0, 0.15);

  hr {
    border-top: 2px solid rgba(0, 0, 0, 0.4);
    margin: 0.4em 0;
  }

  p {
    font-size: 0.6em;
    line-height: 1.6;
    margin: 0 0 0.3em 0;
  }

  a {
    color: rgba(0, 0, 0, 0.8);

    &:hover {
      color: rgba(0, 0, 0, 1);
    }
  }

  &:hover {
    transform: rotate(0deg) scale(1.2);
  }
`;

export const StyledUserManualCoverTitle = styled.div`
  color: rgba(0, 0, 0, 0.8);
  display: block;
  font-family: Sforzando;
  font-size: 2.6em;
  flex-shrink: 0;
`;

export const StyledUserManualCoverSubTitle = styled.div`
  display: block;
  font-size: 1.2em;
  flex-shrink: 0;
  padding-bottom: 4em;
`;

export const StyledUserManualCoverSectionTitle = styled.div`
  display: block;
  font-size: 23.8px;
  flex-shrink: 0;
  margin-top: 3.4em;
`;
