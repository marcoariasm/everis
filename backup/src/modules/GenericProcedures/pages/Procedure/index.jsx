import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { allColors } from "global/styles/index";
import asessment from "shared/images/asessment.png";

import Accordion, { BulletedList } from "global/components/v2/Accordion";
import AsessmentModal from "../../components/Modals/AsessmentModal";
import Button from "global/components/v2/Button";
import MainTitle from "global/components/v2/Titles/MainTitle";
import WhiteCard from "global/components/v2/Cards/WhiteCard";
import { TwoColumnsFlexContainer } from "global/components/v2/UtilityComponents";

import useProcedureInformation from "../../services/useProcedureInformation";
import { setAsessment } from "../../redux/actions/Procedure";
import useGenericDataProcedure from "modules/GenericProcedures/services/useGenericDataProcedure";
import { UserContext } from "modules/App/pages/MainDashboardLayout";
import { registerAsessment } from "modules/GenericProcedures/services/registerAsessment";

const Text = styled.div`
  margin: 10px 0 0 0;
  > span {
    text-align: center;
    font-size: 14px;
    line-height: 21px;
    color: ${allColors.colorGrayText};
  }
`;

const Description = styled.div`
  margin: 15px 0 25px 0;
  > span {
    text-align: center;
    font-size: 14px;
    line-height: 21px;
    color: ${allColors.colorGrayText};
  }
`;

const textProcedure = {
  title: "Nueva solicitud de trámite",
  titleAccordion1: "Importante",
  titleAccordion2: "Etapas del proceso",
  titleAccordion3: "Requisitos para el trámite",
  titleAccordion4: "Documentos que necesitas tener a la mano",
  titleAccordion5:
    "Documentos de los beneficiarios que necesitas tener a la mano",
};

let user = null;

const Procedure = () => {
  const user = React.useContext(UserContext);
  const history = useHistory();
  const { id } = useParams();

  const INITIAL_REQUEST = {
    idTypeRequest: 0,
    idTypeTask: 0,
    idAffiliate: null,
    idApplicant: null,
  };

  const [dataAsessment, setDataAsessment] = useState(INITIAL_REQUEST);
  // console.log(`id procedure is ${id}`);

  const { data: information } = useProcedureInformation(id);
  // console.log("information is ",information);

  const [showModal, setShowModal] = useState(false);
  let dispatch = useDispatch();

   const asess = useSelector((state) => state.idAsessment);

  const handleRequestAssesment = async () => {
    const response = await registerAsessment(dataAsessment);
    if (response !== undefined)
      console.log("asessment => ", response.codeRequest);
    history.push(`/inicio/`);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleBeginProcedure = async () => {
    let request = {
      idTypeRequest: id,
      idTypeTask: 2,
      idAffiliate: user.idAffiliate,
      idApplicant: user.idApplicant,
    };
    const response = await registerAsessment(request);
    if (response !== undefined) {
      console.log("procedure => ", response);
      dispatch(setAsessment(response.idRequest));
    }
    history.push(`/nueva-solicitud/tramite/${id}/paso-uno`);
  };
 
  const handleBeginAsessment = () => {
    setShowModal(true);
    let idAffiliate = null;
    let idApplicant = null;
    let idRepresentative = null;
    // let validAffiliate = useSelector(state => state.validAffiliate);
    if (user.usertype === "affiliate") {
      // if (validAffiliate !== null){
      idAffiliate = user.idAffiliate;
      idApplicant = user.idApplicant;
      // }
    } else if (user.usertype === "applicant") {
      idAffiliate = 0;
      idApplicant = user.idApplicant;
    }

    const request = {
      idTypeRequest: id,
      idTypeTask: 1,
      idAffiliate: user.idAffiliate,
      idApplicant: user.idApplicant,
    };

    setDataAsessment(request);
    // console.log("user data is ", user);
    console.log("request to be sent: ", request);
  };

  useEffect(() => {
    // getToken();
    // getProcedureConfiguration(`${id}`)
    // getInitialData(`${id}`);
  }, [id]);

  // console.log(`user is ${user.usertype}`);

  return (
    <>
      <WhiteCard>
        <Text>
          <span>{textProcedure.title}</span>
        </Text>

        <MainTitle title={information && information.name} />

        <Description>
          <span>{information && information.descriptionLarge}</span>
        </Description>

        {information && information.informationImportant ? (
          <Accordion
            title={textProcedure.titleAccordion1}
            label={""}
            children={information && information.informationImportant}
          />
        ) : (
          ""
        )}

        {information && information.stages.length > 0 ? (
          <Accordion
            title={textProcedure.titleAccordion2}
            label={""}
            children={
              <BulletedList textList={information && information.stages} />
            }
          />
        ) : (
          ""
        )}

        {information && information.requirements.length > 0 ? (
          <Accordion
            title={textProcedure.titleAccordion3}
            label={""}
            children={
              // ""
              <BulletedList
                textList={
                  information &&
                  information.requirements.map((req) => req.nameRequirement)
                }
              />
            }
          />
        ) : (
          ""
        )}

        {information && information.documents.length > 0 ? (
          <Accordion
            title={textProcedure.titleAccordion4}
            label={""}
            children={
              <BulletedList textList={information && information.documents} />
            }
          />
        ) : (
          ""
        )}

        {information &&
        information.inBeneficiary &&
        information.documents.length > 0 == "1" ? (
          <Accordion
            title={textProcedure.titleAccordion5}
            label={""}
            children={
              <BulletedList textList={information && information.documents} />
            }
          />
        ) : (
          ""
        )}

        <TwoColumnsFlexContainer>
          <Button
            className="buttonSmallResponsive alignSelfCenter primary-outlined-btn"
            onClick={handleBeginAsessment}
          >
            Necesito asesoría
          </Button>
          <Button
            className="buttonSmallResponsive alignSelfCenter primary-btn"
            onClick={handleBeginProcedure}
          >
            Iniciar trámite
          </Button>
        </TwoColumnsFlexContainer>
      </WhiteCard>
      <AsessmentModal
        showModal={showModal}
        onClose={() => setShowModal(false)}
        icon={asessment}
        handleOpen={handleRequestAssesment}
        handleClose={handleClose}
        dataUser={user ? user : null}
      />
    </>
  );
};

export default Procedure;
