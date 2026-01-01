import styled from "styled-components";

export const StyledTrackList = styled.div`
  margin-bottom: 20px;
`;

export const StyledTrackListHeader = styled.h4`
  margin-bottom: 16px;
  font-size: 1.1em;
  font-weight: 600;
  color: #333;
`;

export const StyledTrackListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const StyledTrackListItem = styled.div<{
  $status: "played" | "playing" | "upcoming";
}>`
  display: flex;
  align-items: center;
  padding: 8px;
  border-radius: 6px;
  transition: all 0.2s ease;
  border: 1px solid transparent;

  ${({ $status }) => {
    switch ($status) {
      case "playing":
        return `
          background: #e3f2fd;
          border-color: #2196f3;
          box-shadow: 0 2px 4px rgba(33, 150, 243, 0.1);
        `;
      case "played":
        return `
          background: #f5f5f5;
          opacity: 0.7;
        `;
      case "upcoming":
        return `
          background: white;
          
          &:hover {
            background: #f8f9fa;
          }
        `;
      default:
        return "";
    }
  }}
`;

export const StyledTrackListItemImage = styled.div`
  flex-shrink: 0;
  width: 60px;
  height: 60px;
  margin-right: 12px;
  border-radius: 4px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const StyledTrackListItemContent = styled.div`
  flex: 1;
  min-width: 0;
`;

export const StyledTrackListItemTitle = styled.h5`
  margin: 0 0 4px 0;
  font-size: 14px;
  font-weight: 600;
  color: #333;
  line-height: 1.3;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const StyledTrackListItemArtist = styled.div`
  font-size: 12px;
  color: #666;
  margin-bottom: 2px;
`;

export const StyledTrackListItemPublisher = styled.div`
  font-size: 11px;
  color: #888;
`;

export const StyledTrackListItemMeta = styled.div`
  flex-shrink: 0;
  text-align: right;
  margin-left: 12px;
`;

export const StyledTrackListItemStartTime = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: #555;
  margin-bottom: 4px;
`;

export const StyledTrackListItemStatus = styled.div<{
  $status: "played" | "playing" | "upcoming";
}>`
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  ${({ $status }) => {
    switch ($status) {
      case "playing":
        return `color: #2196f3;`;
      case "played":
        return `color: #888;`;
      case "upcoming":
        return `color: #666;`;
      default:
        return "";
    }
  }}
`;
