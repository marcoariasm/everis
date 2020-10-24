import styled from 'styled-components'

import { allColors } from 'shared/styles/index'

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  grid-row-gap: 40px;
  margin-bottom: 20px;
`
export const ContentGridBodyTable = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 10px;
`
export const GridHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  align-items: center;
  width: 100%;
  padding: 22.5px 0px;
  border-radius: 10px;
  background-color: ${allColors.colorGreenSelectCard};
`
export const TitleHeader = styled.span`
  padding: 0 15px;
`
export const GridTable = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 10px;
`
export const GridRowTable = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: center;
  width: 100%;
  padding: 20px 0px;
  border-radius: 10px;
  background-color: ${allColors.colorGrayCard};
`
export const TitleContent = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 25px;
  padding-right: 30px;
`
