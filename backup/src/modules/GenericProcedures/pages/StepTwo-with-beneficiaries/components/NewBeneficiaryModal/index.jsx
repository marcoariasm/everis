import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { size } from 'global/styles/Responsive';
import { allColors } from 'global/styles/index';
import MaterialInput from 'global/components/v2/MaterialInput';
import MaterialDateInput from 'global/components/v2/MaterialDateInput';
import DropdownInput from 'global/components/v2/DropdownInput';
import Button from 'global/components/v2/Button';


import MaterialSelect, { OutlinedSelectContainer } from 'global/components/v2/MaterialSelect';
import { SectionTitle } from './styledComponents.jsx';
import Modal from 'global/components/v2/Modal';
import { RadioButtonSection } from 'global/components/v2/UtilityComponents/components';
import { TwoColumnsContainer } from 'global/components/v2/UtilityComponents';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_BENEFICIARY_TO_NEW_request, EDIT_BENEFICIARY_FROM_NEW_request } from 'redux/actions/Procedures';

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
`

const applicantState = [
  { textContent: 'Inválido', value: 'invalid', shortContent: 'Inválido' },
  { textContent: 'Sano', value: 'healthy', shortContent: 'Sano' },
  { textContent: 'Enfermo', value: 'illness', shortContent: 'Enfermo' }
];

const sexItems = [
  { value: 'female', label: 'Femenino' },
  { value: 'male', label: 'Masculino' }
]

const idDocumentOptions = [
  { textContent: 'Documento Nacional de Identidad', value: '00', shortContent: 'DNI' },
  { textContent: 'Carnet de extranjería', value: '01', shortContent: 'CE' },
  { textContent: 'Carnet de Identificación Militar o Policial', value: '02', shortContent: 'CIM / CIP' },
  { textContent: 'Libreta  del Adolescente Trabajador', value: '03', shortContent: 'LAT' },
  { textContent: 'Pasaporte', value: '04', shortContent: 'PAS' }
];


const beneficiaryRelationship = [
  { textContent: 'Cónyuge', value: 'spouse', shortContent: 'Cónyuge' },
  { textContent: 'Concubino(a)', value: 'concubine', shortContent: 'Concubino(a)' },
  { textContent: 'Padres', value: 'parents', shortContent: 'Padres' },
  { textContent: 'Hijos', value: 'offspring', shortContent: 'Hijos' },
  { textContent: 'Otro familiar', value: 'family', shortContent: 'Otro familiar' },
  { textContent: 'Representante', value: 'representative', shortContent: 'Representante' }
];



const NewBeneficiaryModal = ({ show = false, onClose, icon, handleBtnModal, defaultState = {}, edit = false, index }) => {
    
    const [loading, setLoading] = useState(false);
    const [resetInputs, setResetInputs] = useState(0);
    const [birthdate, setBirthdate] = useState('');
    const [relationship, setRelationship] = useState('');
    const [condition, setCondition] = useState('');
    const [documentType, setDocumentType] = useState('');
    const [documentNumber, setDocumentNumber] = useState('');
    const dispatch = useDispatch();
    const storeProcedures = useSelector(state => state.procedures);
    
  const { register, handleSubmit, formState, control, errors, reset, setValue } = useForm({
      mode: "onChange",
      defaultValues: defaultState
    });
    const { isValid, touched } = formState;

    useEffect(() => {
      if (!show) return;
      if (edit) {
        reset(defaultState);
        return setResetInputs(0);
      }
      reset();
      setResetInputs(Math.random());
    }, [show])


    const handleOnClick = (formObj) => {
      setLoading(true);
      if (edit) {
        dispatch(EDIT_BENEFICIARY_FROM_NEW_request({ index, formState: formObj }));
        onClose();
      } else {
        const payload = {
          beneficiaryId : 1,
          representative: {
            beneficiaryId : 1,
            applicantId : null,
            affiliateId : '',
            ...formObj
          },
          documents:[]
        };
        console.log('payload', payload);
        dispatch(ADD_BENEFICIARY_TO_NEW_request(payload));
        reset();
        onClose();
      }
      setResetInputs(Math.random());
    }

    const getValidity = () => {
      return condition.length && relationship.length && birthdate.length === 10 && isValid;
    }

    const handleRelationship = (value) => {
       if (value) setRelationship(value.value);
    }

    const handleCondition = (value) => {
      if (value) setCondition(value.value);
    }

    const handleDocumentField = (value) => {
      if (!value || !value.selectValue) return;
      setDocumentType(value.selectValue.value);
      setDocumentNumber(value.inputValue);
    }

    return (
    
      <Modal width={'60vw'} hidden={true} show={show} onClose={onClose} maxHeight={'700px'}>
        <div style={{ display: 'grid', placeItems: 'center', padding: '2.6em 0 0em 0' }}>
            <SectionTitle>Nuevo beneficiario</SectionTitle>
        </div>

        <form id="beneficiary-form" style={{ padding: '1em 5.5em' }}>
           <SectionTitleMedium>Datos personales del beneficiario</SectionTitleMedium>
           <TwoColumnsContainer paddingBottom={'2em'} paddingTop={'1.5em'}>
                <OutlinedSelectContainer>
                    <MaterialSelect
                      register={register({ required: true })}
                      name={'typeRelationShip'}
                      onChange={handleRelationship}
                      placeholder={'Parentesco'}
                      optionsContainerStyles={{ marginTop: '10px' }}
                      selectOptions={beneficiaryRelationship}
                      reset={resetInputs}
                      initialValue={defaultState.typeRelationShip}
                    />
                </OutlinedSelectContainer>
                <OutlinedSelectContainer>
                    <MaterialSelect
                      register={register({ required: true })}
                      onChange={handleCondition}
                      name={'typeCondition'}
                      placeholder={'Condición'}
                      optionsContainerStyles={{ marginTop: '10px' }}
                      selectOptions={applicantState}
                      reset={resetInputs}
                      initialValue={defaultState.typeCondition}
                    />
                </OutlinedSelectContainer>
                <DropdownInput
                    onChange={handleDocumentField}
                    registerInput={register({ required: true })}
                    registerSelect={register({ required: true })}
                    noPadding={true}
                    name={'documentNumber'}
                    selectName={'documentType'}
                    selectOptions={idDocumentOptions}
                    placeholder={'Nro de documento'}
                    noPadding={true}
                    reset={resetInputs}
                />
                <MaterialDateInput
                    register={register({ required: true })}
                    name={'birthdate'}
                    onChange={setBirthdate}
                    placeholder={'Fecha de nacimiento'}
                    reset={resetInputs}
                    initialValue={defaultState.birthdate}
                />
                <MaterialInput
                    capitalizeInput={true}
                    register={register({ required: true })}
                    name={'fatherLastname'}
                    placeholder={'Apellido paterno'}
                    reset={resetInputs}
                />
                <MaterialInput
                  register={register({ required: true })}
                  capitalizeInput={true}
                  name={'motherLastname'}
                  placeholder={'Apellido materno'}
                  reset={resetInputs}
                />
                <MaterialInput
                    register={register({ required: true })}
                    capitalizeInput={true}
                    name={'firstName'}
                    placeholder={'Primer nombre'}
                    reset={resetInputs}
                />
                <MaterialInput
                    register={register({ required: true })}
                    capitalizeInput={true}
                    name={'secondName'}
                    placeholder={'Segundo nombre'}
                    reset={resetInputs}
                />
            </TwoColumnsContainer>
            <RadioButtonSection
                register={register({ required: true })}
                show={true}
                title={'Sexo'}
                name={'genre'}
                options={sexItems}
            />
            <div className="alignCenterVertically">
            <Button
              disabled={!getValidity()}
              className="buttonSmallResponsive alignSelfCenter primary-btn"
              onClick={handleSubmit(handleOnClick)}
            >
              Siguiente
            </Button>
            </div>
        </form>
      </Modal>
    )
  }

  export default NewBeneficiaryModal;