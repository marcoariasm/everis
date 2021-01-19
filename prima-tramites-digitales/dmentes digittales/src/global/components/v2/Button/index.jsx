import React from 'react';
import styled from 'styled-components';
import { allColors } from 'global/styles/index';

export const ButtonContainer = styled.button`
  border-radius: 4px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-family: 'Calibri';
  font-weight: 600;
`;

const Button = (props) => {
   return (
       <ButtonContainer {...props}>
       {props.children}
       </ButtonContainer>
   )
}

export default Button;