import React from 'react';
import styled from 'styled-components';
import checkVerde from './shared/images/iconos/checkverde.svg';

const StyledButtonIcon = styled.button`
  background: #FFFFFF;
  background-image: url(${checkVerde});
  border: 1.5px solid #3FBE63;
  box-shadow: 3px 3px 8px rgba(184, 204, 199, 0.45);
  border-radius: 6px;
  font-family: FS Emeric;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 22px;
  letter-spacing: 0.01em;
  color: #3FBE63;
  padding: 15px 30px 15px 60px;
  background-repeat: no-repeat;
  background-position: 25px;
  float: right;
`;

const ButtonValidation = ({text}) => {
  return (
      <StyledButtonIcon>{text}</StyledButtonIcon>
  );
};
export default ButtonValidation;
