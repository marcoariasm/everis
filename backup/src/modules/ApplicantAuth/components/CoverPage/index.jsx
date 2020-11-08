import React from 'react';
import PrimaLogo from '../../../../shared/images/primaLogo.svg';
import Slogan from '../../../../shared/images/slogan.svg';
import { MainImage, MainLogo, SloganImg } from './styles';

const CoverPage = () => {
  return (
    <MainImage>
        <MainLogo src={PrimaLogo} />
        <SloganImg src={Slogan} />
    </MainImage>
  )
}
export default CoverPage;
