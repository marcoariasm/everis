import React from 'react'
import styled, { css } from 'styled-components'
import { allColors } from 'global/styles'
import { size } from 'global/styles/Responsive'

const StyledValidateInfoCard = styled.div`
  ${({ classButton }) => {
    switch (classButton) {
      case 'card-gray':
        return css`
          background: ${(props) => (props.backGround ? props.backGround : allColors.colorGrayCard)};
          border: 1px solid ${(props) => (props.border ? props.border : allColors.colorGrayCard)};
        `
      case 'card-gray-dashed':
        return css`
          background: ${allColors.colorGrayCard};
          border: 2px solid ${allColors.colorGrayCardDashed};
          border-style: dashed;
        `
      default:
        return 'background: transparent'
    }
  }}
  display: flex;
  height: auto;
  flex-direction: column;
  border-radius: 7px;
  @media screen and (min-width: ${size.tablet}) {
    flex-direction: row;
  }
`

const CardGray = ({ classButton, children, backGround, border }) => {
  return (
    <>
      <StyledValidateInfoCard classButton={classButton} backGround={backGround} border={border}>
        {children}
      </StyledValidateInfoCard>
    </>
  )
}
export default CardGray
