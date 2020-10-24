import styled, { css } from "styled-components"

import { size } from "shared/styles/Responsive"
import { allColors } from "shared/styles"

export const ButtonCard1 = styled.div`
grid-area: button1;
`

export const ButtonCard2 = styled.div`
grid-area: button2;
`

export const ButtonCard3 = styled.div`
grid-area: button3;
`

export const ResponsiveBlock1 = styled.div`
display: block;
@media only screen and (max-width: ${size.tablet}) {
  display: none;
}
`

export const ResponsiveBlock2 = styled.div`
display: none;
@media only screen and (max-width: ${size.tablet}) {
  display: block;
}
`

export const Content = styled.div`
display: flex;
height: 100%;
flex-direction: column;
text-align: center;
border-radius: 8px;
padding: 20px 18px 18px 18px;
border: 1px #e8e8e8 solid;
box-shadow: 0 4px 8px 1px rgba(53, 53, 53, 0.12);
:hover{
  border: 1px ${allColors.colorOrangeMain} solid;
  box-shadow: 0 4px 8px 1px rgba(53, 53, 53, 0.12);
}
`

export const TopImage = styled.div`
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
`

export const Image = styled.div`
& > img {
  width: 100%;
  max-width: 56px;
  height: 100%;
  max-height: 56px;
}
`

export const Title = styled.div`
font-family: Calibri;
font-style: normal;
font-weight: bold;
font-size: 16px;
line-height: 18px;
margin: 5px 0;
color: ${allColors.colorGrayText};
@media only screen and (min-width: ${size.laptopM}) {
  font-size: 16px;
}
`

export const Text = styled.div`
font-family: Calibri;
font-style: normal;
font-size: 14px;
margin: 5px 0;
color: ${allColors.colorGrayText};
@media only screen and (min-width: ${size.laptopM}) {
  font-size: 14px;
}
`

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