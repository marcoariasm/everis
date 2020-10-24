import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import WhiteCard from '../../../../../../../shared/components/WhiteCard';
import { size } from '../../../../../../../shared/styles/Responsive';
import { allColors } from '../../../../../../../shared/styles/index';
import MaterialInput from '../../../../../../shared/components/MaterialInput';
import DropdownInput from '../../../../../../shared/components/DropdownInput';
import Button from '../../../../../../shared/components/Button';
import MaterialCheckbox from '../../../../../../shared/components/MaterialCheckbox';


import MaterialSelect, { OutlinedSelectContainer } from '../../../../../../shared/components/MaterialSelect';
import RadioButtonList from '../../../../../../shared/components/RadioButtonList';
import { useHistory } from 'react-router-dom';
import { SectionTitle, RadioButtonTitle } from './styledComponents.jsx';
import Modal from '../../../../../../../global/components/Modal';
import ModalPac from 'global/components/Modal/ModalPac';
import { RadioButtonSection } from '../../../../../../shared/components/UtilityComponents/components';
import { TwoColumnsContainer, TwoColumnsFlexContainer } from '../../../../../../shared/components/UtilityComponents';
import { useForm } from 'react-hook-form';
import ErrorHandler from '../../../../../../shared/components/ErrorHandler';

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

