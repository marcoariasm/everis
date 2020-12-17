import styled from "styled-components";
import { size } from "global/styles/Responsive";

export const ContentTab = styled.div`
  padding: 0 1m;
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
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 4%;
  padding-bottom: 1.4em;
  @media screen and (max-width: ${size.tablet}) {
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
