import React from 'react'
import styled from 'styled-components'

import { size } from 'shared/styles/Responsive'

const Content = styled.div`
  display: grid;
`
const StyleGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  margin-top: 27px;
  margin-bottom: 26px;
  margin-left: 20px;
  margin-right: 19px;
  grid-row-gap: 14px;
  padding: 25px 19.5px;

  @media only screen and (min-width: ${size.tablet}) and (max-width: ${size.laptop}) {
    margin-top: 38px;
    margin-left: 43px;
    margin-right: 32px;
    grid-row-gap: 13px;
    gap: 31px;
    grid-template-columns: 1fr 1fr 1fr;
    grid-auto-rows: auto;
    grid-column-gap: 13px;
    margin-bottom: 37px;
    padding: 0px;
  }
  @media only screen and (min-width: ${size.laptop}) {
    margin-top: 38px;
    margin-left: 43px;
    margin-right: 32px;
    grid-row-gap: 13px;
    gap: 31px;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-auto-rows: auto;
    grid-column-gap: 13px;
    margin-bottom: 37px;
    padding: 0px;
  }
`

const GridInfoBeneficiaries = ({ children }) => {
  return (
    <Content>
      <StyleGrid>{children}</StyleGrid>
    </Content>
  )
}
export default GridInfoBeneficiaries
