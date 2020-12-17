import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PrimaWhiteLogo from 'shared/images/primaWhiteLogo.svg';
import Slogan from 'shared/images/slogan.svg';
import MaterialInput from 'global/components/v2/MaterialInput';
import { TwoColumnsContainer } from 'global/components/v2/UtilityComponents';
import MaterialDateInput from 'global/components/v2/MaterialDateInput';
import MaterialCheckbox from 'global/components/v2/MaterialCheckbox';
import { applicantCard, detailsForm } from '../../../shared/constant/ConstantApplicantDetailsForm';
import { completeRegistration, autoLogin } from '../../core/ApplicantLoginService';
import { Redirect } from 'react-router-dom';
import Persistence from '../../core/ApplicantLoginService/persistence';
import { ACCESS_TOKEN } from '../../core/ApplicantLoginService/constants';
import { useForm } from 'react-hook-form';
import {
  LoginContainer,
  DetailsNav,
  LoginCardDescription,
  RowInputContainer,
  InputGrid,
  CardLogo,
  NavLogo,
  NavSlogan,
  CheckboxSection,
  CheckboxLabel,
  ButtonContainer
} from './styledComponents';
import Button from 'global/components/v2/Button';
import Card from '../../components/Card';
import { FormContainer, Container } from '../../components/styles';
import DropdownInput from 'global/components/v2/DropdownInput';
import { LoginTitle } from '../../components/CardHeader';

export default function ApplicantDetailsForm() {
    const history = useHistory();
    const [formIsValid, setFormValidity] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const { register, handleSubmit, formState, control } = useForm({
      mode: "onChange",
      defaultValues: {
      }
    });
    const { isValid } = formState;

  //   useEffect(() => {
  //   const token = Persistence.getValue(ACCESS_TOKEN);
  //   if (token) handleAutoLogin(token);
  // }, [])

  // const handleAutoLogin = async(token) => {
  //   const user = await autoLogin(token);
  //   if (user) return  history.push(`validation-prerequisites/${user.applicantId}`);
  // }

  const completeRegistry = async(payload) => {
    // console.log(payload);
    sessionStorage.setItem('user', JSON.stringify({token: 'loginmock'}));
    const user = await completeRegistration(payload);
    if (user) history.push(`/inicio/`);
  }

  return (
    <>
      <Container>
        <DetailsNav><NavLogo src={PrimaWhiteLogo} /><NavSlogan src={Slogan}/></DetailsNav>
        <LoginContainer>
        <NavLogo className="display-mobile" src={PrimaWhiteLogo}/>
          <Card className="details-user-card">
            <FormContainer onSubmit={handleSubmit(completeRegistry)}>
            <LoginTitle className="headerTitleHighligh">{applicantCard.title}</LoginTitle>
            <LoginCardDescription className="bodyTextSecundary">{applicantCard.description}</LoginCardDescription>
            <TwoColumnsContainer>
               <MaterialInput
                 className="inputRegularResponsive"
                  name={'fatherLastname'}
                  register={register({ required: true })}
                  placeholder={detailsForm.paternalSurname}
                />
                <MaterialInput
                  className="inputRegularResponsive"
                  name={'motherLastname'}
                  register={register({ required: true })}
                  placeholder={detailsForm.maternalSurname}
                />
                <MaterialInput
                  className="inputRegularResponsive"
                  name={'firstName'}
                  register={register({ required: true })}
                  placeholder={detailsForm.firstName}
                />
                <MaterialInput
                  className="inputRegularResponsive"
                  name={'secondName'}
                  register={register({ required: true })}
                  placeholder={detailsForm.middleName}
                />
                <MaterialDateInput
                  className="inputRegularResponsive"
                  register={register({ required: true })}
                  name={'birthdate'}
                  placeholder={detailsForm.birthDate}
                />
                <MaterialInput
                  className="inputRegularResponsive"
                  name={'cellphone'}
                  register={register({ required: true })}
                  placeholder={detailsForm.phone}
                />
            </TwoColumnsContainer>
            <MaterialCheckbox register={register({ required: true })} name={applicantCard.checkboxName}>
                <CheckboxLabel>
                  {applicantCard.checkboxLabel}<span>{applicantCard.checkboxLabelHighlighted}</span>
                </CheckboxLabel>
            </MaterialCheckbox>
            <Button
              className="buttonRegularResponsive alignSelfCenter"
              disabled={!isValid}
              type="submit"
            >
              {applicantCard.submitBtnLabel}
            </Button>
            </FormContainer>
          </Card>
        </LoginContainer>
      </Container>
    </>
  )
};