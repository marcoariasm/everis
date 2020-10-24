import React from 'react';
import styled from 'styled-components';
import { size } from '../../../../shared/styles/Responsive';
import { allColors } from '../../../../shared/styles/index';

const OutlineButtonContainer = styled.button`
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
  @media only screen and (max-width: ${size.tabletS}) {
    font-size: 15px;
  }
  @media only screen and (max-width: ${size.mobileM}) {
    font-size: 14px;
  }
`;

const OutlinedBtnContent = styled.div`
  display: flex;
  width: 80%;
  alignItems: center;
  justifyContent: center;
`;

const OutlinedButton = ({
    iconImg,
    color = allColors.colorOrangeMain,
    label,
    description,
    className = '',
    onClick
}) => {

  const handleBtnAction = () => {
      if (onClick) onClick();
  }

  return (
      <div className={className}>
      { description && <p className="tableBodyText pb1em">{ description }</p> }
        <OutlineButtonContainer onClick={handleBtnAction} color={color}>
            <OutlinedBtnContent>
                {  iconImg && <IconContainer><img src={iconImg}/></IconContainer>}
                <LabelContainer>{label}</LabelContainer>
            </OutlinedBtnContent>
        </OutlineButtonContainer>
    </div>
  )
}
export default OutlinedButton;
