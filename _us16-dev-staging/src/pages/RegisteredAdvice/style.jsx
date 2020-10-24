import styled from 'styled-components'

import { size } from 'shared/styles/Responsive'
import { allColors } from 'shared/styles'

export const ContentImage = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  align-items: flex-start;
  padding: 30px 30px 0px;
  @media only screen and (min-width: ${size.tablet}) {
    padding: 50px 30px;
  }
`
export const ContentButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: auto;
  margin-top: 40px;
`
export const ButtonPrincipal = styled.a`
  font-family: FS Emeric;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 20px;
  text-align: center;
  cursor: pointer;
  outline: none;
  text-decoration: none;
  padding: 11.5px 20px;
  color: ${allColors.colorWhiteBase};
  background: ${allColors.colorOrangeMain};
  border-radius: 8px;
`
