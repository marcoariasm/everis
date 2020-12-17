import React from 'react'
import styled from 'styled-components'

import { size } from 'global/styles/Responsive'
import { allColors } from 'global/styles'

export const Grid = styled.div`
  display: grid;
  grid-row-gap: 14px;
  grid-template-rows: 1fr 1fr;
  padding: 25px 19.5px;
  margin-top: 20px;
  margin-bottom: 35px;
  border-radius: 6px;
  background-color: ${allColors.colorGrayCard};
  @media only screen and (min-width: ${size.tablet}) {
    grid-template-columns: 25% 25% 25%;
    grid-column-gap: 12.5%;
    grid-row-gap: 25px;
    padding: 35px 40px;
  }
  @media only screen and (min-width: ${size.laptopL}) {
    grid-template-columns: 23% 23% 23%;
    grid-column-gap: 15.5%;
    grid-row-gap: 25px;
    padding: 35px 40px;
  }
`
const GridTable = ({ children }) => {
  return <Grid>{children}</Grid>
}

export default GridTable
