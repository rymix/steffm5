import styled from "styled-components";

export const StyledContent = styled.div`
  line-height: 1.6;
  color: #333;
`;

export const StyledSection = styled.section`
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }

  h1 {
    color: #e74c3c;
    margin-top: 0;
    margin-bottom: 16px;
    font-size: 2rem;
  }

  h2 {
    color: #c0392b;
    margin-top: 24px;
    margin-bottom: 12px;
    font-size: 1.5rem;
  }

  ul,
  ol {
    margin: 12px 0;
    padding-left: 24px;
  }

  li {
    margin-bottom: 4px;
  }

  p {
    margin: 12px 0;
    text-align: justify;
  }
`;

export const StyledButton = styled.button`
  background: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #2980b9;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus {
    outline: 2px solid #3498db;
    outline-offset: 2px;
  }
`;
