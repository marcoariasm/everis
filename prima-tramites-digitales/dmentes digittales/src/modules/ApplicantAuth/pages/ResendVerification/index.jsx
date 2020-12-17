import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PrimaWhiteLogo from 'shared/images/primaWhiteLogo.svg';
import Slogan from 'shared/images/slogan.svg';
import Card from '../../components/Card';
import MaterialInput from 'global/components/v2/MaterialInput';
import { loginForm } from '../../../shared/constant/ConstantApplicantLogin';
import { resendEmail } from '../../core/ApplicantLoginService';
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
import CardHeader from '../../components/CardHeader';
import CheckIcon from '../../../shared/images/email.svg';
import {
  InputGrid
} from './styledComponents';
import ResendEmailModal from '../../components/ResendEmailModal';


export default function ResendVerification() {
  const history = useHistory();
  const [showModal, setModalVisibility] = useState(false);
  const [email, setEmail] = useState('');
  const { register, handleSubmit, formState, control } = useForm({ mode: "onChange" });
  const { isValid } = formState;

  const resendValidation = async(payload) => {
    const reponse = await resendEmail(payload);
    if (reponse) {
      setModalVisibility(true);
      setEmail(payload.email);
    }
  }

  const handleBtnModal = () => {
    history.push('completar-registro');
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
              name={'email'}
              register={register({ required: true })}
              type={'email'}
              placeholder={loginForm.emailPlaceholder}
              className="inputRegularResponsive"
            />
            <Button
              className="marginBtnRegularPosition"
              disabled={!isValid}
              type="submit"
            >
              {'Reenviar verificación'}
            </Button>
          </FormContainer>
        </Card>
        <ResendEmailModal
          email={email}
          showModal={showModal}
          onClose={() => setModalVisibility(false)}
          icon={CheckIcon}
          handleBtnModal={handleBtnModal}
        />
        </LoginContainer>
      </Container>
    </>
  )
};