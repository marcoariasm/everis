import styled from 'styled-components'

import { size } from 'global/styles/Responsive'
import { allColors } from 'global/styles'

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 30px;
  margin-top: 30px;
`
export const ContentSection = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 20px;
  justify-items: center;
`
export const ContainerText = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 60px;
  justify-items: center;
  margin: 30px 0 30px 0;
`
export const ContentModalities = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 20px 50px;
  margin-top: 20px;
  border-radius: 10.5px;
  background: ${allColors.colorGreenSelectCard};
  @media only screen and (min-width: ${size.tablet}) {
    display: none;
  }
`
export const CoinSection = styled.span`
  letter-spacing: 0.02em;
  @media only screen and (min-width: ${size.laptop}) {
    text-align: left;
  }
`
