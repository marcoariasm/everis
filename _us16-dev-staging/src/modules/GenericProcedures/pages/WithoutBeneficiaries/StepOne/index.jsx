import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import { size } from 'shared/styles/Responsive';
import { allColors } from 'shared/styles';
import CheckIcon from '../../../../shared/images/email.svg';

import ConfirmationModal from '../../../components/Modals/ConfirmationModal'
import MainTitle from '../../../components/Titles/MainTitle';
import WhiteCard from '../../../../shared/components/Cards/WhiteCard';
import TextArea from '../../../components/TextArea/TextArea'
import TitleGreen from '../../../components/Titles/TitleGreen';
import Stepper from '../../../../shared/components/Stepper';
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

const codeUserwithBeneficiaries = 0;
const codeUserwithoutBeneficiaries = 1;


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


const StepOne = () => {
  const history = useHistory();
  const [showModal, setModalVisibility] = useState(false);

  const [valueTextarea, setValueTextarea] = useState();

  const steps = [
    {
      label: 'Detalle del trámite',
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

        <TitleGreen text={"Queremos brindarte una respuesta rápida a tu solicitud"} />

        <NormalText>
          <span>{"Por ello es importante que nos comentes toda la información que consideres que podría agilizar el proceso."}</span>
        </NormalText>

        <TextArea 
          label={"Detalle del trámite"} onChange={setValueTextarea}
        />

        <div className="alignCenterVertically">
          <Button
            disabled={!valueTextarea}
            onClick={() => history.push('/nueva-solicitud/sin-beneficiarios/paso-dos')}
            className="buttonRegularResponsive primary-btn"
          >
            Continuar
          </Button>
        </div>

      </WhiteCard>
    </>
  )
};

export default StepOne