import styled from 'styled-components'

import { size } from 'shared/styles/Responsive'
import { allColors } from 'shared/styles/index'

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  grid-row-gap: 10px;
  margin-bottom: 20px;
`
export const GridHeader = styled.div`
  display: grid;
  grid-template-columns: 22% 39% 27%;
  grid-column-gap: 6%;
  align-items: center;
  width: 100%;
  text-align: center;
  padding: 15px 24px;
  border-radius: 10px;
  background-color: ${allColors.colorGreenSelectCard};
  @media only screen and (min-width: ${size.laptopL}) {
    padding: 15px 27px;
  }
`
export const TitleHeader = styled.span`
  letter-spacing: 0.01em;
`
export const GridTable = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 4px;
`
export const GridRowTable = styled.div`
  display: grid;
  grid-template-columns: 22% 39% 27%;
  grid-column-gap: 6%;
  width: 100%;
  padding: 15px 24px;
  border-radius: 10px;
  align-items: flex-start;
  background-color: ${allColors.colorGrayCard};
  @media only screen and (min-width: ${size.laptopL}) {
    padding: 20px;
  }
`
export const TitleContent = styled.div`
  display: flex;
  flex-direction: column;
`
export const ContentCaracteristic = styled.div`
  display: flex;
  flex-direction: column;
`
export const ContentPensionGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 85px;
  @media only screen and (min-width: ${size.laptopL}) {
    grid-row-gap: 105px;
  }
`
export const ContentPension = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 10px;
`
export const ContentSubTitle = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 20px;
`
export const SubTitleContent = styled.div`
  display: grid;
  grid-template-columns: 1fr;
`
export const PensionText = styled.div`
  margin: 0 15px;
  text-align: center;
`
export const PensionAmount = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`
