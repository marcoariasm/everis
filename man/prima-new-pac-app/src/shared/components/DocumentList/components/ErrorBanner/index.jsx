import React from 'react';
import styled from 'styled-components';
import ErrorFile from '../../../../images/errorFile.svg';
import { size } from '../../../../../../shared/styles/Responsive';

const ErrorBannerContainer = styled.div`
  display: grid;
  grid-template-columns: 2em auto;
  grid-column-gap: 10px;
  align-items: center;
  padding: 1.3em 1em 0.5em 1em;
  border-top: 1px solid #cfcfcf;
  margin-top: 1.8em;
  @media screen and (max-width: ${size.mobileM})  {
    grid-column-gap: 15px;
  }
`;

const ErrorTitle = styled.p`
  color: #ff0000;
  font-size: 12px;
  font-family: 'Calibri';
  @media screen and (max-width: ${size.tabletS})  {
    font-size: 11px;
  }
  @media screen and (max-width: ${size.mobileL})  {
    font-size: 10px;
  }
  @media screen and (max-width: ${size.mobileM})  {
    font-size: 9px;
  }
`;

const ErrorDescription = styled.p`
  color: #696158;
  font-size: 12px;
  font-family: 'Calibri';
  @media screen and (max-width: ${size.tabletS})  {
    font-size: 11px;
  }
  @media screen and (max-width: ${size.mobileL})  {
    font-size: 10px;
  }
  @media screen and (max-width: ${size.mobileM})  {
    font-size: 9px;
  }
`;

const defaultError = {
    error: 'Hubo un problema al subir los archivos',
    advice: 'Intente cargar el documento nuevamente'
};

const ErrorBanner = ({ errorInformation = defaultError }) => (
  <ErrorBannerContainer>
    <img src={ErrorFile} /><div>
        <ErrorTitle>{errorInformation.error}</ErrorTitle>
        <ErrorDescription>{errorInformation.advice}</ErrorDescription>
    </div>
  </ErrorBannerContainer>
);

export default ErrorBanner;