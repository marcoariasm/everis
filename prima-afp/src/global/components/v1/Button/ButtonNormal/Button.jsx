import React from 'react'
import styled, { css } from 'styled-components'
import { allColors } from 'global/styles'
import ProgressWhite from './images/progress_white.svg';

const StyledButton = styled.button`
  font-family: FS Emeric;
  font-size: 18px;
  line-height: 20px;
  font-style: normal;
  font-weight: 500;
  text-align: center;
  padding: 0;
  border: none;
  outline: none;
  cursor: pointer;
  width: ${(props) => props.widthB};
  min-height: ${(props) => props.heightB};
  height:auto;

  ${({isLoading})=> isLoading && `
    display: flex;
    align-items: center;
    justify-content: center;
  `}

  ${({ classButton }) => {
    switch (classButton) {
      case 'btn-anterior':
        return css`
          color: ${allColors.colorGrayText};
          background-color: ${allColors.colorWhiteBase};
          border: 1px solid ${allColors.colorGrayBorder};
          border-radius: 6px;
          box-sizing: border-box;
          box-shadow: 0px 4px 8px rgba(44, 39, 56, 0.08);
          :hover {
            background-color: ${allColors.colorGrayHover};
          }
        `
      case 'btn-desactivado':
        return css`
          color: ${allColors.colorWhiteBase};
          background: #c1bfbb;
          border-radius: 6px;
          :hover {
            background: ${allColors.colorGrayHover};
          }
        `
      case 'btn-siguiente':
        return css`
          color: ${allColors.colorWhiteBase};
          background: ${allColors.colorOrangeMain};
          box-sizing: border-box;
          border-radius: 6px;
          box-shadow: 0px 4px 8px rgba(255, 79, 0, 0.3);
          :hover {
            background-color: ${allColors.colorOrangeHover};
          }
        `
      case 'btn-no-shadow':
        return css`
          color: ${allColors.colorWhiteBase};
          background: ${allColors.colorOrangeMain};
          box-sizing: border-box;
          border-radius: 6px;
          :hover {
            background-color: ${allColors.colorOrangeHover};
          }
        `
      case 'btn-actualizar':
        return css`
          color: ${allColors.colorWhiteBase};
          background: ${allColors.colorOrangeMain};
          box-sizing: border-box;
          border-radius: 6px;
          box-shadow: 0px 4px 8px rgba(255, 79, 0, 0.3);
          :hover {
            background-color: ${allColors.colorOrangeHover};
          }
        `

      case 'btn-pagina-principal':
        return css`
          color: ${allColors.colorWhiteBase};
          background: ${allColors.colorOrangeMain};
          box-sizing: border-box;
          border-radius: 6px;
          box-shadow: 0px 4px 8px rgba(255, 79, 0, 0.3);
          :hover {
            background-color: ${allColors.colorOrangeHover};
          }
        `
      case 'agregar-beneficiario':
        return css`
          border-radius: 6px;
          line-height: 20px;
          font-weight: 500;
          color: ${allColors.colorWhiteBase};
          background: ${allColors.colorGreen};
          box-shadow: 0px 4px 8px rgba(0, 174, 153, 0.35);
        `
      case 'btn-cancelar':
        return css`
          color: ${allColors.colorOrangeMain};
          background: ${allColors.colorWhiteBase};
          border: 2px solid ${allColors.colorOrangeMain};
          box-sizing: border-box;
          border-radius: 6px;
        `
      default:
        return 'color:red'
    }
  }};


  ${({disabled})=> disabled &&
     `
      &:disabled {
          color: #fff;
          background-color: #BBBBBB;
          box-shadow: none;
          cursor: no-drop;
      }
    `
  };
`
const Button = ({ classButton, children, widthB, heightB, onClick, id, value, onchange, border,disabled=false, isLoading = false}) => {
  return (
    <>
      <StyledButton
        disabled={classButton === 'btn-desactivado'}
        id={id}
        classButton={classButton}
        widthB={widthB}
        heightB={heightB}
        onClick={isLoading || disabled ? null : onClick}
        value={value}
        onchange={onchange}
        border={border}
        disabled={disabled}
        isLoading={isLoading}
      >
        {
          isLoading ? <img src={ProgressWhite} style={{height:'1.8rem'}}/> : children
        }

      </StyledButton>
    </>
  )
}
export default Button
