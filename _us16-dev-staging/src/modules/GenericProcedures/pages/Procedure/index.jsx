import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory, useLocation } from "react-router-dom";

import { allColors } from "shared/styles/index";
import asessment from "../../../shared/images/asessment.png";

import Accordion, { BulletedList } from "../../../shared/components/Accordion";
import AsessmentModal from "../../components/Modals/AsessmentModal";
import MainTitle from "../../components/Titles/MainTitle";
import WhiteCard from "../../../shared/components/Cards/WhiteCard";
import Button from "../../../shared/components/Button";
import { TwoColumnsFlexContainer } from "../../../shared/components/UtilityComponents";

import { ProcedureService } from "modules/GenericProcedures/services/ProceduresService";

const Text = styled.div`
  margin: 25px 0;
  > span {
    text-align: center;
    font-size: 16px;
    line-height: 21px;
    color: ${allColors.colorGrayText};
  }
`;

const textProcedure = {
  titleAccordion1: "Importante",
  titleAccordion2: "Etapas del proceso",
  titleAccordion3: "Requisitos para el trámite",
  titleAccordion4: "Documentos que necesitas tener a la mano",
  titleAccordion5:
    "Documentos de los beneficiarios que necesitas tener a la mano",
};

const Procedure = () => {
  const history = useHistory();
  const { state } = useLocation();
  const { resp, user } = state;
  console.log(resp);

  const location = useLocation();
  const idProcedure = location.search.charAt(4);
  console.log(`id procedure es ${idProcedure}`);

  const [dataSingleProcedure, setDataSingleProcedure] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const handleBtnModal = () => {
    history.push(`/nueva-solicitud/tramite?id=${idProcedure}`
    // , {resp: resp[0], user:user}
    );
  };

  const procedureService = new ProcedureService();

  const getData = (id) => {
      procedureService.getProcedure(id).then(
            response => {
                console.log(`id es ${id}`);
                console.log(response);
                setDataSingleProcedure(response);
            }
        )
    //   const response = await procedureService.getProcedure(idProcedure);
    //   const data = await response;
    //   console.log(`${response.typeRequestId} vs. ${idProcedure}`);
    //   return response;
  };

  useEffect(() => {
    getData(2);
    console.log(`data es ${dataSingleProcedure}`);
  },[idProcedure]);



  return (
    <>
      <WhiteCard>
        <MainTitle title={resp[0].name} />
        <Text>
          <span>{resp[0].description}</span>
        </Text>

        <Accordion
          title={textProcedure.titleAccordion1}
          label={""}
          children={resp[0].informationImportant}
        />
        <Accordion
          title={textProcedure.titleAccordion2}
          label={""}
          children={<BulletedList textList={resp[0].stages} />}
        />
        <Accordion
          title={textProcedure.titleAccordion3}
          label={""}
          children={<BulletedList textList={resp[0].requirements} />}
        />
        <Accordion
          title={textProcedure.titleAccordion4}
          label={""}
          children={<BulletedList textList={resp[0].documents} />}
        />
        {resp[0].inBeneficiary == "1" ? (
          <Accordion
            title={textProcedure.titleAccordion5}
            label={""}
            children={<BulletedList textList={resp[0].documents} />}
          />
        ) : (
          ""
        )}

        <TwoColumnsFlexContainer>
          <Button
            className="buttonSmallResponsive alignSelfCenter primary-outlined-btn"
            onClick={() => setShowModal(true)}
          >
            Necesito asesoría
          </Button>
          <Button
            className="buttonSmallResponsive alignSelfCenter primary-btn"
            onClick={() =>
              history.push(
                `/nueva-solicitud/paso-uno/tramite?id=${idProcedure}`
                , { resp: resp[0], user: user }
              )
            }
          >
            Iniciar trámite
          </Button>
        </TwoColumnsFlexContainer>
      </WhiteCard>
      <AsessmentModal
        showModal={showModal}
        onClose={() => setShowModal(false)}
        icon={asessment}
        handleBtnModal={handleBtnModal}
        dataUser={""}
      />
    </>
  );
};

export default Procedure;
