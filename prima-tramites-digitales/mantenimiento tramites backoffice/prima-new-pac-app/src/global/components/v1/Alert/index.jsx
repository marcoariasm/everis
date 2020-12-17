import React from 'react';
import styled from 'styled-components';
import WarningIcon from './warning.svg';

const AlertConatiner = styled.div`
  background-color: ${(props) => props.color};
  border-radius: 8px;
  display: flex;
  padding: 0.8em 10px;
  justify-content: center;
  align-items: center;
`;

const AlertIcon = styled.img`
  width: 22px;
  height: 22px;
  margin-right: 1em;
`;

const AlertText = styled.p`
  color: #696158;
  font-size: 12px;
`;

const Alert = ({
  message = '',
  img = WarningIcon,
  className = '',
  backgroundColor = '#fff2f5',
  noMargin = false,
}) => (
  <AlertConatiner noMargin={noMargin} color={backgroundColor} className={`${className}`}>
    <AlertIcon src={img} alt="alert-icon" />
    <AlertText>{message}</AlertText>
  </AlertConatiner>
);

export default Alert;
