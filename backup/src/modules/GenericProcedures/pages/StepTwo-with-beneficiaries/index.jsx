import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import { size } from 'global/styles/Responsive';
import { allColors } from 'global/styles';
import CheckIcon from 'shared/images/email.svg';
import NewBeneficiary from 'shared/images/newBeneficiary.svg';

import MaterialCheckbox from 'global/components/v2/MaterialCheckbox';
import ConfirmationModal from 'global/components/v2/Modals/ConfirmationModal';
import MainTitle from 'global/components/v2/Titles/MainTitle';
import Stepper from 'global/components/v2/Stepper';
import WhiteCard from 'global/components/v2/Cards/WhiteCard';
import { Statement } from 'global/components/v2/UtilityComponents/components';
import Accordion, { DoubleLabel } from 'global/components/v2/Accordion';
import { ThreeColumnsContainer, TwoColumnsContainerBorder } from 'global/components/v2/UtilityComponents';
import { ItemValue } from 'global/components/v2/UtilityComponents/components';
import Button from 'global/components/v2/Button';
import NewBeneficiaryModal from './components/NewBeneficiaryModal';

import { useDispatch, useSelector } from 'react-redux';
import { DELETE_BENEFICIARY_FROM_NEW_request, EDIT_BENEFICIARY_FROM_NEW_request, DELETE_ALL_beneficiaries } from 'redux/actions/Procedures';

const steps = [
    {
      label: 'Detalle del trámite',
      status: 'completed'
    },
    {
      label: 'Beneficiarios',
      status: 'active'
    },
    {
      label: 'Adjunta documentos',
      status: ''
    },
  ];

const Text = styled.div`
  margin: 25px 0;
  > span {
    text-align: center;
    font-size: 16px;
    line-height: 21px;
    color: ${allColors.colorGrayText};
  }
`;

const ContainerButton = styled.div`
  margin: 60px auto;
  justify-content: center;
  align-items: center;
`

const CheckboxContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 2.7em 0;
  @media screen and (max-width: ${size.tabletM})  {
    margin: 1.5em 0;
  }
`;

const BeneficiariesButton = styled.button`
   margin: 0 auto;
   border: 1.4px solid #00ae99;
   border-radius: 6px;
   display: table;
   padding: 1.6em 4em;
   opacity: ${props => props.disabled ? '0.7' : '1'};
   outline: none;
`;

const IconContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

const BeneficiariesContent = styled.div`
  display: flex;
  width: auto;
  align-items: center;
  justify-content: center;
`;

const BeneficiariesText = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #00ae99;
`;

const ContainerStepper = styled.div`
  margin-top: 40px;
  display: flex;
  min-width: 100%;
  justify-content: center;
  margin-bottom: 4em;
`;

const OutlinedButton = styled.button`
    border: 1.4px solid #00ae99;
    border-radius: 6px;
    display: table;
    padding: 0.8em 2em;
    outline: none;
    min-width: 110px;
`;

export const SectionTitle = styled.p`
  font-size: 18px;
  font-family: 'Calibri';
  color: #00A499;
  font-weight: bold;
  padding-left: 1.1em;
`;

const AccordionContent = ({ beneficiary, index }) => {
  const [showNewBeneficiaryModal, setShowNewBeneficiaryModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();
  console.log('beneficiary', beneficiary);

  const deleteBeneficiary = () => {
    dispatch(DELETE_BENEFICIARY_FROM_NEW_request(index));
  }

  const editBeneficiary = (newValue) => {
    dispatch(EDIT_BENEFICIARY_FROM_NEW_request({ index, newValue }));
  }

  const editHandler = () => {
    setShowNewBeneficiaryModal(true);
    setEdit(true);
  }

  const handleOnClose = () => {
    setEdit(false);
    setShowNewBeneficiaryModal(false)
  }

  const sexConstants = {
    male: 'Masculino',
    female: 'Femenino'
  }

  const beneficiaryRelationship = { 
    'spouse': 'Cónyuge',
    'concubine': 'Concubino(a)' ,
    'parents': 'Padres' ,
    'offspring': 'Hijos' ,
    'family': 'Otro familiar' ,
    'representative': 'Representante' 
  };

  const applicantState = {
    'invalid': 'Inválido',
    'healthy': 'Sano',
    'illness': 'Enfermo'
  };

  const docs = {
    '00': 'DNI',
    '01': 'CE',
    '02': 'CIM',
    '03': 'LAT',
    '04': 'PAS'
};

 
  return (
    <>
    <div style={{ paddingTop: '2em' }}>
      <SectionTitle>Datos personales</SectionTitle>
      <ThreeColumnsContainer>
        <ItemValue title={'Document'} value={docs[beneficiary.documentType]} />
        <ItemValue title={'Nº de documento'} value={beneficiary.documentNumber} />
        <ItemValue title={'Fecha de nacimiento'} value={beneficiary.birthdate} />
        <ItemValue title={'Sexo'} value={sexConstants[beneficiary.genre]} />
        <ItemValue title={'Parentesco'} value={beneficiaryRelationship[beneficiary.typeRelationShip]} />
        <ItemValue title={'Condición'} value={applicantState[beneficiary.typeCondition]} />
      </ThreeColumnsContainer>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '40% auto auto', gridColumnGap: '20px' }}>
      <OutlinedButton onClick={deleteBeneficiary} style={{ gridColumn: 3, gridRow: 1 }}>
            <p style={{ fontSize: '14px', fontWeight: 'bold', color: '#00ae99' }}>Eliminar</p>
      </OutlinedButton>
      <OutlinedButton onClick={editHandler} style={{ gridColumn: 4, gridRow: 1 }}>
            <p style={{ fontSize: '14px', fontWeight: 'bold', color: '#00ae99' }}>Editar</p>
      </OutlinedButton>
    </div>
    <NewBeneficiaryModal index={index} onClick={editBeneficiary} edit={edit} defaultState={beneficiary} show={showNewBeneficiaryModal} onClose={handleOnClose} />
    </>
  )
}


