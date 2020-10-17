import React, { useState } from "react";
import styled from "styled-components";
import { Link, useHistory } from 'react-router-dom';

import { size } from "shared/styles/Responsive";
import { allColors } from "shared/styles/index";
import asessment from '../../shared/images/asessment.png';

import AccordionContainer from '../../components/Accordion3'
import AsessmentModal from '../../components/Modals/AsessmentModal'
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

const ProceduresWithBeneficiaries = () => {

  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const handleBtnModal = () => {
    history.push('/generic-procedures/with-beneficiaries');
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
        <AccordionContainer title={"Documentos de los beneficiarios que necesitas tener a la mano"}
          label={""}
          children={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eleifend lacinia elit. Nullam consectetur orci ligula, quis malesuada tortor rhoncus et. In quis posuere odio, quis congue magna.'}
        />

        <Grid2Col>

          <ContentButton
            link={() => setShowModal(true)}
            classButton="btn-cancelar"
            text={"Necesito asesoría"}

          />
          <ContentButton
            link={"/generic-procedures/with-beneficiaries/step-one"}
            classButton="btn-pagina-principal"
            text={"Iniciar trámite"}
          />

        </Grid2Col>
      </WhiteCard>
      <AsessmentModal
        showModal={showModal}
        onClose={() => setShowModal(false)}
        icon={asessment}
        handleBtnModal={handleBtnModal}
      />
    </>
  )
};

export default ProceduresWithBeneficiaries