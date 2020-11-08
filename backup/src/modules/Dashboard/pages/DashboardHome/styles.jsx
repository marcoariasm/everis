import styled, { css } from "styled-components"

import { size } from "global/styles/Responsive"
import { allColors } from "global/styles"


export const PortraitImage = styled.div`
  position: relative;
  display: none;
  & > img {
    position: absolute;
    top: -45px;
    right: 0;
    max-width: 45%;
  }
  @media only screen and (min-width: ${size.tablet}) {
    display: block;
    margin-top: 25px;
  }
  @media only screen and (min-width: ${size.laptopM}) {
    margin-top: 40px;
  }
`;


export const TitleOrange = styled.div`
font-size: 20px;
color: ${allColors.colorOrangeMain};
text-align: center;
> .responsiveUser {
  font-weight: bold;
  display: block;
}
> .responsiveGreeting {
  color: ${allColors.colorGrayText};
  display: block;
  font-size: 16px;
}
${ showOnMobile => showOnMobile && css`
  display: none;
  @media only screen and (max-width: ${size.tablet}) {
    display: block;
  }
`};
`