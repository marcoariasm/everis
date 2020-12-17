import styled from 'styled-components'

import { allColors } from 'global/styles'

export const ContainerText = styled.div`
  display: flex;
  flex-direction: column;
  width: auto;
`
export const Line = styled.hr`
  border: 1px dashed ${allColors.colorGrayLineDashed};
  margin-bottom: 30px;
`
export const EndText = styled.span`
  font-size: 14px;
  line-height: 17px;
`
export const EndTextClose = styled.span`
  margin-top: 10px;
`
export const PopUpLink = styled.span`
  font-weight: bold;
  cursor: pointer;
  text-decoration: underline;
  color: ${allColors.colorOrangeHover};
`
export const BoldText = styled.span`
  font-weight: bold;
`