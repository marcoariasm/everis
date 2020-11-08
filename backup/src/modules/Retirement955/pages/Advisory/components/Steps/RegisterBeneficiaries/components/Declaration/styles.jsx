import styled from 'styled-components'

import { size } from 'global/styles/Responsive'
import { allColors } from 'global/styles'

export const SubTitle = styled.h1`
  margin-top: 40px;
  margin-bottom: 30px;
`

export const Line = styled.hr`
  border: 3px dashed ${allColors.colorGrayLineDashed};
  margin-top: 70px;
  @media only screen and (min-width: ${size.tablet}) {
    border: 0.75px dashed ${allColors.colorGrayLineDashed};
  }
`
