import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PrimaWhiteLogo from '../../../PrimaAccountAuth/assets/images/primaWhiteLogo.svg';
import Slogan from '../../../PrimaAccountAuth/assets/images/slogan.svg';
import Card from '../../components/Card';
import MaterialInput from 'global/components/v2/MaterialInput';
import { loginForm } from '../../../shared/constant/ConstantApplicantLogin';
import { resendVerification } from '../../services/index.service';
import { useForm } from 'react-hook-form';
import {
  FormContainer,
  NavSlogan,
  NavLogo,
  DetailsNav,
  LoginContainer,
  AffiliateForm,
  StyledPrimaryButton,
  ButtonContainer,
  Container
} from '../../components/styles';
import CardHeader from '../../components/CardHeader';
import EmailIcon from '../../../shared/images/email.svg';
import ResendEmailModal from '../../components/ResendEmailModal';
import { emailValidations } from '../../../shared/constant/ConstantValidations';
import ErrorHandler from 'global/components/v2/ErrorHandler';
import Loading from 'global/components/v2/Loading';
import Button from 'global/components/v2/Button';
import { useDispatch, useSelector } from 'react-redux';
import { AUTH_Success, AUTH_TOKEN_session, AUTH_applicant } from 'redux/actions/User';
import WarningIcon from 'modules/shared/images/warningIcon.svg';
import StaticAlert from 'global/components/v2/StaticAlert';

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
      {'Reenviar verificación'}
    </Button>
  )
}

export default function ResendVerification(props) {
  const stateRoute = props.location.state;
  const history = useHistory();
  const [showModal, setModalVisibility] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(stateRoute ? stateRoute.email : '');
  const [documentType, setDocumentType] = useState(stateRoute ? stateRoute.documentType : '');
  const [documentNumber, setDocumentNumber] = useState(stateRoute ? stateRoute.documentNumber : '');
  const [errorMessage, setErrorMessage] = useState('');
  const { register, handleSubmit, formState, control, errors, reset } = useForm({ mode: "onChange", defaultValues: { email } });
  const { isValid, touched } = formState;

  const dispatch = useDispatch();
  const resendValidation = async(payload) => {
    setLoading(true)
    const response = await resendVerification({ ...payload, documentType, documentNumber }, stateRoute.idApplicant);
    if (response.errorMessage) {
      setErrorMessage(response.errorMessage);
      return setLoading(false);
    }
    setModalVisibility(true);
    setLoading(false);
  }

  return (
    <>
      <Container>
        <DetailsNav><NavLogo src={PrimaWhiteLogo} /><NavSlogan src={Slogan}/></DetailsNav>
        <LoginContainer>
          <NavLogo className="display-mobile" src={PrimaWhiteLogo}/>
          <Card className="login-card">
          <FormContainer onSubmit={handleSubmit(resendValidation)}>
            <CardHeader
              anteTitle={loginForm.subtitle}
              title={loginForm.title}
              subtitle={'Verifica tu correo'}
            />
            <MaterialInput
              capitalizeInput={true}
              name={'email'}
              onChange={setEmail}
              register={register(emailValidations)}
              placeholder={loginForm.emailPlaceholder}
              className="inputRegularResponsiveM"
            />
            <ErrorHandler
              isTouched={touched[loginForm.inputNames.email]}
              errors={errors}
              name={loginForm.inputNames.email}
            />
            <StaticAlert
                show={errorMessage.length > 0}
                message={errorMessage}
                img={WarningIcon}
                className="inputRegularResponsiveM"
              />
            <ButtonSection loading={loading} disabled={!isValid} />
          </FormContainer>
        </Card>
        <ResendEmailModal
          hideResendBtn={true}
          email={email}
          showModal={showModal}
          onClose={() => setModalVisibility(false)}
          icon={EmailIcon}
        />
        </LoginContainer>
      </Container>
    </>
  )
};