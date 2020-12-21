import React from 'react';
import styled from 'styled-components';
import { ErrorMessage } from '@hookform/error-message';

const ErrorText = styled.p`
  color: #ff0000;
  font-size: 11px;
`;

const ErrorHandler = ({ isTouched = false, errors, name, className = '' }) => {
    if (!isTouched) return <></>;
    return (
        <ErrorMessage
            errors={errors}
            name={name}
            render={ ({ message }) => <ErrorText className={`responsiveElementInputSize errorHandlerMargin ${className}`}>{message}</ErrorText>}
        />
    )
}

export default ErrorHandler;



    