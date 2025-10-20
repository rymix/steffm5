import styled from "styled-components";

import { StyledMixcloudPlayerTrackListItemProps } from "./types";

export const StyledMixcloudPlayer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

export const StyledMixcloudPlayerCurrentTrackInfo = styled.div`
  margin-bottom: 20px;
`;

export const StyledMixcloudPlayerWidget = styled.div`
  margin-bottom: 20px;
`;

export const StyledMixcloudPlayerControls = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

export const StyledMixcloudPlayerProgressBar = styled.div`
  margin-bottom: 20px;
`;

export const StyledMixcloudPlayerVolumeControl = styled.div`
  margin-bottom: 20px;
`;

export const StyledMixcloudPlayerTrackList = styled.div`
  margin-bottom: 20px;

  ul {
    list-style: none;
    padding: 0;
  }
`;

export const StyledMixcloudPlayerTrackListItem = styled.li<StyledMixcloudPlayerTrackListItemProps>`
  padding: 10px;
  margin: 5px 0;
  background-color: ${(props) => (props.$isCurrent ? "#e0e0e0" : "#f5f5f5")};
  cursor: pointer;
  border-radius: 4px;
`;
