import React from 'react';
import styled from 'styled-components';
import WarningIcon from 'shared/images/iconos/warningIcon.svg';

const Container = styled.div`
  background-color: ${(props) => props.color};
  border-radius: 4px;
  display: flex;
  padding: 0.8em 1.3em;
  justify-content: center;
  align-items: center;
`;

const AlertText = styled.p`
  color: #696158;
  font-size: 12px;
`;

const AlertIcon = styled.img`
  width: 22px;
  height: auto;
  margin-right: 1em;
`;

const AlertMessage = ({
  show = false,
  message = '',
  className = '',
  backgroundColor = '#fff2f5',
  img = WarningIcon,
}) => {
  if (!show) return <></>;
  return (
    <Container color={backgroundColor} className={`${className}`}>
      <AlertIcon src={img} alt="icono" />
      <AlertText>{message}</AlertText>
    </Container>
  );
};

export default AlertMessage;
