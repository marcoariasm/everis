import styled from "styled-components";
import { size } from "global/styles/Responsive";
import { allColors } from "global/styles";

export const ContentStepTwo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DownloadInformativeDocuments = styled.a`
  width: fit-content;
  margin-top: 1.5em;
  padding: 1em 2em;
  display: flex;
  align-items: center;
  border-radius: 6px;
  box-shadow: 0 4px 8px 1px rgba(53, 53, 53, 0.12);
  border: solid 1px #e8e8e8;
  background-color: #ffffff;
  cursor: pointer;
  > img {
    margin-right: 1em;
  }

  > span {
    font-family: Calibri;
    font-size: 16px;
    font-weight: bold;
    text-decoration: underline;
    color: #ff4f00;
  }
`;

export const ContentTab = styled.div`
  &.document-container {
    > div {
      width: 100%;
    }
  }

  @media only screen and (max-width: ${size.mobileL}) {
    padding: 1.5em 1em;
  }
`;

export const ContactContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 4%;
  padding-bottom: 1.4em;
  @media screen and (max-width: ${size.tablet}) {
    grid-template-columns: 1fr 1fr;
    &.isResponsive {
      grid-template-columns: 100%;
      grid-row-gap: 1em;
      padding-bottom: 1em;
    }
  }
`;

export const ContactTitle = styled.p`
  color: #696158;
  font-size: 12px;
  font-family: FS Emeric;
  display: flex;
  padding-bottom: 5px;
`;

export const ContactDescription = styled.p`
  color: #696158;
  font-size: 14px;
  font-family: FS Emeric;
  font-weight: bold;
`;

export const SubTittle = styled.span`
  margin-top: 1em;
  color: ${allColors.colorGreen};
  font-family: FS Emeric;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 1em;
`;
