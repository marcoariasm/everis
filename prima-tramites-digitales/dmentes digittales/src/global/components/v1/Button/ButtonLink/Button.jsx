import React from 'react'
import styled, { css } from 'styled-components'
import { allColors } from 'global/styles'

const StyledButton = styled.a`
  font-family: Calibri;
  padding: ${(props) => props.heightB} ${(props) => props.widthB};
  text-decoration: none;
  cursor: pointer;
  ${({ classButton }) => {
    switch (classButton) {
      case 'btn-anterior':
        return css`
          outline: none;
          background-color: ${allColors.grayHover};
          color: ${allColors.grayText};
          border: none;
          border-radius: 6px;
          font-style: normal;
          font-weight: bold;
          font-size: 16px;
          line-height: 20px;
          text-align: center;
          cursor: pointer;
        `
      case 'btn-desactivado':
        return css`
          outline: none;
          background: #c1bfbb;
          border: 0.1em solid rgba(193, 191, 187, 0.3);
          border-radius: 6px;
          font-style: normal;
          font-weight: bold;
          font-size: 16px;
          line-height: 20px;
          text-align: center;
          color: #ffffff;
          cursor: pointer;
        `
      case 'btn-siguiente':
        return css`
          outline: none;
          border: none;
          background: ${allColors.colorOrangeMain};
          color: ${allColors.colorWhiteBase};
          border-radius: 8px;
          font-style: normal;
          font-weight: bold;
          font-size: 16px;
          line-height: 20px;
          text-align: center;
          cursor: pointer;
        `
      case 'btn-actualizar':
        return css`
          outline: none;
          background: ${allColors.colorOrangeMain};
          border: none;
          color: ${allColors.colorWhiteBase};
          border-radius: 8px;
          font-style: normal;
          font-weight: bold;
          font-size: 20px;
          line-height: 24px;
          text-align: center;
          cursor: pointer;
        `

      case 'btn-pagina-principal':
        return css`
          outline: none;
          background: ${allColors.colorOrangeMain};
          color: ${allColors.colorWhiteBase};
          border: none;
          border-radius: 8px;
          font-style: normal;
          font-weight: bold;
          font-size: 18px;
          line-height: 22px;
          text-align: center;
          cursor: pointer;
        `
      default:
        return 'color:red'
    }
  }};
`
const Button = ({ src, classButton, children, widthB, heightB }) => {
  return (
    <>
      <StyledButton href={src} target="blank" classButton={classButton} widthB={widthB} heightB={heightB}>
        {children}
      </StyledButton>
    </>
  )
}
export default Button
