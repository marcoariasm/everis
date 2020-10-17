import styled from 'styled-components';
import { size } from '../../../../shared/styles/Responsive';
import { allColors } from '../../../../shared/styles/index';

export const FormContainer = styled.div`
  display: flex;
  background-color: ${allColors.colorGrayCard};
  flex: 1;
  height: 100vh;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  @media only screen and (max-width: ${size.tabletM}) and (orientation: portrait) {
    width: 100vw;
  }
  @media only screen and (max-width: ${size.tablet}) {
    flex: 10;
  }
  @media screen and (max-width: ${size.tabletM}) and (orientation: landscape) {
      display: block;
  }
  @media only screen 
  and (min-width: 1000px) 
  and (min-height: 1000px) 
  and (orientation: portrait) 
  and (-webkit-min-device-pixel-ratio: 1.5) {
    width: 100vw;
}
`;

export const LoginContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  @media screen and (max-width: ${size.tabletM}) and (orientation: landscape) {
      display: block;
      overflow: auto;
      min-height: min-content;
  }
  @media only screen and (max-width: ${size.tabletM})  {
    flex-direction: column;
  }
  @media screen and (max-width: ${size.laptop}) and (min-width: 1200px) {
    flex-direction: column;
  }

  @media only screen 
  and (min-width: 1000px) 
  and (min-height: 1000px) 
  and (orientation: portrait) 
  and (-webkit-min-device-pixel-ratio: 1.5) {
    flex-direction: column;
}
`;

export const MainLogo = styled.img`
  width: 88px;
  height: 32px;
  @media only screen and (max-width: ${size.mobileS}) {
    width: 80px;
    height: 28px;
  }
`;

export const SloganImg = styled.img`
  width: 101px;
  height: 11px;
  @media only screen and (max-width: ${size.tablet}) {
    display: none;
  }
`;

export const AnteTitle = styled.p`
  @media only screen and (max-width: ${size.mobileL}) {
    font-size: 16px;
    margin-top: 1em;
  }
  @media only screen and (max-width: ${size.mobileL}) {
    font-size: 16px;
    margin-top: 1em;
  }
  @media only screen and (max-width: ${size.mobileS}) {
    font-size: 14px;
    margin-top: 0.7em;
  }
`;

export const LoginTitle = styled.h1`
  margin-top: 15px;
  @media only screen and (max-width: ${size.mobileL}) {
    font-size: 23px;
    margin-top: 0px;
  }
  @media only screen and (max-width: ${size.mobileS}) {
    font-size: 20px;
  }
`;

export const TitleUnderline = styled.hr`
  height: 2px;
  background-color: ${props => props.color};
  border: 0px;
  width: 188px;
  @media only screen and (max-width: ${size.mobileL}) {
    height: 1px;
    width: 188px;
  }
`;

export const LoginCardDescription = styled.p`
  margin-top: 0.8em;
  margin-bottom: 1.3em;
  @media only screen and (max-width: ${size.mobileL}) {
    font-size: 14px;
    margin-top: 1em;
  }
  @media only screen and (max-width: ${size.mobileS}) {
    margin-bottom: 0.5em;
  }
`;