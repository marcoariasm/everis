import React, { useState } from "react";
import styled from "styled-components";
import { useHistory } from 'react-router-dom';

import { size } from "shared/styles/Responsive";
import { allColors } from "shared/styles/index";
import asessment from '../../shared/images/asessment.png';


import AccordionContainer from '../../components/Accordion3'
import AsessmentModal from '../../components/Modals/AsessmentModal'
// import ConfirmationModal from '../../components/Modals/ConfirmationModal'
import ContentButton from '../../components/Buttons/ContentButton'
import MainTitle from "../../components/Titles/MainTitle";
import WhiteCard from "../../components/Cards/WhiteCard";

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

const Grid2Col = styled.div`
  margin-top: 40px;
  display: grid;
  grid-template-columns: 1fr;
  justify-content: stretch;
  @media only screen and (min-width: ${size.tablet}) {
    grid-template-columns: 1fr 1fr;
  }
`

const ProceduresWithoutBeneficiaries = () => {

  const history = useHistory();
  const [showModal, setModalVisibility] = useState(false);
  const handleBtnModal = () => {
    history.push('/tramites-representante');
  }

  return (
    <>
      <WhiteCard>
        <MainTitle title={"Nombre del trámite"} />
        <Text>
          <span>{"Descripción larga del trámite. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eleifend lacinia elit. Nullam consectetur orci ligula, quis malesuada tortor rhoncus et. In quis posuere odio, quis congue magna."}</span>
        </Text>

        <AccordionContainer title={"Importante"}
          label={""}
          children={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eleifend lacinia elit. Nullam consectetur orci ligula, quis malesuada tortor rhoncus et. In quis posuere odio, quis congue magna.'}
        />
        <AccordionContainer title={"Etapas del proceso"}
          label={""}
          children={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eleifend lacinia elit. Nullam consectetur orci ligula, quis malesuada tortor rhoncus et. In quis posuere odio, quis congue magna.'}
        />
        <AccordionContainer title={"Requisitos para el trámite"}
          label={""}
          children={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eleifend lacinia elit. Nullam consectetur orci ligula, quis malesuada tortor rhoncus et. In quis posuere odio, quis congue magna.'}
        />
        <AccordionContainer title={"Documentos del afiliado que necesitas tener a la mano"}
          label={""}
          children={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eleifend lacinia elit. Nullam consectetur orci ligula, quis malesuada tortor rhoncus et. In quis posuere odio, quis congue magna.'}
        />

        <Grid2Col>

          <ContentButton
            classButton="btn-cancelar"
            text={"Necesito asesoría"}
            link={() => setModalVisibility(true)}
          />
          <ContentButton
            link={"/generic-procedures/without-beneficiaries/step-one"}
            classButton="btn-pagina-principal"
            text={"Iniciar trámite"}
          />

        </Grid2Col>
      </WhiteCard>
      <AsessmentModal
        showModal={showModal}
        onClose={() => setModalVisibility(false)}
        icon={asessment}
        handleBtnModal={handleBtnModal}
      />
      {/* <ConfirmationModal
        showModal={showModal}
        onClose={() => setModalVisibility(false)}
        icon={email}
        handleBtnModal={handleBtnModal}
      /> */}
    </>
  )
};

export default ProceduresWithoutBeneficiaries