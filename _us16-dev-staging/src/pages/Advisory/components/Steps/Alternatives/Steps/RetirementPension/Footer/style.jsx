import styled from 'styled-components'

import { allColors } from 'shared/styles'

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
export const PopUpLink = styled.span`
  font-weight: bold;
  cursor: pointer;
  text-decoration: underline;
  color: ${allColors.colorOrangeHover};
`
