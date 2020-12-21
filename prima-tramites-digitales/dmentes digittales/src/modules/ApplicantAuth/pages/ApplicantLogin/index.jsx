import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { loginForm } from '../../../shared/constant/ConstantApplicantLogin';
import { documentDropdownValidations, passwordInputValidations } from '../../../shared/constant/ConstantValidations';
import { login, getUser, getDocumentList } from '../../services/index.service';
import { manageLoginSesion, userState } from '../../core/AppSession';
import useDocumentType from 'modules/Retirement955/api/Login/useDocumentType';
import { idDocumentOptions } from 'modules/shared/constant/ConstantMaterialSelect';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

import PrimaWhiteLogo from 'modules/PrimaAccountAuth/assets/images/primaWhiteLogo.svg';
import Slogan from 'modules/PrimaAccountAuth/assets/images/slogan.svg';
import CheckIcon from 'shared/images/check-ready.svg';
import EmailIcon from 'modules/shared/images/email.svg';
import WarningIcon from 'modules/shared/images/warningIcon.svg';

import MaterialInput from 'global/components/v2/MaterialInput';
import Loading from 'global/components/v2/Loading';
import ErrorHandler from 'global/components/v2/ErrorHandler';
import StaticAlert from 'global/components/v2/StaticAlert';
import Button from 'global/components/v2/Button';
import Card from '../../components/Card';


import DropdownInput from 'global/components/v2/DropdownInput';
import CardHeader from '../../components/CardHeader';
import RecoverPassModal from './components/RecoverPassModal';
import ResendEmailModal from 'modules/ApplicantAuth/components/ResendEmailModal';
import { FormContainer, NavSlogan, NavLogo, DetailsNav, LoginContainer, UrlStyles, Container } from '../../components/styles';
import './styles.scss';
import '../../components/layout.scss';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { AUTH_Success, AUTH_TOKEN_session, AUTH_applicant } from 'redux/actions/User';

export const UrlText = styled.p`
  text-align: center;
  margin-top: 2.8em;
`;

const ButtonSection = ({ loading = false, disabled = false }) => {
  if (loading) return <div className="regularLoadingBtnPadding">
    <Loading className="small-spinner">Cargando...</Loading>
  </div>;
  return (
    <Button
      className="marginBtnRegularPosition primary-btn"
      disabled={disabled}
      type="submit"
    >
      {loginForm.submitBtnLabel}
    </Button>
  )
}

export default function ApplicantLogin() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const history = useHistory();
  const [showModal, setModalVisibility] = useState(false);
  const [showResendModal, setResendModal] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [docType, setDocType] = useState();
  const [userEmail, setUserEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectOptions, setSelectOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState, errors } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    criteriaMode: 'all'
  });
  const { isValid, touched } = formState;
  const { documentType } = useDocumentType({ authenticated: false });
  const dispatch = useDispatch();
  const authStore = useSelector(state => state.auth);
  const { tokenSessionInfo, idApplicant } = authStore;
  
  useEffect(() => {
    chargeSelect();
  }, []);

  useEffect(() => {
    if (loading) setErrorMessage('');
  }, [loading]);

  useEffect(() => {
    if (currentUser && currentUser.idApplicant) manageSuccessfulAction();
  }, [currentUser]);

  useEffect(() => {
    if (tokenSessionInfo && tokenSessionInfo.accessToken) {
        getLoginUser(tokenSessionInfo);
    } 

    if (tokenSessionInfo && tokenSessionInfo.accessToken === '') {
      setResendModal(true);
      return setLoading(false);
    }
  }, [tokenSessionInfo])

  const getLoginUser = async(tokenInfo) => {
      const userResponse = await getUser(tokenInfo);
      if (userResponse.errorMessage) {
        setErrorMessage(userResponse.errorMessage);
        return setLoading(false);
      }
      manageLogin(userResponse);
  }

  const manageLogin = (userResponse) => {
    const getUserState = manageLoginSesion(userResponse, tokenSessionInfo);
    if (getUserState === userState.inactive) {
      setResendModal(true);
      setLoading(false);
      return setUserEmail(userResponse.email.toUpperCase());
    }
    setCurrentUser(userResponse);
    if (getUserState === userState.incomplete) return history.push(`completar-registro`, { currentUser: userResponse, tokenSessionInfo });
    setLoading(false);
    history.push(`inicio`);
  }

  const chargeSelect = async() => {
     const options = await getDocumentList();
     if (!options || options && !options.length) return setSelectOptions(idDocumentOptions);
     setSelectOptions(options);
  }

  const handleError = (errorMessage) => {
    setErrorMessage(errorMessage);
  }

