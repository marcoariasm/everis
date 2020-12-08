import styled, { css } from "styled-components"

import { size } from "global/styles/Responsive"
import { allColors } from "global/styles"

export const CardGrid = styled.div`
display: grid;
grid-column-gap: 3%;
grid-row-gap: 3%;
grid-template-columns: 1fr 1fr;
grid-template-rows: auto auto;
margin: 16px 0;
min-height: 100%;
grid-template-areas:
  "button1 button1"
  "button2 button3";
@media only screen and (min-width: ${size.tablet}) {
  margin: 54px 52px 52px 41px;
  grid-column-gap: 3%;
  grid-row-gap: 3%;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;
  grid-template-areas: "button1 button2 button3";
  width: 100%;
  margin: auto;
  padding-top: 20px;
}
`
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
  flex-direction: column;
  text-align: center;
  border-radius: 8px;
  padding: 20px 18px 18px 18px;
  border: 2px #e8e8e8 solid;
  height: 100%;
  box-shadow: 0 4px 8px 1px rgba(53, 53, 53, 0.12);
  :hover{
    border: 2px ${allColors.colorOrangeMain} solid;
}
`

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
margin: 5px 12px;
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

