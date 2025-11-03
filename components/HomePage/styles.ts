import styled from "styled-components";

export const StyledHeaderRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

export const StyledMiniPlayerToggle = styled.button<{
  $isActive: boolean;
}>`
  background: ${({ $isActive }) => ($isActive ? "#667eea" : "#6c757d")};
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;
