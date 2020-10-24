import styled from 'styled-components';
import { size } from '../../../../shared/styles/Responsive';
import LoginMainImg from '../../../../shared/images/loginMainImage.png';

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

export const MainImage = styled.div`
    display: flex;
    flex: 1;
    height: 100vh;
    width: 50vw;
    align-items: flex-start;
    justify-content: space-between;
    background-image: url(${LoginMainImg}); 
    background-size:     cover;
    background-repeat:   no-repeat;
    background-position: center center;
    padding-left: 46px;
    padding-right: 28px;
    padding-top: 23px;
    @media only screen and (max-width: ${size.tabletM}) and (orientation: portrait) {
      background-position: 50% 20%;
      height: 50vh;
      width: 100vw;
    }
    @media only screen and (max-width: ${size.tablet}) and (orientation: portrait) {
      display: none;
    }
    @media screen and (max-width: ${size.tabletM}) and (orientation: landscape) {
      width: 100%;
      height: 40vh;
      background-position: 50% 30%;
    }
    @media only screen 
    and (min-width: 1000px) 
    and (min-height: 1000px) 
    and (orientation: portrait) 
    and (-webkit-min-device-pixel-ratio: 1.5) {
      width: 100%;
      height: 40vh;
      background-position: 50% 30%;
  }
`;