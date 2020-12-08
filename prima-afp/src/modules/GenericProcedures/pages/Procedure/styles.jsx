import styled from "styled-components";
import { size } from "../../../../global/styles/Responsive";
import { allColors } from "../../../../global/styles/index";

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
  @media only screen and (min-width: 1000px) and (min-height: 1000px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 1.5) {
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
  @media only screen and (max-width: ${size.tabletM}) {
    flex-direction: column;
  }
  @media screen and (max-width: ${size.laptop}) and (min-width: 1200px) {
    flex-direction: column;
  }

  @media only screen and (min-width: 1000px) and (min-height: 1000px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 1.5) {
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
  background-color: ${(props) => props.color};
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

export const ButtonOutlinedAdvisory = styled.button`
  background-color: ${allColors.colorWhiteBase};
  border-radius: 4px;
  border: 2px solid ${allColors.colorOrangeMain};
  margin-top: 2.8em;
  height: 44px;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  color: ${allColors.colorOrangeMain};
  font-size: 18px;
  font-family: "Calibri";
  font-weight: 600;
  &:disabled {
    border: 2px solid #bbbbbb;
    color: #bbbbbb;
  }
  &:focus {
    outline: none;
  }
  width: 296px;
  @media screen and (max-width: 960px) {
    margin-top: 1.5em;
    width: 220px;
  }
  @media screen and (max-width: 767px) {
    width: 70%;
  }
  @media screen and (max-width: 600px) {
    width: 60%;
  }
  @media screen and (max-width: 425px) {
    width: 55%;
  }
`;

export const Text = styled.div`
  margin: 10px 0 0 0;
  > span {
    text-align: center;
    font-size: 14px;
    line-height: 21px;
    color: ${allColors.colorGrayText};
  }
`;

export const Description = styled.div`
  margin: 15px 0 25px 0;
  > span {
    text-align: center;
    font-size: 14px;
    line-height: 21px;
    color: ${allColors.colorGrayText};
  }
`;

export const CardComponent = styled.div`
  height: 60px;
  background: ${allColors.white};
  box-sizing: border-box;
  display: flex;
  cursor: pointer;
  margin-top: 1.5em;
  margin-bottom: 3em;
  width: fit-content;

  justify-content: center;
  align-items: center;
  @media screen and (min-width: ${size.mobileL}) {
    border: 1px solid #e8e8e8;
    box-shadow: 0px 4px 8px rgba(44, 39, 56, 0.08);
    border-radius: 6px;
    padding: 0 2.5em;
  }
  @media screen and (min-width: ${size.mobileM}) {
    border: 1px solid #e8e8e8;
    box-shadow: 0px 4px 8px rgba(44, 39, 56, 0.08);
    border-radius: 6px;
    padding: 0 1.5em;
  }

  @media screen and (max-width: ${size.mobileM}) {
    margin-bottom: 0em;
    margin-top: 0em;
  }
`;

export const IconPDF = styled.img`
  margin-right: 1em;
  @media only screen and (max-width: ${size.mobileL}) {
    width: 35px;
  }
  @media only screen and (max-width: ${size.mobileM}) {
    width: 30px;
  }
  @media only screen and (max-width: ${size.mobileS}) {
    width: 20px;
  }
`;

export const CheckboxLabel = styled.p`
  font-size: 12px;
  font-weight: 400;
  @media screen and (max-width: ${size.mobileM}) {
    font-size: 11px;
    padding-top: 2px;
  }
`;

export const DocumentLink = styled.span`
  color: ${allColors.colorOrangeMain};
  @media screen and (max-width: ${size.tabletM}) {
    font-size: 10px;
    margin-left: -5px;
  }
`;
