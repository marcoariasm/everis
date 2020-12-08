import React, { useEffect, useState } from 'react';
import { allColors } from 'global/styles/index';
import styled from 'styled-components';
import './styles.scss';

const LoadingText = styled.p`
  color: #ff4f00;
  font-size: 12px;
  font-family: Calibri;
  text-align: center;
  position: absolute;
  margin-left: -3px;
  bottom: -1.8em;
`;

const Loading = ({ children, className = 'medium-spinner' }) => {
    return (
        <div className="spinner-container">
        <div className={`spinner ${className}`}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        { children && <LoadingText>{ children }</LoadingText>}
        </div>
        </div>
    )
}

export default Loading;



    