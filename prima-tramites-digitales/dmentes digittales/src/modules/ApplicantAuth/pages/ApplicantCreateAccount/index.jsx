import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PrimaWhiteLogo from '../../../PrimaAccountAuth/assets/images/primaWhiteLogo.svg';
import Slogan from '../../../PrimaAccountAuth/assets/images/slogan.svg';
import Card from '../../components/Card';
import MaterialInput from 'global/components/v2/MaterialInput';
import { signupForm } from '../../../shared/constant/ConstantApplicantSignup';
import DropdownInput from 'global/components/v2/DropdownInput';
import EmailIcon from '../../../shared/images/email.svg';
import { createAccount, activateAccount, getDocumentList, genericErrors } from '../../services/index.service';
import CardHeader from '../../components/CardHeader';
import { idDocumentOptions } from '../../../shared/constant/ConstantMaterialSelect';
import { useForm } from 'react-hook-form';
import VerificationModal from './components/VerificationModal';
import Button from 'global/components/v2/Button';
import { FormContainer, NavSlogan, NavLogo, DetailsNav, LoginContainer, Container } from '../../components/styles';
import ResendEmailModal from '../../components/ResendEmailModal';
import '../../components/layout.scss';
import { documentDropdownValidations, passwordInputValidations, emailValidations } from '../../../shared/constant/ConstantValidations';
import ErrorHandler from 'global/components/v2/ErrorHandler';
import Loading from 'global/components/v2/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { AUTH_applicant } from 'redux/actions/User';
import StaticAlert from 'global/components/v2/StaticAlert';
import WarningIcon from 'modules/shared/images/warningIcon.svg';
import { readUrlParams } from 'modules/shared/helpers/HelperRoutes';

const ButtonSection = ({ loading = false, disabled = false }) => {
  if (loading) return <div className="regularLoadingBtnPadding">
    <Loading className="small-spinner">Cargando...</Loading>
  </div>;
  return (
    <Button
      className="marginBtnRegularPosition marginBtnNoMarginPosition primary-btn"
      disabled={disabled}
      type="submit"
    >
      {signupForm.submitBtnLabel}
    </Button>
  )
}

export default function ApplicantCreateAccount(props) {
  const history = useHistory();
  const path = props.location.search;
  const [showModal, setModalVisibility] = useState(false);
  const [accountToken, setToken] = useState('');
  const [currentUserInfo, setCurrentUserInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [showRegistryModal, setShowRegistryModal] = useState(false);
  const [email, setEmail] = useState('');
  const [idApplicantResponse, setIdApplicant] = useState('');
  const [error, setError] = useState(false);
  const [docType, setDocType] = useState();
  const [docNum, setDocNum] = useState();
  const [selectOptions, setSelectOptions] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [validVerification, setValidVerification] = useState(true);
  const { register, handleSubmit, formState, control, errors } = useForm({ 
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: { },
    criteriaMode: 'all'
  });
  const { isValid, touched } = formState;

  const dispatch = useDispatch();
  const authStore = useSelector(state => state.auth);
  const { idApplicant } = authStore;

  useEffect(() => {
    chargeSelect();
  }, [])

  useEffect(() => {
    const params = readUrlParams(path);
    if (params.token) verifyToken(params.token);
  }, [path]);

  useEffect(() => {
    if (idApplicant.length) dispatch(AUTH_applicant(idApplicant));
  }, [idApplicant])

  useEffect(() => {
    if (loading) setErrorMessage('');
  }, [loading]);

  const verifyToken = async(token) => {
    const response = await activateAccount(token);
    if (response.errorMessage) {
      if (response.errorMessage === genericErrors.invalidTimeToken) setValidVerification(false);
      if (response.errorMessage === genericErrors.errorValidatingToken) setError(true);
      if (response.errorMessage === genericErrors.invalidToken) setError(true);
    } 
    setLoading(false);
    setShowRegistryModal(true);
  }

  const chargeSelect = async() => {
     const options = await getDocumentList();
     if (!options || options && !options.length) return setSelectOptions(idDocumentOptions);
     setSelectOptions(options);
  }
  
  const createNewAccount = async(payload) => {
      setLoading(true);
      const completePayload = { ...payload, email: payload.email.toUpperCase() };
      const response = await createAccount(completePayload);
      if (response.errorMessage) {
        setErrorMessage(response.errorMessage);
        return setLoading(false);
      }
      setModalVisibility(true);
      setCurrentUserInfo(completePayload);
      setEmail(payload.email);
      setIdApplicant(response.idApplicant);
      setLoading(false);
  }

  const handleOnCloseVerification = () => {
    setError(false);
    setShowRegistryModal(false);
  }

  const handleDocumentChange = (value) => {
    setDocNum(value.inputValue);
    if (value.selectValue) setDocType(value.selectValue.value);
  }

  return (
    <>
      <Container>
        <DetailsNav><NavLogo src={PrimaWhiteLogo} /><NavSlogan src={Slogan}/></DetailsNav>
        <LoginContainer>
          <NavLogo className="display-mobile" src={PrimaWhiteLogo}/>
          <Card className="login-card">
            <FormContainer onSubmit={handleSubmit(createNewAccount)}>
              <CardHeader anteTitle={signupForm.anteTitle} title={signupForm.title} />
              <DropdownInput
                className="inputRegularResponsiveM"
                resetInputWhenSelectChange={true}
                onChange={handleDocumentChange}
                capitalizeInput={docType === 2}
                registerSelect={register}
                registerInput={register(documentDropdownValidations(docType))}
                name={signupForm.inputNames.documentNumber}
                selectName={signupForm.inputNames.documentType}
                selectOptions={selectOptions}
                placeholder={signupForm.dropdownPlaceholder}
                noPadding={true}
              />
              <ErrorHandler
                isTouched={touched[signupForm.inputNames.documentNumber]}
                errors={errors}
                name={signupForm.inputNames.documentNumber}
                className="errorHandlerDropdown"
              /> 
              <MaterialInput
                className="inputRegularResponsiveM"
                capitalizeInput={true}
                type="email"
                name={signupForm.inputNames.email}
                register={register(emailValidations)}
                placeholder={signupForm.emailPlaceholder}
                error={
                      <ErrorHandler
                        isTouched={touched[signupForm.inputNames.email]}
                        errors={errors}
                        name={signupForm.inputNames.email}
                      />
                    }
              />
              <MaterialInput
                register={register(passwordInputValidations)}
                className="inputRegularResponsiveM pb1em"
                name={signupForm.inputNames.password}
                placeholder={signupForm.passwordPlaceholder}
                type="password"
                error={
                      <ErrorHandler
                        isTouched={touched[signupForm.inputNames.password]}
                        errors={errors}
                        name={signupForm.inputNames.password}
                      />
                    }
              />
              <StaticAlert
                noMargin={true}
                show={errorMessage.length > 0}
                message={errorMessage}
                img={WarningIcon}
                className="inputRegularResponsiveM"
              />
              <p className="inputRegularResponsiveM pb1em informativeBodyText">{signupForm.bottomWarning}</p>
              <ButtonSection loading={loading} disabled={!isValid} />
            </FormContainer>
        </Card>
         <ResendEmailModal
          documentData={currentUserInfo}
          email={email}
          idApplicant={idApplicantResponse}
          showModal={showModal}
          onClose={() => setModalVisibility(false)}
          icon={EmailIcon}
        />
      <VerificationModal
        show={showRegistryModal}
        error={error}
        isValid={validVerification}
        onClose={() => setShowRegistryModal(false)}
      />
        </LoginContainer>
      </Container>
    </>
  )
};