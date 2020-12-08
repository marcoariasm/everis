import styled from "styled-components";
import {size} from "../../../../global/styles/Responsive";
import WallpaperMobile from "../../assets/images/mobileBackground.svg";
import loginWallpaper from "../../assets/images/loginWallpaper.png";
import {allColors} from "../../../../global/styles";

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


export const DetailsNav = styled.div`
  width: 100vw;
  height: 80px;
  display: flex;
  justify-content: space-between;
  padding: 20px;
  margin-bottom: 20px;
  @media screen and (min-width: ${size.tabletM})  {
    padding: 25px 50px;
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