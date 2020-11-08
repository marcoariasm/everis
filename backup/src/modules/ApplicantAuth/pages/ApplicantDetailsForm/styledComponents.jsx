import { allColors } from 'global/styles/index';
import styled from 'styled-components';
import { size } from 'global/styles/Responsive';
import Wallpaper from 'shared/images/wallpaper.png';

export const Card = styled.div`
  width: ${props => props.percentageWidth ? props.percentageWidth + '%' : 'auto'};
  padding: ${props => props.padding || '70px 15%'};
  background: ${allColors.colorWhiteBase};
  border-radius: 14px;
  box-shadow: 0px 2px 40px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  flex-direction: column;
  @media only screen and (max-width: ${size.tabletM}) {
    padding: 8% 15%;
  }
  @media only screen and (max-width: ${size.mobileL}) {
    padding: 1.5em 9% 5em 9%;
  }
  @media only screen and (max-width: ${size.mobileM}) {
    padding: 1em 15% 5em 15%;
  }
  @media only screen and (max-width: ${size.mobileS}) {
    padding: 0.5em 9% 5em 9%;
  }
`;

export const LoginTitle = styled.h1`
  margin-top: 15px;
  display: block;
  padding-left: 0.3em;
  @media only screen and (max-width: ${size.mobileL}) {
    font-size: 23px;
    margin-top: 0px;
  }
  @media only screen and (max-width: ${size.mobileS}) {
    font-size: 20px;
  }
`;

export const LoginContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-end;
  height: 100vh;
  width: 100vw;
  padding: 0 5em;
  margin-top: -0.5em;
 @media screen and (max-width: ${size.tabletM}) {
     padding: 2em 3em;
      justify-content: center;
      align-items: flex-start;
      display: block;
      overflow: auto;
      min-height: min-content;
  }
  @media screen and (max-width: ${size.tabletS})  {
    padding: 2em 1em;
  }
`;


export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-image: url(${Wallpaper});
  background-size:     cover;
  background-repeat:   no-repeat;
  background-position: left center;
  height: 100vh;
  width: 100vw;
  padding: 0;
  margin: 0;
  @media screen and (max-width: ${size.tabletM}) {
    background-image: none;
    background-color: #f7f7f8;
  }
`;

export const DetailsNav = styled.div`
  width: 100vw;
  height: 80px;
  display: flex;
  justify-content: space-between;
  padding: 25px 50px;
  @media screen and (max-width: ${size.tabletM})  {
    display: none;
  }
`;


export const LoginCardDescription = styled.p`
  margin-top: 0.8em;
  @media only screen and (max-width: ${size.mobileL}) {
    font-size: 14px;
    margin-top: 1em;
  }
  @media only screen and (max-width: ${size.mobileS}) {
    margin-bottom: 0.5em;
  }
`;

export const Button = styled.button`
  background-color: ${allColors.colorOrangeMain};
  width: 296px;
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

export const RowInputContainer = styled.div`
  display: flex;
  flex-direction: row;
      justify-content: center;
  @media screen and (max-width: ${size.tabletM}) {
      flex-direction: column;
      justify-content: center;
  }
`;

export const InputGrid = styled.div`
  width: 276px;
  margin: 1.2em 0.8em;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: ${size.laptopL})  {
    width: 250px;
  }
  @media screen and (max-width: ${size.tabletM})  {
    width: 100%;
    margin: 1.2em 0em;
  }
`;

export const CardLogo = styled.img`
  width: 88px;
  height: 32px;
  margin-bottom: 2em;
  margin-top: 0.5em;
  margin-left: 0.5em;
  display: none;
  @media screen and (max-width: ${size.tabletM}) {
      display: block;
  }
`;

export const NavLogo = styled.img`
  width: 110px;
  height: 45px;
`;

export const NavSlogan = styled.img`
  width: 150px;
  height: 45px;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CheckboxSection = styled.div`
  margin-left: 0.8em;
  padding-top: 2.5em;
`;

export const CheckboxLabel = styled.p`
  font-size: 12px;
  font-weight: 400;
  span {
    color: ${allColors.colorOrangeMain};
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-center: center;
  padding-top: 2em;
`;