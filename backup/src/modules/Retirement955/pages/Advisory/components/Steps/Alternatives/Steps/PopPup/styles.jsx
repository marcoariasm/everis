import styled from 'styled-components'

import { size } from 'global/styles/Responsive'

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin: 30px 20px 40px 20px;
  @media screen and (max-width: ${size.tablet}) and (orientation: landscape) {
    overflow-y: scroll;
    margin: 15px 25px;
  }
`
export const TitleModal = styled.span`
  font-size: 20px;
  line-height: 22px;
  @media only screen and (min-width: ${size.tablet}) {
    padding-right: 25px;
  }
`
export const CharacterList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 10px;
  margin-top: 28px;
  @media only screen and (min-width: ${size.tablet}) {
    margin-top: 40px;
  }
`
export const CharacteristicsText = styled.span`
  font-size: 16px;
  line-height: 20px;
  @media only screen and (min-width: ${size.tablet}) {
    font-size: 18px;
    line-height: 24px;
  }
`
