import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PrimaWhiteLogo from '../../../../shared/images/primaWhiteLogo.svg';
import Slogan from '../../../../shared/images/slogan.svg';
import Card from '../../components/Card';
import MaterialInput from '../../../shared/components/MaterialInput';
import { signupForm } from '../../../shared/constant/ConstantApplicantSignup';
import DropdownInput from '../../../shared/components/DropdownInput';
import EmailIcon from '../../../shared/images/email.svg';
import { createAccount } from '../../core/ApplicantLoginService';
import CardHeader from '../../components/CardHeader';
import { idDocumentOptions } from '../../../shared/constant/ConstantMaterialSelect';
import { useForm } from 'react-hook-form';
import VerificationModal from './components/VerificationModal';
import Button from '../../../shared/components/Button';
import { FormContainer, NavSlogan, NavLogo, DetailsNav, LoginContainer, Container } from '../../components/styles';
import ResendEmailModal from '../../components/ResendEmailModal';
import '../../components/layout.scss';

export default function ApplicantCreateAccount(props) {
  const history = useHistory();
  const [showModal, setModalVisibility] = useState(false);
  const [showRegistryModal, setShowRegistryModal] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const [validVerification, setValidVerification] = useState(false);
  const { register, handleSubmit, formState, control } = useForm({  mode: "onChange" });
  const { isValid } = formState;

  useEffect(() => {
    const parameter = props.match.params.registry;
    if (parameter) {
      // Aqui se hacer verificación con back
      if (parameter === 'error') setError(true);
      if (parameter === 'valid') setValidVerification(true);
      if (parameter === 'invalid')  setValidVerification(false);
      if (parameter === 'error' || parameter === 'valid' || parameter === 'invalid') setShowRegistryModal(true);
    }
  }, [])


  const createNewAccount = async(payload) => {
    const reponse = await createAccount(payload);
    if (reponse) {
      setModalVisibility(true);
      setEmail(payload.email);
    }
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
                noPadding={true}
                numericInput={true}
                registerInput={register({ required: true })}
                registerSelect={register({ required: true })}
                name={signupForm.inputNames.documentNumber}
                selectName={signupForm.inputNames.documentType}
                selectOptions={idDocumentOptions}
                placeholder={signupForm.dropdownPlaceholder}
              />
              <MaterialInput
                className="inputRegularResponsiveM"
                name={signupForm.inputNames.email}
                register={register({ required: true })}
                type="email"
                placeholder={signupForm.emailPlaceholder}
              />
              <MaterialInput
                className="inputRegularResponsiveM"
                name={signupForm.inputNames.password}
                register={register({ required: true })}
                placeholder={signupForm.passwordPlaceholder}
                type="password"
              />
              <Button
                className="marginBtnRegularPosition"
                disabled={!isValid}
                type="submit"
              >
                {signupForm.submitBtnLabel}
              </Button>
            </FormContainer>
        </Card>
         <ResendEmailModal
          email={email}
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