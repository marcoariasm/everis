import styled from 'styled-components'

import { size } from 'global/styles/Responsive'
import { allColors } from 'global/styles'

export const ContainerText = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  margin: 30px 0;
  @media only screen and (min-width: ${size.tablet}) {
    margin: 18px 0 30px 0;
  }
`
export const TitleFinal = styled.div`
  margin-bottom: 40px;
  @media only screen and (min-width: ${size.tablet}) {
    margin-bottom: 47px;
  }
`
export const SubTitle = styled.div`
  text-align: center;
  margin-bottom: 24px;
  @media only screen and (min-width: ${size.tablet}) {
    margin-bottom: 22px;
    text-align: left;
  }
`
export const CardGrayEsSalud = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  @media only screen and (min-width: ${size.tablet}) {
    grid-template-columns: 24% 1% 75%;
    align-items: center;
  }
`
export const PensionEsSaludText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding-top: 40px;
  border-radius: 10px;
  height: 100%;
  width: 100%;
  background-color: ${allColors.colorGrayCard};
  @media only screen and (min-width: ${size.tablet}) {
    padding-top: 0;
  }
`
export const Space = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${allColors.colorWhiteBase};
`
export const CharacteristicsEsSalud = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 20px;
  border-radius: 10px;
  height: 100%;
  width: 100%;
  padding: 30px;
  background-color: ${allColors.colorGrayCard};
  @media only screen and (min-width: ${size.tablet}) {
    padding: 20px 30px;
  }
`
