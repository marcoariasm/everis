import styled from 'styled-components'

import { size } from 'shared/styles/Responsive'

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 30px;
  margin-top: 30px;
  @media only screen and (min-width: ${size.tablet}) {
    grid-row-gap: 30px;
  }
`
export const ContainerText = styled.div`
  width: auto;
  padding: 30px 24px 20px 24px;
`
export const TitleSection = styled.span`
  @media only screen and (min-width: ${size.laptopL}) {
    text-align: left;
  }
`
export const ContentCaracteristic = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`
export const Characteristics = styled.li`
  list-style: none;
  padding-bottom: 10px;
  @media only screen and (min-width: ${size.laptopL}) {
    padding-bottom: 25px;
    text-align: left;
  }
`
export const CoinSection = styled.span`
  display: block;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 10px;
  @media only screen and (min-width: ${size.laptop}) {
    text-align: left;
  }
`
