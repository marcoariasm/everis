import React from "react";
import { Container, DetailsNav, NavLogo, NavSlogan } from './styles';
import PrimaWhiteLogo from "../../assets/images/primaWhiteLogo.svg";
import Slogan from "../../assets/images/slogan.svg";

const WallpaperPageContainer = ({ children }) => (
  <Container>
    <DetailsNav><NavLogo src={PrimaWhiteLogo}/><NavSlogan src={Slogan}/></DetailsNav>
    { children }
  </Container>
);

export default WallpaperPageContainer;