import React from 'react';
import { allColors } from "global/styles";
import { size } from "global/styles/Responsive";
import styled from "styled-components";
export const Title = styled.div`
  font-family: Calibri;
  font-size: 16px;
  font-weight: normal;
  font-style: normal;
  line-height: 21px;
  color: ${allColors.colorGrayText};
  @media only screen and (min-width: ${size.laptopM}) {
    font-size: 20px;
  }
`;

export const GreenTitle = styled.div`
  font-family: Calibri;
  font-size: 18px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.17;
  letter-spacing: normal;
  color: ${allColors.colorGreenBalance};
`

export const Grid2Col = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-column-gap: 3%;
  .input-date {
    margin-top: 16px;
  }
  @media only screen and (min-width: ${size.tablet}) {
    grid-template-columns: 1fr 1fr;
  }
`
