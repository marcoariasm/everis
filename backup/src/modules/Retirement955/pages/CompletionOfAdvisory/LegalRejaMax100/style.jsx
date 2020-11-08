import styled from 'styled-components'

import { size } from 'global/styles/Responsive'
import { allColors } from 'global/styles'

export const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media only screen and (min-width: ${size.laptopL}) {
    padding: 0 47px;
  }
`
export const ContentText = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 20px;
  padding-bottom: 36px;
  @media only screen and (min-width: ${size.tablet}) {
    padding-bottom: 30px;
  }
`
export const GridTable = styled.div`
  display: grid;
  grid-template-columns: 23% 70%;
  grid-column-gap: 7%;
  justify-items: center;
  padding: 32px 20px;
  border-radius: 10px;
  background-color: ${allColors.colorGrayCard};
  @media only screen and (min-width: ${size.tablet}) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto;
    padding: 32px 0px;
  }
`
export const ContentImageData = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  width: 100%;
  justify-self: center;
  @media only screen and (min-width: ${size.tablet}) {
    grid-template-columns: 26% 26% 26%;
    grid-template-rows: 1fr;
    justify-content: center;
  }
`
export const ImageData = styled.div`
  align-self: flex-start;
  justify-self: center;
  & > img {
    width: 100%;
    max-width: 70px;
    height: 100%;
    max-height: 70px;
  }
`
export const Ellipse = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 5px;
  justify-items: center;
  align-self: center;
  @media only screen and (min-width: ${size.tablet}) {
    grid-template-columns: repeat(18, 1fr);
    grid-template-rows: 1fr;
    justify-self: center;
    grid-column-gap: 5px;
  }
`
export const ContentData = styled.div`
  display: grid;
  align-items: center;
  grid-template-rows: auto 70px auto;
  width: 100%;
  @media only screen and (min-width: ${size.tablet}) {
    grid-template-columns: 26% 26% 26%;
    grid-template-rows: 1fr;
    justify-content: center;
  }
`
export const Space = styled.div``
export const CardData = styled.div`
  @media only screen and (min-width: ${size.tablet}) {
    text-align: center;
  }
`
