import styled from "styled-components";

import { size } from "../../../../shared/styles/Responsive";
import { allColors } from "../../../../shared/styles/index";

export const GridButtons = styled.div`
  display: grid;
  grid-column-gap: 4%;
  margin: 50px 0 110px 0;
  grid-template-columns: 1fr 1fr;
  @media only screen and (max-width: ${size.tablet}) {
    margin: 20px 0 70px 0;
    grid-row-gap: 6%;
    width: 100%;
  }
`

export const ContentImageCard = styled.div`
  border-radius: 6px;
  padding: 30px 40px 30px 40px;
  display: grid;
  width: 100%;
  justify-self: center;
  grid-template-columns: 0.6fr 1fr;
  column-gap: 6%;
  border: 2px ${allColors.colorGrayBorder} solid;
  box-shadow: 0 4px 8px 1px rgba(53, 53, 53, 0.12);
  :hover {
    border: 2px ${allColors.colorOrangeMain} solid;
  }
  @media only screen and (max-width: ${size.tablet}) {
    padding: 15px 20px 15px 20px;
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    justify-self: left;
    height: 100%;
  }
`

export const ImageData = styled.div`
  align-self: flex-start;
  justify-self: center;
  & > img {
    max-width: 80px;
    height: 100%;
    max-height: 80px;
  }
  @media only screen and (max-width: ${size.tablet}) {
    justify-self: left;
  }
`

export const ContentData = styled.div`
  display: grid;
  align-items: center;
  justify-self: center;
  grid-template-rows: auto auto;
  font-family: Calibri;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1;
  color: ${allColors.colorGrayText};
  @media only screen and (max-width: ${size.tablet}) {
    grid-template-rows: 1fr;
    justify-self: left;
  }
`