import React from 'react';
import styled, { css } from 'styled-components';
import $ from 'global/styles';

const StyledButtonIcon = styled.button`
  ${({ classButton }) => {
    switch (classButton) {
      case 'btn-sgt-icono':
        return css`
          width: 140px;
          height: 44px;
          background: ${({ disabled }) => (disabled ? `${$.disabled}` : `${$.mainColor2}`)};
          border-radius: 6px;
          outline: none;
          border: none;
          cursor: pointer;
          border: 0.790233px solid ${({ disabled }) => (disabled ? `${$.disabled}` : `${$.mainColor2}`)};
          & label {
            width: 77.1px;
            height: 23.02px;
            left: 24.64%;
            margin-right: 3%;
            top: 28.89%;
            bottom: 19.95%;
            cursor: pointer;
            font-family: Calibri;
            font-style: normal;
            font-weight: ${({ weight }) => weight || 'bold'};
            font-size: ${({ size }) => (size ? `${size}px` : '18px')};
            line-height: 22px;
            letter-spacing: 0.02em;
            color: #ffffff;
          }
        `;
      case 'btn-atras-icono':
        return css`
          width: 140px;
          height: 44px;
          background: #c1bfbb;
          border-radius: 6px;
          outline: none;
          border: none;
          cursor: pointer;
          border: 0.790233px solid #A8A4A0;
          & label {
            left: 32.86%;
            right: 22.14%;
            top: 22.5%;
            bottom: 22.5%;
            cursor: pointer;
            font-family: Calibri;
            font-style: normal;
            font-weight: ${({ weight }) => weight || 'bold'};
            font-size: ${({ size }) => (size ? `${size}px` : '18px')};
            line-height: 22px;
            /* identical to box height */

            /* BLANCO */

            color: #ffffff;
          }
        `;
      default:
        return 'color:red';
    }
  }}
`;
const ButtonIcon = ({
  classButton, children, onClick, disabled = false, size, weight,
}) => (
  <>
    {classButton === 'btn-sgt-icono' && (
    <StyledButtonIcon classButton={classButton} onClick={onClick} disabled={disabled} size={size} weight={weight}>
      <label>{children}</label>
      <svg
        position="left"
        width="17"
        height="11"
        viewBox="0 0 11 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.60446 8.76904L1.29281 14.8326C0.904213 15.206 0.903653 15.81 1.29107 16.1822C1.6812 16.5569 2.3074 16.5536 2.69578 16.1805L9.70719 9.44462C9.70748 9.44434 9.70777 9.44407 9.70806 9.44379C9.70835 9.44351 9.70864 9.44323 9.70893 9.44296C9.9037 9.25584 10.0004 9.01219 10 8.76866C9.99906 8.52453 9.90235 8.28094 9.70893 8.09511C9.70864 8.09484 9.70835 8.09456 9.70806 8.09428C9.70777 8.094 9.70748 8.09373 9.70719 8.09345L2.69578 1.35758C2.30719 0.984255 1.67849 0.983717 1.29107 1.35591C0.900951 1.7307 0.904429 2.3323 1.29281 2.70542L7.60446 8.76904Z"
          fill="white"
          stroke="white"
          strokeWidth="0.7"
        />
      </svg>
    </StyledButtonIcon>
    )}
    {classButton === 'btn-atras-icono' && (
    <StyledButtonIcon classButton={classButton} onClick={onClick} disabled={disabled} size={size}>
      <svg
        width="17"
        height="11"
        viewBox="0 0 11 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.39554 8.50044L9.70719 2.58841C10.0958 2.22442 10.0963 1.63554 9.70893 1.27264C9.3188 0.907224 8.6926 0.910481 8.30422 1.27427L1.29281 7.84174C1.29252 7.84201 1.29223 7.84228 1.29194 7.84255C1.29165 7.84282 1.29136 7.84309 1.29107 7.84337C1.0963 8.0258 0.999639 8.26336 1 8.5008C1.00094 8.73883 1.09765 8.97634 1.29107 9.15751C1.29136 9.15778 1.29165 9.15805 1.29194 9.15832C1.29223 9.15859 1.29252 9.15886 1.29281 9.15913L8.30421 15.7266C8.69281 16.0906 9.3215 16.0911 9.70892 15.7282C10.099 15.3628 10.0956 14.7763 9.70719 14.4125L3.39554 8.50044Z"
          fill="white"
          stroke="white"
          strokeWidth="0.7"
        />
      </svg>
      <label>{children}</label>
    </StyledButtonIcon>
    )}
  </>
);
export default ButtonIcon;
