import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PrimaWhiteLogo from '../../../PrimaAccountAuth/assets/images/primaWhiteLogo.svg';
import Slogan from '../../../PrimaAccountAuth/assets/images/slogan.svg';
import MaterialInput from 'global/components/v2/MaterialInput';
import Card from '../../components/Card';
import { loginForm } from '../../../shared/constant/ConstantApplicantLogin';
import CardHeader from '../../components/CardHeader';
import { passwordInputValidations } from '../../../shared/constant/ConstantValidations';
import { useForm } from 'react-hook-form';
import ErrorHandler from 'global/components/v2/ErrorHandler';
import { updatePassword } from '../../services/index.service';
import Loading from 'global/components/v2/Loading';
import Button from 'global/components/v2/Button';
import WarningIcon from 'modules/shared/images/warningIcon.svg';
import StaticAlert from 'global/components/v2/StaticAlert';
import { readUrlParams } from 'modules/shared/helpers/HelperRoutes';
import {
  FormContainer,
  NavSlogan,
  NavLogo,
  DetailsNav,
  LoginContainer,
  StyledPrimaryButton,
  Container
} from '../../components/styles';

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
      Crear contraseña
    </Button>
  )
}

export default function RecoverPassword(props) {
  const history = useHistory();
  const [formIsValid, setFormValidity] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setModalVisibility] = useState(false);
  const [password, setPassword] = useState('');
  const [recoveryToken, setRecoveryToken] = useState('');
  const [confirmationPassword, setConfirmationPassword] = useState('');
  const [idDocument, setIdDocument] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const { register, handleSubmit, formState, control, errors, reset } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: { },
    criteriaMode: 'all'
  });

  const { isValid, touched } = formState;

  useEffect(() => {
    parseToken();
  }, []);

  const parseToken = () => {
    const path = props.location.search;
    const params = readUrlParams(path);
    if (params.token) setRecoveryToken(params.token);
  }

  const newPassword = async(payload) => {
    setLoading(true);
    const response = await updatePassword(recoveryToken, payload);
    if (response.errorMessage) {
      setErrorMessage(response.errorMessage);
      return setLoading(false);
    }
    reset();
    history.push(`login-solicitante`);
  }

  const isDisabled = () => {
    return !isValid || !password.length || !confirmationPassword.length || password !== confirmationPassword
  }

  return (
      <Container>
        <DetailsNav><NavLogo src={PrimaWhiteLogo} /><NavSlogan src={Slogan}/></DetailsNav>
        <LoginContainer>
          <NavLogo className="display-mobile" src={PrimaWhiteLogo}/>
          <Card className="login-card">
          <FormContainer onSubmit={handleSubmit(newPassword)}>
            <CardHeader
              anteTitle={'Cuenta solicitante'}
              title={'Recupero de contraseña'}
              subtitle={'Ingresa tu nueva contraseña'}
            />
            <MaterialInput
              className="inputRegularResponsiveM"
              onChange={setPassword}
              register={register(passwordInputValidations)}
              placeholder={loginForm.passwordPlaceholder}
              type={'password'}
              name={'newPassword'}
            />
            <ErrorHandler
              isTouched={touched['password']}
              errors={errors}
              name={'password'}
            />
            <MaterialInput
              onChange={setConfirmationPassword}
              className="inputRegularResponsiveM"
              register={register(passwordInputValidations)}
              placeholder={'Confirmar contraseña'}
              type={'password'}
              name={'verifyNewPassword'}
            />
            <ErrorHandler
              isTouched={touched['confirmPassword']}
              errors={errors}
              name={'confirmPassword'}
            />
            <StaticAlert
                show={errorMessage.length > 0}
                message={errorMessage}
                img={WarningIcon}
                className="inputRegularResponsiveM"
              />
            <ButtonSection loading={loading} disabled={isDisabled()} />
          </FormContainer>
        </Card>
        </LoginContainer>
      </Container>
  )
};