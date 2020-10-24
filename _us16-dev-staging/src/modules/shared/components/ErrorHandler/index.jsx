import React, { useEffect, useState } from 'react';
import { allColors } from '../../../../shared/styles/index';
import styled from 'styled-components';
import { ErrorMessage } from '@hookform/error-message';

const ErrorText = styled.p`
  color: #ff0000;
  font-size: 11px;
  margin-top: ${props => props.noMargin ? '0' : '-0.9em'};
  margin-bottom: ${props => props.noMargin ? '0' : '-1.1em'};
  margin-left: 0.3em;
`;

const ErrorHandler = ({ isTouched = false, errors, name, className = '', noMargin  }) => {
    if (!isTouched) return <></>;
    return (
        <ErrorMessage
            errors={errors}
            name={name}
            render={ ({ message }) => <ErrorText noMargin={noMargin} className={`responsiveElementInputSize ${className}`}>{message}</ErrorText>}
        />
    )
}

export default ErrorHandler;



    