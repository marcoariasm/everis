import styled from "styled-components";

import menuTop from "../../assets/images/menu-top.svg";
import menuBottom from "../../assets/images/menu-bottom.svg";
import {size, device} from "../../../../global/styles/Responsive";

export const Wrapper = styled.div`
  font-family: FS Emeric;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 22px;
  max-width: 1280px;
  margin: auto;
  padding: 0;

  .text-menu {
    font-family: FS Emeric;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 24px;
   
  }
  
  @media only screen and ${device.laptopL} {
    .option-menu.active .text-menu{
      color: var(--orangeColorMain);
    }      
  }

  .option-menu.active::before {
    content: ' ';
    background-image: url(${menuTop});
    background-size: contain;
    width: 20px;
    height: 20px;
    position: absolute;
    right: 0;
    top: -20px;
    z-index: 100;
  }

  .option-menu.active::after {
    content: ' ';
    background-image: url(${menuBottom});
    background-size: contain;
    width: 20px;
    height: 20px;
    position: absolute;
    right: 0;
    bottom: -20px;
    z-index: 100;
  }
  @media only screen and (min-width: ${size.laptopL}) {
    .text-menu {
      font-family: FS Emeric;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 18px;
    }
  }
`