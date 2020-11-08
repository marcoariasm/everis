import { allColors } from 'global/styles/index';
import styled from 'styled-components';
import { size } from 'global/styles/Responsive';

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
  @media only screen and (min-width: 1000px) 
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
  @media screen and (max-width: ${size.laptop}) and (min-width: 1200px) {
    flex-direction: column;
  }
  @media screen and (max-width: ${size.tabletM})  {
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
  margin-top: ${props => (props.top || '0px')};
  margin-bottom: ${props => (props.bottom || '0px')};
  background-color: ${props => props.color};
  border: 0px;
  width: ${props => (props.width || '188px')};
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

export const ButtonDescription = styled.p`
  margin-bottom: 10px;
  @media only screen and (max-width: ${size.mobileL}) {
    font-size: 12px;
  }
`;

export const ButtonSection = styled.div`
  padding: 1.5em 0;
  @media only screen and (max-width: ${size.mobileS}) {
    padding: 0.65em 0;
  }
`;

export const LogInAnteTitle = styled.p`
  color: #696158;
  font-size: 14px;
  @media only screen and (max-width: ${size.mobileL}) {
    font-size: 11px;
    margin-top: 1em;
  }
  @media only screen and (max-width: ${size.mobileS}) {
    font-size: 10px;
    margin-top: 0.7em;
  }
`;

export const AffiliateForm = styled.div`
  width: 21vw;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  @media screen and (max-width: ${size.tabletM})  {
    width: 45vw;
  }
  @media screen and (max-width: ${size.tablet})  {
    width: 52vw;
  }
  @media screen and (max-width: ${size.tabletS})  {
    width: 60vw;
  }
  @media screen and (max-width: ${size.mobileL})  {
    width: 70vw;
  }
  @media only screen 
  and (min-width: 1000px) 
  and (min-height: 1000px) 
  and (orientation: portrait) 
  and (-webkit-min-device-pixel-ratio: 1.5) {
    width: 38vw;
  }
`;

export const Button = styled.button`
  background-color: ${allColors.colorOrangeMain};
  width: ${props => props.buttonWidth || '100%'};
  border-radius: 4px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-size: 18px;
  font-family: 'Calibri';
  font-weight: 600;
  &:disabled {
    background-color: ${allColors.colorGrayDisabled};
  }
  &:focus {
    outline:none;
  }
`;

export const Button2 = styled.button`
  background-color: ${allColors.colorWhiteBase};
  width: ${props => props.buttonWidth || '100%'};
  margin-right: 20px;
  border-radius: 4px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${allColors.colorOrangeMain};
  border: 2px solid ${allColors.colorOrangeMain};
  font-size: 18px;
  font-family: 'Calibri';
  font-weight: 600;
  &:disabled {
    background-color: ${allColors.colorGrayDisabled};
  }
  &:focus {
    outline:none;
  }
`;

export const RecoverAccountSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 3em;
  @media screen and (max-width: ${size.tabletM})  {
    margin-top: 1.5em;
  }
`;

export const RecoverAccounText = styled.p`
  color: #696158;
  font-size: 13px;
  font-family: 'Calibri';
  text-align: center;
`;

export const UrlStyles = styled.a`
  color: #ff4f00;
  text-decoration: underline;
`;

export const CheckboxContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin-top: 2.7em;
  @media screen and (max-width: ${size.tabletM})  {
    margin-top: 1.5em;
  }
`;

export const ButtonContainer = styled.div`
  width: 100%;
  margin-top: 2.8em;
  @media screen and (max-width: ${size.tabletM})  {
    margin-top: 1.5em;
  }
`;


export const EmailContainer = styled.div`
  padding-top: 1.3em;
  padding-bottom: 2em;
  width: 100%;
  @media screen and (max-width: ${size.tabletM})  {
    padding-top: 0.5em;
    padding-bottom: 1.2em;
  }
`;

export const ModalContent = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export const ModalIcon = styled.img`
  width: 48px;
  height: 48px;
`;


export const ModalMessage = styled.p`
  margin: 22px 0 12px 0;
  color: #00ae99;
  font-size: 20px;
  font-family: 'Calibri';
  font-weight: bold;
  margin-top: 0.7em;
`;

export const ModalNotification = styled.div`
  border-radius: 6px;
  border: 1px solid #00ae99;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 15px 5em;
  margin-top: 2em;
  @media screen and (max-width: ${size.tabletS})  {
    padding: 20px 0.8em;
  }
`;


export const ModalDescription = styled.p`
  margin: 0 70px;
  color: #696158;
  font-size: 14px;
  font-family: 'Calibri';
  display: flex;
  text-align: center;
`;

export const ModalNotice = styled.p`
  margin: 25px 0 10px 0;
  color: ${allColors.colorOrangeMain};
  font-size: 16px;
  font-weight: bold;
  font-family: 'Calibri';
  display: flex;
  text-align: center;
`;

export const ModalText = styled.p`
  color: ${allColors.colorGrayText};
  padding: 0 120px;
  font-size: 12px;
  font-family: 'Calibri';
  display: flex;
  text-align: center;
`;


export const ModalHighlitedDescription = styled.p`
  color: ${allColors.colorGrayText};
  font-size: 16px;
  font-family: 'Calibri';
  font-weight: bold;
`;

export const ModalHighlitedDescription2 = styled.p`
  color: ${allColors.colorGreenBalance};
  font-size: 16px;
  font-family: 'Calibri';
  font-weight: bold;
`;

export const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 1.7em;
  width: 15em;
  @media screen and (max-width: ${size.mobileL})  {
    width: 9em;
  }
`;