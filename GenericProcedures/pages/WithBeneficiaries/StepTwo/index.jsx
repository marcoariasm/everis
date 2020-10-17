import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from 'react-router-dom';

import { size } from "shared/styles/Responsive";
import { allColors } from "shared/styles";
import CheckIcon from '../../../shared/images/email.svg';
import NewBeneficiary from '../../../shared/images/newBeneficiary.svg'

import CheckBox from '../../../components/MaterialCheckbox'
import ConfirmationModal from '../../../components/Modals/ConfirmationModal'
import MainTitle from "../../../components/Titles/MainTitle";
import Stepper from "../../../components/Stepper/Stepper"
import WhiteCard from "../../../components/Cards/WhiteCard";
import ContentButton from '../../../components/Buttons/ContentButton'

const CardList = styled.div`
  display: grid;
  grid-column-gap: 3%;
  grid-row-gap: 3%;
  grid-template-columns: auto;
  grid-template-rows: 1fr 1fr 1fr;
  margin: 10px 16px 16px 16px;
  min-height: 100%;
  @media only screen and (min-width: ${size.tablet}) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto;
    grid-column-gap: 3%;
    grid-row-gap: 3%;
    width: 100%;
    margin: auto;
    margin-top: 30px;
    min-height: 100%;
  }
`;

const Text = styled.div`
  margin: 25px 0;
  > span {
    text-align: center;
    font-size: 16px;
    line-height: 21px;
    color: ${allColors.colorGrayText};
  }
`;

const NormalText = styled.div`
  margin: 25px 0;
  > span {
    text-align: center;
    font-size: 14px;
    line-height: 20px;
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
   outline: none;
`;

const IconContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

const CheckboxSection = styled.div`
  margin-left: 0.8em;
  padding-top: 2.5em;
`;

const CheckboxLabel = styled.p`
  font-size: 12px;
  font-weight: 400;
  span {
    color: ${allColors.colorOrangeMain};
  }
`;

const ContainerStepper = styled.div`
  margin-top: 40px;
  display: flex;
  min-width: 100%;
  justify-content: center;
`

const textPersonalList = {
  information: [
    {
      name: "Invalidez",
      type: "list",
      value: [
        "Pensión de Invalidez",
      ],
    },
    {
      name: "Jubilación",
      type: "list",
      value: [
        "Revisión y/o Apelación de dictámenes",
        "Pensión de Jubilación Anticipada Ordinaria",
        "Pensión de Jubilación por Labores de Riesgo Extraordinarios",
        "Pensión de Jubilación Legal",
        "Pensión Mínima de Jubilación",
        "Pensión complementaria de Pensión mínima",
        "Pensión de Jubilación Anticipada por desempleo",
        "Pensión de Jubilación Labores de Riesgo Geneérica",
        "Transferencia de Fondos al Exterior",
      ],
    },
    {
      name: "",
      type: "list",
      value: [
        "",
        "",
        "",
      ],
    },
  ],
};

const StepTwo2 = () => {

  const history = useHistory();
  const [showModal, setModalVisibility] = useState(false);

  const [showNewBeneficiaryModal, setShowNewBeneficiaryModal] = useState(false);

  const handleBtnModal = () => {
    history.push('/tramites-genericos');
  }


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

  return (
    <>
      <WhiteCard>
        <MainTitle title={"Nueva solicitud de trámite"} />
        <Text>
          <span>{"Nombre del trámite"}</span>
        </Text>

        <ContainerStepper>
          <Stepper stepList={steps} />
        </ContainerStepper>

        <ContainerButton>
          <BeneficiariesButton onClick={() => setShowNewBeneficiaryModal(true)}>
            <div style={{ display: 'flex', width: 'auto', alignItems: 'center', justifyContent: 'center' }}>
              <IconContainer><img src={NewBeneficiary} /></IconContainer>
              <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#00ae99' }}>Añadir beneficiarios</p>
            </div>
          </BeneficiariesButton>
        </ContainerButton>


        <CheckboxContainer>
          <CheckBox label={"Declaro no tener beneficiarios"} />
        </CheckboxContainer>

        <ContentButton
          link={"/generic-procedures/with-beneficiaries/step-three"}
          classButton="btn-desactivado"
          text={"Continuar"}
          onClick={() => setModalVisibility(true)}
        />

      </WhiteCard>
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