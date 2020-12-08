import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { size } from 'global/styles/Responsive';
import { allColors } from 'global/styles/index';
import MaterialInput from 'global/components/v2/MaterialInput';
import MaterialDateInput from 'global/components/v2/MaterialDateInput';
import DropdownInput from 'global/components/v2/DropdownInput';
import Button from 'global/components/v2/Button';
import {
  docDropdownValidationsBenefyApi,
  fatherValidations,
  motherValidations,
  firstNameValidations,
  secondNameValidations,
  birthdateValidations,
  movilPhoneValidations
} from 'modules/shared/constant/ConstantValidations';

import ErrorHandler from 'global/components/v2/ErrorHandler';

import { manageDateValidity } from 'modules/ApplicantAuth/core/FormValidations';
import MaterialSelect, { OutlinedSelectContainer } from 'global/components/v2/MaterialSelect';
import { SectionTitle } from './styledComponents.jsx';
import Modal from 'global/components/v2/Modal';
import { RadioButtonSection } from 'global/components/v2/UtilityComponents/components';
import { TwoColumnsContainer } from 'global/components/v2/UtilityComponents';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_BENEFICIARY_TO_NEW_request, EDIT_BENEFICIARY_FROM_NEW_request } from 'redux/actions/Procedures';
import { addBeneficiary } from 'modules/GenericProcedures/services';
import { UserContext } from 'modules/App/pages/MainDashboardLayout';

import StaticAlert from 'global/components/v2/StaticAlert';
import Loading from 'global/components/v2/Loading';
import WarningIcon from 'modules/shared/images/warningIcon.svg';
import ScrollableModal from 'modules/GenericProcedures/components/ScrollableModal';

export const SectionTitleMedium = styled.p`
  font-size: 16px;
  font-family: 'Calibri';
  color: #00A499;
  font-weight: bold;
  padding-bottom: 1em;
`;

const Wrapper = styled.div`
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  animation: modal 0.2s;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 10;
  background-color: rgba(55, 48, 48, 0.9);
  @keyframes modal {
    0% {
      transform: scale(0.1);
    }
    100% {
      transform: scale(1);
    }
  }
  @media screen and (max-width: ${size.tabletM}) {
      display: block;
      overflow: auto;
      min-height: min-content;
  }
  @media screen and (orientation: landscape) {
    overflow-y: scroll;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: auto;
  padding: 10px;
  border-radius: 15px;
  background-color: ${allColors.colorWhiteBase};

  @media only screen and (min-width: ${size.tablet}) and (max-width: ${size.laptopL}) {
    min-width: 73vw;
    max-width: 73vw;
    max-height: auto;
  }
  @media only screen and (min-width: ${size.laptopL}) and (max-width: ${size.laptopM}) {
    min-width: 41vw;
    max-width: 41vw;
    padding: 20px;
    max-height: auto;
  }
  @media only screen and (min-width: ${size.laptopM}) {
    width: 45vw;
    padding: 20px;
    max-height: 660px;
    max-height: auto;
  }
`;

const relationShipCodes = {
  'Cónyuge': '10',
  'Concubina': '11',
  'Hijo': '20',
  'Padre o Madre': '30'
}

const ButtonSection = ({ loading = false, disabled = false, onClick }) => {
  if (loading) return <div className="regularLoadingBtnPadding">
    <Loading className="small-spinner">Cargando...</Loading>
  </div>;
  return (
    <Button
      onClick={onClick}
      className="buttonSmallWithoutMargin alignSelfCenter primary-btn"
      disabled={disabled}
    >
      Guardar
    </Button>
  )
}

