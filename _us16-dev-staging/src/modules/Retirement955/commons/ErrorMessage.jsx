import React from "react";
import styled from 'styled-components';

const defaultErrorMessage = 'Lo sentimos, hubo un error inesperado. Intenta nuevamente en unos minutos.';

const WrapperStyled = styled.div`
  padding: 2rem;
  background: white;
  text-align: center;
  margin: 2rem;
`;

const ErrorMessage = ({ message = '' }) => (
  <WrapperStyled>
    { message || defaultErrorMessage }
  </WrapperStyled>
);

export default ErrorMessage;