const StepTwo2 = () => {

  const history = useHistory();
  const [showModal, setModalVisibility] = useState(false);
  const [beneficiaryStatement, setBeneficiaryStatement] = useState(false);
  const [showNewBeneficiaryModal, setShowNewBeneficiaryModal] = useState(false);
  const dispatch = useDispatch();
  const storeProcedures = useSelector(state => state.procedures);
  const { newRequest, selectedProcedure } = storeProcedures;
  const { beneficiarie } = newRequest;

  const handleBtnModal = () => {
    history.push('/nueva-solicitud');
  }

  useEffect(() => {
    dispatch(DELETE_ALL_beneficiaries());
  }, [beneficiaryStatement])

 

  return (
    <>
      <WhiteCard>
        <MainTitle>{"Nueva solicitud de trámite"}</MainTitle>
        <Text>
          <span>{"Nombre del trámite"}</span>
        </Text>

        <ContainerStepper>
          <Stepper stepList={steps} />
        </ContainerStepper>

        {
            newRequest.beneficiaries.map((beneficiary, i) => (
              <Accordion
                key={i}
                labelComponent={
                  <DoubleLabel
                    title={`Beneficiario ${i + 1}`}
                    subtitle={`${beneficiary.representative.firstName} ${beneficiary.representative.fatherLastname} ${beneficiary.representative.motherLastname}`}
                  />
                }
              >
                <AccordionContent index={i} beneficiary={beneficiary.representative} />
              </Accordion>
            ))
        }

        <ContainerButton>
          <BeneficiariesButton
            disabled={beneficiaryStatement}
            onClick={() => setShowNewBeneficiaryModal(true)}
          >
            <BeneficiariesContent>
              <IconContainer><img src={NewBeneficiary} /></IconContainer>
              <BeneficiariesText>Añadir beneficiarios</BeneficiariesText>
            </BeneficiariesContent>
          </BeneficiariesButton>

        </ContainerButton>


        <CheckboxContainer>
          <MaterialCheckbox onChange={setBeneficiaryStatement} label={"Declaro no tener beneficiarios"} />
        </CheckboxContainer>
         
        <Statement
          show={beneficiaryStatement}
          announcement={'De tener beneficiarios y no declararlos, estos podrán verse afectados de requerir hacer un trámite futuro.'}
        />

        <div className="alignCenterVertically">
          <Button
            // onClick={() => history.push('/tramites-genericos/with-beneficiaries/step-three/56t7y8tr5e45r6t7y')}
            onClick={() => history.push('/nueva-solicitud/tramite/56t7y8tr5e45r6t7y/paso-tres')}
            className="buttonRegularResponsive primary-btn"
            disabled={!newRequest.beneficiaries.length && !beneficiaryStatement}
          >
            Continuar
          </Button>
        </div>
      </WhiteCard>
      <NewBeneficiaryModal show={showNewBeneficiaryModal} onClose={() => setShowNewBeneficiaryModal(false)} />
      <ConfirmationModal
        showModal={showModal}
        onClose={() => setModalVisibility(false)}
        icon={CheckIcon}
        handleBtnModal={handleBtnModal}
      />
    </>
  )
};

export default StepTwo2