import React from 'react';
import styled from 'styled-components';
import { size } from 'global/styles/Responsive';
import { allColors } from 'global/styles/index';
import WarningIcon from 'modules/shared/images/warningIcon.svg';


const AlertConatiner = styled.div`
  background-color: ${props => props.color};
  border-radius: 8px;
  display: flex;
  padding: 0.8em 1.3em;
  justify-content: center;
  ${props => props.noMargin ? '' : 'margin-bottom: -1em;'}
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

const StaticAlert = ({ show = true, message = '', img = WarningIcon, className = '', backgroundColor = '#fff2f5', noMargin = false }) => {
    if (!show) return <></>;
    return <AlertConatiner noMargin={noMargin} color={backgroundColor} className={`${className}`}>
      <AlertIcon src={img} alt="alert-icon" />
        <AlertText>{message}</AlertText>
    </AlertConatiner>
}

export default StaticAlert;