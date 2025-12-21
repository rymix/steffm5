import styled from "styled-components";

import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";

export const StyledManual = styled.div`
  color: rgba(0, 0, 0, 0.8);
  display: block;
  text-align: left;
  width: 100%;
  padding: 0 30px;

  @media (max-width: 640px) {
    padding: 0;
  }

  a {
    color: rgba(0, 0, 0, 0.8);

    &:hover {
      color: rgba(0, 0, 0, 1);
    }
  }

  hr {
    border-top: 3px solid rgba(0, 0, 0, 0.4);
    margin: 30px 0;
  }

  h2 {
    font-size: 36px;
    margin: 0 0 20px 0;
  }

  h3 {
    font-size: 24px;
    margin: 20px 0;
  }

  h4 {
    font-size: 16px;
    margin: 0 0 20px 0;
  }

  p {
    line-height: 1.6;
    margin: 0 0 20px 0;
  }

  ul {
    margin: 20px 0 20px 20px;
  }

  li {
    list-style-type: square;
    margin: 0 0 6px 0;
  }
`;

export const StyledManualTitle = styled.div`
  display: block;
  font-family: Sforzando;
  font-size: 92px;
  flex-shrink: 0;
`;

export const StyledManualSubTitle = styled.div`
  display: block;
  font-size: 54px;
  flex-shrink: 0;
`;

export const StyledManualFooter = styled.div`
  display: block;
  font-family: Sforzando;
  font-size: 64px;
  flex-shrink: 0;
  text-align: right;
`;

export const StyledManualSectionTitle = styled.div`
  display: block;
  font-size: 34px;
  flex-shrink: 0;
  margin-top: 40px;
`;

export const StyledWarningIcon = styled(WarningAmberOutlinedIcon)`
  display: inline-block;
  font-size: 64px;
`;

export const StyledIconSection = styled.p`
  align-items: center;
  display: flex;
  font-weight: bold;
  gap: 20px;
`;

export const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  gap: 10px;
  padding: 10px;
`;

export const StyledGridHeader = styled.div`
  font-weight: bold;
  padding: 5px;
  text-align: right;
`;

export const StyledGridDetail = styled.div`
  padding: 5px;
`;

export const StyledControl = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  margin: 10px 0 30px 0;
`;
