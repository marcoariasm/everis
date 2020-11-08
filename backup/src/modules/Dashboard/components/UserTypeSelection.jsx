import React from 'react';
import styled from 'styled-components';
import { size } from '../../../global/styles/Responsive';
import UserOrange from '../../../shared/images/userOrange.svg';
import UserGreen from '../../../shared/images/userGreen.svg';
import { userTypeSelection } from '../../Retirement955/constants/ConstantLogin';
import OutlinedButton from './OutlinedButton';
import { AnteTitle, LoginTitle, TitleUnderline, LoginCardDescription } from '../pages/Home/styles';
import { allColors } from '../../../global/styles/index';

const ButtonDescription = styled.p`
  margin-bottom: 10px;
  @media only screen and (max-width: ${size.mobileL}) {
    font-size: 12px;
  }
`;

const ButtonSection = styled.div`
  padding: 1.5em 0;
  @media only screen and (max-width: ${size.mobileS}) {
    padding: 0.65em 0;
  }
`;

const UserTypeSelection = () => {
  return (
    <>
        <AnteTitle className="headerSubTitleHighligh">{userTypeSelection.subtitle}</AnteTitle>
        <LoginTitle className="headerTitleHighligh">{userTypeSelection.title}</LoginTitle>
        <TitleUnderline color={allColors.colorOrangeMain}/>
        <LoginCardDescription className="bodyTextSecundary">{userTypeSelection.description}</LoginCardDescription>
        <ButtonSection>
          <ButtonDescription className="bodyTextSmall">{userTypeSelection.myAccountPrima}</ButtonDescription>
          <OutlinedButton color={allColors.colorOrangeMain} iconImg={UserOrange} label="Mi cuenta Prima AFP"/>
        </ButtonSection>
        <ButtonSection>
          <ButtonDescription className="bodyTextSmall">{userTypeSelection.notClientPrima}</ButtonDescription>
          <OutlinedButton color={allColors.colorGreen} iconImg={UserGreen} label="Cuenta solicitante"/>
        </ButtonSection>
    </>
  )
}
export default UserTypeSelection;
