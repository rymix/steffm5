import styled from "styled-components";

export const StyledMixcloudPlayerCurrentMixInfo = styled.div`
  margin-bottom: 20px;
`;

export const StyledMixcloudPlayerCurrentMixInfoContent = styled.div`
  display: flex;
  gap: 16px;
  align-items: flex-start;
`;

export const StyledMixcloudPlayerCurrentMixInfoCoverArt = styled.div`
  flex-shrink: 0;

  img {
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

export const StyledMixcloudPlayerCurrentMixInfoDetails = styled.div`
  flex: 1;
  min-width: 0; /* Allow text to wrap */
`;

export const StyledMixcloudPlayerCurrentMixInfoHeader = styled.div`
  margin-bottom: 8px;

  h3 {
    margin: 4px 0 0 0;
    font-size: 1.2em;
    font-weight: 600;
    line-height: 1.3;
  }
`;

export const StyledMixcloudPlayerCurrentMixInfoSubtitle = styled.div`
  color: #666;
  font-size: 0.9em;
  margin-bottom: 12px;
`;

export const StyledMixcloudPlayerCurrentMixInfoMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 0.85em;
  color: #777;
  margin-bottom: 12px;

  span {
    white-space: nowrap;
  }
`;

export const StyledMixcloudPlayerCurrentMixInfoNotes = styled.div`
  background: #f8f9fa;
  padding: 12px;
  border-radius: 6px;
  font-size: 0.9em;
  line-height: 1.4;
  margin-bottom: 12px;
  border-left: 3px solid #007bff;
`;

export const StyledMixcloudPlayerCurrentMixInfoTagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

export const StyledMixcloudPlayerCurrentMixInfoTagBadge = styled.span<{
  category?: boolean;
}>`
  display: inline-block;
  padding: 4px 8px;
  font-size: 0.75em;
  font-weight: 500;
  border-radius: 12px;
  white-space: nowrap;

  ${({ category }) =>
    category
      ? `
        background: #007bff;
        color: white;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      `
      : `
        background: #e9ecef;
        color: #495057;
        
        &:hover {
          background: #dee2e6;
        }
      `}
`;
