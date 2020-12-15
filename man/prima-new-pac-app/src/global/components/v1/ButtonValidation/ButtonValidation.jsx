import React from 'react';
import styled from 'styled-components';
import checkVerde from 'shared/images/iconos/checkverde.svg';

const StyledButtonIcon = styled.button`
  background: #FFFFFF;
  background-image: url(${checkVerde});
  border: 1.5px solid #3FBE63;
  border-radius: 6px;
  font-family: FS Emeric;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 22px;
  letter-spacing: 0.01em;
  color: #3FBE63;
  padding: 15px 31px 15px 60px;
  background-repeat: no-repeat;
  background-position: 25px;
  width: 330px;
  margin-bottom: 30px;
  align-self: flex-end;
`;

const ButtonValidation = ({ text }) => (
  <StyledButtonIcon>{text}</StyledButtonIcon>
);
export default ButtonValidation;
