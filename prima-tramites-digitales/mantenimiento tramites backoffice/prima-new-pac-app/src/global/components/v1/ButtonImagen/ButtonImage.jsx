import styled from 'styled-components';
import React from 'react';

const StyledButton = styled.button`
  background: ${({ bcolor }) => bcolor};
  background-image: url(${({ icon }) => icon});
  background-position: ${(props) => (props.value ? '29px 10px' : 'center center')};
  background-repeat: no-repeat;
  border: ${(props) => (props.value
    ? '1px solid rgba(105, 97, 88, 0.3)'
    : `1px solid${props.color}`)};
  margin: ${(props) => (props.value ? 0 : '0 5px')};
  box-sizing: border-box;
  border-radius: 4px;
  font-family: Calibri;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 21px;
  height: 44px;
  outline: none;
  padding: ${(props) => (props.value ? '0 31px 0 61px' : '0')};
  cursor: pointer;
  width: ${({ width }) => width || 'auto'};
  color: ${({ color }) => color};
`;

const ButtonImage = ({
  type = 'button', label, icon, bcolor, color, width, onClick,
}) => (
  <>
    <StyledButton type={type} value={label} icon={icon} bcolor={bcolor} color={color} width={width} onClick={onClick}>{label}</StyledButton>
  </>
);
export default ButtonImage;
