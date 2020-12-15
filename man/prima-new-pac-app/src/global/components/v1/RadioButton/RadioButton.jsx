import React from 'react';
import styled from 'styled-components';
import $ from 'global/styles';

const RadioButton = ({
  id, label, name, weight, size, checked = false, onChange, type = 'radio',
}) => (
  <Wrapper>
    <Input
      checked={checked}
      type={type}
      onChange={onChange}
      name={name}
      id={id}
      weight={weight}
      size={size}
    />
    <Label htmlFor={id}>{label}</Label>
  </Wrapper>
);

export default RadioButton;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  width: 100%;
`;

const Input = styled.input`
  position: absolute;
  left: -9999px;
  &+label {
    position: absolute;
    padding: 3px 0 0 40px;
    cursor: pointer;
  }
  &+label:before {
      content: "";
      background: ${$.blanco};
      border: 2px solid ${$.gris};
      /* opacity: 0.6; */
      height: 17px;
      width: 17px;
      border-radius: 50%;
      position: absolute;
      top: 3px;
      left: 3px;
    }
  &+label:after {
    content: "";
    background: ${$.mainColor2};
    width: 11px;
    height: 11px;
    border-radius: 50%;
    position: absolute;
    top: 8px;
    left: 8px;
    opacity: 0;
    transform: scale(2);
    transition: transform 0.3s linear, opacity 0.3s linear;
  }
  &:checked+label:after {
    opacity: 1;
    transform: scale(1);
  }
  &:checked+label:before {
    opacity: 1;
    border: 2px solid ${$.mainColor2};
  }
`;

const Label = styled.label`
  position: absolute;
  font-size: ${({ size }) => (size ? `${size}px` : '16px')};
  color: ${$.gris};
  font-weight: ${({ weight }) => weight || 'normal'};
  letter-spacing: 0.02em;
  user-select: none;
`;
