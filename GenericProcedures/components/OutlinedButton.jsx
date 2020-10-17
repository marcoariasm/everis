import React from 'react';
import styled from 'styled-components';
import { size } from '../../../shared/styles/Responsive';

const OutlineButton = styled.button`
  box-shadow: 0 0 0 1pt ${props => props.color};
  outline: none;
  width: 100%;
  height: 52px;
  display: flex;
  color: ${props => props.color};
  font-size: 17px;
  font-weight: 400;
  align-items: center;
  justify-content: center;
  border-width: 0px;
  border-radius: 6px;
  padding-top: 16px;
  flex-direction: row;
  padding-bottom: 16px;
  @media only screen and (max-width: ${size.mobileL}) {
    font-size: 16px;
  }
  @media only screen and (max-width: ${size.mobileXS}) {
    font-size: 13px;
  }
`;

const IconContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const LabelContainer = styled.div`
  display: flex;
  flex: 5;
  align-items: center;
  justify-content: center;
`;

const OutlinedButton = ({ iconImg, color, label }) => {
  return (
    <OutlineButton color={color}>
        <div style={{ display: 'flex', width: '80%', alignItems: 'center', justifyContent: 'center' }}>
            {  iconImg && <IconContainer><img src={iconImg}/></IconContainer>}
            <LabelContainer>{label}</LabelContainer>
        </div>
    </OutlineButton>
  )
}
export default OutlinedButton;
