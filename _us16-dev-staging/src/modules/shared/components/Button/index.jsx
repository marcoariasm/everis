import React from 'react';
import styled from 'styled-components';
import { size } from '../../../../shared/styles/Responsive';
import { allColors } from '../../../../shared/styles/index';

export const ButtonContainer = styled.button`
  background-color: ${allColors.colorOrangeMain};
  border-radius: 4px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-size: 18px;
  font-family: 'Calibri';
  font-weight: 600;
  &:disabled {
    background-color: ${allColors.colorGrayDisabled};
  }
  &:focus {
    outline:none;
  }
`;

const Button = (props) => {
   return (
       <ButtonContainer {...props}>
       {props.children}
       </ButtonContainer>
   )
}

export default Button;