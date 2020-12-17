import React from 'react';
import styled from 'styled-components';
import { size } from '../../../global/styles/Responsive';
import HeroImage from '../../../shared/images/loginMainImage.png';
import PrimaLogo from '../../../shared/images/primaLogo.svg';
import Slogan from '../../../shared/images/slogan.svg';
import { MainLogo, SloganImg } from '../pages/Home/styles';

const MainImage = styled.div`
    display: flex;
    flex: 1;
    height: 100vh;
    width: 50vw;
    align-items: flex-start;
    justify-content: space-between;
    background-image: url(${HeroImage}); 
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
      flex: 5;
      background-position: 50% 30%;
    }
    @media only screen and (max-width: ${size.mobileL}) {
      background-position: 50% 20%;
      background-size:  100vw auto;
      padding-left: 27px;
      padding-top: 36px;
    }
    @media only screen and (max-width: ${size.mobileS}) {
      padding-left: 24px;
      padding-top: 21px;
      background-position: 50% 30%;
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

const CoverPage = () => {
  return (
    <MainImage>
        <MainLogo src={PrimaLogo} />
        <SloganImg src={Slogan} />
    </MainImage>
  )
}
export default CoverPage;
