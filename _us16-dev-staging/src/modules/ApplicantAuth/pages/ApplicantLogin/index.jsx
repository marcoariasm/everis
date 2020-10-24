import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { loginForm } from '../../../shared/constant/ConstantApplicantLogin';
import { idDocumentOptions } from '../../../shared/constant/ConstantMaterialSelect';
import { login, autoLogin } from '../../core/ApplicantLoginService';
import { ACCESS_TOKEN } from '../../core/ApplicantLoginService/constants';
import Persistence from '../../core/ApplicantLoginService/persistence';

import PrimaWhiteLogo from '../../../../shared/images/primaWhiteLogo.svg';
import Slogan from '../../../../shared/images/slogan.svg';
import CheckIcon from '../../../../shared/images/check-ready.svg';

import MaterialInput from '../../../shared/components/MaterialInput';
import MaterialCheckbox from '../../../shared/components/MaterialCheckbox';
import Button from '../../../shared/components/Button';
import Card from '../../components/Card';
import DropdownInput from '../../../shared/components/DropdownInput';
import CardHeader from '../../components/CardHeader';
import RecoverPassModal from './components/RecoverPassModal';
import { FormContainer, NavSlogan, NavLogo, DetailsNav, LoginContainer, UrlStyles, Container } from '../../components/styles';
import './styles.scss';
import '../../components/layout.scss';
import styled from 'styled-components';

export const UrlText = styled.p`
  text-align: center;
  margin-top: 2.8em;
`;

const documentNumberValidations = {
  // ONLY NUMBERS WITHOUT SPACES - LENGTH: 8 - MÁXIMO NÚMERO DE CEROS SEGUIDOS AL INICIO 7
  '00': (value = '') => {
    const onlyNumbers =  /^[0-9\b]+$/;
    if (!onlyNumbers.test(Number(value))) return false;

    const hasSpaces = /\s/;
    if (hasSpaces.test(value)) return false;

    if (value.length > 8) return false;

    const getArrayByZeros = value.split('0').length - 1;
    if (getArrayByZeros > 7) return false;

    return true;
  },
  // ONLY NUMBERS WITHOUT SPACES - SE PERMITEN LOS STRINGS 'N' Y 'N-' AL COMIENZO, EL RESTO DEBEN SER NÚMEROS
  '01': (value = '') => {
    const hasSpaces = /\s/;
    if (hasSpaces.test(value)) return false;

    let capitalizedText = value.toUpperCase();
    const numberOfCharacters = capitalizedText.startsWith('N-') ? 2 : capitalizedText.startsWith('N') ? 1 : 0;

    if (numberOfCharacters) {
      const stringArray = capitalizedText.split('');
      stringArray.splice(0, numberOfCharacters);
      capitalizedText = stringArray.join('');
    }

    const stringWhithoutSpaces = capitalizedText.replace(/ /g,'');

    const onlyNumbers =  /^[0-9\b]+$/;
    if (!onlyNumbers.test(Number(stringWhithoutSpaces))) return false;

    return true;
  },
  '02': (value = '') => {
    const hasSpaces = /\s/;
    if (hasSpaces.test(value)) return false;
    const onlyNumbers =  /^[0-9\b]+$/;
    if (!onlyNumbers.test(Number(value))) return false;
    const stringWhithoutSpaces = value.replace(/ /g,'');
    if (stringWhithoutSpaces.length > 8) return false;
    return true;
  },
  '03': (value = '') => {
    const hasSpaces = /\s/;
    if (hasSpaces.test(value)) return false;
    const stringWhithoutSpaces = value.replace(/ /g,'');
    if (stringWhithoutSpaces.length > 12) return false;
    return true;
  },
  '04': (value = '') => {
    const hasSpaces = /\s/;
    if (hasSpaces.test(value)) return false;
    const stringWhithoutSpaces = value.replace(/ /g,'');
    if (stringWhithoutSpaces.length > 12) return false;
    const letterNumber = /^[0-9a-zA-Z]+$/;
    if (!letterNumber.test(stringWhithoutSpaces)) return false;
    return true;
  }
}

export default function ApplicantLogin() {
  const history = useHistory();
  const [showModal, setModalVisibility] = useState(false);
  const [docType, setDocType] = useState();
  const [docNum, setDocNum] = useState();
  const [docNumValidation, setDocNumValidation] = useState();
  const { register, handleSubmit, formState, getValues, errors } = useForm({
    mode: "onChange",
    defaultValues: { }
  });
  const { isValid } = formState;

  const formSubmitAction = async(payload) => {
    try {
      const user = await login(payload);
      if (user.active) return history.push(`inicio`);
      return history.push(`completar-registro`);
    } catch (error) {
      console.trace(error);
    }
  }; 

  useEffect(() => {
    // const token = Persistence.getValue(ACCESS_TOKEN);
    // if (token) handleAutoLogin(token);
  }, [docNum])

  useEffect(() => {
    setDocNum('');
  }, [docType])

  const goToCreateAccount = () => history.push(`crear-cuenta`);

  const handleAutoLogin = async(token) => {
    const user = await autoLogin(token);
    if (user) return history.push(`inicio/${user.applicantId}`);
  }


  const handleDocumentChange = (value) => {
    setDocNum(value.inputValue);
    if (value.selectValue) setDocType(value.selectValue.value);
  }

  return (
    <>
      <Container>
        <DetailsNav><NavLogo src={PrimaWhiteLogo}/><NavSlogan src={Slogan}/></DetailsNav>
        <LoginContainer>
        <NavLogo className="display-mobile" src={PrimaWhiteLogo}/>
          <Card className="login-card">
            <FormContainer onSubmit={handleSubmit(formSubmitAction)}>
              <CardHeader anteTitle={loginForm.anteTitle} title={loginForm.title} />
              <DropdownInput
                    className="inputRegularResponsive"
                    resetInputWhenSelectChange={true}
                    registerSelect={register({ required: true })}
                    registerInput={register({ required: true })}
                    name={loginForm.inputNames.documentNumber}
                    selectName={loginForm.inputNames.documentType}
                    selectOptions={idDocumentOptions}
                    placeholder={loginForm.dropdownPlaceholder}
                  />
                  <MaterialInput
                    register={register({ required: true })}
                    className="inputRegularResponsive"
                    name={loginForm.inputNames.password}
                    placeholder={loginForm.passwordPlaceholder}
                    type="password"
                  />
                  <UrlText className="informationFooterText">
                    {loginForm.forgotPassword}{' '}
                    <UrlStyles onClick={() => setModalVisibility(true)}>{loginForm.recoverHere}</UrlStyles>
                  </UrlText>
                  <Button
                    className="marginBtnRegularPosition"
                    disabled={!isValid}
                    type="submit"
                  >
                    {loginForm.submitBtnLabel}
                  </Button>
                  <UrlText className="display-desktop informationFooterText">
                    {loginForm.dontHaveAccount} <UrlStyles onClick={goToCreateAccount}>{loginForm.createHere}</UrlStyles>
                  </UrlText>
            </FormContainer>
          </Card>
          <RecoverPassModal
            showModal={showModal}
            onClose={() => setModalVisibility(false)}
            icon={CheckIcon}
          />
          <UrlText className="display-mobile informationFooterText">
            {loginForm.dontHaveAccount} <UrlStyles onClick={goToCreateAccount}>{loginForm.createHere}</UrlStyles>
          </UrlText>
        </LoginContainer>
      </Container>
    </>
  )
};