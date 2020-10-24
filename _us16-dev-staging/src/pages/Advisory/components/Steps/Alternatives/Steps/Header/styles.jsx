import styled from 'styled-components'

import { size } from 'shared/styles/Responsive'
import { allColors } from 'shared/styles'

export const ContainerText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: auto;
`
export const Balance = styled.span`
  font-size: 18px;
  line-height: 20px;
  text-align: center;
  margin-top: 40px;
  margin-bottom: 12px;
  @media only screen and (min-width: ${size.tablet}) {
    text-align: left;
  }
`
export const IntroText = styled.span`
  display: block;
  text-align: center;
  letter-spacing: 0.02em;
  padding-bottom: 30px;
  @media only screen and (min-width: ${size.tablet}) {
    padding-bottom: 40px;
    text-align: left;
  }
`
export const ModalitiesText = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 20px 50px;
  border-radius: 10.5px;
  color: ${allColors.colorGreen};
  background: ${allColors.colorGreenSelectCard};
  & > span {
    font-size: 18px;
    line-height: 20px;
  }
`
