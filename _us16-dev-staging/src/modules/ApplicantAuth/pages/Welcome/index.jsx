import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { allColors } from '../../../../shared/styles/index';

import PrimaWhiteLogo from '../../../../shared/images/primaWhiteLogo.svg';
import Slogan from '../../../../shared/images/slogan.svg';
import UserGreen from '../../../shared/images/userGreen.svg';
import UserOrange from '../../../shared/images/userOrange.svg';

import OutlinedButton from '../../../shared/components/OutlinedButton';
import Card from '../../components/Card';
import CardHeader from '../../components/CardHeader';
import { FormContainer, NavSlogan, NavLogo, DetailsNav, LoginContainer, Container } from '../../components/styles';
import '../../components/layout.scss';

export default function Welcome() {
  const history = useHistory();

  return (
    <>
      <Container>
        <DetailsNav><NavLogo src={PrimaWhiteLogo}/><NavSlogan src={Slogan}/></DetailsNav>
        <LoginContainer>
        <NavLogo className="display-mobile" src={PrimaWhiteLogo}/>
          <Card className="login-card">
            <FormContainer>
              <CardHeader
                mainAnteTitle={'Bienvenido(a)'}
                title={'Mis trámites virtuales'}
                description={'El espacio para gestionar de forma fácil y rápida'}
              />
              <OutlinedButton
                onClick={() => history.push('login')}
                className="marginBtnRegularPosition"
                description={'Soy cliente Prima:'}
                iconImg={UserOrange}
                label={'Mi cuenta Prima AFP'}
              />
              <OutlinedButton
                onClick={() => history.push('login-solicitante')}
                className="marginBtnRegularPosition pb2em"
                description={'No soy cliente Prima:'}
                label={'Cuenta solicitante'}
                iconImg={UserGreen}
                color={allColors.colorGreen}
              />
            </FormContainer>
          </Card>
        </LoginContainer>
      </Container>
    </>
  )
};