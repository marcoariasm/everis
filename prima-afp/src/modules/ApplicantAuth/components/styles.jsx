import styled from 'styled-components';
import { size } from 'global/styles/Responsive';
import { allColors } from 'global/styles/index';
import PrimaAccountAuthModule from 'modules/PrimaAccountAuth';
import WallpaperMobile from 'modules/PrimaAccountAuth/assets/images/mobileBackground.svg';

const { loginWallpaper } = PrimaAccountAuthModule.assets;

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
  margin-bottom: auto;
  margin-top: auto;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-image: url(${loginWallpaper});
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

export const UrlStyles = styled.a`
  color: #ff4f00;
  text-decoration: underline;
  outline: none;
  font-size: 13px;
`;

export const StyledPrimaryButton = styled.button`
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

