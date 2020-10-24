import styled from 'styled-components'

import { size } from 'shared/styles/Responsive'
import { allColors } from 'shared/styles/index'

export const Title = styled.div`
  display: flex;
  align-items: center;
  margin-left: 15px;
  margin-top: 35px;
  margin-bottom: 40px;
  @media only screen and (min-width: ${size.tablet}) {
    margin-left: 35px;
  }
`

export const Card = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 0px;
  @media only screen and (min-width: ${size.tablet}) {
    grid-row-gap: 10px;
  }
`
export const FailData = styled.span`
  height: 0px;
  line-height: 0;
  margin-bottom: .6rem;
  font-family: Calibri;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  display: flex;
  align-items: center;
  letter-spacing: -0.00615385em;

  color: ${allColors.colorRedError};

  border-radius: 10.8773px;
`
export const ContentBotonera = styled.div`
  width: 100%;
  justify-content: center;
`
export const ContentForm = styled.div`
  & > div {
    height: 100%;
    max-height: 350px;
    overflow-y: scroll;
    overflow-x: hidden;
  }
  @media only screen and (min-width: ${size.tablet}) {
    & > div {
      max-height: none;
      overflow-y: hidden;
    }
  }
`
export const GridAddBeneficiary = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 14px;
  margin: 0px 10px;
  @media only screen and (min-width: ${size.tablet}) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 30px;
    grid-row-gap: 14px;
    margin-left: 35px;
    margin-right: 35px;
  }
  @media only screen and (min-width: ${size.laptopL}) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-column-gap: 15px;
    margin-left: 35px;
    margin-right: 35px;
  }
`
