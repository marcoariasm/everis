import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import { size } from 'shared/styles/Responsive';
import { allColors } from 'shared/styles';
import CheckIcon from '../../../../shared/images/email.svg';

import ConfirmationModal from '../../../components/Modals/ConfirmationModal'
import MainTitle from '../../../components/Titles/MainTitle';
import Stepper from '../../../../shared/components/Stepper';
import TextArea from '../../../components/TextArea/TextArea';
import TitleGreen from '../../../components/Titles/TitleGreen';
import WhiteCard from '../../../../shared/components/Cards/WhiteCard';
import Button from '../../../../shared/components/Button';


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

const Grid2Col = styled.div`
  margin-top: 40px;
  display: grid;
  grid-template-columns: 1fr;
  justify-content: stretch;
  @media only screen and (min-width: ${size.tablet}) {
    grid-template-columns: 1fr 1fr;
  }
`

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

const StepOneBeneficiaries = () => {

  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState(false);
  const handleBtnModal = () => {
    history.push('/nueva-solicitud/con-beneficiarios');
  };

  const steps = [
    {
      label: 'Detalle del trámite',
      status: 'active'
    },
    {
      label: 'Beneficiarios',
      status: ''
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

        <TitleGreen text={"Queremos brindarte una respuesta rápida a tu solicitud"} />

        <NormalText>
          <span>{"Por ello es importante que nos comentes toda la información que consideres que podría agilizar el proceso."}</span>
        </NormalText>

        <TextArea onChange={setTextAreaValue} label={"Detalle del trámite"}/>

        <div className="alignCenterVertically">
          <Button
            onClick={() => history.push('/nueva-solicitud/con-beneficiarios/paso-dos')}
            className="buttonRegularResponsive primary-btn"
            disabled={!textAreaValue}
          >
            Continuar
          </Button>
        </div>

      </WhiteCard>
      <ConfirmationModal
        showModal={showModal}
        onClose={() => setShowModal(false)}
        icon={CheckIcon}
        handleBtnModal={handleBtnModal}
      />
    </>
  )
};

export default StepOneBeneficiaries;