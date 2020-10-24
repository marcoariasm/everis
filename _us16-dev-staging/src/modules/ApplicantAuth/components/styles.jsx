import styled from 'styled-components';
import { size } from '../../../shared/styles/Responsive';
import { allColors } from '../../../shared/styles/index';
import Wallpaper from '../../../shared/images/wallpaper.png';
import WallpaperMobile from '../../shared/images/mobileBackground.svg';

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
`;

export const ModalIcon = styled.img`
  width: 48px;
  height: 48px;
  margin-top: 1.4em;
  align-self: center;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 3em;
  max-width: 400px;
  align-self: center;
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
    background-position: top;
    background-size: 100vw auto;
    background-image: url(${WallpaperMobile});
    background-color: ${allColors.colorGrayCard};
  }
`;

export const NavSlogan = styled.img`
  width: 150px;
  height: 45px;
`;

export const NavLogo = styled.img`
  width: 110px;
  height: 45px;
  @media screen and (max-width: ${size.tabletS})  {
    margin: 0.8em 0 2em 1.3em;
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

export const AffiliateForm = styled.form`
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

/*------------------*/

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

// export const Button = styled.button`
//   background-color: ${allColors.colorOrangeMain};
//   width: 296px;
//   border-radius: 4px;
//   height: 44px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   color: #ffffff;
//   font-size: 18px;
//   font-family: 'Calibri';
//   font-weight: 600;
//   &:disabled {
//     background-color: ${allColors.colorGrayDisabled};
//   }
//   &:focus {
//     outline:none;
//   }
//   @media screen and (max-width: ${size.tablet})  {
//     width: 360px;
//   }
//   @media screen and (max-width: ${size.tabletS})  {
//     width: 302px;
//   }
//   @media screen and (max-width: ${size.mobileL})  {
//     width: 240px;
//   }
//   @media screen and (max-width: ${size.mobileM})  {
//     width: 220px;
//   }
// `;

// width: 296px;
//  @media screen and (max-width: ${size.tablet})  {
//     width: 360px;
//   }
//   @media screen and (max-width: ${size.tabletS})  {
//     width: 302px;
//   }
//   @media screen and (max-width: ${size.mobileL})  {
//     width: 240px;
//   }
//   @media screen and (max-width: ${size.mobileM})  {
//     width: 220px;
//   }


export const RecoverAccountSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2.8em;
  @media screen and (max-width: ${size.tabletM})  {
    display: none;
  }
`;

export const RecoverAccounText = styled.p`
  color: #696158;
  font-size: 13px;
  font-family: 'Calibri';
  text-align: center;
`;

export const UrlStyles = styled.button`
  color: #ff4f00;
  text-decoration: underline;
  outline: none;
  font-size: 12px;
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

/*--------------------*/

// margin-bottom: 5em;
// export const ButtonContainer = styled.div`
//   width: 100%;
//   margin-top: 3em;
//   margin-bottom: 5em;
//   displya: grid;
//   place-items: center;
//   @media screen and (max-width: ${size.tabletM})  {
//     margin-top: 1.5em;
//   }
// `;

export const ButtonContainer = styled.div`
  width: 100%;
  margin-top: 2.8em;
  display: grid;
  place-items: center;
  @media screen and (max-width: ${size.tabletM})  {
    margin-top: 1.5em;
  }
`;

// export const ButtonContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-center: center;
//   padding-top: 2em;
// `;