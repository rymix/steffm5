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
    color: #2c3e50;
    margin-top: 0;
    margin-bottom: 16px;
    font-size: 2rem;
  }

  h2 {
    color: #34495e;
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

  pre {
    background-color: #f8f9fa;
    border: 1px solid #e9ecef;
    border-radius: 4px;
    padding: 16px;
    font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;
    font-size: 14px;
    overflow-x: auto;
    color: #495057;
  }
`;
