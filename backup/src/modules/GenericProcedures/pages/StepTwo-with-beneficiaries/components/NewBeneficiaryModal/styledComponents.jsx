import styled from 'styled-components';
import { size } from 'global/styles/Responsive';
import { allColors } from 'global/styles/index';

export const Title = styled.h1`
  margin-top: 15px;
  @media only screen and (max-width: ${size.mobileL}) {
    font-size: 23px;
    text-align: center;
  }
  @media only screen and (max-width: ${size.mobileS}) {
    font-size: 20px;
  }
`;

export const Button = styled.button`
  width: 296px;
  border-radius: 4px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-family: 'Calibri';
  font-weight: 600;
  &:focus {
    outline:none;
  }
  @media screen and (max-width: ${size.tabletM}) {
    width: 400px;
  }
  @media screen and (max-width: ${size.tablet})  {
    width: 360px;
  }
  @media screen and (max-width: ${size.tabletS})  {
    width: 302px;
  }
  @media screen and (max-width: ${size.mobileL})  {
    width: 240px;
  }
  @media screen and (max-width: ${size.mobileM})  {
    width: 220px;
  }
`;

export const CheckboxContainer = styled.div`
  max-width: 23em;
  column-gap: 0.7em;
  grid-template-columns: auto auto;
  display: grid;
  margin-top: 1.7em;
  @media screen and (max-width: ${size.mobileL})  {
    margin-top: 1.5em;
    grid-template-columns: auto;
    row-gap: 0.7em;
    width: auto;
  }
`;

export const Subtitle = styled.p`
  margin: 1.5em 0;
  color: ${allColors.colorGrayText};
`;

export const ProcedureContainer = styled.div`
  padding-top: 4.2em;
`;

export const Description = styled.p`
  font-family: 'Calibri';
  font-size: 14px;
  margin-top: 20px;
  color: #696158;
  padding-bottom: 2em;
`;

export const SectionTitle = styled.p`
  font-size: 18px;
  font-family: 'Calibri';
  color: #00A499;
  font-weight: bold;
  padding-left: 1.1em;
`;

export const Announcement = styled.p`
  font-size: 16px;
  font-family: 'Calibri';
  color: #00A499;
  font-weight: bold;
`;

export const SectionSubtitle = styled.p`
  font-size: 14px;
  font-family: 'Calibri';
  color: #696158;
  margin-top: 6px;
`;

export const InputsContainers = styled.div`
  display: grid;
  grid-template-columns: 48% 48%;
  grid-column-gap: 4%;
  grid-row-gap: 1.8em;
  padding-top: 1.4em;
  padding-bottom: 0.8em;
  @media screen and (max-width: ${size.tablet})  {
    grid-template-columns: 100%;
    padding-bottom: 1.9em;
  }
`;

export const RadioButtonTitle = styled.p`
  font-family: 'Calibri';
  font-size: 14px;
  margin-top: 1.8em;
  color: #696158;
`;

export const AnnounceContainer = styled.div`
  border-radius: 6px;
  border: 1px solid #00ae99;
  padding: 1em 4em;
  display: grid;
  placeItems: center;
  margin: 2em 0;
`;