const NewBeneficiaryModal = ({
  show = false,
  onClose,
  icon,
  handleBtnModal,
  defaultState = {},
  edit = false,
  index,
  relationshipOptions = [],
  documentResponse = [],
  conditionResponse = [],
  genderOptions = [],
  onClick
}) => {
    const user = React.useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [resetInputs, setResetInputs] = useState(0);
    const [birthdate, setBirthdate] = useState('');
    const [relationship, setRelationship] = useState(0);
    const [condition, setCondition] = useState(0);
    const [documentType, setDocumentType] = useState('');
    const [documentNumber, setDocumentNumber] = useState('');
    const dispatch = useDispatch();
    const [birthdateTouch, setBirthDateTouch] = useState(false);
    const [birthdateError, setBirthdateError] = useState('');
    const storeAffiliate = useSelector(state => state.affiliate);

    const { affiliate } = storeAffiliate;
    const [errorMessage, setErrorMessage] = useState('');
    
  const { register, handleSubmit, formState, control, errors, reset, setValue } = useForm({
      mode: "onChange",
      defaultValues: defaultState
    });
    const { isValid, touched } = formState;

    useEffect(() => {
     setErrorMessage('');
     setResetInputs(Math.random());
    }, []);

    useEffect(() => {
      if (!show) return;
      // if (edit) {
      //   reset(defaultState);
      //   return setResetInputs(0);
      // }
      setBirthdateError('');
      setBirthDateTouch(false);
      setResetInputs(Math.random());
      reset();
    }, [show])

    useEffect(() => {
    if (loading) setErrorMessage('');
  }, [loading]);


    const handleOnClick = async(formObj) => {
      setLoading(true);
      let serviceBeneficiary;
      const payload = {
        documentType: Number(formObj.documentType),
        documentNumber: formObj.documentNumber,
          genderId: Number(formObj.gender),
          affiliateId: (affiliate?.affiliateId ?? null) || user.idAffiliate,
          disabilityId: Number(formObj.hasDisability),
          nativeCountry: "114",
          relationshipId: Number(formObj.relationship),
          birthdate: birthdate.split('/').reverse().join('-'),
          surname: formObj.surname.toUpperCase(),
          motherSurname: formObj.motherSurname.toUpperCase(),
          firstName: formObj.firstName.toUpperCase(),
          secondName: formObj.secondName.toUpperCase(),
          beneficiaryId: null
        };
      if (!edit) {
        serviceBeneficiary = await addBeneficiary(payload);
        if (serviceBeneficiary.errorMessage) {
          setErrorMessage(serviceBeneficiary.errorMessage);
          return setLoading(false);
        }
      }
        setResetInputs(Math.random());
        setLoading(false);
        reset();
        if (edit) {
           dispatch(EDIT_BENEFICIARY_FROM_NEW_request({ index, payload }));
        } else {
          dispatch(ADD_BENEFICIARY_TO_NEW_request({...serviceBeneficiary, newBeneficiary: true }));
        }
        onClose();
    }

    const getValidity = () => {
      const birthdateValidity = birthdate.length === 10 && !birthdateError.length;
      const selectValidity = condition > 0 && relationship > 0;
      return isValid && birthdateValidity && selectValidity;
    }

    const handleRelationship = (value) => {
       if (value) return setRelationship(value.value);
       setRelationship(0);
    }

    const handleCondition = (value) => {
      if (value) return setCondition(value.value);
      setCondition(0);
    }

    const handleDocumentField = (value) => {
      if (!value || !value.selectValue) return;
      setDocumentType(value.selectValue.value);
      setDocumentNumber(value.inputValue);
    }

    const getBirthdateError = (actualValue, numericValue) => {
      const dateValidity = manageDateValidity(actualValue);
      if (!numericValue.length) return setBirthdateError(birthdateValidations.required);
      if (numericValue.length !== 8) return setBirthdateError(birthdateValidations.length);
      if (dateValidity) return setBirthdateError(dateValidity);
      if (!dateValidity && numericValue.length === 8) return setBirthdateError('');
    }

    const handleBirthChange = (newValue) => {
      if (newValue.target.numericValue.length > 0) setBirthDateTouch(true);
      setBirthdate(newValue.target.value);
      getBirthdateError(newValue.target.value, newValue.target.numericValue);
    }

    return (
      <ScrollableModal width={'60vw'} hidden={true} show={show} onClose={onClose}>
        <div style={{ display: 'grid', placeItems: 'center', padding: '2em 0 1.5em 0' }}>
            <SectionTitle>Nuevo beneficiario</SectionTitle>
        </div>

        <form id="beneficiary-form" style={{ padding: '0.7em 2em 0 2em' }}>
           <SectionTitleMedium>Datos personales del beneficiario</SectionTitleMedium>
           <div className="twoColInputsMedium">
                <OutlinedSelectContainer>
                    <MaterialSelect
                      register={register({ required: true })}
                      name={'relationship'}
                      onChange={handleRelationship}
                      placeholder={'Parentesco'}
                      optionsContainerStyles={{ marginTop: '10px' }}
                      selectOptions={relationshipOptions}
                      reset={resetInputs}
                      initialValue={defaultState.relationship}
                    />
                </OutlinedSelectContainer>
                <OutlinedSelectContainer>
                    <MaterialSelect
                      register={register({ required: true })}
                      onChange={handleCondition}
                      name={'hasDisability'}
                      placeholder={'Condición'}
                      optionsContainerStyles={{ marginTop: '10px' }}
                      selectOptions={conditionResponse}
                      reset={resetInputs}
                      initialValue={defaultState.hasDisability}
                    />
                </OutlinedSelectContainer>
                <DropdownInput
                    className="mb-1em"
                    onChange={handleDocumentField}
                    registerInput={register(docDropdownValidationsBenefyApi(documentType))}
                    registerSelect={register}
                    noPadding={true}
                    name={'documentNumber'}
                    selectName={'documentType'}
                    selectOptions={documentResponse}
                    placeholder={'Nro de documento'}
                    noPadding={true}
                    reset={resetInputs}
                    error={
                      <ErrorHandler
                        isTouched={touched.documentNumber}
                        errors={errors}
                        name={'documentNumber'}
                        className="errorHandlerDropdown"
                      /> 
                    }
                />
                <MaterialDateInput
                    name={'birthdate'}
                    onChange={handleBirthChange}
                    placeholder={'Fecha de nacimiento'}
                    initialValue={defaultState.birthdate}
                    error={birthdateTouch ? birthdateError : null} 
                    getTarget={true}
                    reset={resetInputs} 
                />
                <MaterialInput
                    capitalizeInput={true}
                    register={register(fatherValidations)}
                    name={'surname'}
                    placeholder={'Apellido paterno'}
                    reset={resetInputs}
                    error={
                      <ErrorHandler
                        noMargin={true}
                        isTouched={touched['surname']}
                        errors={errors}
                        name={'surname'}
                      />
                    }
                />
                <MaterialInput
                  register={register(motherValidations)}
                  capitalizeInput={true}
                  name={'motherSurname'}
                  placeholder={'Apellido materno'}
                  reset={resetInputs}
                  error={
                    <ErrorHandler
                      noMargin={true}
                      isTouched={touched['motherSurname']}
                      errors={errors}
                      name={'motherSurname'}
                    />
                  }
                />
                <MaterialInput
                    register={register(firstNameValidations)}
                    capitalizeInput={true}
                    name={'firstName'}
                    placeholder={'Primer nombre'}
                    reset={resetInputs}
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
                    register={register(secondNameValidations)}
                    capitalizeInput={true}
                    name={'secondName'}
                    placeholder={'Segundo nombre'}
                    reset={resetInputs}
                    error={
                      <ErrorHandler
                        noMargin={true}
                        isTouched={touched['secondName']}
                        errors={errors}
                        name={'secondName'}
                      />
                    }
                />
            </div>
            <RadioButtonSection
                register={register({ required: true })}
                show={true}
                title={'Sexo'}
                name={'gender'}
                options={genderOptions}
            />
            <StaticAlert
                show={errorMessage.length > 0}
                message={errorMessage}
                img={WarningIcon}
                className={"alertRegularResponsiveColumnsM"}
                noMargin={true}
              />
            <div className="alignCenterVertically">
               <ButtonSection loading={loading} disabled={!getValidity()}  onClick={handleSubmit(handleOnClick)} />
            </div>
        </form>
      </ScrollableModal>
    )
  }

  export default NewBeneficiaryModal;