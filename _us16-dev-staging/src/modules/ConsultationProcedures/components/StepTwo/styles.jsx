import styled from "styled-components";
import { size } from '../../../../shared/styles/Responsive';
import { allColors } from '../../../../shared/styles/index';

export const ContentStepTwo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ContentTab = styled.div`
  padding: 2em 3em;
  &.document-container {
    > div {
      width: 100%;
    }
  }

  @media only screen and (max-width: ${size.mobileL}) {
    padding: 1.5em 1em;
  }
`;

export const AffiliateInformation = styled.div`
  border-bottom: 1px solid ${allColors.colorGrayBorder};
  margin-bottom: 2em;
  padding-bottom: 1em;
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
  color: ${allColors.colorOrangeMainActive};
  font-family: FS Emeric;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 1em;
`;