const resendEmailHandler = () => {
  setResendModal(true);
  setUserEmail(currentUser.email.toUpperCase());
}

const manageSuccessfulAction = () => {
  if (!Number(currentUser.active)) return resendEmailHandler();
  if (Number(currentUser.complete)) return history.push(`inicio`);
  history.push(`completar-registro`, { currentUser, tokenSessionInfo });
}

  const formSubmitAction = async(payload) => {
    setLoading(true);
    const token = await executeRecaptcha('login');
    const loginResponse = await login({ ...payload, captchaToken: token });
    if (!loginResponse.errorMessage) {
      if (loginResponse.accessToken) return dispatch(AUTH_TOKEN_session(loginResponse));
      if (!loginResponse.accessToken) {
        setResendModal(true);
        setLoading(false);
        return dispatch(AUTH_applicant(loginResponse.idApplicant))
      };
    }
    setErrorMessage(loginResponse.errorMessage);
    setLoading(false);
  };

  const goToCreateAccount = () => history.push(`crear-cuenta`);

  const handleDocumentChange = (value) => {
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
                  className="inputRegularResponsiveM"
                  resetInputWhenSelectChange={true}
                  onChange={handleDocumentChange}
                  capitalizeInput={docType === 2}
                  registerSelect={register}
                  registerInput={register(documentDropdownValidations(docType))}
                  name={loginForm.inputNames.documentNumber}
                  selectName={loginForm.inputNames.documentType}
                  selectOptions={selectOptions}
                  placeholder={loginForm.dropdownPlaceholder}
                  noPadding={true}
                />
                <ErrorHandler
                    isTouched={touched[loginForm.inputNames.documentNumber]}
                    errors={errors}
                    name={loginForm.inputNames.documentNumber}
                    className="errorHandlerDropdown"
                  /> 
                  <MaterialInput
                    register={register(passwordInputValidations)}
                    className="inputRegularResponsiveM"
                    name={loginForm.inputNames.password}
                    placeholder={loginForm.passwordPlaceholder}
                    type="password"
                    error={
                      <ErrorHandler
                        isTouched={touched[loginForm.inputNames.password]}
                        errors={errors}
                        name={loginForm.inputNames.password}
                      />
                    }
                  />
                  <StaticAlert
                    show={errorMessage.length > 0}
                    message={errorMessage}
                    img={WarningIcon}
                    className="inputRegularResponsiveM"
                  />
                  <UrlText className="informationFooterText">
                    {loginForm.forgotPassword}{' '}
                    <UrlStyles onClick={() => setModalVisibility(true)}>{loginForm.recoverHere}</UrlStyles>
                  </UrlText>
                  <ButtonSection loading={loading} disabled={!isValid} />
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
          <ResendEmailModal
            email={userEmail}
            showModal={showResendModal}
            onClose={() => setResendModal(false)}
            icon={EmailIcon}
          />
          <UrlText className="display-mobile informationFooterText">
            {loginForm.dontHaveAccount} <UrlStyles onClick={goToCreateAccount}>{loginForm.createHere}</UrlStyles>
          </UrlText>
        </LoginContainer>
      </Container>
    </>
  )
};