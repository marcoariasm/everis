import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PrimaWhiteLogo from '../../../../shared/images/primaWhiteLogo.svg';
import Slogan from '../../../../shared/images/slogan.svg';
import MaterialInput from '../../../shared/components/MaterialInput';
import MaterialCheckbox from '../../../shared/components/MaterialCheckbox';
import Card from '../../components/Card';
import { loginForm, loginConfirmationModal } from '../../../shared/constant/ConstantApplicantLogin';
import DropdownInput from '../../../shared/components/DropdownInput';
import { allColors } from '../../../../shared/styles/index';
import { applicantCard, detailsForm } from '../../../shared/constant/ConstantApplicantDetailsForm';
import Modal from '../../../../global/components/Modal';
import styled from 'styled-components';
import CheckIcon from '../../../../shared/images/check-ready.svg';
import CardHeader from '../../components/CardHeader';
import { idDocumentOptions } from '../../../shared/constant/ConstantMaterialSelect';
import { useForm } from 'react-hook-form';
import {
  FormContainer,
  NavSlogan,
  NavLogo,
  DetailsNav,
  LoginContainer,
  AffiliateForm,
  Button,
  ButtonContainer, 
  Container
} from '../../components/styles';
import {
  ModalContent,
  ModalIcon,
  ModalMessage,
  ModalNotification,
  ModalDescription,
  ModalHighlitedDescription,
  InputGrid, 
  ModalButtonContainer
} from './styledComponents';

export default function RecoverPassword() {
  const history = useHistory();
  const [formIsValid, setFormValidity] = useState(false);
  const [showModal, setModalVisibility] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmationPassword, setConfirmationPassword] = useState('');
  const [idDocument, setIdDocument] = useState({});
  const [email, setEmail] = useState('');
  const { register, handleSubmit, formState, control } = useForm({  mode: "onChange" });
  const { isValid } = formState;

  const updatePassword = () => {
    // Servicio
    history.push('/login-solicitante');
  }

  return (
      <Container>
        <DetailsNav><NavLogo src={PrimaWhiteLogo} /><NavSlogan src={Slogan}/></DetailsNav>
        <LoginContainer>
          <NavLogo className="display-mobile" src={PrimaWhiteLogo}/>
          <Card className="login-card">
          <FormContainer onSubmit={handleSubmit(updatePassword)}>
            <CardHeader
              anteTitle={'Cuenta solicitante'}
              title={'Recupero de contraseña'}
              subtitle={'Ingresa tu nueva contraseña'}
            />
            <MaterialInput
              className="inputRegularResponsive"
              register={register({ required: true })}
              placeholder={loginForm.passwordPlaceholder}
              type={'password'}
              name={'password'}
            />
            <MaterialInput
              className="inputRegularResponsive"
              register={register({ required: true })}
              placeholder={'Confirmar contraseña'}
              type={'password'}
              name={'confirmPassword'}
            />
            <Button
              className="marginBtnRegularPosition"
              disabled={!isValid}
              type="submit"
            >
              {'Crear contraseña'}
            </Button>
          </FormContainer>
        </Card>
        </LoginContainer>
      </Container>
  )
};