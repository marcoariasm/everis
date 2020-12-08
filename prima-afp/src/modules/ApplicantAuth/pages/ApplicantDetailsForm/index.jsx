import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PrimaWhiteLogo from '../../../PrimaAccountAuth/assets/images/primaWhiteLogo.svg';
import Slogan from '../../../PrimaAccountAuth/assets/images/slogan.svg';
import MaterialInput from 'global/components/v2/MaterialInput';
import MaterialDateInput from 'global/components/v2/MaterialDateInput';
import { TwoColumnsContainer } from 'global/components/v2/UtilityComponents';
import MaterialCheckbox from 'global/components/v2/MaterialCheckbox';
import { applicantCard, detailsForm } from '../../../shared/constant/ConstantApplicantDetailsForm';
import { completeRegistration } from '../../services/index.service';
import { setSession } from '../../core/AppSession';
import { Redirect } from 'react-router-dom';
import { manageDateValidity } from 'modules/ApplicantAuth/core/FormValidations';
import Persistence from '../../services/persistence';
import { useForm } from 'react-hook-form';
import {
  LoginContainer,
  DetailsNav,
  LoginCardDescription,
  NavLogo,
  NavSlogan,
  CheckboxLabel,
  TwoColumnsForm
} from './styledComponents';
import Button from 'global/components/v2/Button';
import Card from '../../components/Card';
import Loading from 'global/components/v2/Loading';
import { FormContainer, Container } from '../../components/styles';
import DropdownInput from 'global/components/v2/DropdownInput';
import { LoginTitle } from '../../components/CardHeader';
import {
  fatherValidations,
  motherValidations,
  firstNameValidations,
  secondNameValidations,
  birthdateValidations,
  movilPhoneValidations
} from '../../../shared/constant/ConstantValidations';
import ErrorHandler from 'global/components/v2/ErrorHandler';
import StaticAlert from 'global/components/v2/StaticAlert';
import WarningIcon from 'modules/shared/images/warningIcon.svg';


const ButtonSection = ({ loading = false, disabled = false }) => {
  if (loading) return <div className="regularLoadingBtnPadding">
    <Loading className="small-spinner">Cargando...</Loading>
  </div>;
  return (
    <Button
      className="buttonRegularResponsiveSmallMargin alignSelfCenter primary-btn"
      disabled={disabled}
      type="submit"
    >
      {applicantCard.submitBtnLabel}
    </Button>
  )
}

export default function ApplicantDetailsForm(props) {
    const history = useHistory();
    const [formIsValid, setFormValidity] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [birthdate, setBirthdate] = useState('');
    const [birthdateError, setBirthdateError] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [currentUser, setCurrentUser] = useState({});
    const [currentSession, setCurrentSession] = useState();
    const [birthdateTouch, setBirthDateTouch] = useState(false);
    const { register, handleSubmit, formState, control, errors } = useForm({
      mode: "onChange",
      defaultValues: {
      }
    });
    const { isValid, touched } = formState;

    useEffect(() => {
      const user = props.location.state.currentUser;
      if (user) setCurrentUser(user);
      const session = props.location.state.tokenSessionInfo;
      if (session) setCurrentSession(session);
    }, [])

  const completeRegistry = async(payload) => {
      setLoading(true);
      delete payload['terms-and-conditions'];
      const formData = { ...payload, birthdate };
      const userResponse = await completeRegistration(formData, currentUser.idApplicant, currentSession.accessToken);
      if (userResponse.errorMessage) {
        setErrorMessage(userResponse.errorMessage);
        return setLoading(false);
      }
      await setSession(currentSession);
      history.push(`inicio`);
  }

  const getBirthdateError = (actualValue, numericValue) => {
    const dateValidity = manageDateValidity(actualValue);
    if (!numericValue.length) return setBirthdateError(birthdateValidations.required);
    if (numericValue.length !== 8) return setBirthdateError(birthdateValidations.length);
    if (dateValidity) return setBirthdateError(dateValidity);
    if (!dateValidity && numericValue.length === 8) return setBirthdateError('');
  }

  const handleBirthChange = (newValue) => {
    if (birthdate.length > 0) setBirthDateTouch(true);
    setBirthdate(newValue.target.value);
    getBirthdateError(newValue.target.value, newValue.target.numericValue);
  }

  const getFormValidity = () => isValid && birthdate.length === 10 && !birthdateError.length;

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
            <div className="twoColInputs mt05em">
               <MaterialInput
                 className="inputBigResponsive"
                 capitalizeInput={true}
                  name={'fatherLastname'}
                  register={register(fatherValidations)}
                  placeholder={detailsForm.paternalSurname}
                  error={
                    <ErrorHandler
                      noMargin={true}
                      isTouched={touched['fatherLastname']}
                      errors={errors}
                      name={'fatherLastname'}
                    />
                  }
                />
                <MaterialInput
                  className="inputBigResponsive"
                  capitalizeInput={true}
                  name={'motherLastname'}
                  register={register}
                  placeholder={detailsForm.maternalSurname}
                  error={
                    <ErrorHandler
                      noMargin={true}
                      isTouched={touched['motherLastname']}
                      errors={errors}
                      name={'motherLastname'}
                    />
                  }
                />
                <MaterialInput
                  className="inputBigResponsive"
                  name={'firstName'}
                  capitalizeInput={true}
                  register={register(firstNameValidations)}
                  placeholder={detailsForm.firstName}
                  error={
                    <ErrorHandler
                      noMargin={true}
                      isTouched={touched['firstName']}
                      errors={errors}
                      name={'firstName'}
                    />
                  }
                />
                <MaterialInput
                  className="inputBigResponsive"
                  name={'secondName'}
                  capitalizeInput={true}
                  register={register(secondNameValidations)}
                  placeholder={detailsForm.middleName}
                  error={
                    <ErrorHandler
                      noMargin={true}
                      isTouched={touched['secondName']}
                      errors={errors}
                      name={'secondName'}
                    />
                  }
                />
                <MaterialDateInput
                  className="inputBigResponsive"
                  onChange={handleBirthChange}
                  name={'birthdate'}
                  placeholder={detailsForm.birthDate}   
                  error={birthdateTouch ? birthdateError : null} 
                  getTarget={true}     
                />
                <MaterialInput
                  className="inputBigResponsive"
                  name={'cellphone'}
                  register={register(movilPhoneValidations)}
                  placeholder={detailsForm.phone}
                  error={
                    <ErrorHandler
                      noMargin={true}
                      isTouched={touched['cellphone']}
                      errors={errors}
                      name={'cellphone'}
                    />
                  }
                />
            </div>
            <MaterialCheckbox register={register({ required: true })} name={applicantCard.checkboxName}>
                <CheckboxLabel>
                  {applicantCard.checkboxLabel}<span>{applicantCard.checkboxLabelHighlighted}</span>
                </CheckboxLabel>
            </MaterialCheckbox>
            <StaticAlert
                show={errorMessage.length > 0}
                message={errorMessage}
                img={WarningIcon}
                className={"alertRegularResponsiveColumnsM"}
                noMargin={true}
              />
            <ButtonSection loading={loading} disabled={!getFormValidity()} />
            </FormContainer>
          </Card>
        </LoginContainer>
      </Container>
    </>
  )
};