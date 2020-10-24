import styled from 'styled-components'
import { allColors } from 'shared/styles'
import { size } from 'shared/styles/Responsive'

export const SubTitle = styled.h1`
  margin-top: 30px;
  margin-bottom: 40px;
  @media only screen and (min-width: ${size.tablet}) {
    margin-top: 28px;
    margin-bottom: 52px;
  }
`
export const ContentDeclaration = styled.div`
  margin-top: 33px;
`
export const ContainerText = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
`
export const Line = styled.hr`
  border: 1px dashed ${allColors.colorGrayLineDashed};
  margin-bottom: 30px;
`
export const EndTextClose = styled.span`
  margin-top: 20px;
`