// export const LoginContainer = styled.div`
//   display: flex;
//   flex: 1;
//   align-items: center;
//   justify-content: center;
//   height: 100vh;
//   width: 100vw;
//   padding: 0 5em;
//   margin-top: -0.5em;
//  @media screen and (max-width: ${size.tabletM}) {
//      padding: 2em 3em;
//       display: block;
//       overflow: auto;
//       min-height: min-content;
//   }
//   @media screen and (max-width: ${size.tabletS})  {
//     padding: 2em 1em;
//   }
// `;

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
`

const applicantState = [
  { textContent: 'Inválido', value: 'invalid', shortContent: 'Inválido' }
];

const sexItems = [
  { value: 'female', label: 'Femenino' },
  { value: 'male', label: 'Masculino' }
]

const idDocumentOptions = [
    { textContent: 'Documento de identidad', value: 'dni', shortContent: 'DNI' },
    { textContent: 'Carnet de extranjería', value: 'carnet', shortContent: 'CE' }
];

const beneficiaryRelationship = [
  { textContent: 'Cónyuge', value: 'spouse', shortContent: 'Cónyuge' },
  { textContent: 'Concubino(a)', value: 'concubine', shortContent: 'Concubino(a)' },
  { textContent: 'Padres', value: 'parents', shortContent: 'Padres' },
  { textContent: 'Hijos', value: 'offspring', shortContent: 'Hijos' },
  { textContent: 'Otro familiar', value: 'family', shortContent: 'Otro familiar' },
  { textContent: 'Representante', value: 'representative', shortContent: 'Representante' }
];

const ModalFirstStep = ({ show = false, onClick, defaultState = {}, activeStep, loading = false }) => {
  const { register, handleSubmit, formState, control, errors, reset } = useForm({
      mode: "onChange",
      defaultValues: {...defaultState}
    });
    const { isValid, touched } = formState;

    useEffect(() => {
      console.log('defaultState', defaultState);
      reset(defaultState)
    }, [activeStep]);

    useEffect(() => {
      reset({});
    }, [loading]);

    const handleStateChange = () => { }

    const handleCheckbox = (value) => {
      console.log('value', value);
    }
    
    if (!show) return <></>;
    return (
        <div style={{ padding: '1em 5.5em' }}>
           <SectionTitleMedium>Datos personales del beneficiario</SectionTitleMedium>
           <TwoColumnsContainer paddingBottom={'2em'} paddingTop={'1.5em'}>
                <OutlinedSelectContainer>
                    <MaterialSelect
                      name={'relationship'}
                      onChange={handleStateChange}
                      placeholder={'Parentesco'}
                      register={register({ required: true })}
                      optionsContainerStyles={{ marginTop: '10px' }}
                      selectOptions={beneficiaryRelationship}
                    />
                </OutlinedSelectContainer>
                <OutlinedSelectContainer>
                    <MaterialSelect
                      onChange={handleStateChange}
                      name={'applicantState'}
                      register={register({ required: true })}
                      placeholder={'Condición'}
                      optionsContainerStyles={{ marginTop: '10px' }}
                      selectOptions={applicantState}
                    />
                </OutlinedSelectContainer>
                <DropdownInput
                    registerSelect={register({ required: true })}
                    registerInput={register({ required: true })}
                    onChange={handleStateChange}
                    noPadding={true}
                    name={'documentNumber'}
                    selectName={'documentType'}
                    selectOptions={idDocumentOptions}
                    placeholder={'Nro de documento'}
                    noPadding={true}
                />
                <MaterialInput
                    name={'birthdate'}
                    onChange={handleStateChange}
                    register={register({ required: true })}
                    placeholder={'Fecha de nacimiento'}
                />
                <MaterialInput
                    name={'fatherLastname'}
                    onChange={handleStateChange}
                    register={register({ required: true })}
                    placeholder={'Apellido paterno'}
                />
                <MaterialInput
                  capitalizeInput={true}
                  onChange={handleStateChange}
                  name={'motherLastname'}
                  register={register({ required: 'Este campo es requerido' })}
                  placeholder={'Apellido materno'}
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
                    name={'firstName'}
                    onChange={handleStateChange}
                    register={register({ required: true })}
                    placeholder={'Primer nombre'}
                />
                <MaterialInput
                    name={'secondName'}
                    onChange={handleStateChange}
                    register={register({ required: true })}
                    placeholder={'Segundo nombre'}
                />
            </TwoColumnsContainer>
            <RadioButtonSection
                register={register({ required: true })}
                show={true}
                title={'Sexo'}
                name={'sex'}
                options={sexItems}
            />
            <div className="alignCenterVertically">
            <Button
              disabled={!isValid}
              className="buttonSmallResponsive alignSelfCenter primary-btn"
              onClick={handleSubmit(onClick)}
            >
              Siguiente
            </Button>
            </div>
        </div>
    )
}

const ModalSecondStep = ({ show = false, goBack, defaultState = {}, activeStep, handleSubmitBtn }) => {
  const [email, setEmail] = useState();
  const [cellphone, setPhone] = useState();
  const { register, handleSubmit, formState, control, errors, reset } = useForm({
      mode: "onChange",
      defaultValues: {...defaultState}
    });
    const { isValid, touched } = formState;

    useEffect(() => {
      console.log('defaultState', defaultState);
      reset(defaultState)
    }, [activeStep]);

    const handleGoBack = () => goBack({ email, cellphone })

  if (!show) return <></>;

  return <><div style={{ padding: '1em 5.5em' }}>
            <SectionTitleMedium>Datos del contacto</SectionTitleMedium>
            <TwoColumnsContainer paddingBottom={'2em'} paddingTop={'1.5em'}>
                <MaterialInput
                    name={'email'}
                    onChange={setEmail}
                    register={register({ required: true })}
                    placeholder={'Correo electrónico'}
                />
                <MaterialInput
                    name={'cellphone'}
                    onChange={setPhone}
                    register={register({ required: true })}
                    placeholder={'Teléfono móvil'}
                />
            </TwoColumnsContainer>
    </div>
    <TwoColumnsFlexContainer>
      <Button
        className="buttonSmallResponsive alignSelfCenter primary-outlined-btn"
        onClick={handleGoBack}
      >
        Volver
      </Button>
      <Button
        disabled={!isValid}
        className="buttonSmallResponsive alignSelfCenter primary-btn"
        onClick={handleSubmit(handleSubmitBtn)}
      >
        Siguiente
      </Button>
    </TwoColumnsFlexContainer>
    </>;
}

const NewBeneficiaryModal = ({ show = false, onClose, icon, handleBtnModal }) => {
    const [sectionActiveNumber, setSectionNumber] = useState(0);
    const [registerFormValidity, setRegisterFormValidity] = useState(false);
    const [registerFormState, setRegisterFormState] = useState({});
    const [contactFormState, setContactFormState] = useState({});
    const [loading, setLoading] = useState(false);
  
    const handleNextBtn = (payload) => {
      setRegisterFormState(payload);
      if (sectionActiveNumber === 1) {
        setSectionNumber(0);
        return onClose();
      }
      setSectionNumber(sectionActiveNumber + 1);
    }

    const handleBackBtn = (payload) => {
      setContactFormState(payload);
      if (sectionActiveNumber === 1) {
        setSectionNumber(sectionActiveNumber - 1);
      }
    }

    const submitForm = (contactFormState) => {
      const payload = { ...contactFormState, ...registerFormValidity };
      // llamado al servicio: Enviar nuevos datos de veneficiario
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setRegisterFormState({});
      setContactFormState({});
      setSectionNumber(0);
      onClose();
      }, 1000);
    }

    return (
    
      <Modal width={'60vw'} hidden={true} show={show} onClose={onClose} maxHeight={'700px'}>
        <div style={{ display: 'grid', placeItems: 'center', padding: '2.6em 0 0em 0' }}>
            <SectionTitle>Nuevo beneficiario</SectionTitle>
        </div>
        <ModalFirstStep
          loading={loading}
          activeStep={sectionActiveNumber}
          defaultState={registerFormState}
          onClick={handleNextBtn}
          show={sectionActiveNumber === 0}
        />
        <ModalSecondStep
          activeStep={sectionActiveNumber}
          defaultState={contactFormState}
          goBack={handleBackBtn}
          handleSubmitBtn={submitForm}
          show={sectionActiveNumber === 1}
        />
      </Modal>
    )
  }

  export default NewBeneficiaryModal;