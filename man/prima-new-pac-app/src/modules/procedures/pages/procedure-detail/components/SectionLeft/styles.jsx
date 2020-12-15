import styled from "styled-components";
import allColors from "global/styles";

export const Card = styled.div`
  position: relative;
  background: #ffff;
  opacity: 0.9;
  box-shadow: 0px 2px 40px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  width: 100%;
  min-height: 85px;
  margin-top: 22px;
  padding: 33px 24px 34px 26px;
`;


export const ContentStepTwo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ContentTab = styled.div`
  &.document-container {
    > div {
      width: 100%;
    }
  }
  padding: 1.5em 1em;
`;

export const SubTittle = styled.span`
  color: ${allColors.colorOrangeMainActive};
  font-family: FS Emeric;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 1em;
  display: block;
`;
