import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from 'react-router-dom';

import { allColors } from "shared/styles";
import validado from '../../../shared/images/validado.svg';

import AccordionContainer from '../../../components/Accordion3'
import ContentButton from '../../../components/Buttons/ContentButton'
import FinalModal from '../../../components/Modals/FinalModal'
import List from '../../../components/List/List'
import MainTitle from "../../../components/Titles/MainTitle";
import Stepper from "../../../components/Stepper/Stepper"
import TitleGreen from "../../../components/Titles/TitleGreen";
import WhiteCard from "../../../components/Cards/WhiteCard";


const Text = styled.div`
  margin: 25px 0;
  > span {
    text-align: center;
    font-size: 16px;
    line-height: 21px;
    color: ${allColors.colorGrayText};
  }
`;

const ContainerStepper = styled.div`
  margin-top: 40px;
  display: flex;
  min-width: 100%;
  justify-content: center;
`

const StepThree = () => {

  const history = useHistory();
  const [showModal, setModalVisibility] = useState(false);
  const handleBtnModal = () => {
    history.push('/generic-procedures');
  }
  
  const steps = [
    {
      label: 'Detalle del trámite',
      status: 'completed'
    },
    {
      label: 'Beneficiarios',
      status: 'completed'
    },
    {
      label: 'Adjunta documentos',
      status: 'active'
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

        <TitleGreen text={"Recomendaciones"} />
        <List
          value={[
            'El peso de cada documento no debe exceder de 8MB.',
            'Documentos válidos PDF, JPG y PNG.',
            'Verifica que todos los datos del documento sean legibles.',
          ]}
        />
        <br/>

        <AccordionContainer title={"Documentos generales"}
          label={""}
          children={'[ DOCUMENT UPLOADER ]'}
        />

        <AccordionContainer title={"Documentos de beneficiarios"}
          label={""}
          children={'[ DOCUMENT UPLOADER ]'}
        />

        <ContentButton
          classButton="btn-desactivado"
          text={"Continuar"}
          link={() => setModalVisibility(true)}
        />

      </WhiteCard>
      <FinalModal
        showModal={showModal}
        onClose={() => setModalVisibility(false)}
        icon={validado}
        handleBtnModal={handleBtnModal}
      />
    </>
  )
};

export default StepThree